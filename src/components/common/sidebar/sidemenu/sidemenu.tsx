import { getDynamicRoute } from "../../../../lib/get-dynamic-route";
import { RouteNames } from "../../../../constants/routes";

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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
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
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
  },
];
