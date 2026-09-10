import { useI18n } from '../i18n/context';

/** The strip is rendered twice so the -50% translate loops seamlessly. */
export default function Marquee() {
  const { t } = useI18n();
  const line = `${t.marquee.join('  ·  ')}  ·  `;

  return (
    <div className="marquee">
      <div className="marquee__track">
        <span>{line}</span>
        <span aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
