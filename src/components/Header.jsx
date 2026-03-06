import { useState } from "react";
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

  return (
    <>
      {/* ─── Mobile Header (normal flow, pushes hero down) ─────────────────── */}
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

      {/* ─── Desktop Overlay — закривається по кліку поза меню ──────────────── */}
      {sportsOpen && (
        <div
          className="hidden lg:block fixed inset-0 z-20 backdrop-blur-[12px] bg-black/25"
          onClick={() => setSportsOpen(false)}
        />
      )}

      {/* ─── Desktop Header + Sports Dropdown ───────────────────────────────── */}
      <div
        className={`hidden lg:block w-full absolute top-0 left-0 z-30 transition-colors duration-300 ${sportsOpen ? "bg-white" : ""}`}
      >
        <header
          className="w-full flex items-center"
          style={!sportsOpen ? { background: "linear-gradient(to bottom, rgba(23,26,29,0.2), rgba(0,0,0,0))" } : {}}
        >
          <div className="w-full flex items-center justify-between px-[240px] py-[40px] pb-[48px] gap-[80px]">
            <nav className="flex items-center gap-16 justify-end flex-1">
              <div className="relative">
                <button
                  className={`nav-link font-bold text-base whitespace-nowrap transition-colors duration-300 flex items-center gap-1 ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                  onClick={() => setSportsOpen(!sportsOpen)}
                >
                  Sports
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                    className={`transition-transform duration-300 opacity-70 ${sportsOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
              </div>
              <Link
                to="/about"
                className={`nav-link font-bold text-base whitespace-nowrap transition-colors duration-300 ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
              >
                About Us
              </Link>
            </nav>

            <Link to="/" className="shrink-0">
              <img
                src="/images/logo.svg"
                alt="benchmark SPORTS"
                className={`transition-all duration-300 ${sportsOpen ? "brightness-0" : ""}`}
                style={{ height: '40px', width: '157.5px' }}
              />
            </Link>

            <nav className="flex items-center gap-16 flex-1">
              <Link
                to="/careers"
                className={`nav-link font-bold text-base whitespace-nowrap transition-colors duration-300 ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className={`nav-link font-bold text-base whitespace-nowrap transition-colors duration-300 ${sportsOpen ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
              >
                Contacts
              </Link>
            </nav>
          </div>
        </header>

        {/* Sports картки — плавна анімація через max-height + opacity */}
        <div
          className={`w-full bg-white overflow-hidden transition-all duration-300 ease-out ${
            sportsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="pb-[60px]">
            <div className="flex gap-[16px] items-center mx-auto w-[1200px] h-[380px]">
              {sportsItems.map((sport) => (
                <Link
                  key={sport.to}
                  to={sport.to}
                  className="relative flex-1 h-full rounded-[8px] overflow-hidden block img-zoom"
                  onClick={() => setSportsOpen(false)}
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
      </div>
    </>
  );
}
