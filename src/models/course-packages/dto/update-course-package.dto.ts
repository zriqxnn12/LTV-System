import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursePackageDto } from './create-course-package.dto';

export class UpdateCoursePackageDto extends PartialType(CreateCoursePackageDto) {}
