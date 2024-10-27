import { Navigate, Outlet } from "react-router-dom";
import { RouteNames } from "../../../constants/routes";
import { useAuth } from "../../../providers/app-auth-provider";

export default function AppAuthProtected() {
  const { isAuthenticated } = useAuth();

  // While loading, you might want to return a loading indicator or nothing
  if (isAuthenticated === null) {
    return null; // or return a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to={RouteNames.LOGIN} replace />;
  }

  return <Outlet />;
}
