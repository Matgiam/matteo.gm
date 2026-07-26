import { spotify } from '../config';

/**
 * Height is set in CSS, not via the `height` attribute: below ~480px the
 * embed's compact row layout runs out of room, so the stylesheet gives it
 * more height and Spotify switches to its roomier stacked card.
 */
export default function SpotifyEmbed({ className = '', style }) {
  return (
    <iframe
      title="Away on Spotify"
      className={`spotify-embed ${className}`.trim()}
      src={`https://open.spotify.com/embed/track/${spotify.trackId}?utm_source=generator`}
      style={style}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
