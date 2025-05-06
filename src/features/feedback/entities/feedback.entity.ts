import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/features/user/entities/user.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'feedbacks',
  modelName: 'feedbacks',
})
export class Feedback extends Model {
  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  note: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_anonymous: string;
}
