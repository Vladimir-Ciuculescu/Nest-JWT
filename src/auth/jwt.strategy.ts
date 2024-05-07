import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //ignoreExpiration: true,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    console.log(5555, payload);
    return { userId: payload.sub, email: payload.email };
  }
}
