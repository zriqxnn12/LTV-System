import { Module } from '@nestjs/common';
import { ServiceInvoiceDocumentPublicService } from './service-invoice-document.service';
import { ServiceInvoiceDocumentPublicController } from './service-invoice-document.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceInvoiceDocument } from 'src/models/service-invoices/entities/service-invoice-document.entity';

@Module({
  imports: [SequelizeModule.forFeature([ServiceInvoiceDocument])],
  controllers: [ServiceInvoiceDocumentPublicController],
  providers: [ServiceInvoiceDocumentPublicService],
})
export class ServiceInvoiceDocumentPublicModule {}
