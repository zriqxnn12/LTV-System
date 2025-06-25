import { Injectable } from '@nestjs/common';
import { CreateEventParticipantDto } from '../../../models/event-participants/dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from '../../../models/event-participants/dto/update-event-participant.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';
import { Event } from 'src/models/events/entities/event.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { S3Helper } from 'src/cores/helpers/s3.helper';
import EventParticipantStatusEnum, {
  getEventParticipantStatusEnumLabel,
} from 'src/models/event-participants/enums/event-participant-status.enum';

@Injectable()
export class EventParticipantService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(EventParticipant)
    private eventParticipantModel: typeof EventParticipant,
  ) {}

  async create(
    createEventParticipantDto: CreateEventParticipantDto,
    eventId: string,
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      const event = await Event.findByPk(+eventId, {
        transaction: transaction,
      });
      createEventParticipantDto.total = event.fee;

      // set status based on is_paid
      if (createEventParticipantDto.is_paid) {
        createEventParticipantDto.status = EventParticipantStatusEnum.PAID;
        createEventParticipantDto.status_name =
          getEventParticipantStatusEnumLabel(EventParticipantStatusEnum.PAID);
      } else {
        createEventParticipantDto.status = EventParticipantStatusEnum.ACCEPTED;
        createEventParticipantDto.status_name =
          getEventParticipantStatusEnumLabel(
            EventParticipantStatusEnum.ACCEPTED,
          );
      }

      const paidAt = createEventParticipantDto.is_paid ? new Date() : null;
      const eventParticipant = await this.eventParticipantModel.create(
        {
          ...createEventParticipantDto,
          event_id: +eventId,
          paid_at: paidAt,
        },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        eventParticipant,
        200,
        'Successfully create event participant',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail(error, 400);
    }
  }

  async findAll(query: any, eventId: string) {
    const { count, data } = await new QueryBuilderHelper(
      this.eventParticipantModel,
      query,
    )
      .where({ event_id: +eventId })
      .load('user')
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

  async findOne(id: number, eventId: string) {
    try {
      const eventParticipant = await this.eventParticipantModel.findOne({
        where: { id: id, event_id: +eventId },
        include: ['user'],
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

  async update(
    id: number,
    updateEventParticipantDto: CreateEventParticipantDto,
    eventId: string,
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      const eventParticipant = await this.eventParticipantModel.findOne({
        where: { id: id, event_id: +eventId },
        transaction: transaction,
      });

      await eventParticipant.update(updateEventParticipantDto, {
        transaction: transaction,
      });
      await transaction.commit();
      return this.response.success(
        eventParticipant,
        200,
        'Successfully update event participant',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail(error, 400);
    }
  }

  async delete(id: number, eventId: string) {
    const transaction = await this.sequelize.transaction();
    try {
      const eventParticipant = await this.eventParticipantModel.findOne({
        where: { id: id, event_id: +eventId },
        transaction: transaction,
      });

      if (
        eventParticipant.status !== EventParticipantStatusEnum.REQUEST_TO_JOIN
      ) {
        return this.response.fail(
          'Event participant is rejected or approved',
          400,
        );
      }

      const s3Helper = new S3Helper();
      await s3Helper.deleteFile(eventParticipant.file_path);

      await eventParticipant.destroy({ transaction: transaction });
      await transaction.commit();
      return this.response.success(
        eventParticipant,
        200,
        'Successfully delete event participant',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail(error, 400);
    }
  }
}
