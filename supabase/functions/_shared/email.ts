import { env } from './http.ts';

export type Email = { to: string; subject: string; html: string; replyTo?: string };

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends through EmailJS's REST API, using one generic template whose fields are
 * {{to_email}}, {{reply_to}}, {{subject}} and {{{message_html}}} (see docs/reservations.md).
 */
async function sendEmail({ to, subject, html, replyTo }: Email): Promise<void> {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: env('EMAILJS_SERVICE_ID'),
      template_id: env('EMAILJS_TEMPLATE_ID'),
      user_id: env('EMAILJS_PUBLIC_KEY'),
      accessToken: env('EMAILJS_PRIVATE_KEY'),
      template_params: {
        to_email: to,
        reply_to: replyTo ?? env('ADMIN_EMAIL'),
        subject,
        message_html: html,
      },
    }),
  });
  if (!response.ok) throw new Error(`EmailJS ${response.status}: ${await response.text()}`);
}

/**
 * Best effort, one at a time (EmailJS accepts about one request per second).
 * A failed notification is logged and never undoes a booking.
 */
export async function sendEmails(emails: Email[]): Promise<void> {
  for (const [index, email] of emails.entries()) {
    if (index > 0) await wait(1100);
    try {
      await sendEmail(email);
    } catch (error) {
      console.error(`Email "${email.subject}" to ${email.to} failed:`, error);
    }
  }
}
