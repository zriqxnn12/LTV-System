import { Injectable } from '@nestjs/common';
import { CreateServiceInvoiceDetailDto } from '../../../models/service-invoice-details/dto/create-service-invoice-detail.dto';
import { UpdateServiceInvoiceDetailDto } from '../../../models/service-invoice-details/dto/update-service-invoice-detail.dto';

@Injectable()
export class ServiceInvoiceDetailService {
  create(createServiceInvoiceDetailDto: CreateServiceInvoiceDetailDto) {
    return 'This action adds a new serviceInvoiceDetail';
  }

  findAll() {
    return `This action returns all serviceInvoiceDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceInvoiceDetail`;
  }

  update(
    id: number,
    updateServiceInvoiceDetailDto: UpdateServiceInvoiceDetailDto,
  ) {
    return `This action updates a #${id} serviceInvoiceDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceInvoiceDetail`;
  }
}
