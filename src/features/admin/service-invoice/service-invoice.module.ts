import { Module } from '@nestjs/common';
import { ServiceInvoiceService } from './service-invoice.service';
import { ServiceInvoiceController } from './service-invoice.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';
import { ServiceInvoiceDetail } from 'src/models/service-invoice-details/entities/service-invoice-detail.entity';

@Module({
  imports: [SequelizeModule.forFeature([ServiceInvoice, ServiceInvoiceDetail])],
  controllers: [ServiceInvoiceController],
  providers: [ServiceInvoiceService],
})
export class ServiceInvoiceModule {}
