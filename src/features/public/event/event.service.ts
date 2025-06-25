import { Injectable } from '@nestjs/common';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { Event } from 'src/models/events/entities/event.entity';

@Injectable()
export class EventPublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Event)
    private eventModel: typeof Event,
  ) {}

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.eventModel,
      query,
    ).getResult();

    const result = {
      count: count,
      events: data,
    };
    return this.response.success(result, 200, 'Successfully retrieve events');
  }

  async findOne(id: number) {
    try {
      const event = await this.eventModel.findOne({
        where: { id },
      });

      return this.response.success(event, 200, 'Successfully retrieve event');
    } catch (error) {
      return this.response.fail('Failed to retrieve event', 400);
    }
  }
}
