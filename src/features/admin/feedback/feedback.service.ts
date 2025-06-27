import { Injectable } from '@nestjs/common';
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

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.feedbackModel,
      query,
    )
      .load('user')
      .getResult();

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
        include: [{ association: 'user' }],
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
}
