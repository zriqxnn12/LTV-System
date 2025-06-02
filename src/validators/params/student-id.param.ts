import * as Joi from 'joi';
import { Student } from 'src/models/students/entities/student.entity';

export const studentIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const student = await Student.findOne({
      where: { id: value },
    });
    if (!student) {
      throw new Joi.ValidationError(
        'any.invalid-student-id',
        [
          {
            message: 'student not found',
            path: ['id'],
            type: 'any.invalid-student-id',
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
