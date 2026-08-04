/**
 * Site-wide configuration.
 *
 * The `showMarquee` / `showPastConcerts` flags replace the old runtime "Tweaks"
 * props; flip them here. EmailJS credentials come from `.env` (see .env.example)
 * The public key is meant to be shipped in the browser bundle.
 */
export const siteConfig = {
  showMarquee: true,
  showPastConcerts: true,
};

export const emailjsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
};

export const isEmailjsConfigured = Boolean(
  emailjsConfig.publicKey && emailjsConfig.serviceId && emailjsConfig.templateId,
);

export const contact = {
  booking: 'booking@matteo.gm',
  hello: 'hello@matteo.gm',
  press: 'press@matteo.gm',
};

export const spotify = {
  trackId: '21a84S7VrRHXR8GmXGpyty',
  trackUrl: 'https://open.spotify.com/track/21a84S7VrRHXR8GmXGpyty',
  youtubeUrl: '#',
};
