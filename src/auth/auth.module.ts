import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PassportModule],

  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, LocalStrategy],
})
export class AuthModule {}
