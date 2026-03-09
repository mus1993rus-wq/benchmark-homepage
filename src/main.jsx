import { StrictMode, useState, useCallback, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { Footer } from "./components/Footer";

// ─── Lazy-load every page — each route is its own JS chunk ───────────────────
// This means the initial bundle only includes the current page's code.
// All other pages are fetched on-demand when the user navigates to them.
const HomePage    = lazy(() => import("./pages/HomePage"));
const AboutPage   = lazy(() => import("./pages/AboutPage"));
const GolfPage    = lazy(() => import("./pages/GolfPage"));
const TennisPage  = lazy(() => import("./pages/TennisPage"));
const PadelPage   = lazy(() => import("./pages/PadelPage"));
const CricketPage = lazy(() => import("./pages/CricketPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));

// Minimal dark-screen fallback shown while a lazy page chunk loads
function PageFallback() {
  return <div style={{ minHeight: "100vh", background: "#0f1010" }} />;
}

// Скролимо на початок сторінки при кожній навігації
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [footerHeight, setFooterHeight] = useState(420);
  const handleFooterHeight = useCallback((h) => setFooterHeight(h), []);

  // Only apply footer margin on desktop (≥1024px) to avoid white space on mobile
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/*
        Обгортка сторінки: position:relative; z-index:1.
        marginBottom = висота футера тільки на desktop — margin не перехоплює pointer events,
        тому кліки у нижній зоні проходять до футера (z-index:0).
      */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          overflow: "clip",
          marginBottom: isDesktop ? footerHeight : 0,
        }}
      >
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"              element={<HomePage />} />
            <Route path="/about"         element={<AboutPage />} />
            <Route path="/golf"          element={<GolfPage />} />
            <Route path="/tennis"        element={<TennisPage />} />
            <Route path="/padel"         element={<PadelPage />} />
            <Route path="/cricket"       element={<CricketPage />} />
            <Route path="/contact"       element={<ContactPage />} />
            <Route path="/careers"       element={<CareersPage />} />
            <Route path="/careers/:slug" element={<JobDetailPage />} />
          </Routes>
        </Suspense>
      </div>

      {/* Footer поза обгорткою — у кореневому stacking context (z-index:0) */}
      <Footer onHeightChange={handleFooterHeight} />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
