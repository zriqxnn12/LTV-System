import * as Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  file_path: Joi.string().required(),
  address: Joi.string().required(),
  type_name: Joi.string().required(),
  date: Joi.date().required(),
  quota: Joi.number().required(),
  type: Joi.number().required(),
  fee: Joi.string().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  description: Joi.string(),
}).options({ abortEarly: false });
