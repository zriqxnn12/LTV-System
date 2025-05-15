enum TeacherType {
  PERMANENT = 0,
  PART_TIME = 1,
}

export const getTeacherTypeEnumLabel = (type: TeacherType) => {
  switch (type) {
    case TeacherType.PERMANENT:
      return 'Permanent';
    case TeacherType.PART_TIME:
      return 'Part time';
    default:
      return 'Unknown';
  }
};

export const getTeacherTypeEnums = () => {
  const enums = Object.entries(TeacherType);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getTeacherTypeEnumLabel(+value),
      });
    }
  }

  return result;
};

export default TeacherType;
