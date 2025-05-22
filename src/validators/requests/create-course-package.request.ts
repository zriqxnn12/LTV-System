import * as Joi from 'joi';

export const createCoursePackageSchema = Joi.object({
  instrument_id: Joi.number().required(),
  name: Joi.string().required(),
  registration_fee: Joi.number().required(),
  duration: Joi.number().required(),
  description: Joi.string().optional(),
}).options({ abortEarly: false });
