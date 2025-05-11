import * as Joi from 'joi';

export const createFeedbackSchema = Joi.object({
  name: Joi.string().required(),
  note: Joi.string().required(),
  is_anonymous: Joi.string().optional(),
}).options({ abortEarly: false });
