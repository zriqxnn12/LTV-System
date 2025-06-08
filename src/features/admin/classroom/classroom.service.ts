import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from '../../../models/classrooms/dto/create-classroom.dto';
import { UpdateClassroomDto } from '../../../models/classrooms/dto/update-classroom.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Classroom } from '../../../models/classrooms/entities/classroom.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class ClassroomService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Classroom)
    private classroomModel: typeof Classroom,
  ) {}

  async create(createClassroomDto: CreateClassroomDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const classroom = await this.classroomModel.create(
        { ...createClassroomDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        classroom,
        201,
        'Successfully create classroom',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create classroom', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.classroomModel,
      query,
    )
      .load('branch')
      .getResult();

    const result = {
      count: count,
      classrooms: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve classrooms',
    );
  }

  async findOne(id: number) {
    try {
      const classroom = await this.classroomModel.findOne({
        where: { id },
        include: [{ association: 'branch' }],
      });

      return this.response.success(
        classroom,
        200,
        'Successfully retrieve classroom',
      );
    } catch (error) {
      return this.response.fail('Failed to retrieve classroom', 400);
    }
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const classroom = await this.classroomModel.findByPk(id);
      await classroom.update(updateClassroomDto, { transaction });
      await transaction.commit();
      return this.response.success(
        classroom,
        200,
        'Successfully update classroom',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update classroom', 400);
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.classroomModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete classroom');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed delete classroom', 400);
    }
  }
}
