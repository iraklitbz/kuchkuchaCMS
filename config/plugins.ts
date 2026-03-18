import { resolve } from 'node:path';

import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER'),
        },
        uploadStream: {
          folder: env('CLOUDINARY_FOLDER'),
        },
        delete: {},
      },
    },
  },
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
