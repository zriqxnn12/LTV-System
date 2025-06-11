export class CreateServiceInvoiceDto {
  student_id: number;
  invoice_no: string;
  status_name: string;
  status: number;
  date: string;
  due_date: string;
  grand_total?: number;
  service_invoice_details?: {
    item: string;
    price: number;
  }[];
}
