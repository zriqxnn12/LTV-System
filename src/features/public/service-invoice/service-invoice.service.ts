import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { CreateServiceInvoiceDto } from 'src/models/service-invoices/dto/create-service-invoice.dto';
import { UpdateServiceInvoiceDto } from 'src/models/service-invoices/dto/update-service-invoice.dto';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';

@Injectable()
export class ServiceInvoicePublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(ServiceInvoice)
    private serviceInvoiceModel: typeof ServiceInvoice,
  ) {}

  async findAll(query: any, user: any) {
    try {
      const { count, rows } = await this.serviceInvoiceModel.findAndCountAll({
        where: {
          user_id: user.id,
        },
        include: [
          {
            association: 'service_invoice_details',
          },
          {
            association: 'service_invoice_document',
          },
          {
            association: 'user',
            include: [{ association: 'student' }],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return this.response.success(
        {
          count,
          service_invoices: rows,
        },
        200,
        'Successfully retrieve service invoices',
      );
    } catch (err) {
      console.error('Error retrieving invoices:', err);
      return this.response.fail('Internal Server Error', 500);
    }
  }

  async findOne(id: number) {
    try {
      const invoice = await this.serviceInvoiceModel.findOne({
        where: {
          id,
        },
        include: [
          {
            association: 'service_invoice_details',
          },
          {
            association: 'service_invoice_document',
          },
          {
            association: 'user',
            include: [
              {
                association: 'student',
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
}
