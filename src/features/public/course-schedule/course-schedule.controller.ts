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
  Req,
} from '@nestjs/common';
import { CourseSchedulePublicService } from './course-schedule.service';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';

@Controller()
export class CourseSchedulePublicController {
  constructor(
    private readonly courseScheduleService: CourseSchedulePublicService,
  ) {}

  @UseGuards(JwtPublicAuthGuard)
  @Get()
  findAll(@Query() query, @Req() req) {
    return this.courseScheduleService.findAll(query, req.user);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseScheduleService.findOne(+id);
  }
}
