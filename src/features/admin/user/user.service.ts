import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { User } from './entities/user.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userModel.create({
        ...createUserDto,
      });
      await transaction.commit();
      console.log('data', user);
      return this.response.success(user, 201, 'Successfully create user');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create user', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.userModel,
      query,
    ).getResult();

    const result = {
      count: count,
      users: data,
    };

    return this.response.success(result, 200, 'Successfully retrieve users');
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findOne({
        where: { id },
      });

      return this.response.success(user, 200, 'Successfully retrieve users');
    } catch (error) {
      return this.response.fail('Failed retrieve users', 400);
    }
  }

  async update(id: number, createUserDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userModel.findByPk(id);
      await user.update(createUserDto, { transaction });
      await transaction.commit();
      return this.response.success(user, 200, 'Successfully update users');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update user', 400);
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.userModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete users');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed delete users', 400);
    }
  }
}
