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
} from '@nestjs/common';
import { ServiceInvoiceDocumentPublicService } from './service-invoice-document.service';
import { CreateServiceInvoiceDocumentDto } from 'src/models/service-invoices/dto/create-service-invoice-document.dto';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createServiceInvoiceDocumentSchema } from 'src/validators/requests/create-invoice-document.request';

@Controller()
export class ServiceInvoiceDocumentPublicController {
  constructor(
    private readonly serviceInvoiceDocumentService: ServiceInvoiceDocumentPublicService,
  ) {}

  @UseGuards(JwtPublicAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file_path'))
  create(
    @Body(new JoiValidationPipe(createServiceInvoiceDocumentSchema))
    createServiceInvoiceDocumentDto: CreateServiceInvoiceDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.serviceInvoiceDocumentService.create(
      createServiceInvoiceDocumentDto,
      file,
    );
  }

  @Get()
  findAll() {
    return this.serviceInvoiceDocumentService.findAll();
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
