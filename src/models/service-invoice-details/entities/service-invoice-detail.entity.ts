import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'service_invoice_details',
  modelName: 'service_invoice_details',
})
export class ServiceInvoiceDetail extends Model {
  @ForeignKey(() => ServiceInvoice)
  @Column(DataType.BIGINT)
  service_invoice_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  item: string;

  @Column({ type: DataType.DECIMAL(16, 2), allowNull: false })
  price: string;

  @BelongsTo(() => ServiceInvoice)
  service_invoice: ServiceInvoice;
}
