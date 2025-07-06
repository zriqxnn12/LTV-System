import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateCourseRescheduleDto } from 'src/models/course-reschedules/dto/create-course-reschedule.dto';
import { UpdateCourseRescheduleDto } from 'src/models/course-reschedules/dto/update-course-reschedule.dto';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { CourseReschedulePublicService } from './course-reschedule.service';

@Controller()
export class CourseReschedulePublicController {
  constructor(
    private readonly courseRescheduleService: CourseReschedulePublicService,
  ) {}

  @UseGuards(JwtPublicAuthGuard)
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
