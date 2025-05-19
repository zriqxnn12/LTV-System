import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventParticipantService } from './event-participant.service';
import { CreateEventParticipantDto } from '../../../models/event-participants/dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from '../../../models/event-participants/dto/update-event-participant.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { eventIdParamSchema } from 'src/validators/params/event-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createEventParticipantSchema } from 'src/validators/requests/create-event-participant.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';

@Controller()
export class EventParticipantController {
  constructor(
    private readonly eventParticipantService: EventParticipantService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
    @Body(new JoiValidationPipe(createEventParticipantSchema))
    createEventParticipantDto: CreateEventParticipantDto,
  ) {
    return this.eventParticipantService.create(
      createEventParticipantDto,
      eventId,
    );
  }

  @Get()
  findAll() {
    return this.eventParticipantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventParticipantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventParticipantDto: UpdateEventParticipantDto,
  ) {
    return this.eventParticipantService.update(+id, updateEventParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventParticipantService.remove(+id);
  }
}
