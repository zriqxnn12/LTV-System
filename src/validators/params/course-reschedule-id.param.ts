import * as Joi from 'joi';
import { CourseReschedule } from 'src/models/course-reschedules/entities/course-reschedule.entity';

export const courseRescheduleIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const course = await CourseReschedule.findOne({
      where: { id: value },
    });
    if (!course) {
      throw new Joi.ValidationError(
        'any.invalid-course-reschedule-id',
        [
          {
            message: 'course reschedule not found',
            path: ['id'],
            type: 'any.invalid-course-reschedule-id',
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
