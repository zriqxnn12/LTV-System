import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { S3Helper } from 'src/cores/helpers/s3.helper';
import { CreateServiceInvoiceDocumentDto } from 'src/models/service-invoices/dto/create-service-invoice-document.dto';
import { ServiceInvoiceDocument } from 'src/models/service-invoices/entities/service-invoice-document.entity';

@Injectable()
export class ServiceInvoiceDocumentPublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(ServiceInvoiceDocument)
    private serviceInvoiceDocumentModel: typeof ServiceInvoiceDocument,
  ) {}

  async create(
    createServiceInvoiceDocumentDto: CreateServiceInvoiceDocumentDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      return this.response.fail('image is required', 400);
    }
    const transaction = await this.sequelize.transaction();
    try {
      const s3Helper = new S3Helper();
      const uploadImage = await s3Helper.uploadFile(
        file,
        'payment/image',
        'public-read',
      );

      if (!uploadImage?.key) {
        return this.response.fail('File upload failed', 400);
      }

      const invoiceDocument = await this.serviceInvoiceDocumentModel.create(
        {
          ...createServiceInvoiceDocumentDto,
          file_path: uploadImage.key,
        },
        { transaction },
      );

      await transaction.commit();
      return this.response.success(
        invoiceDocument,
        201,
        'Successfully create service invoice document',
      );
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating service invoice document:', error);
      return this.response.fail(
        'Failed to create service invoice document',
        400,
      );
    }
  }

  findAll() {
    return `This action returns all serviceInvoiceDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceInvoiceDocument`;
  }

  update(
    id: number,
    updateServiceInvoiceDocumentDto: CreateServiceInvoiceDocumentDto,
  ) {
    return `This action updates a #${id} serviceInvoiceDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceInvoiceDocument`;
  }
}
