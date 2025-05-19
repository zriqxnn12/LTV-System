import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Event } from 'src/models/events/entities/event.entity';
import { User } from 'src/models/users/entities/user.entity';
import { getEventParticipantStatusEnumLabel } from '../enums/event-participant-status.enum';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'event_participants',
  modelName: 'event_participants',
})
export class EventParticipant extends Model {
  @ForeignKey(() => Event)
  @Column(DataType.BIGINT)
  event_id: number;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  user_id: number;

  @Column({
    type: DataType.VIRTUAL,
    get(this: EventParticipant) {
      return getEventParticipantStatusEnumLabel(this.getDataValue('status'));
    },
  })
  status_name: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
  })
  status: number;

  @Column({
    type: DataType.DECIMAL(16, 2),
    allowNull: false,
  })
  total: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  is_paid: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  paid_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  file_path: string;

  @BelongsTo(() => Event)
  event: Event;

  @BelongsTo(() => User)
  user: User;
}
