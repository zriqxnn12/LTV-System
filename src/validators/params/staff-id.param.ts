import * as Joi from 'joi';
import { Staff } from 'src/models/staff/entities/staff.entity';

export const staffIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const staff = await Staff.findOne({
      where: { id: value },
    });
    if (!staff) {
      throw new Joi.ValidationError(
        'any.invalid-staff-id',
        [
          {
            message: 'staff not found',
            path: ['id'],
            type: 'any.invalid-staff-id',
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
