import { Injectable } from '@nestjs/common';
import { CreateCourseRescheduleDto } from '../../../models/course-reschedules/dto/create-course-reschedule.dto';
import { UpdateCourseRescheduleDto } from '../../../models/course-reschedules/dto/update-course-reschedule.dto';

@Injectable()
export class CourseRescheduleService {
  create(createCourseRescheduleDto: CreateCourseRescheduleDto) {
    return 'This action adds a new courseReschedule';
  }

  findAll() {
    return `This action returns all courseReschedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseReschedule`;
  }

  update(id: number, updateCourseRescheduleDto: UpdateCourseRescheduleDto) {
    return `This action updates a #${id} courseReschedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseReschedule`;
  }
}
