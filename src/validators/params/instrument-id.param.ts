import * as Joi from 'joi';
import { Instrument } from '../../../../../models/instruments/entities/instrument.entity';

export const instrumentIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const instrument = await Instrument.findOne({
      where: { id: value },
    });
    if (!instrument) {
      throw new Joi.ValidationError(
        'any.invalid-instrument-id',
        [
          {
            message: 'instrument not found',
            path: ['id'],
            type: 'any.invalid-instrument-id',
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
