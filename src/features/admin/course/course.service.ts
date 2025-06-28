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
        await this.courseScheduleModel.create(
          {
            ...schedule,
            course_id: course.id,
            status: defaultStatus,
            status_name: defaultStatusName,
            date_start: dateStart,
            date_end: dateEnd,
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
    const { count, data } = await new QueryBuilderHelper(
      this.courseModel,
      query,
    )
      .load(
        'course_package',
        'instrument',
        'music_genre',
        'branch',
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
          ],
        },
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
