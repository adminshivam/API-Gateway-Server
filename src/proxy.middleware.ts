import { Injectable, NestMiddleware, Logger, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getBasicAuthCredentials } from './utils/auth.helper';

@Injectable()
export class ConsumerProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ConsumerProxyMiddleware.name);

  use(req: any, res: any, next: () => void) {
    this.logger.log('Received request for ' + req.path); // Logging statement

    // get the basic authentication credentials
    const {username, password} = getBasicAuthCredentials(req, res, next);

    // validate the basic authentication credentials
    if (username !== process.env.CONSUMER_SERVER_USERNAME || password !== process.env.CONSUMER_SERVER_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }

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

    // get the basic authentication credentials
    const {username, password} = getBasicAuthCredentials(req, res, next);

    // validate the basic authentication credentials
    if (username !== process.env.NOTIFICATION_SERVER_USERNAME || password !== process.env.NOTIFICATION_SERVER_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }

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

@Injectable()
export class StaticAssetsProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(StaticAssetsProxyMiddleware.name);

  async use(req: any, res: any, next: any) {
    this.logger.log('Received request for ' + req.path); // Logging statement

    // get the basic authentication credentials
    const {username, password} = getBasicAuthCredentials(req, res, next);

    // validate the basic authentication credentials
    if (username !== process.env.STATIC_ASSETS_SERVER_USERNAME || password !== process.env.STATIC_ASSETS_SERVER_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const apiProxy = createProxyMiddleware({
      target: process.env.STATIC_ASSETS_SERVER_PATH, // Target server
      changeOrigin: true,
      pathRewrite: {
        '^/static/assets/serve': '', // Remove /api prefix when forwarding
      },
    });

    apiProxy(req, res, next);
  }
}
