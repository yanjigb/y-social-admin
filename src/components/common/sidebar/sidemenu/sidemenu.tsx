import { getDynamicRoute } from "../../../../lib/get-dynamic-route";
import { RouteNames } from "../../../../constants/routes";
import clsx from "clsx";
import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ROLE from "../../../../constants/role";

const role = Number(localStorage.getItem(LocalStorageKeys.ROLE))

const checkNotAllowRole = (role: Number, notAllowRole: Number[]) => {
  if (notAllowRole.includes(role)) {
    return true;
  }
  return false;
}

export const MENUITEMS = [
  {
    menutitle: "",
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Advertises",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.ADVERTISES),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, []) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Users",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.USERS),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, [ROLE.USER_PROFILE.id]) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Posts",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.POSTS),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, [ROLE.USER_PROFILE.id]) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Analytics",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.ANALYTICS),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, [ROLE.USER_PROFILE.id]) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Ecommerce",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.ECOMMERCE),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, []) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Sales",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.SALES),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, []) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Personal",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.PERSONAL),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, [ROLE.USER_PROFILE.id]) && "hidden"
    ),
  },
  {
    type: "sub",
    icon: "",
    Name: "",
    active: false,
    selected: false,
    title: "Payments",
    badge: "",
    badgetxt: "12",
    path: getDynamicRoute(RouteNames.PAYMENTS),
    class: clsx("!py-[0.25rem] !px-[0.45rem] !text-sm ms-2",
      checkNotAllowRole(role, [ROLE.STAFF_PROFILE.id, ROLE.USER_PROFILE.id]) && "hidden"
    ),
  },
];
