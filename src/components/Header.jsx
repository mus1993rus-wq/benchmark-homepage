import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const sportsItems = [
  { to: "/golf", label: "Benchmark Golf", desc: "Golf-at-home simulator + coaching", image: "/images/sports-golf.webp", comingSoon: false },
  { to: "/tennis", label: "Benchmark Tennis", desc: "Racket technique analysis + drills", image: "/images/sports-tennis.webp", comingSoon: true },
  { to: "/padel", label: "Benchmark Padel", desc: "Real-time swing & positioning feedback", image: "/images/sports-padel.webp", comingSoon: true },
  { to: "/cricket", label: "Benchmark Cricket", desc: "Batting motion & timing analysis", image: "/images/sports-cricket.webp", comingSoon: true },
];

const mobileSportsItems = [
  { to: "/golf", label: "Benchmark Golf" },
  { to: "/tennis", label: "Benchmark Tennis" },
  { to: "/padel", label: "Benchmark Padel" },
  { to: "/cricket", label: "Benchmark Cricket" },
];

const mobileNavLinks = [
  { to: "/about", label: "About Us" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contacts" },
];

export function Header() {
  const [sportsOpen, setSportsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSportsExpanded, setMobileSportsExpanded] = useState(false);
  // Separate "mounted" state so we can animate in/out
  const [dropdownMounted, setDropdownMounted] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Sticky header state
  const [stickyVisible, setStickyVisible] = useState(false);
  const lastScrollY = useRef(0);

  // Ref to measure the main desktop header height for blur overlay positioning
  const mainHeaderRef = useRef(null);
  const [mainHeaderBottom, setMainHeaderBottom] = useState(0);

  // Open: mount first, then trigger visible (animate in)
  // Close: trigger invisible (animate out), then unmount after transition
  useEffect(() => {
    let timeout;
    if (sportsOpen) {
      setDropdownMounted(true);
      // Small delay to allow mount before starting transition
      timeout = setTimeout(() => setDropdownVisible(true), 10);
    } else {
      setDropdownVisible(false);
      // Wait for animation out to finish before unmounting
      timeout = setTimeout(() => setDropdownMounted(false), 400);
    }
    return () => clearTimeout(timeout);
  }, [sportsOpen]);

  // Track main header bottom edge for blur overlay positioning (task 6)
  useEffect(() => {
    if (!mainHeaderRef.current) return;
    const update = () => {
      if (mainHeaderRef.current) {
        const rect = mainHeaderRef.current.getBoundingClientRect();
        setMainHeaderBottom(rect.bottom);
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(mainHeaderRef.current);
    return () => observer.disconnect();
  }, [dropdownVisible]);

  // Scroll direction detection for sticky header
  useEffect(() => {
    const threshold = 80;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < threshold) {
        setStickyVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up — show sticky header
        setStickyVisible(true);
      } else {
        // Scrolling down — hide sticky header
        setStickyVisible(false);
        // Also close sports dropdown when hiding
        if (sportsOpen) setSportsOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sportsOpen]);

  return (
    <>
      {/* ─── Sticky Header (scroll-up) — rendered via portal to escape overflow:hidden ── */}
      {createPortal(
        <div
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: sportsOpen ? "#ffffff" : "rgba(10,10,10,0.72)",
            backdropFilter: sportsOpen ? "none" : "blur(20px)",
            WebkitBackdropFilter: sportsOpen ? "none" : "blur(20px)",
            borderBottom: sportsOpen ? "none" : "1px solid rgba(255,255,255,0.08)",
            transform: stickyVisible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Mobile sticky header */}
          <div className="lg:hidden flex items-center justify-between px-4 h-[78px] relative">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Відкрити меню"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="2" rx="1" fill={sportsOpen ? "black" : "white"} />
                <rect x="2" y="11" width="20" height="2" rx="1" fill={sportsOpen ? "black" : "white"} />
                <rect x="2" y="17" width="20" height="2" rx="1" fill={sportsOpen ? "black" : "white"} />
              </svg>
            </button>
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src="/images/logo.svg"
                alt="benchmark SPORTS"
                style={{
                  height: "40px",
                  width: "157.5px",
                  filter: sportsOpen ? "brightness(0)" : "none",
                  transition: "filter 0.3s",
                }}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <div className="w-10" />
          </div>

          {/* Desktop sticky header */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between px-[240px] py-[28px] gap-[80px]">
              {/* Left nav */}
              <nav className="flex items-center gap-16 justify-end flex-1">
                <button
                  className={`nav-link font-bold text-base whitespace-nowrap flex items-center gap-1 ${sportsOpen ? "text-black" : "text-white"}`}
                  style={{ transition: "color 0.3s" }}
                  onClick={() => setSportsOpen(!sportsOpen)}
                >
                  Sports
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                    className="opacity-70"
                    style={{
                      transform: sportsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
                <Link
                  to="/about"
                  className={`nav-link font-bold text-base whitespace-nowrap ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                  style={{ transition: "color 0.3s" }}
                >
                  About Us
                </Link>
              </nav>

              {/* Logo */}
              <Link to="/" className="shrink-0">
                <img
                  src="/images/logo.svg"
                  alt="benchmark SPORTS"
                  style={{
                    height: "40px",
                    width: "157.5px",
                    filter: sportsOpen ? "brightness(0)" : "none",
                    transition: "filter 0.3s",
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              {/* Right nav */}
              <nav className="flex items-center gap-16 flex-1">
                <Link
                  to="/careers"
                  className={`nav-link font-bold text-base whitespace-nowrap ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                  style={{ transition: "color 0.3s" }}
                >
                  Careers
                </Link>
                <Link
                  to="/contact"
                  className={`nav-link font-bold text-base whitespace-nowrap ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                  style={{ transition: "color 0.3s" }}
                >
                  Contacts
                </Link>
              </nav>
            </div>

            {/* Sports dropdown for sticky header — same white style as main */}
            {dropdownMounted && (
              <div
                className="w-full bg-white overflow-hidden border-t border-black/10"
                style={{
                  opacity: dropdownVisible ? 1 : 0,
                  transform: dropdownVisible ? "translateY(0)" : "translateY(-16px)",
                  transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div className="pb-[60px]">
                  <div className="flex gap-[16px] items-center mx-auto w-[1200px] h-[380px]">
                    {sportsItems.map((sport, i) => (
                      <Link
                        key={sport.to}
                        to={sport.to}
                        className="relative flex-1 h-full rounded-[8px] overflow-hidden block img-zoom"
                        onClick={() => setSportsOpen(false)}
                        style={{
                          opacity: dropdownVisible ? 1 : 0,
                          transform: dropdownVisible ? "translateY(0)" : "translateY(24px)",
                          transition: `opacity 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, transform 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
                        }}
                      >
                        <img src={sport.image} alt={sport.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-transparent to-[rgba(35,35,35,0.6)]" />
                        {sport.comingSoon && (
                          <div className="absolute top-3 left-3 bg-[#30393e] backdrop-blur-[24px] px-3 py-1.5 rounded">
                            <span className="font-bold text-[16px] text-[#ffc32c] leading-5">Coming soon</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex flex-col gap-3 text-white">
                            <p className="font-bold text-[24px] leading-7">{sport.label}</p>
                            <p className="font-normal text-[16px] leading-6">{sport.desc}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* ─── Mobile Header ─────────────────────────────────────────────────── */}
      <div
        className="lg:hidden flex items-center justify-between px-4 h-[78px] relative z-30"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(10,10,10,0.55)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Відкрити меню"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="2" rx="1" fill="white" />
            <rect x="2" y="11" width="20" height="2" rx="1" fill="white" />
            <rect x="2" y="17" width="20" height="2" rx="1" fill="white" />
          </svg>
        </button>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/images/logo.svg" alt="benchmark SPORTS" style={{ height: '40px', width: '157.5px' }} loading="lazy" decoding="async" />
        </Link>
        <div className="w-10" />
      </div>

      {/* ─── Mobile Menu — Figma style: white top panel + blurred dark bottom ── */}
      {mobileMenuOpen && createPortal(
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* White top panel */}
          <div className="bg-white flex flex-col" style={{ minHeight: 'auto' }}>
            {/* Announcement bar */}
            <div className="w-full bg-black text-white flex items-center justify-center h-10 px-12 shrink-0">
              <span className="font-normal text-base leading-6">Description text</span>
              <button className="ml-2 font-bold text-base leading-5 px-3 py-1 rounded transition-colors hover:bg-white hover:text-black">
                Learn More
              </button>
            </div>

            {/* Header row: X on left, logo centered */}
            <div className="flex items-center justify-between px-5 h-[78px] relative">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileSportsExpanded(false);
                }}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Закрити меню"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <Link
                to="/"
                className="absolute left-1/2 -translate-x-1/2"
                onClick={() => { setMobileMenuOpen(false); setMobileSportsExpanded(false); }}
              >
                <img src="/images/logo.svg" alt="benchmark SPORTS" className="brightness-0" style={{ height: '40px', width: '157.5px' }} loading="lazy" decoding="async" />
              </Link>
              <div className="w-10" />
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-6 px-5 pb-8 pt-2">
              {/* Sports — expandable */}
              <div>
                <button
                  className="w-full flex items-center justify-between font-bold text-[18px] text-black leading-5"
                  onClick={() => setMobileSportsExpanded((v) => !v)}
                >
                  <span>Sports</span>
                  <svg
                    width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    style={{
                      transform: mobileSportsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
                {/* Sports sub-items */}
                {mobileSportsExpanded && (
                  <div className="flex flex-col gap-[16px] mt-[16px]">
                    {mobileSportsItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="font-bold text-[24px] text-[#0f1010] leading-[28px]"
                        onClick={() => { setMobileMenuOpen(false); setMobileSportsExpanded(false); }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {mobileNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-bold text-[18px] text-black leading-5"
                  onClick={() => { setMobileMenuOpen(false); setMobileSportsExpanded(false); }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Dark blurred bottom — shows page content through */}
          <div
            className="flex-1"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(0,0,0,0.24)",
            }}
            onClick={() => { setMobileMenuOpen(false); setMobileSportsExpanded(false); }}
          />
        </div>,
        document.body
      )}

      {/* ─── Desktop Backdrop overlay — portal, starts BELOW white header+dropdown (task 6) ── */}
      {createPortal(
        <div
          className="hidden lg:block fixed left-0 right-0 z-20"
          style={{
            top: dropdownVisible && mainHeaderBottom > 0 ? `${mainHeaderBottom}px` : 0,
            bottom: 0,
            backdropFilter: dropdownVisible ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: dropdownVisible ? "blur(12px)" : "blur(0px)",
            background: dropdownVisible ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
            opacity: dropdownVisible ? 1 : 0,
            pointerEvents: dropdownMounted ? "auto" : "none",
            transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), backdrop-filter 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
          onClick={() => setSportsOpen(false)}
        />,
        document.body
      )}

      {/* ─── Desktop Header + Sports Dropdown ───────────────────────────────── */}
      <div
        ref={mainHeaderRef}
        className="hidden lg:block w-full absolute top-0 left-0 z-30"
        style={{
          background: sportsOpen ? "#ffffff" : "transparent",
          transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <header className="w-full flex items-center">
          <div
            className="w-full flex items-center justify-between px-[240px] py-[40px] pb-[48px] gap-[80px]"
            style={!sportsOpen ? { background: "linear-gradient(to bottom, rgba(23,26,29,0.2), rgba(0,0,0,0))" } : {}}
          >
            {/* Left nav */}
            <nav className="flex items-center gap-16 justify-end flex-1">
              <div className="relative">
                <button
                  className={`nav-link font-bold text-base whitespace-nowrap flex items-center gap-1 ${sportsOpen ? "text-black" : "text-white"}`}
                  style={{ transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                  onClick={() => setSportsOpen(!sportsOpen)}
                >
                  Sports
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                    className="opacity-70"
                    style={{
                      transform: sportsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
              </div>
              <Link
                to="/about"
                className={`nav-link font-bold text-base whitespace-nowrap ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                style={{ transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)" }}
              >
                About Us
              </Link>
            </nav>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img
                src="/images/logo.svg"
                alt="benchmark SPORTS"
                style={{
                  height: '40px',
                  width: '157.5px',
                  filter: sportsOpen ? "brightness(0)" : "none",
                  transition: "filter 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Right nav */}
            <nav className="flex items-center gap-16 flex-1">
              <Link
                to="/careers"
                className={`nav-link font-bold text-base whitespace-nowrap ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                style={{ transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)" }}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className={`nav-link font-bold text-base whitespace-nowrap ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                style={{ transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)" }}
              >
                Contacts
              </Link>
            </nav>
          </div>
        </header>

        {/* ─── Sports Dropdown — translateY + opacity + stagger ─────────────── */}
        {dropdownMounted && (
          <div
            className="w-full bg-white overflow-hidden"
            style={{
              opacity: dropdownVisible ? 1 : 0,
              transform: dropdownVisible ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="pb-[60px]">
              <div className="flex gap-[16px] items-center mx-auto w-[1200px] h-[380px]">
                {sportsItems.map((sport, i) => (
                  <Link
                    key={sport.to}
                    to={sport.to}
                    className="relative flex-1 h-full rounded-[8px] overflow-hidden block img-zoom"
                    onClick={() => setSportsOpen(false)}
                    style={{
                      opacity: dropdownVisible ? 1 : 0,
                      transform: dropdownVisible ? "translateY(0)" : "translateY(24px)",
                      transition: `opacity 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, transform 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
                    }}
                  >
                    <img src={sport.image} alt={sport.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-transparent to-[rgba(35,35,35,0.6)]" />
                    {sport.comingSoon && (
                      <div className="absolute top-3 left-3 bg-[#30393e] backdrop-blur-[24px] px-3 py-1.5 rounded">
                        <span className="font-bold text-[16px] text-[#ffc32c] leading-5">Coming soon</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-col gap-3 text-white">
                        <p className="font-bold text-[24px] leading-7">{sport.label}</p>
                        <p className="font-normal text-[16px] leading-6">{sport.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
