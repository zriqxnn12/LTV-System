import * as Joi from 'joi';
import { ServiceInvoice } from 'src/models/service-invoices/entities/service-invoice.entity';

export const serviceInvoiceIdParamSchema = Joi.number()
  .required()
  .external(async (value) => {
    const invoice = await ServiceInvoice.findOne({
      where: { id: value },
    });
    if (!invoice) {
      throw new Joi.ValidationError(
        'any.invalid-service-invoice-id',
        [
          {
            message: 'service invoice not found',
            path: ['id'],
            type: 'any.invalid-service-invoice-id',
            context: {
              key: 'id',
              label: 'id',
              value,
            },
          },
        ],
        value,
      );
    }
  });
