import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from 'src/models/courses/entities/course.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

@Module({
  imports: [SequelizeModule.forFeature([Course, CourseSchedule])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
