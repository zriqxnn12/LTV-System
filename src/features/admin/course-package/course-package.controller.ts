import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { CoursePackageService } from './course-package.service';
import { CreateCoursePackageDto } from '../../../models/course-packages/dto/create-course-package.dto';
import { UpdateCoursePackageDto } from '../../../models/course-packages/dto/update-course-package.dto';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createCoursePackageSchema } from 'src/validators/requests/create-course-package.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { coursePackageIdParamSchema } from 'src/validators/params/course-package-id.param';

@Controller()
export class CoursePackageController {
  constructor(private readonly coursePackageService: CoursePackageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new JoiValidationPipe(createCoursePackageSchema))
    createCoursePackageDto: CreateCoursePackageDto,
  ) {
    return this.coursePackageService.create(createCoursePackageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.coursePackageService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(coursePackageIdParamSchema))
    id: string,
  ) {
    return this.coursePackageService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(coursePackageIdParamSchema))
    id: string,
    @Body(new JoiValidationPipe(createCoursePackageSchema))
    updateCoursePackageDto: UpdateCoursePackageDto,
  ) {
    return this.coursePackageService.update(+id, updateCoursePackageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(coursePackageIdParamSchema))
    id: string,
  ) {
    return this.coursePackageService.delete(+id);
  }
}
