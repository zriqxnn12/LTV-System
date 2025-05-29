import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ServiceInvoice } from './service-invoice.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'service_invoice_documents',
  modelName: 'service_invoice_documents',
})
export class ServiceInvoiceDocument extends Model {
  @ForeignKey(() => ServiceInvoice)
  @Column(DataType.BIGINT)
  service_invoice_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  file_path: string;

  @BelongsTo(() => ServiceInvoice)
  service_invoice: ServiceInvoice;
}
