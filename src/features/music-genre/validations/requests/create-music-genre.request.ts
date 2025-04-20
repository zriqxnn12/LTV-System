import * as Joi from 'joi';

export const createMusicGenreSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
}).options({ abortEarly: false });
