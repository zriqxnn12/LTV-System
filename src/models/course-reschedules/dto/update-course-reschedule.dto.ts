import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseRescheduleDto } from './create-course-reschedule.dto';

export class UpdateCourseRescheduleDto extends PartialType(CreateCourseRescheduleDto) {}
