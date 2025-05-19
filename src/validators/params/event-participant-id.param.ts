import * as Joi from 'joi';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';

export const eventParticipantIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const eventParticipant = await EventParticipant.findOne({
      where: { id: value },
    });
    if (!eventParticipant) {
      throw new Joi.ValidationError(
        'any.invalid-event-participant-id',
        [
          {
            message: 'event participant not found',
            path: ['id'],
            type: 'any.invalid-event-participant-id',
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
