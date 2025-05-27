import * as Joi from 'joi';
import ServiceInvoiceStatus from 'src/models/service-invoices/enums/service-invoice-status.enum';
import { User } from 'src/models/users/entities/user.entity';

export const createServiceInvoiceSchema = Joi.object({
  user_id: Joi.number()
    .required()
    .external(async (value) => {
      const user = await User.findOne({
        where: { id: value },
      });
      if (!user) {
        throw new Joi.ValidationError(
          'any.user-not-found',
          [
            {
              message: 'User not found',
              path: ['user_id'],
              type: 'any.user-not-found',
              context: {
                key: 'user_id',
                label: 'user_id',
                value,
              },
            },
          ],
          value,
        );
      }
    }),
  invoice_no: Joi.string().required(),
  status_name: Joi.string().optional(),
  status: Joi.number().valid(
    ...Object.values(ServiceInvoiceStatus).filter((v) => typeof v === 'number'),
  ),
  date: Joi.date().required(),
  due_date: Joi.date().required(),
  grand_total: Joi.number().optional(),
  service_invoice_details: Joi.array()
    .items(
      Joi.object({
        item: Joi.string().required(),
        price: Joi.number().required(),
      }),
    )
    .optional(),
}).options({ abortEarly: false });
