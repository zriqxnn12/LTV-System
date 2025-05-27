import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceInvoiceDto } from './create-service-invoice.dto';

export class UpdateServiceInvoiceDto extends PartialType(CreateServiceInvoiceDto) {}
