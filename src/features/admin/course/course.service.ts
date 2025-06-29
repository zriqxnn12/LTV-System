import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../../../models/courses/dto/create-course.dto';
import { UpdateCourseDto } from '../../../models/courses/dto/update-course.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/models/courses/entities/course.entity';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import CourseScheduleStatusEnum, {
  getCourseScheduleStatusEnumLabel,
} from 'src/models/course-schedules/enums/course-schedule-status.enum';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { Op } from 'sequelize';

@Injectable()
export class CourseService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(CourseSchedule)
    private courseScheduleModel: typeof CourseSchedule,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { course_schedule, ...courseData } = createCourseDto;
      const course = await this.courseModel.create(courseData, { transaction });

      const defaultStatus = CourseScheduleStatusEnum.SCHEDULED;
      const defaultStatusName = getCourseScheduleStatusEnumLabel(defaultStatus);

      for (const schedule of course_schedule) {
        const date = new Date(schedule.date);

        const [startHour, startMin] = schedule.start_time
          .split(':')
          .map(Number);
        const [endHour, endMin] = schedule.end_time.split(':').map(Number);

        const dateStart = new Date(schedule.date);
        dateStart.setHours(startHour, startMin, 0, 0); // waktu lokal

        const dateEnd = new Date(schedule.date);
        dateEnd.setHours(endHour, endMin, 0, 0); // waktu lokal
        const day = new Date(schedule.date).getDay(); // 0 (Sunday) to 6 (Saturday)
        await this.courseScheduleModel.create(
          {
            ...schedule,
            course_id: course.id,
            status: defaultStatus,
            status_name: defaultStatusName,
            date_start: dateStart,
            date_end: dateEnd,
            day,
          },
          { transaction },
        );
      }
      await transaction.commit();
      return this.response.success(course, 201, 'Successfully create course');
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return this.response.fail('Failed to create course', 400);
    }
  }

  async findAll(query: any) {
    const { start_date, end_date } = query;
    const start = start_date ? new Date(start_date) : undefined;
    const end = end_date ? new Date(end_date) : undefined;

    if (end) {
      end.setHours(23, 59, 59, 999);
    }

    const { count, data } = await new QueryBuilderHelper(
      this.courseModel,
      query,
    )
      .load(
        {
          association: 'course_schedule',
          where:
            start && end
              ? {
                  date_start: {
                    [Op.between]: [start, end],
                  },
                }
              : undefined,
          required: !!(start && end),
          include: [
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
        },
        'course_package',
        'instrument',
        'music_genre',
        'branch',
        {
          association: 'student',
          include: [{ association: 'user' }],
        },
      )
      .getResult();

    const result = {
      count: count,
      courses: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve courses');
  }

  async findOne(id: number) {
    try {
      const course = await this.courseModel.findOne({
        where: { id },
        include: [
          {
            association: 'course_schedule',
            include: [
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
          },
          { association: 'course_package' },
          { association: 'instrument' },
          { association: 'music_genre' },
          { association: 'branch' },
          {
            association: 'student',
            include: [{ association: 'user' }],
          },
        ],
      });
      return this.response.success(course, 200, 'Successfully retrieve course');
    } catch (error) {
      return this.response.fail('Failed retrieve course', 400);
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
