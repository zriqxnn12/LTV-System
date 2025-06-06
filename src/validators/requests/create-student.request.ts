import * as Joi from 'joi';

export const createStudentSchema = Joi.object({
  gender: Joi.string().required(),
  religion: Joi.string().optional().allow(null, ''),
  school: Joi.string().required(),
  province: Joi.string().required(),
  city: Joi.string().required(),
  whatsapp_number: Joi.string().optional().allow(null, ''),
  note: Joi.string().optional(),
  user: Joi.object({
    phone_no: Joi.string().optional(),
    address: Joi.string().optional(),
    birth_place: Joi.string().optional().allow(null, ''),
    birth_date: Joi.date().optional().allow(null, ''),
  }),
}).options({ abortEarly: false });
