import { Module } from '@nestjs/common';
import { CoursePackageService } from './course-package.service';
import { CoursePackageController } from './course-package.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursePackage } from 'src/models/course-packages/entities/course-package.entity';

@Module({
  imports: [SequelizeModule.forFeature([CoursePackage])],
  controllers: [CoursePackageController],
  providers: [CoursePackageService],
})
export class CoursePackageModule {}
