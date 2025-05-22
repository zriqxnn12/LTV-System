import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Instrument } from 'src/models/instruments/entities/instrument.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'course_packages',
  modelName: 'course_packages',
})
export class CoursePackage extends Model {
  @ForeignKey(() => Instrument)
  @Column(DataType.BIGINT)
  instrument_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({
    type: DataType.DECIMAL(16, 2),
    allowNull: false,
  })
  registration_fee: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;
}
