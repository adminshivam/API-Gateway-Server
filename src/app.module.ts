import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD, REQUEST } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard, ThrottlerModuleOptions,ThrottlerOptions } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerProxyMiddleware, NotificationProxyMiddleware } from './proxy.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl:10000,  // per minute
        limit:2, // two requests
      }
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConsumerProxyMiddleware)
      .forRoutes({ path: '/customer/serve/*', method: RequestMethod.ALL });

    consumer
      .apply(NotificationProxyMiddleware)
      .forRoutes({ path: '/notification/serve/*', method: RequestMethod.ALL });
  }
}
