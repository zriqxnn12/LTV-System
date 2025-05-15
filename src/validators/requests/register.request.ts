import * as Joi from 'joi';
import StaffRoleEnum from 'src/models/staff/enums/staff-role.enum';
import StaffStatusEnum from 'src/models/staff/enums/staff-status.enum';
import TeacherType from 'src/models/staff/enums/teacher-type.enum';
import { User } from 'src/models/users/entities/user.entity';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string()
    .allow('', null)
    .external(async (value) => {
      if (value) {
        const user = await User.findOne({
          where: { username: value },
        });
        if (user) {
          throw new Joi.ValidationError(
            'any.username-exists',
            [
              {
                message: 'Username already exists',
                path: ['username'],
                type: 'any.username-exists',
                context: {
                  key: 'username',
                  label: 'username',
                  value,
                },
              },
            ],
            value,
          );
        }
      }
      return value;
    }),
  email: Joi.string()
    .required()
    .external(async (value) => {
      const user = await User.findOne({
        where: { email: value },
      });
      if (user) {
        throw new Joi.ValidationError(
          'any.email-exists',
          [
            {
              message: 'email already exists',
              path: ['email'],
              type: 'any.email-exists',
              context: {
                key: 'email',
                label: 'email',
                value,
              },
            },
          ],
          value,
        );
      }
      return value;
    }),
  password: Joi.string().min(8),
  phone_no: Joi.string().optional(),
  address: Joi.string().optional(),
  birth_place: Joi.string().optional().allow(null, ''),
  birth_date: Joi.date().optional().allow(null, ''),
  profile_file_path: Joi.string().optional().allow(null, ''),
  // staff
  staff: Joi.object({
    role_name: Joi.string().optional(),
    status_name: Joi.string().optional(),
    role: Joi.number()
      .valid(
        ...Object.values(StaffRoleEnum).filter((v) => typeof v === 'number'),
      )
      .required(),
    status: Joi.number()
      .valid(
        ...Object.values(StaffStatusEnum).filter((v) => typeof v === 'number'),
      )
      .required(),
    note: Joi.string().optional(),
    // teacher
    teacher: Joi.object({
      type_name: Joi.string().optional(),
      type: Joi.number().valid(
        ...Object.values(TeacherType).filter((v) => typeof v === 'number'),
      ),
      description: Joi.string().optional().allow(null, ''),
      qualify: Joi.string().optional().allow(null, ''),
    }).optional(),
  }).optional(),
}).options({ abortEarly: false });
