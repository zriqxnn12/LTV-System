import * as Joi from 'joi';
import { Event } from '../../../../../models/events/entities/event.entity';

export const eventIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const event = await Event.findOne({
      where: { id: value },
    });
    if (!event) {
      throw new Joi.ValidationError(
        'any.invalid-event-id',
        [
          {
            message: 'event not found',
            path: ['id'],
            type: 'any.invalid-event-id',
            context: {
              key: 'id',
              label: 'id',
              value,
            },
          },
        ],
        value,
      );
    }
  });
