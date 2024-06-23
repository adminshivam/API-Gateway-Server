import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('/notification/serve')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  forAll(req: any, res:any): void {
    console.log(req);
    console.log("for once and all!!!");
  }
  
  @Get('/ping')
  ping(): string {
    return this.appService.ping();
  }
}
