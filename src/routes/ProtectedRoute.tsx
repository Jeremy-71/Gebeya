// // import { ReactNode } from "react";
// // import { Navigate, useOutlet } from "react-router-dom";
// // import { useAppSelector } from "../hooks/hooks";

// // // ✅ Props type
// // interface ProtectedRouteProps {
// //   children: ReactNode;
// // }

// // const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
// //   const { accessToken } = useAppSelector((state) => state.auth);
// // // 
// //   //  not authenticated → redirect
// //   if (!accessToken) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   // ✅ authenticated → render page
// //   return <>{children}</>;
// // };

// // export default ProtectedRoute;
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../hooks/hooks";

// const ProtectedRoute = () => {
//   const { accessToken } = useAppSelector((state) => state.auth);

//   //  Not authenticated
//   if (!accessToken) {
//     return <Navigate to="/login" replace />;
//   }

//   //  Authenticated → render nested routes
//   return <Outlet />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const ProtectedRoute = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ✅ CRITICAL
};

export default ProtectedRoute;