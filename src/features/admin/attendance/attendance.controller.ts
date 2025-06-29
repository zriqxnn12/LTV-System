import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from '../../../models/attendances/dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../../../models/attendances/dto/update-attendance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createAttendanceSchema } from 'src/validators/requests/create-attendance.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file_path'))
  @Post()
  create(
    @Body(new JoiValidationPipe(createAttendanceSchema))
    createAttendanceDto: CreateAttendanceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.attendanceService.create(createAttendanceDto, file);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
