import { Module } from '@nestjs/common';
import { CourseRescheduleService } from './course-reschedule.service';
import { CourseRescheduleController } from './course-reschedule.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseReschedule } from 'src/models/course-reschedules/entities/course-reschedule.entity';

@Module({
  imports: [SequelizeModule.forFeature([CourseReschedule])],
  controllers: [CourseRescheduleController],
  providers: [CourseRescheduleService],
})
export class CourseRescheduleModule {}
