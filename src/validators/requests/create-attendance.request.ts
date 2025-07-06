import * as Joi from 'joi';
import AttendanceStatusEnum from 'src/models/attendances/enums/attendance-status.enum';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

export const createAttendanceSchema = Joi.object({
  status_name: Joi.string().optional(),
  status: Joi.number().valid(
    ...Object.values(AttendanceStatusEnum).filter((v) => typeof v === 'number'),
  ),
  // file_path: Joi.string().required(),
  note: Joi.string().required(),
}).options({ abortEarly: false });
