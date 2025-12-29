import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from '../../../models/events/entities/event.entity';
import { ImageUploadHelper } from 'src/cores/helpers/image-upload.helper';
import { FileHelper } from 'src/cores/helpers/file.helper';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService, ImageUploadHelper, FileHelper],
})
export class EventModule {}
