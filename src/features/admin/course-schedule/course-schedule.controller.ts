import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseScheduleService } from './course-schedule.service';
import { CreateCourseScheduleDto } from '../../../models/course-schedules/dto/create-course-schedule.dto';
import { UpdateCourseScheduleDto } from '../../../models/course-schedules/dto/update-course-schedule.dto';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { courseScheduleIdParamSchema } from 'src/validators/params/course-schedule-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createCourseScheduleSchema } from 'src/validators/requests/create-course-schedule.request';

@Controller()
export class CourseScheduleController {
  constructor(private readonly courseScheduleService: CourseScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new JoiValidationPipe(createCourseScheduleSchema))
    createCourseScheduleDto: CreateCourseScheduleDto,
  ) {
    return this.courseScheduleService.create(createCourseScheduleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.courseScheduleService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(courseScheduleIdParamSchema))
    id: string,
  ) {
    return this.courseScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseScheduleDto: UpdateCourseScheduleDto,
  ) {
    return this.courseScheduleService.update(+id, updateCourseScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseScheduleService.remove(+id);
  }
}
