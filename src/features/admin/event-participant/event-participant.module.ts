import { Module } from '@nestjs/common';
import { EventParticipantService } from './event-participant.service';
import { EventParticipantController } from './event-participant.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';

@Module({
  imports: [SequelizeModule.forFeature([EventParticipant])],
  controllers: [EventParticipantController],
  providers: [EventParticipantService],
})
export class EventParticipantModule {}
