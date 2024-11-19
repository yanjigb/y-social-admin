import { getDynamicRoute } from "../../../../lib/get-dynamic-route";
import { RouteNames } from "../../../../constants/routes";
import clsx from "clsx";
import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ROLE from "../../../../constants/role";

interface MenuItem {
  type: "sub" | "link" | "empty";
  icon: string;
  Name: string;
  active: boolean;
  selected: boolean;
  title: string;
  badge: string;
  badgetxt: string;
  notAllowRoles: any[];
  path: string;
  class: string;
}

interface MenuTitle {
  menutitle: string;
}

type MenuItems = (MenuItem | MenuTitle)[];

const role = Number(localStorage.getItem(LocalStorageKeys.ROLE));

const checkNotAllowRole = (role: any, notAllowRole: string) => notAllowRole.includes(role);

const createMenuItem = (title: string, routeName: RouteNames, notAllowRoles: any = []): MenuItem => ({
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

export const MENUITEMS: MenuItems = [
  {
    menutitle: "",
  },
  createMenuItem("Advertises", RouteNames.ADVERTISES),
  createMenuItem("Advertise Collection", RouteNames.ADVERTISE_COLLECTION, []),
  createMenuItem("Advertise Formula", RouteNames.ADS_INSIGHT_FORMULA),
  createMenuItem("Users", RouteNames.USERS, [ROLE.USER_PROFILE.id]),
  createMenuItem("Posts", RouteNames.POSTS),
  createMenuItem("Payments", RouteNames.PAYMENTS, [ROLE.STAFF_PROFILE.id, ROLE.USER_PROFILE.id]),
  createMenuItem("Payments Histories", RouteNames.PAYMENT_HISTORIES, []),
  createMenuItem("Support Ticket", RouteNames.SUPPORT_TICKET),
];
