import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from '../../../models/teachers/dto/create-teacher.dto';
import { UpdateTeacherDto } from '../../../models/teachers/dto/update-teacher.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from 'src/models/staff/entities/teacher.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class TeacherService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Teacher)
    private teacherModel: typeof Teacher,
  ) {}

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.teacherModel,
      query,
    )
      .load({
        association: 'staff',
        include: [{ association: 'user' }],
      })
      .getResult();

    const result = {
      count: count,
      teachers: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve teachers');
  }

  async findOne(id: number) {
    try {
      const teacher = await this.teacherModel.findOne({
        where: { id },
        include: [
          {
            association: 'staff',
            include: [
              {
                association: 'user',
              },
            ],
          },
        ],
      });

      return this.response.success(
        teacher,
        200,
        'Successfully retrieve teacher',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve teacher', 400);
    }
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.teacherModel.destroy({
        where: { id: id },
        transaction,
      });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete teacher');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete music genre', 400);
    }
  }
}
