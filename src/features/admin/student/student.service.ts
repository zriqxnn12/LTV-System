import { Injectable } from '@nestjs/common';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from 'src/models/students/entities/student.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { CreateStudentDto } from 'src/models/students/dto/create-student.dto';

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

  async update(id: number, createStudentDto: CreateStudentDto) {
    const transaction = await this.sequelize.transaction();
    try {
      // const student = await this.studentModel.findByPk(id);
      // await student.update(createStudentDto, { transaction });
      const student = await this.studentModel.findOne({
        where: { id },
        include: [{ association: 'user' }],
        transaction,
      });

      await student.update(
        {
          gender: createStudentDto.gender,
          religion: createStudentDto.religion,
          school: createStudentDto.school,
          province: createStudentDto.province,
          city: createStudentDto.city,
          whatsapp_number: createStudentDto.whatsapp_number,
          note: createStudentDto.note,
        },
        { transaction },
      );

      if (createStudentDto.user && student.user) {
        const { phone_no, address, birth_place, birth_date } =
          createStudentDto.user;
        await student.user.update(
          { phone_no, address, birth_place, birth_date },
          { transaction },
        );
      }
      await transaction.commit();
      return this.response.success(student, 200, 'Successfully update student');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update student', 400);
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const student = await this.studentModel.findOne({
        where: { id },
        include: [{ association: 'user' }],
        transaction,
      });

      await student.destroy({ transaction });
      if (student.user) {
        await student.user.destroy({ transaction });
      }

      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete student');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete student', 400);
    }
  }
}
