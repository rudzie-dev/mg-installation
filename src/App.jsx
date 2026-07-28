import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";

import HomePage         from "./pages/HomePage";
import ContactPage      from "./pages/ContactPage";
import PortfolioPage    from "./pages/PortfolioPage";
import LeadMagnetPage   from "./pages/LeadMagnetPage";
import ServiceAreasPage from "./pages/ServiceAreasPage";
import CCTVPage       from "./pages/services/CCTVPage";
import DSTVPage       from "./pages/services/DSTVPage";
import TVMountingPage from "./pages/services/TVMountingPage";
import RepairsPage    from "./pages/services/RepairsPage";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// The admin CMS (auth flow, portfolio/reviews editors) is only ever reached by direct
// navigation to /admin, and isn't part of the prerendered route list — lazy-loading it
// keeps that code out of the bundle every public visitor downloads on the marketing pages.
const AdminLogin     = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"                     element={<HomePage />} />
        <Route path="/contact"              element={<ContactPage />} />
        <Route path="/portfolio"            element={<PortfolioPage />} />
        <Route path="/free-quote"           element={<LeadMagnetPage />} />
        <Route path="/service-areas"        element={<ServiceAreasPage />} />
        <Route path="/services/cctv"        element={<CCTVPage />} />
        <Route path="/services/dstv"        element={<DSTVPage />} />
        <Route path="/services/tv-mounting" element={<TVMountingPage />} />
        <Route path="/services/repairs"     element={<RepairsPage />} />
        <Route path="/admin/login"          element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
        <Route path="/admin"                element={<ProtectedRoute><Suspense fallback={null}><AdminDashboard /></Suspense></ProtectedRoute>} />
      </Routes>
    </>
  );
}