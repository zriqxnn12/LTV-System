import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../../../models/students/dto/create-student.dto';
import { UpdateStudentDto } from '../../../models/students/dto/update-student.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from 'src/models/students/entities/student.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class StudentService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.studentModel,
      query,
    )
      .load('user')
      .getResult();

    const result = {
      count: count,
      students: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve students');
  }

  async findOne(id: number) {
    try {
      const student = await this.studentModel.findOne({
        where: { id },
        include: [
          {
            association: 'user',
          },
        ],
      });

      return this.response.success(
        student,
        200,
        'Successfully retrieve student',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve student', 400);
    }
  }
}
