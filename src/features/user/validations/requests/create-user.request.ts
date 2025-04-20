import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone_no: Joi.string().optional(),
  address: Joi.string().required(),
}).options({ abortEarly: false });
