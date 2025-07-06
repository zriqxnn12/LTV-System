import { Module } from '@nestjs/common';
import { AttendancePublicService } from './attendance.service';
import { AttendancePublicController } from './attendance.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from 'src/models/attendances/entities/attendance.entity';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

@Module({
  imports: [SequelizeModule.forFeature([Attendance, CourseSchedule])],
  controllers: [AttendancePublicController],
  providers: [AttendancePublicService],
})
export class AttendancePublicModule {}
