import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ResizeOption } from 'src/cores/helpers/sharp.helper';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'events',
  modelName: 'events',
})
export class Event extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  file_path: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type_name: string;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quota: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  type: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  fee: string;

  @Column({ type: DataType.TIME, allowNull: false })
  start_time: string;

  @Column({ type: DataType.TIME, allowNull: false })
  end_time: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  static imageDimension: { eventImg: ResizeOption } = {
    eventImg: {
      dimensions: [
        {
          width: 500,
          fit: 'inside',
          prefix: '500',
        },
        {
          width: 1200,
          fit: 'inside',
          prefix: '1200',
        },
      ],
      path: 'event/images',
    },
  };
}
