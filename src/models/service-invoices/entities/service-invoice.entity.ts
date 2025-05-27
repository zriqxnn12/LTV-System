import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ServiceInvoiceDetail } from 'src/models/service-invoice-details/entities/service-invoice-detail.entity';
import { User } from 'src/models/users/entities/user.entity';
import { getServiceInvoiceStatusEnumLabel } from '../enums/service-invoice-status.enum';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'service_invoices',
  modelName: 'service_invoices',
})
export class ServiceInvoice extends Model {
  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  invoice_no: string;

  @Column({
    type: DataType.VIRTUAL,
    get(this: ServiceInvoice) {
      return getServiceInvoiceStatusEnumLabel(this.getDataValue('status'));
    },
  })
  status_name: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  status: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date: string;

  @Column({ type: DataType.DATE, allowNull: false })
  due_date: string;

  @Column({ type: DataType.DECIMAL(16, 2), allowNull: false, defaultValue: 0 })
  grand_total: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ServiceInvoiceDetail)
  service_invoice_details: ServiceInvoiceDetail[];
}
