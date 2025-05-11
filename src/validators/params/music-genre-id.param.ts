import * as Joi from 'joi';
import { Genre } from '../../entities/music-genre.entity';

export const musicGenreIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const genre = await Genre.findOne({
      where: { id: value },
    });
    if (!genre) {
      throw new Joi.ValidationError(
        'any.invalid-genre-id',
        [
          {
            message: 'music genre not found',
            path: ['id'],
            type: 'any.invalid-genre-id',
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
