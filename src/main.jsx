import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { PageTransitionProvider } from "./components/PageTransition";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PageTransitionProvider>
        {/*
          Весь контент сторінки — position: relative; z-index: 1.
          Футер — position: fixed; z-index: 0 (під контентом).
          При скролі контент "з'їжджає" вгору, відкриваючи футер знизу.
        */}
        <div style={{
          position: "relative",
          zIndex: 1,
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          overflow: "clip",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}>
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
      </PageTransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
