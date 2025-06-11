import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
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
        include: [
          {
            association: 'service_invoice_details',
          },
          {
            association: 'service_invoice_document',
          },
          {
            association: 'student',
            required: true,
            where: {
              user_id: user.id,
            },
            include: [{ association: 'user' }],
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
}
