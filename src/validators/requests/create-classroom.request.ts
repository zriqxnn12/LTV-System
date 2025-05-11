import * as Joi from 'joi';

export const createClassroomSchema = Joi.object({
  branch_id: Joi.number().required(),
  room: Joi.string().required(),
  location: Joi.string().required(),
}).options({ abortEarly: false });
