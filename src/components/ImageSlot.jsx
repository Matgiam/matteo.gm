import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';

/**
 * A user-fillable image placeholder, the React replacement for the old
 * <image-slot> custom element. Drop an image file on it (or click to browse)
 * and it sticks: the picture is downscaled and kept in localStorage under the
 * slot's `id`, so it survives reloads in that browser.
 *
 * Note this is per-browser, not per-site: it is a convenient way to dress the
 * page while you gather the real photos. Once you have them, drop the files in
 * `public/assets/` and pass `src` instead.
 */

const STORAGE_PREFIX = 'matteo.gm:image-slot:';
const MAX_EDGE = 1600;
const QUALITY = 0.82;

/**
 * Downscale to a sane size so a 12 MP phone photo doesn't blow the storage quota.
 * Rejects with an error code ('read' or 'decode') that the slot translates.
 */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode'));
      img.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
        if (scale === 1 && file.size < 400_000) {
          resolve(String(reader.result));
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', QUALITY));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageSlot({
  id,
  placeholder: placeholderProp,
  src = '',
  alt = '',
  shape = 'rounded',
  radius = 12,
  fit = 'cover',
  className = '',
}) {
  const { t } = useI18n();
  const copy = t.imageSlot;
  const placeholder = placeholderProp ?? copy.placeholder;

  const [stored, setStored] = useState('');
  const [isOver, setIsOver] = useState(false);
  // An error code rather than a sentence, so the message follows a language switch.
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      setStored(window.localStorage.getItem(STORAGE_PREFIX + id) || '');
    } catch {
      // private mode / storage disabled; the slot just stays empty
    }
  }, [id]);

  const accept = useCallback(
    async (file) => {
      if (!file || !file.type.startsWith('image/')) {
        setError('type');
        return;
      }
      try {
        const dataUrl = await fileToDataUrl(file);
        setStored(dataUrl);
        setError(null);
        try {
          window.localStorage.setItem(STORAGE_PREFIX + id, dataUrl);
        } catch {
          setError('quota');
        }
      } catch (err) {
        setError(err.message === 'decode' ? 'decode' : 'read');
      }
    },
    [id],
  );

  const clear = () => {
    setStored('');
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_PREFIX + id);
    } catch {
      /* nothing to clean up */
    }
  };

  const shown = stored || src;
  const borderRadius =
    shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : shape === 'rect' ? 0 : `${radius}px`;

  return (
    <div
      className={`slot${shown ? ' is-filled' : ''}${isOver ? ' is-over' : ''} ${className}`.trim()}
      style={{ borderRadius }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        accept(e.dataTransfer.files?.[0]);
      }}
    >
      {shown && (
        <img
          className="slot__img"
          src={shown}
          alt={alt || placeholder}
          style={{ objectFit: fit, borderRadius }}
        />
      )}

      {/* Fills the slot; carries the click-to-browse affordance and the label. */}
      <button
        type="button"
        className="slot__pick"
        onClick={() => inputRef.current?.click()}
        aria-label={`${placeholder}. ${copy.hint}`}
      >
        {!shown && (
          <span className="slot__empty">
            <span className="slot__icon" aria-hidden="true">
              +
            </span>
            {error ? copy.errors[error] : placeholder}
          </span>
        )}
      </button>

      {stored && (
        <button type="button" className="slot__clear" title={copy.remove} onClick={clear}>
          ×
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          accept(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </div>
  );
}
