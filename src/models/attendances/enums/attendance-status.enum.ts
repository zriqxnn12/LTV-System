enum AttendanceStatusEnum {
  PRESENT = 0,
  LATE = 1,
  ALPHA = 2,
}

export const getAttendanceStatusEnumLabel = (
  courseScheduleStatusEnum: AttendanceStatusEnum,
) => {
  switch (courseScheduleStatusEnum) {
    case AttendanceStatusEnum.PRESENT:
      return 'Present';
    case AttendanceStatusEnum.LATE:
      return 'Late';
    case AttendanceStatusEnum.ALPHA:
      return 'Alpha';
    default:
      return 'Unknown';
  }
};

export const getAttendanceStatusEnums = () => {
  const enums = Object.entries(AttendanceStatusEnum);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getAttendanceStatusEnumLabel(+value),
      });
    }
  }

  return result;
};

export default AttendanceStatusEnum;
