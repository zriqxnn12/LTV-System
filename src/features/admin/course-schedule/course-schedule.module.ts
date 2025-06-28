import { Module } from '@nestjs/common';
import { CourseScheduleService } from './course-schedule.service';
import { CourseScheduleController } from './course-schedule.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

@Module({
  imports: [SequelizeModule.forFeature([CourseSchedule])],
  controllers: [CourseScheduleController],
  providers: [CourseScheduleService],
})
export class CourseScheduleModule {}
