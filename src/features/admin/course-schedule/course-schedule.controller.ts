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

@Controller()
export class CourseScheduleController {
  constructor(private readonly courseScheduleService: CourseScheduleService) {}

  @Post()
  create(@Body() createCourseScheduleDto: CreateCourseScheduleDto) {
    return this.courseScheduleService.create(createCourseScheduleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.courseScheduleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
