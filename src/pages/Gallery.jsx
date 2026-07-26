import ImageSlot from '../components/ImageSlot';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { galleryCells } from '../data/site';

export default function Gallery() {
  const scope = usePageAnimation();

  return (
    <main ref={scope} className="shell page">
      <div className="eyebrow" style={{ marginBottom: 24 }}>
        Gallery
      </div>
      <h1 className="display display--page" style={{ marginBottom: 20 }}>
        In <em className="accent">pictures</em>.
      </h1>
      <p className="note" style={{ fontSize: 16.5, margin: '0 0 56px' }}>
        Drag your photos onto the frames below — they’ll stay in this browser.
      </p>

      <div className="gallery">
        {galleryCells.map(({ id, className, placeholder }) => (
          <div key={id} className={className}>
            <ImageSlot id={id} shape="rounded" radius={8} placeholder={placeholder} />
          </div>
        ))}
      </div>
    </main>
  );
}
