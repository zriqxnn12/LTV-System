import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ParticipantPublicService } from './participant.service';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { eventParticipantIdParamSchema } from 'src/validators/params/event-participant-id.param';

@Controller()
export class ParticipantPublicController {
  constructor(private readonly participantService: ParticipantPublicService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Get()
  findAll(@Query() query, @Req() req) {
    return this.participantService.findAll(query, req.user.id);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: string,
  ) {
    return this.participantService.findOne(+id);
  }
}
