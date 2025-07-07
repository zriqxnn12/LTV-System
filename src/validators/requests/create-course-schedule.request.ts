import * as Joi from 'joi';
import { Classroom } from 'src/models/classrooms/entities/classroom.entity';
import CourseScheduleStatusEnum from 'src/models/course-schedules/enums/course-schedule-status.enum';
import { Course } from 'src/models/courses/entities/course.entity';
import { Teacher } from 'src/models/staff/entities/teacher.entity';

export const createCourseScheduleSchema = Joi.object({
  course_id: Joi.number()
    .required()
    .external(async (value) => {
      const course = await Course.findOne({
        where: { id: value },
      });
      if (!course) {
        throw new Joi.ValidationError(
          'any.course-not-found',
          [
            {
              message: 'course not found',
              path: ['course_id'],
              type: 'any.course-not-found',
              context: {
                key: 'course_id',
                label: 'course_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  teacher_id: Joi.number()
    .required()
    .external(async (value) => {
      const teacher = await Teacher.findOne({
        where: { id: value },
      });
      if (!teacher) {
        throw new Joi.ValidationError(
          'any.teacher-not-found',
          [
            {
              message: 'teacher not found',
              path: ['teacher_id'],
              type: 'any.teacher-not-found',
              context: {
                key: 'teacher_id',
                label: 'teacher_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  classroom_id: Joi.number()
    .required()
    .external(async (value) => {
      const classroom = await Classroom.findOne({
        where: { id: value },
      });
      if (!classroom) {
        throw new Joi.ValidationError(
          'any.classroom-not-found',
          [
            {
              message: 'classroom not found',
              path: ['classroom_id'],
              type: 'any.classroom-not-found',
              context: {
                key: 'classroom_id',
                label: 'classroom_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  // status_name: Joi.string().optional(),
  // status: Joi.number().valid(
  //   ...Object.values(CourseScheduleStatusEnum).filter(
  //     (v) => typeof v === 'number',
  //   ),
  // ),
  date: Joi.date().required(),
  duration: Joi.number().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
}).options({ abortEarly: false });
