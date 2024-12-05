// En el archivo setupProxy.ts en la raíz del proyecto
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express'; // Si estás usando Express

export default function setupProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.giantbomb.com',
      changeOrigin: true,
    })
  );
}
