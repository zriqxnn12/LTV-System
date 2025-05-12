import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Staff } from 'src/models/staff/entities/staff.entity';
import { getStaffRoleEnumLabel } from 'src/models/staff/enums/staff-role.enum';
import { getStaffStatusEnumLabel } from 'src/models/staff/enums/staff-status.enum';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private response: ResponseHelper,
    private sequelize: Sequelize,
    private jwtService: JwtService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Staff) private staffModel: typeof Staff,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const getUser = await this.userModel.findByPk(user.id, {
      include: [{ model: this.staffModel }],
    });
    const result = {
      getUser,
      access_token: this.jwtService.sign(payload),
    };
    return this.response.success(result, 200);
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({
        where: { [Op.or]: { email: username, username: username } },
        attributes: { include: ['password'] },
      });

      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          const result = user.toJSON();
          delete result.password;
          return result;
        }
      }

      return false;
    } catch (error) {
      return this.response.fail(error, HttpStatus.BAD_REQUEST);
    }
  }

  async validateJwt(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }

  async register(createUserDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const { staff, ...userData } = createUserDto;
      const user = await this.userModel
        .create(userData, { transaction })
        .then((value) => value.toJSON());

      if (staff) {
        await this.staffModel.create(
          {
            user_id: user.id,
            ...staff,
            note: staff.note || '-',
          },
          { transaction },
        );
      }

      const getUser = await this.userModel.findByPk(user.id, {
        include: [
          {
            model: this.staffModel,
          },
        ],
        transaction,
      });

      if (getUser?.staff) {
        getUser.staff.role_name = getStaffRoleEnumLabel(getUser.staff.role);
        getUser.staff.status_name = getStaffStatusEnumLabel(
          getUser.staff.status,
        );
      }

      delete user.password;
      await transaction.commit();
      return this.response.success(
        getUser,
        HttpStatus.OK,
        'Successfully register user',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async profile(user: User) {
    const getUser = await this.userModel.findByPk(user.id, {
      include: [{ model: this.staffModel }],
    });
    return this.response.success(
      getUser,
      HttpStatus.OK,
      'Successfully get profile',
    );
  }
}
