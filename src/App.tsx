import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/features/auth/pages/loginPage";
import ProductPage from "./features/products/pages/ProductPage";
import ProtectedRoute from "../src/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route */}
        <Route
          path="/ProductPage"
          element={
            <ProtectedRoute>
               <ProductPage/>
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;