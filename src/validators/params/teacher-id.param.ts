import * as Joi from 'joi';
import { Teacher } from 'src/models/staff/entities/teacher.entity';

export const teacherIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const teacher = await Teacher.findOne({
      where: { id: value },
    });
    if (!teacher) {
      throw new Joi.ValidationError(
        'any.invalid-teacher-id',
        [
          {
            message: 'teacher not found',
            path: ['id'],
            type: 'any.invalid-teacher-id',
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
