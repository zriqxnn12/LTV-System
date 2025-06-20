import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../../../models/courses/dto/create-course.dto';
import { UpdateCourseDto } from '../../../models/courses/dto/update-course.dto';

@Injectable()
export class CourseService {
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
