import { Injectable } from '@nestjs/common';
import { CreateCoursePackageDto } from '../../../models/course-packages/dto/create-course-package.dto';
import { UpdateCoursePackageDto } from '../../../models/course-packages/dto/update-course-package.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { CoursePackage } from 'src/models/course-packages/entities/course-package.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class CoursePackageService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(CoursePackage)
    private coursePackageModel: typeof CoursePackage,
  ) {}

  async create(createCoursePackageDto: CreateCoursePackageDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const coursePackage = await this.coursePackageModel.create(
        {
          ...createCoursePackageDto,
        },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        coursePackage,
        201,
        'Successfully create course package',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create course package', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.coursePackageModel,
      query,
    ).getResult();

    const result = {
      count: count,
      course_packages: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve course packages',
    );
  }

  async findOne(id: number) {
    try {
      const user = await this.coursePackageModel.findOne({
        where: { id },
      });

      return this.response.success(
        user,
        200,
        'Successfully retrieve course package',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve course package', 400);
    }
  }

  async update(id: number, updateCoursePackageDto: UpdateCoursePackageDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const coursePackage = await this.coursePackageModel.findByPk(id);
      await coursePackage.update(updateCoursePackageDto, { transaction });
      await transaction.commit();
      return this.response.success(
        coursePackage,
        200,
        'Successfully update course package',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update course package', 400);
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.coursePackageModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success(
        {},
        200,
        'Successfully delete course package',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed delete course package', 400);
    }
  }
}
