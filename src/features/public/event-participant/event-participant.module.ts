import { Module } from '@nestjs/common';
import { EventParticipantPublicController } from './event-participant.controller';
import { EventParticipantPublicService } from './event-participant.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';

@Module({
  imports: [SequelizeModule.forFeature([EventParticipant])],
  controllers: [EventParticipantPublicController],
  providers: [EventParticipantPublicService],
})
export class EventParticipantPublicModule {}
