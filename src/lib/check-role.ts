import ROLE from "../constants/role"

export default function checkRole(roleId: number) {
  switch (roleId) {
    case ROLE.SUPER_ADMIN_PROFILE.id:
      return ROLE.SUPER_ADMIN_PROFILE.name
    case ROLE.ADMIN_PROFILE.id:
      return ROLE.ADMIN_PROFILE.name
    case ROLE.STAFF_PROFILE.id:
      return ROLE.STAFF_PROFILE.name
    case ROLE.USER_PROFILE.id:
      return ROLE.USER_PROFILE.name
    default:
      return ROLE.USER_PROFILE.name
  }
}
