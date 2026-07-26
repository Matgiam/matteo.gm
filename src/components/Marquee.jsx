import { marqueeItems } from '../data/site';

const line = `${marqueeItems.join('  ·  ')}  ·  `;

/** The strip is rendered twice so the -50% translate loops seamlessly. */
export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        <span>{line}</span>
        <span aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
