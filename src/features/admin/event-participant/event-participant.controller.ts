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
  Put,
} from '@nestjs/common';
import { EventParticipantService } from './event-participant.service';
import { CreateEventParticipantDto } from '../../../models/event-participants/dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from '../../../models/event-participants/dto/update-event-participant.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { eventIdParamSchema } from 'src/validators/params/event-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createEventParticipantSchema } from 'src/validators/requests/create-event-participant.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { eventParticipantIdParamSchema } from 'src/validators/params/event-participant-id.param';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query() query,
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
  ) {
    return this.eventParticipantService.findAll(query, eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: string,
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
  ) {
    return this.eventParticipantService.findOne(+id, eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: string,
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
    @Body(new JoiValidationPipe(createEventParticipantSchema))
    updateEventParticipantDto: CreateEventParticipantDto,
  ) {
    return this.eventParticipantService.update(
      +id,
      updateEventParticipantDto,
      eventId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/accept')
  updateStatusToAccepted(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: number,
  ) {
    return this.eventParticipantService.updateStatusToAccept(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/paid')
  updateStatusToPaid(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: number,
  ) {
    return this.eventParticipantService.updateStatusToPaid(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: string,
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
  ) {
    return this.eventParticipantService.delete(+id, eventId);
  }
}
