import { getDynamicRoute } from "../../../../lib/get-dynamic-route";
import { RouteNames } from "../../../../constants/routes";
import clsx from "clsx";
import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ROLE from "../../../../constants/role";

const role = Number(localStorage.getItem(LocalStorageKeys.ROLE));

const checkNotAllowRole = (role: any, notAllowRole: string) => notAllowRole.includes(role);

const createMenuItem = (title: string, routeName: RouteNames, notAllowRoles: any = []) => ({
  type: "sub",
  icon: "",
  Name: "",
  active: false,
  selected: false,
  title,
  badge: "",
  badgetxt: "12",
  notAllowRoles,
  path: getDynamicRoute(routeName),
  class: clsx(
    "!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
    checkNotAllowRole(role, notAllowRoles) && "hidden"
  ),
});

export const MENUITEMS = [
  {
    menutitle: "",
  },
  createMenuItem("Advertises", RouteNames.ADVERTISES),
  createMenuItem("Users", RouteNames.USERS, [ROLE.USER_PROFILE.id]),
  createMenuItem("Posts", RouteNames.POSTS, [ROLE.USER_PROFILE.id]),
  createMenuItem("Analytics", RouteNames.ANALYTICS, [ROLE.USER_PROFILE.id]),
  createMenuItem("Ecommerce", RouteNames.ECOMMERCE),
  createMenuItem("Sales", RouteNames.SALES),
  createMenuItem("Personal", RouteNames.PERSONAL, [ROLE.USER_PROFILE.id]),
  createMenuItem("Support Ticket", RouteNames.SUPPORT_TICKET, [ROLE.USER_PROFILE.id]),
  createMenuItem("Payments", RouteNames.PAYMENTS, [ROLE.STAFF_PROFILE.id, ROLE.USER_PROFILE.id]),
];
