import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtPublicAuthGuard extends AuthGuard('jwt-public') {}
