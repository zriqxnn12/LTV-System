import * as Joi from 'joi';
import EventParticipantStatusEnum from 'src/models/event-participants/enums/event-participant-status.enum';
import { User } from 'src/models/users/entities/user.entity';

export const createEventParticipantSchema = Joi.object({
  user_id: Joi.number()
    .required()
    .external(async (value) => {
      const user = await User.findOne({
        where: { id: value },
      });
      if (!user) {
        throw new Joi.ValidationError(
          'any.user-not-found',
          [
            {
              message: 'User not found',
              path: ['user_id'],
              type: 'any.user-not-found',
              context: {
                key: 'user_id',
                label: 'user_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  status_name: Joi.number().optional(),
  status: Joi.number().valid(
    ...Object.values(EventParticipantStatusEnum).filter(
      (v) => typeof v === 'number',
    ),
  ),
  is_paid: Joi.boolean().default(true).optional(),
}).options({ abortEarly: false });
