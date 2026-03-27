import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

// ✅ Props type
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  //  not authenticated → redirect
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // ✅ authenticated → render page
  return <>{children}</>;
};

export default ProtectedRoute;