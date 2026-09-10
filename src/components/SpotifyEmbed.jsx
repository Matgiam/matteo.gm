import { spotify } from '../config';
import { useI18n } from '../i18n/context';

/**
 * Height is set in CSS, not via the `height` attribute: below ~480px the
 * embed's compact row layout runs out of room, so the stylesheet gives it
 * more height and Spotify switches to its roomier stacked card.
 */
export default function SpotifyEmbed({ className = '', style }) {
  const { t } = useI18n();

  return (
    <iframe
      title={t.common.spotifyTitle}
      className={`spotify-embed ${className}`.trim()}
      src={`https://open.spotify.com/embed/track/${spotify.trackId}?utm_source=generator`}
      style={style}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
