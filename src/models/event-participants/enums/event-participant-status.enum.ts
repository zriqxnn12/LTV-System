enum EventParticipantStatusEnum {
  REQUEST_TO_JOIN = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  PAYMENT_REVIEW = 3,
  PAID = 4,
}

export const getEventParticipantStatusEnumLabel = (
  courseTransactionStatusEnum: EventParticipantStatusEnum,
) => {
  switch (courseTransactionStatusEnum) {
    case EventParticipantStatusEnum.REQUEST_TO_JOIN:
      return 'Request to join';
    case EventParticipantStatusEnum.ACCEPTED:
      return 'Accepted';
    case EventParticipantStatusEnum.REJECTED:
      return 'Rejected';
    case EventParticipantStatusEnum.PAYMENT_REVIEW:
      return 'Payment Review';
    case EventParticipantStatusEnum.PAID:
      return 'Paid';
    default:
      return 'Unknown';
  }
};

export const getEventParticipantStatusEnums = () => {
  const enums = Object.entries(EventParticipantStatusEnum);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getEventParticipantStatusEnumLabel(+value),
      });
    }
  }

  return result;
};

export default EventParticipantStatusEnum;
