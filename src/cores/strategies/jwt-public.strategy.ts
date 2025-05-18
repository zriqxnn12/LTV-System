import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPublicService } from 'src/features/public/auth/auth.service';

@Injectable()
export class JwtPublicStrategy extends PassportStrategy(
  Strategy,
  'jwt-public',
) {
  constructor(private readonly authPublicService: AuthPublicService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return await this.authPublicService.validateJwt(payload.sub);
  }
}
