import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { S3Helper } from 'src/cores/helpers/s3.helper';
import { CreateServiceInvoiceDocumentDto } from 'src/models/service-invoices/dto/create-service-invoice-document.dto';
import { ServiceInvoiceDocument } from 'src/models/service-invoices/entities/service-invoice-document.entity';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';
import ServiceInvoiceStatus from 'src/models/service-invoices/enums/service-invoice-status.enum';

@Injectable()
export class ServiceInvoiceDocumentPublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(ServiceInvoiceDocument)
    private serviceInvoiceDocumentModel: typeof ServiceInvoiceDocument,
    @InjectModel(ServiceInvoice)
    private serviceInvoiceModel: typeof ServiceInvoice,
  ) {}

  async create(invoiceId: number, file: Express.Multer.File) {
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
          service_invoice_id: invoiceId,
          file_path: uploadImage.key,
        },
        { transaction },
      );

      await this.serviceInvoiceModel.update(
        {
          status: ServiceInvoiceStatus.PAYMENT_APPROVAL,
        },
        {
          where: { id: invoiceId },
          transaction,
        },
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

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.serviceInvoiceDocumentModel,
      query,
    ).getResult();

    const result = {
      count: count,
      service_invoice_documents: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve service invoice documents',
    );
  }

  async findOne(id: number) {
    try {
      const invoice = await this.serviceInvoiceDocumentModel.findOne({
        where: { id },
      });

      return this.response.success(
        invoice,
        200,
        'Successfully retrieve service invoice document',
      );
    } catch (error) {
      return this.response.fail(
        'Failed retrieve service invoice document',
        400,
      );
    }
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
