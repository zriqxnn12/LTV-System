import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthPublicService } from 'src/features/public/auth/auth.service';

@Injectable()
export class PublicStrategy extends PassportStrategy(Strategy, 'public') {
  constructor(private readonly authPublicService: AuthPublicService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authPublicService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
