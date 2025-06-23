import * as Joi from 'joi';
import EventTypeEnum from 'src/models/events/enums/event-type.enum';

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  file_path: Joi.string().required(),
  address: Joi.string().required(),
  type_name: Joi.string().optional(),
  date: Joi.date().required(),
  quota: Joi.number().required(),
  type: Joi.number().valid(
    ...Object.values(EventTypeEnum).filter((v) => typeof v === 'number'),
  ),
  fee: Joi.string().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  description: Joi.string(),
}).options({ abortEarly: false });
