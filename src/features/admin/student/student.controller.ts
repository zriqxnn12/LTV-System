import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { studentIdParamSchema } from 'src/validators/params/student-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createStudentSchema } from 'src/validators/requests/create-student.request';
import { CreateStudentDto } from 'src/models/students/dto/create-student.dto';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.studentService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(studentIdParamSchema))
    id: number,
  ) {
    return this.studentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(studentIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createStudentSchema))
    updateStudentDto: CreateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(studentIdParamSchema))
    id: string,
  ) {
    return this.studentService.delete(+id);
  }
}
