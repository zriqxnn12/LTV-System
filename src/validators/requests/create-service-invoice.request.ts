import * as Joi from 'joi';
import ServiceInvoiceStatus from 'src/models/service-invoices/enums/service-invoice-status.enum';
import { Student } from 'src/models/students/entities/student.entity';
import { User } from 'src/models/users/entities/user.entity';

export const createServiceInvoiceSchema = Joi.object({
  student_id: Joi.number()
    .required()
    .external(async (value) => {
      const student = await Student.findOne({
        where: { id: value },
      });
      if (!student) {
        throw new Joi.ValidationError(
          'any.student-not-found',
          [
            {
              message: 'Student not found',
              path: ['student_id'],
              type: 'any.student-not-found',
              context: {
                key: 'student_id',
                label: 'student_id',
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
