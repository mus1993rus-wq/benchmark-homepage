import { StrictMode, useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GolfPage from "./pages/GolfPage";
import TennisPage from "./pages/TennisPage";
import PadelPage from "./pages/PadelPage";
import CricketPage from "./pages/CricketPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import JobDetailPage from "./pages/JobDetailPage";
import { Footer } from "./components/Footer";

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/golf" element={<GolfPage />} />
          <Route path="/tennis" element={<TennisPage />} />
          <Route path="/padel" element={<PadelPage />} />
          <Route path="/cricket" element={<CricketPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
        </Routes>
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
