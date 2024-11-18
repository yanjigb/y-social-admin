import Calculate from "../container/dashboards/calculate";
import { RouteNames } from "../constants/routes";
import SupportTicketPage from "../container/dashboards/support-ticket";

export const publicRoutes = [
  { path: RouteNames.SUPPORT_TICKET, component: SupportTicketPage },
  { path: RouteNames.CALCULATE, component: Calculate },
];
