import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseRescheduleService } from './course-reschedule.service';
import { CreateCourseRescheduleDto } from '../../../models/course-reschedules/dto/create-course-reschedule.dto';
import { UpdateCourseRescheduleDto } from '../../../models/course-reschedules/dto/update-course-reschedule.dto';

@Controller('course-reschedule')
export class CourseRescheduleController {
  constructor(
    private readonly courseRescheduleService: CourseRescheduleService,
  ) {}

  @Post()
  create(@Body() createCourseRescheduleDto: CreateCourseRescheduleDto) {
    return this.courseRescheduleService.create(createCourseRescheduleDto);
  }

  @Get()
  findAll() {
    return this.courseRescheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseRescheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseRescheduleDto: UpdateCourseRescheduleDto,
  ) {
    return this.courseRescheduleService.update(+id, updateCourseRescheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseRescheduleService.remove(+id);
  }
}
