import { Module } from '@nestjs/common';
import { ParticipantPublicService } from './participant.service';
import { ParticipantPublicController } from './participant.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';

@Module({
  imports: [SequelizeModule.forFeature([EventParticipant])],
  controllers: [ParticipantPublicController],
  providers: [ParticipantPublicService],
})
export class ParticipantPublicModule {}
