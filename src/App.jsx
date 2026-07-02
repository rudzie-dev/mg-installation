import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";

import HomePage       from "./pages/HomePage";
import ContactPage    from "./pages/ContactPage";
import PortfolioPage  from "./pages/PortfolioPage";
import LeadMagnetPage from "./pages/LeadMagnetPage";
import CCTVPage       from "./pages/services/CCTVPage";
import DSTVPage       from "./pages/services/DSTVPage";
import TVMountingPage from "./pages/services/TVMountingPage";
import RepairsPage    from "./pages/services/RepairsPage";
import AdminLogin     from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"                     element={<HomePage />} />
        <Route path="/contact"              element={<ContactPage />} />
        <Route path="/portfolio"            element={<PortfolioPage />} />
        <Route path="/free-quote"           element={<LeadMagnetPage />} />
        <Route path="/services/cctv"        element={<CCTVPage />} />
        <Route path="/services/dstv"        element={<DSTVPage />} />
        <Route path="/services/tv-mounting" element={<TVMountingPage />} />
        <Route path="/services/repairs"     element={<RepairsPage />} />
        <Route path="/admin/login"          element={<AdminLogin />} />
        <Route path="/admin"                element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}