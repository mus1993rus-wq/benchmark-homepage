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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>
);
