import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateAttendanceDto } from 'src/models/attendances/dto/create-attendance.dto';
import { UpdateAttendanceDto } from 'src/models/attendances/dto/update-attendance.dto';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { AttendancePublicService } from './attendance.service';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createAttendanceSchema } from 'src/validators/requests/create-attendance.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { createCourseScheduleSchema } from 'src/validators/requests/create-course-schedule.request';

@Controller()
export class AttendancePublicController {
  constructor(private readonly attendanceService: AttendancePublicService) {}

  @UseGuards(JwtPublicAuthGuard)
  @UseInterceptors(FileInterceptor('file_path'))
  @Post()
  create(
    @Param('courseScheduleId')
    courseScheduleId: number,
    @Body(new JoiValidationPipe(createAttendanceSchema))
    createAttendanceDto: CreateAttendanceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.attendanceService.create(
      +courseScheduleId,
      createAttendanceDto,
      file,
    );
  }
}
