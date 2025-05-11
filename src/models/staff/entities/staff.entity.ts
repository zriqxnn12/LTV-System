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
  tableName: 'staff',
  modelName: 'staff',
})
export class Staff extends Model {
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  user_id: number;

  @Column(DataType.STRING)
  role_name: string;

  @Column(DataType.STRING)
  status_name: string;

  @Column(DataType.TINYINT)
  role: number;

  @Column(DataType.TINYINT)
  status: number;

  @Column(DataType.STRING)
  note: string;

  @BelongsTo(() => User)
  user: User;
}
