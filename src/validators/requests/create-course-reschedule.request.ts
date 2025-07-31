import * as Joi from 'joi';

export const createCourseRescheduleSchema = Joi.object({
  date: Joi.date().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  note: Joi.string().required(),
}).options({ abortEarly: false });
