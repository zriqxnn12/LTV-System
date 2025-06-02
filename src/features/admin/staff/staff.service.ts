import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../../../models/staff/dto/create-staff.dto';
import { UpdateStaffDto } from '../../../models/staff/dto/update-staff.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from 'src/models/staff/entities/staff.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class StaffService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Staff)
    private staffModel: typeof Staff,
  ) {}

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(this.staffModel, query)
      .load('user', 'teacher')
      .getResult();

    const result = {
      count: count,
      staffs: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve staffs');
  }

  async findOne(id: number) {
    try {
      const staff = await this.staffModel.findOne({
        where: { id },
        include: [
          {
            association: 'user',
          },
          {
            association: 'teacher',
          },
        ],
      });

      return this.response.success(staff, 200, 'Successfully retrieve staff');
    } catch (error) {
      return this.response.fail('Failed retrieve staff', 400);
    }
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
