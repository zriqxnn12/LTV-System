import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'students',
  modelName: 'students',
})
export class Student extends Model {
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  user_id: number;

  @Column(DataType.STRING)
  gender: string;

  @Column(DataType.STRING)
  religion: string;

  @Column(DataType.STRING)
  school: string;

  @Column(DataType.STRING)
  province: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  whatsapp_number: string;

  @Column(DataType.STRING)
  note: string;

  @BelongsTo(() => User)
  user: User;
}
