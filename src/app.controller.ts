import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from './utils';
import { JwtAuthGuard } from './utils/guards';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@CurrentUser() user: any): string {
    return user;
  }
}
