import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('/notification/serve')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  fuckAll(req: any, res:any): void {
    console.log(req);
    console.log("Fucking all at once");
  }
  
  @Get('/ping')
  ping(): string {
    return this.appService.ping();
  }
}
