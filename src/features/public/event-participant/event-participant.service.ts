import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { S3Helper } from 'src/cores/helpers/s3.helper';
import { CreateEventParticipantDto } from 'src/models/event-participants/dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from 'src/models/event-participants/dto/update-event-participant.dto';
import { EventParticipant } from 'src/models/event-participants/entities/event-participant.entity';
import EventParticipantStatusEnum from 'src/models/event-participants/enums/event-participant-status.enum';
import { Event } from 'src/models/events/entities/event.entity';
import { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class EventParticipantPublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(EventParticipant)
    private eventParticipantModel: typeof EventParticipant,
  ) {}

  async create(eventId: string, user: User) {
    const transaction = await this.sequelize.transaction();
    try {
      const event = await Event.findByPk(+eventId, {
        transaction: transaction,
      });
      let total = event.fee;
      const eventParticipant = await this.eventParticipantModel.create(
        {
          user_id: user.id,
          event_id: +eventId,
          status: EventParticipantStatusEnum.REQUEST_TO_JOIN,
          total: total,
        },
        {
          transaction: transaction,
        },
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

  async updateImage(id: number, file: Express.Multer.File, eventId: string) {
    const transaction = await this.sequelize.transaction();
    try {
      const eventParticipant = await this.eventParticipantModel.findOne({
        where: { id: id, event_id: +eventId },
        transaction,
      });

      const s3Helper = new S3Helper();
      if (eventParticipant.file_path) {
        await s3Helper.deleteFile(eventParticipant.file_path);
      }

      const uploadedImage = await s3Helper.uploadFile(
        file,
        'events-participants/images',
        'public-read',
      );

      await eventParticipant.update(
        {
          file_path: uploadedImage.Key,
          status: EventParticipantStatusEnum.PAYMENT_REVIEW,
        },
        { transaction: transaction },
      );

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
