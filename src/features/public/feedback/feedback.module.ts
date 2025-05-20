import { Module } from '@nestjs/common';
import { FeedbackPublicService } from './feedback.service';
import { FeedbackPublicController } from './feedback.controller';
import { Feedback } from 'src/models/feedbacks/entities/feedback.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Feedback])],
  controllers: [FeedbackPublicController],
  providers: [FeedbackPublicService],
})
export class FeedbackPublicModule {}
