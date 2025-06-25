import { Module } from '@nestjs/common';
import { EventPublicService } from './event.service';
import { EventPublicController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from 'src/models/events/entities/event.entity';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventPublicController],
  providers: [EventPublicService],
})
export class EventPublicModule {}
