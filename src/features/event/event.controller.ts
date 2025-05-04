import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { eventIdParamSchema } from './validations/params/event-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createEventSchema } from './validations/requests/create-event.request';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file_path'))
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.eventService.create(createEventDto, file);
  }

  @Get()
  findAll(@Query() query) {
    return this.eventService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema)) id: number,
  ) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema)) id: number,
    @Body(new JoiValidationPipe(createEventSchema))
    updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema)) id: number,
  ) {
    return this.eventService.remove(+id);
  }
}
