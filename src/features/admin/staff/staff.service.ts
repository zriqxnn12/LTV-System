import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../../../models/staff/dto/create-staff.dto';
import { UpdateStaffDto } from '../../../models/staff/dto/update-staff.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from 'src/models/staff/entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Staff)
    private staffModel: typeof Staff,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const staff = await this.staffModel.create(
        { ...createStaffDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(staff, 201, 'Successfully create staff');
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating staff:', error);
      return this.response.fail('Failed to create music staff', 400);
    }
  }

  findAll() {
    return `This action returns all staff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
