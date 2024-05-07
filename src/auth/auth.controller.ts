import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
// import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/add')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  addUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  login(@Body() body: LoginUserDto, @Req() req) {
    return req.user;
    //return this.authService.signIn(body);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  getProfile() {
    return 'awdad';
  }
}
