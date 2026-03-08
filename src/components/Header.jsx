import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const sportsItems = [
  { to: "/golf", label: "Benchmark Golf", desc: "Golf-at-home simulator + coaching", image: "/images/sports-golf.png", comingSoon: false },
  { to: "/tennis", label: "Benchmark Tennis", desc: "Racket technique analysis + drills", image: "/images/sports-tennis.png", comingSoon: true },
  { to: "/padel", label: "Benchmark Padel", desc: "Real-time swing & positioning feedback", image: "/images/sports-padel.png", comingSoon: true },
  { to: "/cricket", label: "Benchmark Cricket", desc: "Batting motion & timing analysis", image: "/images/sports-cricket.png", comingSoon: true },
];

const navLinks = [
  { to: "/golf", label: "Golf" },
  { to: "/tennis", label: "Tennis" },
  { to: "/padel", label: "Padel" },
  { to: "/cricket", label: "Cricket" },
  { to: "/about", label: "About Us" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contacts" },
];

export function Header() {
  const [sportsOpen, setSportsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Separate "mounted" state so we can animate in/out
  const [dropdownMounted, setDropdownMounted] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Sticky header state
  const [stickyVisible, setStickyVisible] = useState(false);
  const lastScrollY = useRef(0);

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
      {/* ─── Sticky Header (scroll-up) ──────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-black"
        style={{
          transform: stickyVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
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
              <rect x="2" y="5" width="20" height="2" rx="1" fill="white" />
              <rect x="2" y="11" width="20" height="2" rx="1" fill="white" />
              <rect x="2" y="17" width="20" height="2" rx="1" fill="white" />
            </svg>
          </button>
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/images/logo.svg" alt="benchmark SPORTS" style={{ height: "40px", width: "157.5px" }} />
          </Link>
          <div className="w-10" />
        </div>

        {/* Desktop sticky header */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between px-[240px] py-[28px] gap-[80px]">
            {/* Left nav */}
            <nav className="flex items-center gap-16 justify-end flex-1">
              <button
                className="font-bold text-base whitespace-nowrap flex items-center gap-1 text-white hover:text-white/80"
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
                className="font-bold text-base whitespace-nowrap text-white hover:text-white/80"
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
                style={{ height: "40px", width: "157.5px" }}
              />
            </Link>

            {/* Right nav */}
            <nav className="flex items-center gap-16 flex-1">
              <Link
                to="/careers"
                className="font-bold text-base whitespace-nowrap text-white hover:text-white/80"
                style={{ transition: "color 0.3s" }}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="font-bold text-base whitespace-nowrap text-white hover:text-white/80"
                style={{ transition: "color 0.3s" }}
              >
                Contacts
              </Link>
            </nav>
          </div>

          {/* Sports dropdown for sticky header */}
          {dropdownMounted && (
            <div
              className="w-full bg-[#111] overflow-hidden border-t border-white/10"
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
                      <img src={sport.image} alt={sport.label} className="absolute inset-0 w-full h-full object-cover" />
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
      </div>

      {/* ─── Mobile Header ─────────────────────────────────────────────────── */}
      <div className="lg:hidden bg-white border-b border-[#e6e6e6] flex items-center justify-between px-4 h-[78px] relative z-20">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Відкрити меню"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="2" rx="1" fill="black" />
            <rect x="2" y="11" width="20" height="2" rx="1" fill="black" />
            <rect x="2" y="17" width="20" height="2" rx="1" fill="black" />
          </svg>
        </button>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/images/logo.svg" alt="benchmark SPORTS" className="brightness-0" style={{ height: '40px', width: '157.5px' }} />
        </Link>
        <div className="w-10" />
      </div>

      {/* ─── Mobile Menu Drawer ─────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white px-6 pt-6 pb-10 flex flex-col gap-8 shadow-xl">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/images/logo.svg" alt="benchmark SPORTS" className="brightness-0" style={{ height: '40px', width: '157.5px' }} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Закрити меню"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-bold text-[18px] text-black py-4 border-b border-[#e6e6e6]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* ─── Desktop Backdrop overlay ──────────────────────────────────────── */}
      <div
        className="hidden lg:block fixed inset-0 z-20"
        style={{
          backdropFilter: dropdownVisible ? "blur(12px)" : "blur(0px)",
          background: dropdownVisible ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
          opacity: dropdownVisible ? 1 : 0,
          pointerEvents: dropdownMounted ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), backdrop-filter 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
        onClick={() => setSportsOpen(false)}
      />

      {/* ─── Desktop Header + Sports Dropdown ───────────────────────────────── */}
      <div
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
                    <img src={sport.image} alt={sport.label} className="absolute inset-0 w-full h-full object-cover" />
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
