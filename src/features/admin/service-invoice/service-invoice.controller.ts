import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ServiceInvoiceService } from './service-invoice.service';
import { CreateServiceInvoiceDto } from '../../../models/service-invoices/dto/create-service-invoice.dto';
import { UpdateServiceInvoiceDto } from '../../../models/service-invoices/dto/update-service-invoice.dto';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createServiceInvoiceSchema } from 'src/validators/requests/create-service-invoice.request';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { serviceInvoiceIdParamSchema } from 'src/validators/params/service-invoice-id.param';

@Controller()
export class ServiceInvoiceController {
  constructor(private readonly serviceInvoiceService: ServiceInvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new JoiValidationPipe(createServiceInvoiceSchema))
    createServiceInvoiceDto: CreateServiceInvoiceDto,
  ) {
    return this.serviceInvoiceService.create(createServiceInvoiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.serviceInvoiceService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(serviceInvoiceIdParamSchema))
    id: string,
  ) {
    return this.serviceInvoiceService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status/approve')
  updateStatusToApproved(
    @Param('id', new JoiValidationParamPipe(serviceInvoiceIdParamSchema))
    id: number,
  ) {
    return this.serviceInvoiceService.updateStatusToApproved(id);
  }

  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(serviceInvoiceIdParamSchema))
    id: string,
    @Body(new JoiValidationPipe(createServiceInvoiceSchema))
    updateServiceInvoiceDto: UpdateServiceInvoiceDto,
  ) {
    return this.serviceInvoiceService.update(+id, updateServiceInvoiceDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(serviceInvoiceIdParamSchema))
    id: string,
  ) {
    return this.serviceInvoiceService.delete(+id);
  }
}
