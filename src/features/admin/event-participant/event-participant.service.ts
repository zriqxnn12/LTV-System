import { Injectable } from '@nestjs/common';
import { CreateEventParticipantDto } from '../../../models/event-participants/dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from '../../../models/event-participants/dto/update-event-participant.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';
import { Event } from 'src/models/events/entities/event.entity';

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

  findAll() {
    return `This action returns all eventParticipant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventParticipant`;
  }

  update(id: number, updateEventParticipantDto: UpdateEventParticipantDto) {
    return `This action updates a #${id} eventParticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventParticipant`;
  }
}
