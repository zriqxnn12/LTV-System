import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { S3Helper } from 'src/cores/helpers/s3.helper';
import { CreateAttendanceDto } from 'src/models/attendances/dto/create-attendance.dto';
import { UpdateAttendanceDto } from 'src/models/attendances/dto/update-attendance.dto';
import { Attendance } from 'src/models/attendances/entities/attendance.entity';
import AttendanceStatusEnum from 'src/models/attendances/enums/attendance-status.enum';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import CourseScheduleStatusEnum from 'src/models/course-schedules/enums/course-schedule-status.enum';

@Injectable()
export class AttendancePublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Attendance)
    private attendanceModel: typeof Attendance,
    @InjectModel(CourseSchedule)
    private courseScheduleModel: typeof CourseSchedule,
  ) {}

  async create(
    courseScheduleId: number,
    createAttendanceDto: CreateAttendanceDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      return this.response.fail('image is required', 400);
    }
    const transaction = await this.sequelize.transaction();
    try {
      const s3Helper = new S3Helper();
      const uploadImage = await s3Helper.uploadFile(
        file,
        'attendance/image',
        'public-read',
      );

      if (!uploadImage?.key) {
        return this.response.fail('File upload failed', 400);
      }

      const attendance = await this.attendanceModel.create(
        {
          ...createAttendanceDto,
          course_schedule_id: courseScheduleId,
          file_path: uploadImage.key,
        },
        { transaction },
      );

      const statusNum = +createAttendanceDto.status;
      // Tentukan status course schedule berdasarkan status attendance
      let courseScheduleStatusToUpdate = CourseScheduleStatusEnum.COMPLETED;

      if (statusNum === AttendanceStatusEnum.ALPHA) {
        courseScheduleStatusToUpdate = CourseScheduleStatusEnum.ABSENT;
      }

      await this.courseScheduleModel.update(
        { status: courseScheduleStatusToUpdate },
        {
          where: { id: courseScheduleId },
          transaction,
        },
      );

      await transaction.commit();
      return this.response.success(
        attendance,
        201,
        'Successfully create attendance',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create attendance', 400);
    }
  }
}
