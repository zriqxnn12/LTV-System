import * as Joi from 'joi';

export const createInstrumentSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
}).options({ abortEarly: false });
