import * as Joi from 'joi';

export const createServiceInvoiceDocumentSchema = Joi.object({
  service_invoice_id: Joi.number().required(),
}).options({ abortEarly: false });
