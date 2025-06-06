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
  Put,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from '../../../models/teachers/dto/create-teacher.dto';
import { UpdateTeacherDto } from '../../../models/teachers/dto/update-teacher.dto';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { teacherIdParamSchema } from 'src/validators/params/teacher-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { teacherSchema } from 'src/validators/requests/teacher.request';

@Controller()
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.teacherService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(teacherIdParamSchema))
    id: string,
  ) {
    return this.teacherService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(teacherIdParamSchema))
    id: string,
    @Body(new JoiValidationPipe(teacherSchema))
    updateTeacherDto: CreateTeacherDto,
  ) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(teacherIdParamSchema))
    id: string,
  ) {
    return this.teacherService.delete(+id);
  }
}
