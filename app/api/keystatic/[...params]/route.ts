import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../keystatic.config';

export const { POST, GET } = makeRouteHandler({
  config: keystaticConfig,
  secret: process.env.KEYSTATIC_SECRET || 'build-secret-fallback-key-32-chars-long',
});
