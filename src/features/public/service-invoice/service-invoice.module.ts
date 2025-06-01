import { Module } from '@nestjs/common';
import { ServiceInvoicePublicService } from './service-invoice.service';
import { ServiceInvoicePublicController } from './service-invoice.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';

@Module({
  imports: [SequelizeModule.forFeature([ServiceInvoice])],
  controllers: [ServiceInvoicePublicController],
  providers: [ServiceInvoicePublicService],
})
export class ServiceInvoicePublicModule {}
