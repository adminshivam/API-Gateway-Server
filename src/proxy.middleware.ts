import { Injectable, NestMiddleware, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ConsumerProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ConsumerProxyMiddleware.name);

  use(req: any, res: any, next: () => void) {
    this.logger.log('Received request for ' + req.path); // Logging statement

    const apiProxy = createProxyMiddleware({
      target: process.env.CONSUMER_SERVER_PATH, // Target server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding
      },
    });

    apiProxy(req, res, next);
  }
}

@Injectable()
export class NotificationProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(NotificationProxyMiddleware.name);

  async use(req: any, res: any, next: any) {
    this.logger.log('Received request for ' + req.path); // Logging statement

    const apiProxy = createProxyMiddleware({
      target: process.env.NOTIFICATION_SERVER_PATH, // Target server
      changeOrigin: true,
      pathRewrite: {
        '^/notification/serve': '', // Remove /api prefix when forwarding
      },
    });

    apiProxy(req, res, next);
  }
}
