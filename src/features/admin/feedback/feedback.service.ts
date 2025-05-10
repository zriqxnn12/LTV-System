import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from '../../../models/feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../../../models/feedbacks/dto/update-feedback.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback } from '../../../models/feedbacks/entities/feedback.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Feedback)
    private feedbackModel: typeof Feedback,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const feedback = await this.feedbackModel.create(
        { ...createFeedbackDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        feedback,
        201,
        'Successfully create feedback',
      );
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating feedback:', error);
      return this.response.fail('Failed to create feedback', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.feedbackModel,
      query,
    ).getResult();

    const result = {
      count: count,
      feedbacks: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve feedback');
  }

  async findOne(id: number) {
    try {
      const feedback = await this.feedbackModel.findOne({
        where: { id },
      });

      return this.response.success(
        feedback,
        200,
        'Successfully retrieve feedback',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve feedback', 400);
    }
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const feedback = await this.feedbackModel.findByPk(id);
      await feedback.update(updateFeedbackDto, { transaction });
      await transaction.commit();
      return this.response.success(
        feedback,
        200,
        'Successfully update feedback',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update feedback', 400);
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.feedbackModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete feedback');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete feedback', 400);
    }
  }
}
