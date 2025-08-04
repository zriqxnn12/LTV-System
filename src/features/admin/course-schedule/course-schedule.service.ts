import { Injectable } from '@nestjs/common';
import { CreateCourseScheduleDto } from '../../../models/course-schedules/dto/create-course-schedule.dto';
import { UpdateCourseScheduleDto } from '../../../models/course-schedules/dto/update-course-schedule.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { Op, where } from 'sequelize';
import CourseScheduleStatusEnum, {
  getCourseScheduleStatusEnumLabel,
} from 'src/models/course-schedules/enums/course-schedule-status.enum';

@Injectable()
export class CourseScheduleService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(CourseSchedule)
    private courseScheduleModel: typeof CourseSchedule,
  ) {}

  async create(createCourseScheduleDto: CreateCourseScheduleDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { date, start_time, duration, ...rest } = createCourseScheduleDto;

      const dateStart = new Date(`${date}T${start_time}:00.000Z`);
      const dateEnd = new Date(dateStart.getTime() + duration * 60000);
      const day = dateStart.getUTCDay();

      const schedule = await this.courseScheduleModel.create(
        {
          ...rest,
          date,
          duration,
          start_time,
          end_time: createCourseScheduleDto.end_time,
          date_start: dateStart,
          date_end: dateEnd,
          day,

          // Default values for status
          status: CourseScheduleStatusEnum.SCHEDULED,
          status_name: getCourseScheduleStatusEnumLabel(
            CourseScheduleStatusEnum.SCHEDULED,
          ),
        },
        { transaction },
      );

      await transaction.commit();
      return this.response.success(
        schedule,
        201,
        'Successfully create course schedule',
      );
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating course schedule:', error);
      return this.response.fail('Failed to create course schedule', 400);
    }
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
            { association: 'branch' },
            { association: 'music_genre' },
            { association: 'instrument' },
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
        { association: 'classroom' },
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
              { association: 'branch' },
              { association: 'music_genre' },
              { association: 'instrument' },
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
          { association: 'classroom' },
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
