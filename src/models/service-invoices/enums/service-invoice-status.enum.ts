enum ServiceInvoiceStatus {
  PENDING = 0,
  PAYMENT_APPROVAL = 1,
  APPROVED = 2,
  CANCELLED = 3,
}

export const getServiceInvoiceStatusEnumLabel = (
  serviceInvoiceStatus: ServiceInvoiceStatus,
) => {
  switch (serviceInvoiceStatus) {
    case ServiceInvoiceStatus.PENDING:
      return 'Pending';
    case ServiceInvoiceStatus.PAYMENT_APPROVAL:
      return 'Payment approval';
    case ServiceInvoiceStatus.APPROVED:
      return 'Approved';
    case ServiceInvoiceStatus.CANCELLED:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const getServiceInvoiceStatusEnums = () => {
  const enums = Object.entries(ServiceInvoiceStatus);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getServiceInvoiceStatusEnumLabel(+value),
      });
    }
  }

  return result;
};

export default ServiceInvoiceStatus;
