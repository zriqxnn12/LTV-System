import { Module } from '@nestjs/common';
import { CourseReschedulePublicService } from './course-reschedule.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseReschedule } from 'src/models/course-reschedules/entities/course-reschedule.entity';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { CourseReschedulePublicController } from './course-reschedule.controller';

@Module({
  imports: [SequelizeModule.forFeature([CourseReschedule, CourseSchedule])],
  controllers: [CourseReschedulePublicController],
  providers: [CourseReschedulePublicService],
})
export class CourseReschedulePublicModule {}
