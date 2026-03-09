import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export function Footer({ onHeightChange }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (footerRef.current) onHeightChange?.(footerRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (footerRef.current) ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, [onHeightChange]);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1f2225] border-t border-white/[0.08] w-full lg:fixed lg:bottom-0 lg:left-0 lg:right-0"
      style={{ zIndex: 0 }}
    >
      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row items-start justify-between px-8 lg:px-[240px] pt-[40px] lg:pt-[80px] pb-8 lg:pb-[64px] gap-[40px] lg:gap-0">
        {/* Brand column */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:w-[440px]">
          <img
            src="/images/logo-footer.svg"
            alt="benchmark SPORTS"
            style={{ height: "20px", width: "263px" }}
            loading="lazy"
            decoding="async"
          />
          <p className="text-[#717171] text-base leading-6 font-normal">
            Benchmark Sports is a multi-sport simulation platform for technique and performance.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex flex-row lg:flex-row gap-[24px] lg:gap-10 text-base leading-6 font-normal">
          {/* Sports — visible on mobile & desktop */}
          <div className="flex flex-col gap-[8px] lg:gap-2 flex-1 lg:flex-none lg:w-[120px]">
            <p className="text-[#717171]">Sports</p>
            <Link to="/golf" className="text-white hover:text-white/70 transition-colors">Golf</Link>
            <Link to="/tennis" className="text-white hover:text-white/70 transition-colors">Tennis</Link>
            <Link to="/padel" className="text-white hover:text-white/70 transition-colors">Padel</Link>
            <Link to="/cricket" className="text-white hover:text-white/70 transition-colors">Cricket</Link>
          </div>

          {/* Menu — hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex flex-col gap-2 w-[120px]">
            <p className="text-[#717171]">Menu</p>
            <Link to="/about" className="text-[#818181] hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="text-[#818181] hover:text-white transition-colors">Contacts</Link>
            <Link to="/careers" className="text-[#818181] hover:text-white transition-colors">Careers</Link>
          </div>

          {/* Follow Us — visible on mobile & desktop */}
          <div className="flex flex-col gap-[8px] lg:gap-2 flex-1 lg:flex-none lg:w-[120px]">
            <p className="text-[#717171]">Follow Us</p>
            <a href="#" className="text-white hover:text-white/70 transition-colors">Linkedin</a>
            <a href="#" className="text-white hover:text-white/70 transition-colors">Instagram</a>
            <a href="#" className="text-white hover:text-white/70 transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center w-full overflow-hidden bg-[#171a1c] lg:bg-transparent">
        {/* Dividers + ticker — desktop only */}
        <div className="hidden lg:flex flex-col items-center gap-4 py-4 w-full">
          <div className="w-full h-px bg-white/[0.08]" />
          <div className="w-full overflow-hidden py-3">
            <p
              className="animate-ticker text-[48px] uppercase leading-none tracking-tight inline-block whitespace-nowrap"
              style={{ color: "#3c3e41" }}
            >
              {[0,1,2,3,4,5].map((i) => (
                <span key={i}>
                  <span className="font-black">Benchmark Sports&nbsp;&nbsp;</span>
                  <span className="font-light">/&nbsp;&nbsp;Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                </span>
              ))}
            </p>
          </div>
          <div className="w-full h-px bg-white/[0.08]" />
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center py-4 lg:py-3 w-full px-8 lg:px-[240px]">
          <p className="text-white/50 text-sm leading-[18px] font-normal">
            2026 © Benchmark Sports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
