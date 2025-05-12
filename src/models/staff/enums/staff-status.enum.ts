enum StaffStatusEnum {
  ACTIVE = 0,
  RESIGN = 1,
}

export const getStaffStatusEnumLabel = (status: StaffStatusEnum) => {
  switch (status) {
    case StaffStatusEnum.ACTIVE:
      return 'Active';
    case StaffStatusEnum.RESIGN:
      return 'Resign';
    default:
      return 'Unknown';
  }
};

export const getStatusTypeEnums = () => {
  const enums = Object.entries(StaffStatusEnum);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getStaffStatusEnumLabel(+value),
      });
    }
  }

  return result;
};

export default StaffStatusEnum;
