import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from '../../../models/attendances/dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../../../models/attendances/dto/update-attendance.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from 'src/models/attendances/entities/attendance.entity';
import { S3Helper } from 'src/cores/helpers/s3.helper';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Attendance)
    private attendanceModel: typeof Attendance,
  ) {}

  async create(
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
          file_path: uploadImage.key,
        },
        { transaction },
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

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
