import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceInvoiceDetailService } from './service-invoice-detail.service';
import { CreateServiceInvoiceDetailDto } from '../../../models/service-invoice-details/dto/create-service-invoice-detail.dto';
import { UpdateServiceInvoiceDetailDto } from '../../../models/service-invoice-details/dto/update-service-invoice-detail.dto';

@Controller('service-invoice-detail')
export class ServiceInvoiceDetailController {
  constructor(
    private readonly serviceInvoiceDetailService: ServiceInvoiceDetailService,
  ) {}

  @Post()
  create(@Body() createServiceInvoiceDetailDto: CreateServiceInvoiceDetailDto) {
    return this.serviceInvoiceDetailService.create(
      createServiceInvoiceDetailDto,
    );
  }

  @Get()
  findAll() {
    return this.serviceInvoiceDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceInvoiceDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceInvoiceDetailDto: UpdateServiceInvoiceDetailDto,
  ) {
    return this.serviceInvoiceDetailService.update(
      +id,
      updateServiceInvoiceDetailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceInvoiceDetailService.remove(+id);
  }
}
