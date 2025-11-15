enum CourseScheduleStatusEnum {
  SCHEDULED = 0,
  ON_PROGRESS = 1,
  RESCHEDULED = 2,
  COMPLETED = 3,
  ABSENT = 4,
  WAITING_REQUEST = 5,
}

export const getCourseScheduleStatusEnumLabel = (
  courseScheduleStatusEnum: CourseScheduleStatusEnum,
) => {
  switch (courseScheduleStatusEnum) {
    case CourseScheduleStatusEnum.SCHEDULED:
      return 'Scheduled';
    case CourseScheduleStatusEnum.ON_PROGRESS:
      return 'On Progress';
    case CourseScheduleStatusEnum.RESCHEDULED:
      return 'Rescheduled';
    case CourseScheduleStatusEnum.COMPLETED:
      return 'Completed';
    case CourseScheduleStatusEnum.ABSENT:
      return 'Absent';
    case CourseScheduleStatusEnum.WAITING_REQUEST:
      return 'Waiting for request';
    default:
      return 'Unknown';
  }
};

export const getCourseScheduleStatusEnums = () => {
  const enums = Object.entries(CourseScheduleStatusEnum);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getCourseScheduleStatusEnumLabel(+value),
      });
    }
  }

  return result;
};

export default CourseScheduleStatusEnum;
