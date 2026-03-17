import { resolve } from 'node:path';

import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  email: {
    config: {
      provider: resolve(process.cwd(), 'providers/resend'),
      providerOptions: {
        apiKey: env('RESEND_API_KEY'),
      },
      settings: {
        defaultFrom: env('RESEND_FROM_EMAIL', 'onboarding@resend.dev'),
        defaultReplyTo: env('RESEND_REPLY_TO', env('RESEND_FROM_EMAIL', 'onboarding@resend.dev')),
      },
    },
  },
});

export default config;
