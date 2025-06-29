import * as Joi from 'joi';
import AttendanceStatusEnum from 'src/models/attendances/enums/attendance-status.enum';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

export const createAttendanceSchema = Joi.object({
  course_schedule_id: Joi.number()
    .required()
    .external(async (value) => {
      const course = await CourseSchedule.findOne({
        where: { id: value },
      });
      if (!course) {
        throw new Joi.ValidationError(
          'any.course-schedule-not-found',
          [
            {
              message: 'course schedule not found',
              path: ['course_schedule_id'],
              type: 'any.course-schedule-not-found',
              context: {
                key: 'course_schedule_id',
                label: 'course_schedule_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  status_name: Joi.string().optional(),
  status: Joi.number().valid(
    ...Object.values(AttendanceStatusEnum).filter((v) => typeof v === 'number'),
  ),
  file_path: Joi.string().required(),
  note: Joi.string().required(),
}).options({ abortEarly: false });
