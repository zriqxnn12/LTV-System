import * as Joi from 'joi';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

export const courseScheduleIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const course = await CourseSchedule.findOne({
      where: { id: value },
    });
    if (!course) {
      throw new Joi.ValidationError(
        'any.invalid-course-schedule-id',
        [
          {
            message: 'course schedule not found',
            path: ['id'],
            type: 'any.invalid-course-schedule-id',
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
