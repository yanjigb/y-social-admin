import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role, notAllowRoles }: any) => {
  const hasAccess = !notAllowRoles.includes(role);

  return hasAccess ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
