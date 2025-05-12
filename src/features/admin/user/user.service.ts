import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { User } from 'src/models/users/entities/user.entity';
import { S3Helper } from 'src/cores/helpers/s3.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(this.userModel, query)
      .load('staff')
      .getResult();

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
        include: [{ association: 'staff' }],
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

  async updateProfilePicture(id: number, file: Express.Multer.File) {
    if (!file) {
      return this.response.fail('Picture required', 422);
    }
    const user = await User.findByPk(id);
    const s3Helper = new S3Helper();

    if (user.profile_file_path) {
      await s3Helper.deleteFile(user.profile_file_path);
    }

    const upload = await s3Helper.uploadFile(
      file,
      'profile/image',
      'public-read',
    );

    await user.update({
      profile_file_path: upload.key,
    });

    return this.response.success(user, 200, 'Successfully update profile');
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
