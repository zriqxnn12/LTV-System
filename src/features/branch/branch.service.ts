import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from './entities/branch.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class BranchService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Branch)
    private branchModel: typeof Branch,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const branch = await this.branchModel.create(
        { ...createBranchDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(branch, 201, 'Successfully create branch');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create branch', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.branchModel,
      query,
    ).getResult();

    const result = {
      count: count,
      branches: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve branches');
  }

  async findOne(id: number) {
    try {
      const branch = await this.branchModel.findOne({
        where: { id },
      });

      return this.response.success(branch, 200, 'Successfully retrieve branch');
    } catch (error) {
      return this.response.fail('Failed to retrieve branch', 400);
    }
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const branch = await this.branchModel.findByPk(id);
      await branch.update(updateBranchDto, { transaction });
      await transaction.commit();
      return this.response.success(branch, 200, 'Successfully update branches');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update branches', 400);
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.branchModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete branches');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed delete branches', 400);
    }
  }
}
