// pages/api/replicate.ts

import { RequestHandler, createProxyMiddleware } from 'http-proxy-middleware';

const replicateApiHandler: RequestHandler = createProxyMiddleware({
  target: 'https://replicate-api-url.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/replicate': '', // remove /api/replicate from the path
  },
});

export default replicateApiHandler;
