import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthPublicService } from './auth.service';
import { PublicAuthGuard } from 'src/cores/guards/public-auth.guard';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { registerSchema } from 'src/validators/requests/register.request';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';

@Controller()
export class AuthPublicController {
  constructor(private readonly authPublicService: AuthPublicService) {}

  @UseGuards(PublicAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authPublicService.login(req.user);
  }

  @Post('register')
  register(
    @Body(new JoiValidationPipe(registerSchema)) createUserDto: CreateUserDto,
  ) {
    return this.authPublicService.register(createUserDto);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Get('profile')
  profile(@CurrentUser() user) {
    return this.authPublicService.profile(user);
  }
}
