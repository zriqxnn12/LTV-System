import * as Joi from 'joi';
import { User } from '../../entities/user.entity';

export const userIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const user = await User.findOne({
      where: { id: value },
    });
    if (!user) {
      throw new Joi.ValidationError(
        'any.invalid-user-id',
        [
          {
            message: 'user not found',
            path: ['id'],
            type: 'any.invalid-user-id',
            context: {
              key: 'id',
              label: 'id',
              value,
            },
          },
        ],
        value,
      );
    }
  });
