import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(payload: AuthDto) {
    const exist = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (exist) {
      throw new BadRequestException('User already exists');
    }

    const hash = await argon2.hash(payload.password);
    return this.prisma.user.create({
      data: {
        email: payload.email,
        password: hash,
      },
    });
  }

  async login(payload: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not exist');
    }

    const valid = await argon2.verify(user.password, payload.password);
    if (!valid) {
      throw new UnauthorizedException('Password is not valid');
    }

    return this.jwt.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
