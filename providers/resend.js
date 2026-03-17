'use strict';

const RESEND_API_URL = 'https://api.resend.com/emails';

const normalizeRecipients = (value) => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;

  return String(value)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

module.exports = {
  init(providerOptions = {}, settings = {}) {
    const { apiKey } = providerOptions;

    return {
      async send(options) {
        if (!apiKey) {
          throw new Error('Missing RESEND_API_KEY for Strapi email provider.');
        }

        const from = options.from || settings.defaultFrom;
        const replyTo = options.replyTo || settings.defaultReplyTo;

        if (!from) {
          throw new Error('Missing sender email. Set RESEND_FROM_EMAIL or pass `from` explicitly.');
        }

        const payload = {
          from,
          to: normalizeRecipients(options.to),
          cc: normalizeRecipients(options.cc),
          bcc: normalizeRecipients(options.bcc),
          reply_to: normalizeRecipients(replyTo),
          subject: options.subject,
          text: options.text,
          html: options.html,
          tags: Array.isArray(options.tags) ? options.tags : undefined,
        };

        const response = await fetch(RESEND_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Resend request failed (${response.status}): ${errorText}`);
        }
      },
    };
  },
};
