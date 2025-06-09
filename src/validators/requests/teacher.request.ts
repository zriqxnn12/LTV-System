import * as Joi from 'joi';
import { Branch } from 'src/models/branches/entities/branch.entity';
import { Classroom } from 'src/models/classrooms/entities/classroom.entity';
import StaffRoleEnum from 'src/models/staff/enums/staff-role.enum';
import StaffStatusEnum from 'src/models/staff/enums/staff-status.enum';
import TeacherType from 'src/models/staff/enums/teacher-type.enum';

export const teacherSchema = Joi.object({
  classroom_id: Joi.number()
    .optional()
    .external(async (value) => {
      const classroom = await Classroom.findOne({
        where: { id: value },
      });
      if (!classroom) {
        throw new Joi.ValidationError(
          'any.classroom-not-found',
          [
            {
              message: 'Classroom not found',
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
  branch_id: Joi.number()
    .optional()
    .external(async (value) => {
      const branch = await Branch.findOne({
        where: { id: value },
      });
      if (!branch) {
        throw new Joi.ValidationError(
          'any.branch-not-found',
          [
            {
              message: 'Branch not found',
              path: ['branch_id'],
              type: 'any.classroom-not-found',
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
  type_name: Joi.string().optional(),
  type: Joi.number().valid(
    ...Object.values(TeacherType).filter((v) => typeof v === 'number'),
  ),
  description: Joi.string().optional().allow(null, ''),
  qualify: Joi.string().optional().allow(null, ''),
  staff: Joi.object({
    role_name: Joi.string().optional(),
    status_name: Joi.string().optional(),
    role: Joi.number()
      .valid(
        ...Object.values(StaffRoleEnum).filter((v) => typeof v === 'number'),
      )
      .required(),
    status: Joi.number()
      .valid(
        ...Object.values(StaffStatusEnum).filter((v) => typeof v === 'number'),
      )
      .required(),
    note: Joi.string().optional(),
    user: Joi.object({
      name: Joi.string().required(),
      phone_no: Joi.string().optional(),
      address: Joi.string().optional(),
      birth_place: Joi.string().optional().allow(null, ''),
      birth_date: Joi.date().optional().allow(null, ''),
    }),
  }),
}).options({ abortEarly: false });
