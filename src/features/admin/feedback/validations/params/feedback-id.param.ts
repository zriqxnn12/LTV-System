import * as Joi from 'joi';
import { Feedback } from '../../entities/feedback.entity';

export const feedbackIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const feedback = await Feedback.findOne({
      where: { id: value },
    });
    if (!feedback) {
      throw new Joi.ValidationError(
        'any.invalid-feedback-id',
        [
          {
            message: 'feedback not found',
            path: ['id'],
            type: 'any.invalid-feedback-id',
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
