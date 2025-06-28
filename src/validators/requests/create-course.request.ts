import * as Joi from 'joi';
import { CoursePackage } from 'src/models/course-packages/entities/course-package.entity';
import CourseScheduleStatusEnum from 'src/models/course-schedules/enums/course-schedule-status.enum';
import { Instrument } from 'src/models/instruments/entities/instrument.entity';
import { Genre } from 'src/models/music-genres/entities/music-genre.entity';
import { Teacher } from 'src/models/staff/entities/teacher.entity';
import { Student } from 'src/models/students/entities/student.entity';

export const createCourseSchema = Joi.object({
  student_id: Joi.number()
    .required()
    .external(async (value) => {
      const student = await Student.findOne({
        where: { id: value },
      });
      if (!student) {
        throw new Joi.ValidationError(
          'any.student-not-found',
          [
            {
              message: 'student not found',
              path: ['student_id'],
              type: 'any.student-not-found',
              context: {
                key: 'student_id',
                label: 'student_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  instrument_id: Joi.number()
    .required()
    .external(async (value) => {
      const instrument = await Instrument.findOne({
        where: { id: value },
      });
      if (!instrument) {
        throw new Joi.ValidationError(
          'any.instrument-not-found',
          [
            {
              message: 'instrument not found',
              path: ['instrument_id'],
              type: 'any.instrument-not-found',
              context: {
                key: 'instrument_id',
                label: 'instrument_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  course_package_id: Joi.number()
    .required()
    .external(async (value) => {
      const coursePackage = await CoursePackage.findOne({
        where: { id: value },
      });
      if (!coursePackage) {
        throw new Joi.ValidationError(
          'any.course-package-not-found',
          [
            {
              message: 'course package not found',
              path: ['course_package_id'],
              type: 'any.course-package-not-found',
              context: {
                key: 'course_package_id',
                label: 'course_package_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  music_genre_id: Joi.number()
    .required()
    .external(async (value) => {
      const genre = await Genre.findOne({
        where: { id: value },
      });
      if (!genre) {
        throw new Joi.ValidationError(
          'any.music-genre-not-found',
          [
            {
              message: 'music genre not found',
              path: ['music_genre_id'],
              type: 'any.music-genre-not-found',
              context: {
                key: 'music_genre_id',
                label: 'music_genre_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  branch_id: Joi.number()
    .required()
    .external(async (value) => {
      const genre = await Genre.findOne({
        where: { id: value },
      });
      if (!genre) {
        throw new Joi.ValidationError(
          'any.branch-not-found',
          [
            {
              message: 'branch not found',
              path: ['branch_id'],
              type: 'any.branch-not-found',
              context: {
                key: 'branch_id',
                label: 'branch_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  is_active: Joi.boolean().default(true).optional(),
  description: Joi.string().optional(),
  // course schedule
  course_schedule: Joi.array().items(
    Joi.object({
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
      date: Joi.date().required(),
      day: Joi.number().required(),
      duration: Joi.number().required(),
      start_time: Joi.string().required(),
      end_time: Joi.string().required(),
    }),
  ),
}).options({ abortEarly: false });
