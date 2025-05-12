import * as Joi from 'joi';
import { Classroom } from 'src/models/classrooms/entities/classroom.entity';

export const classroomIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const classroom = await Classroom.findOne({
      where: { id: value },
    });
    if (!classroom) {
      throw new Joi.ValidationError(
        'any.invalid-classroom-id',
        [
          {
            message: 'classroom not found',
            path: ['id'],
            type: 'any.invalid-classroom-id',
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
