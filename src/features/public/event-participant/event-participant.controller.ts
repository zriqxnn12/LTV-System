import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { EventParticipantPublicService } from './event-participant.service';
import { CreateEventParticipantDto } from 'src/models/event-participants/dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from 'src/models/event-participants/dto/update-event-participant.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { eventIdParamSchema } from 'src/validators/params/event-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createEventParticipantSchema } from 'src/validators/requests/create-event-participant.request';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { eventParticipantIdParamSchema } from 'src/validators/params/event-participant-id.param';

@Controller()
export class EventParticipantPublicController {
  constructor(
    private readonly eventParticipantService: EventParticipantPublicService,
  ) {}

  @UseGuards(JwtPublicAuthGuard)
  @Post()
  create(
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
    @CurrentUser() user,
  ) {
    return this.eventParticipantService.create(eventId, user);
  }

  @UseGuards(JwtPublicAuthGuard)
  @UseInterceptors(FileInterceptor('file_path'))
  @Put(':id/image')
  updateImage(
    @Param('id', new JoiValidationParamPipe(eventParticipantIdParamSchema))
    id: number,
    @UploadedFile() file: Express.Multer.File,
    @Param('eventId', new JoiValidationParamPipe(eventIdParamSchema))
    eventId: string,
  ) {
    return this.eventParticipantService.updateImage(id, file, eventId);
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
