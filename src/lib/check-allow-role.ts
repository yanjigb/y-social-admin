export default function checkAllowRole(roleId: number, roleListAllow: any[] = []) {
  return roleListAllow.includes(Number(roleId))
}
