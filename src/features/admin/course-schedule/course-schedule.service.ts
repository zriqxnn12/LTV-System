import { Injectable } from '@nestjs/common';
import { CreateCourseScheduleDto } from '../../../models/course-schedules/dto/create-course-schedule.dto';
import { UpdateCourseScheduleDto } from '../../../models/course-schedules/dto/update-course-schedule.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class CourseScheduleService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(CourseSchedule)
    private courseScheduleModel: typeof CourseSchedule,
  ) {}
  create(createCourseScheduleDto: CreateCourseScheduleDto) {
    return 'This action adds a new courseSchedule';
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.courseScheduleModel,
      query,
    ).getResult();

    const result = {
      count: count,
      course_schedules: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve course schedule',
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} courseSchedule`;
  }

  update(id: number, updateCourseScheduleDto: UpdateCourseScheduleDto) {
    return `This action updates a #${id} courseSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSchedule`;
  }
}
