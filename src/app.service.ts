import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    console.log("PING PONG...");
    return 'Pong, Service is up!';
  }
}
