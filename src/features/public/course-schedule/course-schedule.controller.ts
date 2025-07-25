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
  Put,
} from '@nestjs/common';
import { CourseSchedulePublicService } from './course-schedule.service';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { courseScheduleIdParamSchema } from 'src/validators/params/course-schedule-id.param';

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

  @UseGuards(JwtPublicAuthGuard)
  @Put(':id/onProgress')
  updateStatusToOnProgress(
    @Param('id', new JoiValidationParamPipe(courseScheduleIdParamSchema))
    id: number,
  ) {
    return this.courseScheduleService.generateToOnProgress(id);
  }
}
