import * as Joi from 'joi';
import { Course } from 'src/models/courses/entities/course.entity';

export const courseIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const course = await Course.findOne({
      where: { id: value },
    });
    if (!course) {
      throw new Joi.ValidationError(
        'any.invalid-course-id',
        [
          {
            message: 'course not found',
            path: ['id'],
            type: 'any.invalid-course-id',
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
