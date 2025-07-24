import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';

@Injectable()
export class ParticipantPublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(EventParticipant)
    private eventParticipantModel: typeof EventParticipant,
  ) {}

  async findAll(query: any, userId: number) {
    const { count, data } = await new QueryBuilderHelper(
      this.eventParticipantModel,
      query,
    )
      .where({ user_id: userId })
      .load('user', 'event')
      .getResult();

    const result = {
      count: count,
      event_participants: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve event participants',
    );
  }

  async findOne(id: number) {
    try {
      const eventParticipant = await this.eventParticipantModel.findOne({
        where: { id: id },
        include: ['user', 'event'],
      });
      return this.response.success(
        eventParticipant,
        200,
        'Successfully retrieve event participant',
      );
    } catch (error) {
      return this.response.fail(error, 400);
    }
  }
}
