import ImageSlot from '../components/ImageSlot';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useI18n } from '../i18n/context';
import { galleryCells } from '../data/site';

export default function Gallery() {
  const scope = usePageAnimation();
  const { t } = useI18n();
  const copy = t.gallery;

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        {copy.eyebrow}
      </div>
      <h1 className="display display--page" style={{ marginBottom: 20 }}>
        {copy.title}
      </h1>
      <p className="note" style={{ fontSize: 16.5, margin: '0 0 56px' }}>
        {copy.note}
      </p>

      <div className="gallery">
        {galleryCells.map(({ id, className }) => (
          <div key={id} className={className}>
            <ImageSlot id={id} shape="rounded" radius={8} placeholder={copy.placeholders[id]} />
          </div>
        ))}
      </div>
    </main>
  );
}
