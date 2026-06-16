import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./api/client";
import AdminLayout from "./components/AdminLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContentPage from "./pages/ContentPage";
import BookingsPage from "./pages/BookingsPage";
import InquiriesPage from "./pages/InquiriesPage";
import InsurancePage from "./pages/InsurancePage";
import CalendarPage from "./pages/CalendarPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="insurance" element={<InsurancePage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}
