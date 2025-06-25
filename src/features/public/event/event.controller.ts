import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventPublicService } from './event.service';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { eventIdParamSchema } from 'src/validators/params/event-id.param';

@Controller()
export class EventPublicController {
  constructor(private readonly eventService: EventPublicService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.eventService.findAll(query);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema))
    id: string,
  ) {
    return this.eventService.findOne(+id);
  }
}
