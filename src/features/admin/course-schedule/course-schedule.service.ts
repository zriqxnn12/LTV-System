import { Injectable } from '@nestjs/common';
import { CreateCourseScheduleDto } from '../../../models/course-schedules/dto/create-course-schedule.dto';
import { UpdateCourseScheduleDto } from '../../../models/course-schedules/dto/update-course-schedule.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { Op, where } from 'sequelize';

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
    const { start_date, end_date } = query;
    const whereClause: any = {};
    if (start_date && end_date) {
      const start = new Date(start_date);
      const end = new Date(end_date);
      end.setHours(23, 59, 59, 999); // untuk mencakup sampai akhir hari
      whereClause.date_start = {
        [Op.between]: [start, end],
      };
    }
    const { count, data } = await new QueryBuilderHelper(
      this.courseScheduleModel,
      query,
    )
      .where(whereClause)
      .load(
        {
          association: 'course',
          include: [
            {
              association: 'student',
              include: [{ association: 'user' }],
            },
          ],
        },
        {
          association: 'teacher',
          include: [
            {
              association: 'staff',
              include: [{ association: 'user' }],
            },
          ],
        },
        { association: 'attendance' },
        { association: 'course_reschedule' },
      )
      .getResult();

    const result = {
      count: count,
      course_schedules: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve course schedules',
    );
  }

  async findOne(id: number) {
    try {
      const course = await this.courseScheduleModel.findOne({
        where: { id },
        include: [
          {
            association: 'course',
            include: [
              {
                association: 'student',
                include: [{ association: 'user' }],
              },
            ],
          },
          {
            association: 'teacher',
            include: [
              {
                association: 'staff',
                include: [{ association: 'user' }],
              },
            ],
          },
          { association: 'attendance' },
          { association: 'course_reschedule' },
        ],
      });
      return this.response.success(
        course,
        200,
        'Successfully retrieve course schedule',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve course schedule', 400);
    }
  }

  update(id: number, updateCourseScheduleDto: UpdateCourseScheduleDto) {
    return `This action updates a #${id} courseSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSchedule`;
  }
}
