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
  UseGuards,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from '../../../models/events/dto/create-event.dto';
import { UpdateEventDto } from '../../../models/events/dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createEventSchema } from '../../../validators/requests/create-event.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { eventIdParamSchema } from 'src/validators/params/event-id.param';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file_path'))
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.eventService.create(createEventDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.eventService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema)) id: number,
  ) {
    return this.eventService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema)) id: number,
    @Body(new JoiValidationPipe(createEventSchema))
    updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(+id, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(eventIdParamSchema)) id: number,
  ) {
    return this.eventService.remove(+id);
  }
}
