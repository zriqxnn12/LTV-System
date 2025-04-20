import * as Joi from 'joi';

export const createBranchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
}).options({ abortEarly: false });
