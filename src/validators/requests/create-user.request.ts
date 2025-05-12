import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone_no: Joi.string().optional(),
  address: Joi.string().required(),
  birth_place: Joi.string().optional().allow(null, ''),
  birth_date: Joi.date().optional().allow(null, ''),
  profile_file_path: Joi.string().optional().allow(null, ''),
  staff: Joi.object({
    role_name: Joi.string().required(),
    status_name: Joi.string().required(),
    role: Joi.number().required(),
    status: Joi.number().required(),
    note: Joi.string().optional(),
  }).optional(),
}).options({ abortEarly: false });
