import { Module } from '@nestjs/common';
import { CourseSchedulePublicService } from './course-schedule.service';
import { CourseSchedulePublicController } from './course-schedule.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { Student } from 'src/models/students/entities/student.entity';
import { Teacher } from 'src/models/staff/entities/teacher.entity';

@Module({
  imports: [SequelizeModule.forFeature([CourseSchedule, Student, Teacher])],
  controllers: [CourseSchedulePublicController],
  providers: [CourseSchedulePublicService],
})
export class CourseSchedulePublicModule {}
