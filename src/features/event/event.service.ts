import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class EventService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Event)
    private eventModel: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const event = await this.eventModel.create(
        { ...createEventDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(event, 201, 'Successfully create event');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to create event', 400);
    }
  }

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

  async update(id: number, updateEventDto: UpdateEventDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const event = await this.eventModel.findByPk(id);
      await event.update(updateEventDto, { transaction });
      await transaction.commit();
      return this.response.success(event, 200, 'Successfully update event');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update event', 400);
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.eventModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete event');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete event', 400);
    }
  }
}
