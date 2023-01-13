import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utils';
import { JwtAuthGuard } from 'src/utils/guards';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@CurrentUser() user: any) {
    return user;
  }
}
