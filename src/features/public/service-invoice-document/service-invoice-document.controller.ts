import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ServiceInvoiceDocumentPublicService } from './service-invoice-document.service';
import { CreateServiceInvoiceDocumentDto } from 'src/models/service-invoices/dto/create-service-invoice-document.dto';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { serviceInvoiceIdParamSchema } from 'src/validators/params/service-invoice-id.param';

@Controller()
export class ServiceInvoiceDocumentPublicController {
  constructor(
    private readonly serviceInvoiceDocumentService: ServiceInvoiceDocumentPublicService,
  ) {}

  @UseGuards(JwtPublicAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file_path'))
  create(
    @Param('invoiceId', new JoiValidationParamPipe(serviceInvoiceIdParamSchema))
    invoiceId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.serviceInvoiceDocumentService.create(+invoiceId, file);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.serviceInvoiceDocumentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceInvoiceDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceInvoiceDocumentDto: CreateServiceInvoiceDocumentDto,
  ) {
    return this.serviceInvoiceDocumentService.update(
      +id,
      updateServiceInvoiceDocumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceInvoiceDocumentService.remove(+id);
  }
}
