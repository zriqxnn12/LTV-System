import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ServiceInvoicePublicService } from './service-invoice.service';
import { CreateServiceInvoiceDto } from 'src/models/service-invoices/dto/create-service-invoice.dto';
import { UpdateServiceInvoiceDto } from 'src/models/service-invoices/dto/update-service-invoice.dto';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { serviceInvoiceIdParamSchema } from 'src/validators/params/service-invoice-id.param';

@Controller()
export class ServiceInvoicePublicController {
  constructor(
    private readonly serviceInvoiceService: ServiceInvoicePublicService,
  ) {}

  @UseGuards(JwtPublicAuthGuard)
  @Get()
  findAll(@Query() query, @Req() req) {
    return this.serviceInvoiceService.findAll(query, req.user);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(serviceInvoiceIdParamSchema))
    id: string,
  ) {
    return this.serviceInvoiceService.findOne(+id);
  }
}
