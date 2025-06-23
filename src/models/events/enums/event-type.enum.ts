enum EventTypeEnum {
  STUDENT = 0,
  TEACHER = 1,
}

export const getEventTypeEnumLabel = (status: EventTypeEnum) => {
  switch (status) {
    case EventTypeEnum.STUDENT:
      return 'Student';
    case EventTypeEnum.TEACHER:
      return 'Teacher';
    default:
      return 'Unknown';
  }
};

export const getEventTypeEnums = () => {
  const enums = Object.entries(EventTypeEnum);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getEventTypeEnumLabel(+value),
      });
    }
  }

  return result;
};

export default EventTypeEnum;
