import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceInvoiceDetailDto } from './create-service-invoice-detail.dto';

export class UpdateServiceInvoiceDetailDto extends PartialType(CreateServiceInvoiceDetailDto) {}
