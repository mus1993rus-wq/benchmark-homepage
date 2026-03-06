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
      className="bg-[#1f2225] border-t border-white/[0.08] w-full"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
      }}
    >
      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row items-start justify-between px-8 lg:px-[240px] pt-8 lg:pt-[80px] pb-8 lg:pb-[64px] gap-8 lg:gap-0">
        {/* Brand column */}
        <div className="flex flex-col gap-5 lg:w-[440px]">
          <img
            src="/images/logo-footer.svg"
            alt="benchmark SPORTS"
            style={{ height: "20px", width: "263px" }}
          />
          <p className="text-[#818181] text-base leading-6 font-normal">
            Benchmark Sports is a multi-sport simulation platform for technique and performance.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 text-base leading-6 text-[#818181] font-normal">
          <div className="flex flex-col gap-2 w-[120px]">
            <p className="opacity-30">Sports</p>
            <Link to="/golf" className="hover:text-white transition-colors">Golf</Link>
            <Link to="/tennis" className="hover:text-white transition-colors">Tennis</Link>
            <Link to="/padel" className="hover:text-white transition-colors">Padel</Link>
            <Link to="/cricket" className="hover:text-white transition-colors">Cricket</Link>
          </div>

          <div className="flex flex-col gap-2 w-[120px]">
            <p className="opacity-30">Menu</p>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contacts</Link>
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>

          <div className="flex flex-col gap-2 w-[120px]">
            <p className="opacity-30">Follow Us</p>
            <a href="#" className="hover:text-white transition-colors">Linkedin</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center gap-4 py-4 w-full overflow-hidden">
        {/* Top divider */}
        <div className="w-full h-px bg-white/[0.08]" />

        {/* Ticker — infinite scrolling, alternating bold/light, seamless -50% loop */}
        <div className="hidden lg:block w-full overflow-hidden py-3">
          <p
            className="animate-ticker text-[48px] uppercase leading-none tracking-tight inline-block whitespace-nowrap"
            style={{ color: "#3c3e41" }}
          >
            {/* 6 identical units — at -50% (after unit 3) the view matches the start */}
            {[0,1,2,3,4,5].map((i) => (
              <span key={i}>
                <span className="font-black">Benchmark Sports&nbsp;&nbsp;</span>
                <span className="font-light">/&nbsp;&nbsp;Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;</span>
              </span>
            ))}
          </p>
        </div>

        {/* Bottom divider */}
        <div className="w-full h-px bg-white/[0.08]" />

        {/* Copyright */}
        <div className="flex items-center justify-between py-3 w-full px-8 lg:px-[240px]">
          <p className="text-white/50 text-sm leading-[18px] font-normal">
            2026 © Benchmark Sports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
