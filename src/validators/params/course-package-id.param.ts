import * as Joi from 'joi';
import { CoursePackage } from 'src/models/course-packages/entities/course-package.entity';

export const coursePackageIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const coursePackage = await CoursePackage.findOne({
      where: { id: value },
    });
    if (!coursePackage) {
      throw new Joi.ValidationError(
        'any.invalid-course-package-id',
        [
          {
            message: 'course package not found',
            path: ['id'],
            type: 'any.invalid-course-package-id',
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
