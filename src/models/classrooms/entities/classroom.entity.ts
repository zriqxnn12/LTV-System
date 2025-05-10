import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Branch } from '../../branches/entities/branch.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'classrooms',
  modelName: 'classrooms',
})
export class Classroom extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  room: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @ForeignKey(() => Branch)
  @Column(DataType.NUMBER)
  branch_id: number;

  @BelongsTo(() => Branch)
  branch: Branch;
}
