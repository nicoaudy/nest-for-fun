import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() payload: AuthDto) {
    return this.authService.register(payload);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: AuthDto) {
    return this.authService.login(payload);
  }
}
