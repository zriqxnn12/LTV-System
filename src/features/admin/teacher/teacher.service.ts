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
      .load(
        {
          association: 'staff',
          include: [{ association: 'user' }],
        },
        'classroom',
        'branch',
      )
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
          { association: 'classroom' },
          { association: 'branch' },
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

  async update(id: number, updateTeacherDto: CreateTeacherDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const teacher = await this.teacherModel.findOne({
        where: { id },
        include: [
          {
            association: 'staff',
            include: [{ association: 'user' }],
          },
        ],
        transaction,
      });

      // Update Teacher fields
      await teacher.update(
        {
          classroom_id: updateTeacherDto.classroom_id,
          branch_id: updateTeacherDto.branch_id,
          type: updateTeacherDto.type,
          description: updateTeacherDto.description,
          qualify: updateTeacherDto.qualify,
        },
        { transaction },
      );

      // Update Staff fields
      if (updateTeacherDto.staff && teacher.staff) {
        const { role, status, note } = updateTeacherDto.staff;

        await teacher.staff.update(
          {
            role,
            status,
            note,
          },
          { transaction },
        );

        // Update User fields
        if (updateTeacherDto.staff.user && teacher.staff.user) {
          const { phone_no, address, birth_place, birth_date } =
            updateTeacherDto.staff.user;

          await teacher.staff.user.update(
            {
              phone_no,
              address,
              birth_place,
              birth_date,
            },
            { transaction },
          );
        }
      }

      await transaction.commit();
      return this.response.success(teacher, 200, 'Successfully update teacher');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update teacher', 400);
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const teacher = await this.teacherModel.findOne({
        where: { id },
        include: [
          {
            association: 'staff',
            include: [{ association: 'user' }],
          },
        ],
      });

      await teacher.destroy({ transaction });
      if (teacher.staff.user) {
        await teacher.staff.user.destroy({ transaction });
      }

      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete teacher');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete teacher', 400);
    }
  }
}
