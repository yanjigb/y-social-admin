import { RouteNames } from "src/types/routes";

const BASE_ROUTE = import.meta.env.BASE_URL;

export const createRoute = (route: RouteNames) => `${BASE_ROUTE}${route}`;

export const getDynamicRoute = (
  route: RouteNames,
  params?: Record<string, string>
): string => {
  let path = createRoute(route);
  if (params) {
    for (const key in params) {
      path = path.replace(`:${key}`, params[key]);
    }
  }
  return path;
};
