import { Module } from '@nestjs/common';
import { ServiceInvoiceDetailService } from './service-invoice-detail.service';
import { ServiceInvoiceDetailController } from './service-invoice-detail.controller';

@Module({
  controllers: [ServiceInvoiceDetailController],
  providers: [ServiceInvoiceDetailService],
})
export class ServiceInvoiceDetailModule {}
