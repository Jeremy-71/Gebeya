// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "@/features/auth/pages/loginPage";
// import ProductPage from "./features/products/pages/ProductPage";

// import ProtectedRoute from "../src/routes/ProtectedRoute";
// import MainLayout from "@/component/layout/MainLayout"; // ✅ import this

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default Redirect */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public Route */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* ✅ Protected + Layout Wrapper */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<MainLayout />}>
//             <Route path="/products" element={<ProductPage />} />
//           </Route>
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "@/features/auth/pages/loginPage";
// import ProductPage from "./features/products/pages/ProductPage";

// import ProtectedRoute from "../src/routes/ProtectedRoute";
// import MainLayout from "@/component/layout/MainLayout";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Redirect */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* ✅ Protected + Layout */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<MainLayout />}>
//             <Route path="/products" element={<ProductPage />} />
//           </Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import LoginPage from "@/features/auth/pages/loginPage";
import ProductPage from "@/features/products/pages/ProductPage";

import ProtectedRoute from "@/routes/ProtectedRoute";
import MainLayout from "@/component/layout/MainLayout";
import CartPage from "@/features/cart/pages/CartPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Protected + Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/products" element={<ProductPage />} />
          </Route>
        </Route>

         <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;