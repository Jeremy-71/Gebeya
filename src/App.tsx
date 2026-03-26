import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/page/loginPage";
import CommentsPage from "./features/manage-post/CommentPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route - Redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/comments"  // Changed to lowercase + kebab-case (better practice)
          element={
            <ProtectedRoute>
              <CommentsPage />
            </ProtectedRoute>
          }
        />

        {/* Optional: Catch-all route for 404 */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;