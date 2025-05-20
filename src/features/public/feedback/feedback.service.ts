import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { CreateFeedbackDto } from 'src/models/feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from 'src/models/feedbacks/dto/update-feedback.dto';
import { Feedback } from 'src/models/feedbacks/entities/feedback.entity';

@Injectable()
export class FeedbackPublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Feedback)
    private feedbackModel: typeof Feedback,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, user: any) {
    const transaction = await this.sequelize.transaction();
    try {
      const feedback = await this.feedbackModel.create(
        {
          ...createFeedbackDto,
          user_id: user.id,
        },
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
      return this.response.fail('Failed to create feedback', 400);
    }
  }

  findAll() {
    return `This action returns all feedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
