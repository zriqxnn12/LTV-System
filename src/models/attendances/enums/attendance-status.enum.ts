enum AttendanceStatusEnum {
  PRESENT = 0,
  LATE = 1,
}

export const getAttendanceStatusEnumLabel = (
  courseScheduleStatusEnum: AttendanceStatusEnum,
) => {
  switch (courseScheduleStatusEnum) {
    case AttendanceStatusEnum.PRESENT:
      return 'Present';
    case AttendanceStatusEnum.LATE:
      return 'Late';
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
