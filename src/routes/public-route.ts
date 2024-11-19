import AdsInsightFormula from "../container/dashboards/ads-insight-formula";
import { RouteNames } from "../constants/routes";
import SupportTicketPage from "../container/dashboards/support-ticket";

export const publicRoutes = [
  { path: RouteNames.SUPPORT_TICKET, component: SupportTicketPage },
  { path: RouteNames.ADS_INSIGHT_FORMULA, component: AdsInsightFormula },
];
