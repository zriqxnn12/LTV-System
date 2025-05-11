enum StaffRoleEnum {
  DEVELOPER = 0,
  TEACHER = 1,
  ADMIN = 2,
}

export const getStaffRoleEnumLabel = (role: StaffRoleEnum) => {
  switch (role) {
    case StaffRoleEnum.DEVELOPER:
      return 'Developer';
    case StaffRoleEnum.TEACHER:
      return 'Teacher';
    case StaffRoleEnum.ADMIN:
      return 'Admin';
    default:
      return 'Unknown';
  }
};

export const getRoleTypeEnums = () => {
  const enums = Object.entries(StaffRoleEnum);
  const result = [];

  for (const [key, value] of enums) {
    if (typeof value === 'number') {
      result.push({
        id: value,
        name: getStaffRoleEnumLabel(+value),
      });
    }
  }

  return result;
};

export default StaffRoleEnum;
