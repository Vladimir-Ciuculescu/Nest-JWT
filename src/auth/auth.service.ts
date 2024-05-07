import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(payload: CreateUserDto) {
    const { email } = payload;

    const user = await this.usersService.findUser(email);

    if (user) {
      throw new HttpException(
        { error: 'This email address is already in use !' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const result = await this.usersService.createUser(payload);

    return result;
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findUser(username);

  //   const isMatch = await bcrypt.compare(pass, user.password);

  //   if (user && isMatch) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   // if (user && user.password === pass) {
  //   //   const { password, ...result } = user;
  //   //   return result;
  //   // }
  //   return null;
  // }

  async validateUser(username: string, pass: string) {
    // const { email, password } = body;

    const user = await this.usersService.findUser(username);

    if (!user) {
      throw new HttpException(
        { error: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new HttpException(
        { error: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;

    // const payload = { sub: user.id, email: user.email };

    // return {
    //   access_token: await this.jwtService.sign(payload),
    // };

    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };

    // return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
