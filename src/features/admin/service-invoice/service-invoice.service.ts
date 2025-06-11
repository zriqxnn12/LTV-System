import { Injectable } from '@nestjs/common';
import { CreateServiceInvoiceDto } from '../../../models/service-invoices/dto/create-service-invoice.dto';
import { UpdateServiceInvoiceDto } from '../../../models/service-invoices/dto/update-service-invoice.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';
import { ServiceInvoiceDetail } from 'src/models/service-invoice-details/entities/service-invoice-detail.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import ServiceInvoiceStatus from 'src/models/service-invoices/enums/service-invoice-status.enum';
import { ServiceInvoiceDocument } from 'src/models/service-invoices/entities/service-invoice-document.entity';

@Injectable()
export class ServiceInvoiceService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(ServiceInvoice)
    private serviceInvoiceModel: typeof ServiceInvoice,
    @InjectModel(ServiceInvoiceDetail)
    private serviceInvoiceDetailModel: typeof ServiceInvoiceDetail,
  ) {}

  async create(createServiceInvoiceDto: CreateServiceInvoiceDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { service_invoice_details, ...invoiceData } =
        createServiceInvoiceDto;

      let grandTotal = 0;
      if (service_invoice_details?.length) {
        grandTotal = service_invoice_details.reduce(
          (sum, detail) => sum + detail.price,
          0,
        );
      }

      const serviceInvoice = await this.serviceInvoiceModel.create(
        {
          ...invoiceData,
          grand_total: grandTotal,
        },
        { transaction },
      );

      if (service_invoice_details?.length) {
        const detailRecords = service_invoice_details.map((detail) => ({
          ...detail,
          service_invoice_id: serviceInvoice.id,
        }));
        await this.serviceInvoiceDetailModel.bulkCreate(detailRecords, {
          transaction,
        });
      }
      await transaction.commit();
      return this.response.success(
        serviceInvoice,
        201,
        'Successfully create service invoice',
      );
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating genre:', error);
      return this.response.fail('Failed to create service invoice', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.serviceInvoiceModel,
      query,
    )
      .load('service_invoice_details', 'service_invoice_document', {
        association: 'student',
        include: [{ association: 'user' }],
      })
      .getResult();

    const result = {
      count: count,
      service_invoices: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve service invoices',
    );
  }

  async findOne(id: number) {
    try {
      const invoice = await this.serviceInvoiceModel.findOne({
        where: { id },
        include: [
          {
            association: 'service_invoice_details',
          },
          {
            association: 'service_invoice_document',
          },
          {
            association: 'student',
            include: [
              {
                association: 'user',
              },
            ],
          },
        ],
      });

      return this.response.success(
        invoice,
        200,
        'Successfully retrieve service invoice',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve service invoice', 400);
    }
  }

  async updateStatusToApproved(invoiceId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const invoice = await this.serviceInvoiceModel.findOne({
        where: {
          id: invoiceId,
          status: ServiceInvoiceStatus.PAYMENT_APPROVAL,
        },
        include: [
          {
            model: ServiceInvoiceDocument,
          },
        ],
        transaction,
      });

      await this.serviceInvoiceModel.update(
        { status: ServiceInvoiceStatus.APPROVED },
        {
          where: { id: invoiceId },
          transaction,
        },
      );
      await transaction.commit();
      return this.response.success(
        null,
        200,
        'Service invoice status successfully updated to Approved',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update status', 400);
    }
  }

  async update(id: number, updateServiceInvoiceDto: UpdateServiceInvoiceDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const invoice = await this.serviceInvoiceModel.findByPk(id);
      await invoice.update(updateServiceInvoiceDto, { transaction });
      await transaction.commit();
      return this.response.success(
        invoice,
        200,
        'Successfully update service invoice',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update service invoice', 400);
    }
  }

  async delete(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.serviceInvoiceModel.destroy({
        where: { id: id },
        transaction,
      });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete music genre');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete music genre', 400);
    }
  }
}
