import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { CreateCourseRescheduleDto } from 'src/models/course-reschedules/dto/create-course-reschedule.dto';
import { UpdateCourseRescheduleDto } from 'src/models/course-reschedules/dto/update-course-reschedule.dto';
import { CourseReschedule } from 'src/models/course-reschedules/entities/course-reschedule.entity';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

@Injectable()
export class CourseReschedulePublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(CourseReschedule)
    private courseRescheduleModel: typeof CourseReschedule,
    @InjectModel(CourseSchedule)
    private courseScheduleModel: typeof CourseSchedule,
  ) {}

  async create(createCourseRescheduleDto: CreateCourseRescheduleDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const reschedule = await this.courseRescheduleModel.create(
        { ...createCourseRescheduleDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        reschedule,
        201,
        'Successfully create classroom',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create classroom', 400);
    }
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
