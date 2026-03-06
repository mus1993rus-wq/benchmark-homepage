import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerRef = useRef(null);
  const [height, setHeight] = useState(420);

  useEffect(() => {
    const measure = () => {
      if (footerRef.current) {
        setHeight(footerRef.current.offsetHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (footerRef.current) ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/*
        Spacer — займає місце футера в потоці документа.
        Прозорий, щоб через нього проглядався зафіксований футер знизу.
      */}
      <div style={{ height }} aria-hidden="true" />

      {/*
        Сам футер — position: fixed знизу, z-index: 0.
        Контент сторінки (z-index: 1) ковзає поверх нього.
        Коли контент доскролюється до spacer-а — футер "відкривається".
      */}
      <footer
        ref={footerRef}
        className="bg-[#1f2225] border-t border-white/[0.08] w-full"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 0 }}
      >
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between px-8 lg:px-[240px] pt-8 lg:pt-[80px] pb-8 lg:pb-[80px] gap-8 lg:gap-0">
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
          <div className="flex gap-8 lg:gap-10 text-base leading-6 text-[#818181] font-normal">
            {/* Sports column */}
            <div className="flex flex-col gap-2 w-[120px]">
              <p className="opacity-30">Sports</p>
              <Link to="/golf" className="hover:text-white transition-colors">Golf</Link>
              <Link to="/tennis" className="hover:text-white transition-colors">Tennis</Link>
              <Link to="/padel" className="hover:text-white transition-colors">Padel</Link>
              <Link to="/cricket" className="hover:text-white transition-colors">Cricket</Link>
            </div>

            {/* Menu column */}
            <div className="flex flex-col gap-2 w-[120px]">
              <p className="opacity-30">Menu</p>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contacts</Link>
              <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
            </div>

            {/* Follow Us column */}
            <div className="flex flex-col gap-2 w-[120px]">
              <p className="opacity-30">Follow Us</p>
              <a href="#" className="hover:text-white transition-colors">Linkedin</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#171a1c] flex flex-col items-center overflow-hidden py-4 w-full">
          {/* Ticker — desktop only */}
          <div className="hidden lg:flex py-3 w-full items-center justify-center overflow-hidden">
            <p className="animate-ticker text-[rgba(255,255,255,0.08)] text-[48px] font-black uppercase whitespace-nowrap leading-none tracking-tight">
              Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;Benchmark Sports&nbsp;&nbsp;/&nbsp;&nbsp;
            </p>
          </div>

          <div className="hidden lg:block w-full h-px bg-white/[0.08]" />

          {/* Copyright */}
          <div className="flex items-center justify-between py-3 w-full px-8 lg:px-[240px]">
            <p className="text-white/50 text-sm leading-[18px] font-normal">
              2026 © Benchmark Sports. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
