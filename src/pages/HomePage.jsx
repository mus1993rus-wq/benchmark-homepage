import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { FadeIn } from "../components/FadeIn";

// ─── Habito-style double-arrow button label ───────────────────────────────────
// Two arrows inside an overflow:hidden wrapper — on group-hover, they slide so
// the first arrow exits right and the second arrow enters from the left.
function ArrowLabel({ children, className = "" }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {children}
      <span className="overflow-hidden w-[14px] h-[14px] flex-shrink-0 inline-flex items-center justify-start">
        <span className="flex transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-x-[14px]">
          <svg className="w-[14px] h-[14px] flex-shrink-0" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="w-[14px] h-[14px] flex-shrink-0" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </span>
    </span>
  );
}

// ─── Desktop-only media hook ──────────────────────────────────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.45]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section ref={sectionRef} className="absolute inset-0 overflow-hidden bg-gray-900">
      {/* Parallax image wrapper — 108% tall for minimal zoom */}
      <motion.div
        className="absolute"
        style={{ top: "-4%", left: 0, right: 0, height: "108%", y: isDesktop ? imageY : 0 }}
      >
        <img
          src="/images/hero-bg.webp"
          alt="Athletes in motion"
          className="w-full h-full object-cover object-[center_20%] lg:object-center"
        />
      </motion.div>
      {/* Static gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)" }}
      />
      {/* Scroll-driven darkening — desktop only */}
      <motion.div
        className="absolute inset-0 z-10 bg-black"
        style={{ opacity: isDesktop ? overlayOpacity : 0 }}
      />

      {/* Hero text — scroll-driven on desktop, static on mobile */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center lg:justify-end text-center px-4 lg:px-6 lg:pb-16 pt-[64px] lg:pt-0"
        style={{ y: isDesktop ? textY : 0, opacity: isDesktop ? textOpacity : 1 }}
      >
        <div className="flex flex-col items-center w-full">
          <div className="w-full lg:w-[840px] flex flex-col gap-4 mb-0 lg:mb-[57px]">
            <motion.h1
              className="text-white font-bold text-[30px] leading-normal uppercase lg:font-extrabold lg:text-[64px] lg:leading-[80px]"
              initial={isDesktop ? { opacity: 0, y: 28 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            >
              Scaling the teaching of sports
            </motion.h1>
            <motion.p
              className="text-white font-bold text-[16px] lg:font-semibold lg:text-[18px] capitalize"
              initial={isDesktop ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
            >
              Consumer applications that can teach hundreds of millions of people
            </motion.p>
          </div>

          {/* Desktop feature icons */}
          <motion.div
            className="hidden lg:flex items-start gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 }}
          >
            <FeatureIcon
              icon={<img src="/images/icon-wearable.svg" alt="" className="w-8 h-8" loading="lazy" decoding="async" />}
              label="No wearables"
              dark
            />
            <FeatureIcon
              icon={<img src="/images/icon-camera.svg" alt="" className="w-8 h-8" loading="lazy" decoding="async" />}
              label={<>Just your camera<br />and real swings.</>}
              dark
            />
            <FeatureIcon
              icon={<img src="/images/icon-sensor.svg" alt="" className="w-8 h-8" loading="lazy" decoding="async" />}
              label="No sensors"
              dark
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function FeatureIcon({ icon, label, dark = true }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full lg:w-[180px]">
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full border backdrop-blur-[32px] p-4 overflow-hidden"
        style={{
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          borderColor: dark ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.24)",
        }}
      >
        {icon}
      </div>
      <p className={`font-semibold text-[18px] text-center leading-[26px] ${dark ? "text-white" : "text-black"}`}>
        {label}
      </p>
    </div>
  );
}

// ─── Mobile Feature Icons Section ────────────────────────────────────────────
function MobileFeatureSection() {
  const features = [
    { icon: "/images/icon-wearable.svg", label: "No wearables" },
    { icon: "/images/icon-camera.svg", label: "Just your camera and real swings." },
    { icon: "/images/icon-sensor.svg", label: "No sensors" },
  ];

  return (
    <section className="lg:hidden bg-[#171a1c] py-10 px-5 flex flex-col gap-6">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-[32px] p-3"
            style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.24)" }}
          >
            <img src={f.icon} alt="" className="w-6 h-6" loading="lazy" decoding="async" />
          </div>
          <p className="font-semibold text-[18px] text-white leading-[26px]">{f.label}</p>
        </div>
      ))}
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 600, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return count;
}

function StatItem({ target, suffix, label, started }) {
  const count = useCountUp(target, 600, started);
  return (
    <div className="flex-1 text-center w-full">
      <p className="font-bold text-[#0f1010] text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px] capitalize mb-3">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-black font-semibold text-[18px] leading-[26px]">{label}</p>
    </div>
  );
}

function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 500000, suffix: "+", label: "Happy Players" },
    { target: 500000000, suffix: "+", label: "Video Analysis" },
    { target: 78, suffix: "%", label: "Users train again within 7 days" },
  ];

  return (
    <section ref={ref} className="bg-white py-12 lg:py-16 px-4 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <p className="text-center text-[#717171] font-bold text-[18px] leading-normal mb-10">
            Trusted by athletes who put in the work.
          </p>
        </FadeIn>
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="flex-1 w-full">
              <StatItem {...s} started={started} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Collection Cards Section ─────────────────────────────────────────────────
function CollectionSection() {
  const cards = [
    {
      title: "One platform. Many sports",
      desc: "Same training experience across golf, tennis, padel, cricket and more.",
      image: <img src="/images/home-card-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />,
    },
    {
      title: "Train anywhere. Learn from every rep",
      desc: "Use your phone to capture motion, find patterns, and get clear next steps.",
      image: <img src="/images/home-card-2.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />,
    },
    {
      title: 'Built to scale, not to \u201ccoach harder\u201d',
      desc: "Coaching becomes a product: consistent, measurable, always improving.",
      image: <img src="/images/home-card-3.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />,
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-20 px-4 lg:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 items-center">
        <FadeIn className="text-center w-full lg:w-[800px] flex flex-col gap-4">
          <h2 className="font-bold text-[#0f1010] text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px] capitalize">
            What Benchmark Sports is
          </h2>
          <p className="font-normal text-black text-[16px] leading-[24px]">
            Benchmark Sports is a multi-sport simulation platform for technique and performance.
          </p>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1} className="lg:flex-1">
              <div className="relative rounded-[8px] overflow-hidden h-[480px]">
                {card.image}
                <div
                  className="absolute inset-0 rounded-[8px] flex flex-col justify-end pb-[32px] px-[24px]"
                  style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
                  }}
                >
                  <div className="flex flex-col gap-4 text-white text-center">
                    <p className="font-bold text-[24px] leading-[28px]">{card.title}</p>
                    <p className="font-normal text-[16px] leading-[24px]">{card.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sports Products Section ──────────────────────────────────────────────────
const sports = [
  { img: "/images/sports-golf.webp",    badge: null,          sport: "Benchmark Golf",    desc: "Golf-at-home simulator + coaching",         to: "/golf" },
  { img: "/images/sports-tennis.webp",  badge: "Coming soon", sport: "Benchmark Tennis",  desc: "Racket technique analysis + drills",         to: "/tennis" },
  { img: "/images/sports-padel.webp",   badge: "Coming soon", sport: "Benchmark Padel",   desc: "Real-time swing & positioning feedback",    to: "/padel" },
  { img: "/images/sports-cricket.webp", badge: "Coming soon", sport: "Benchmark Cricket", desc: "Batting motion & timing analysis",           to: "/cricket" },
];

function SportCard({ img, badge, sport, desc, to }) {
  const isComingSoon = !!badge;
  return (
    <Link to={to} className="h-full w-full rounded-[8px] overflow-hidden relative img-zoom group block">
      <img
        src={img}
        alt={sport}
        className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-300${isComingSoon ? " group-hover:[filter:grayscale(0.5)]" : ""}`}
        loading="lazy"
        decoding="async"
      />
      {badge && (
        <div className="absolute top-6 left-6 flex items-center justify-center px-3 py-1.5 rounded" style={{ background: "#30393e", backdropFilter: "blur(24px)" }}>
          <span className="font-bold text-[#ffc32c] text-[16px] leading-[20px] whitespace-nowrap">{badge}</span>
        </div>
      )}
      <div
        className="absolute inset-0 rounded-[8px] flex gap-6 items-end pb-[32px] px-[24px]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)" }}
      >
        <div className="flex-1 flex flex-col gap-3 text-white">
          <p className="font-bold text-[24px] leading-[28px]">{sport}</p>
          <p className="font-normal text-[16px] leading-[24px]">{desc}</p>
        </div>
        <span className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-[4px] font-bold text-[16px] text-white leading-[20px] whitespace-nowrap border border-white bg-transparent transition-colors hover:bg-white hover:text-black">
          <ArrowLabel>Learn More</ArrowLabel>
        </span>
      </div>
    </Link>
  );
}

function SportCardMobile({ img, badge, sport, desc, to }) {
  const isComingSoon = !!badge;
  return (
    <Link to={to} className="rounded-[8px] overflow-hidden relative h-[400px] img-zoom group block">
      <img
        src={img}
        alt={sport}
        className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-300${isComingSoon ? " group-hover:[filter:grayscale(0.5)]" : ""}`}
        loading="lazy"
        decoding="async"
      />
      {badge && (
        <div className="absolute top-6 left-6 flex items-center justify-center px-3 py-1.5 rounded" style={{ background: "#30393e", backdropFilter: "blur(24px)" }}>
          <span className="font-bold text-[#ffc32c] text-[16px] leading-[20px] whitespace-nowrap">{badge}</span>
        </div>
      )}
      <div
        className="absolute inset-0 rounded-[8px] flex flex-col justify-end gap-4 pb-[24px] px-[16px]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)" }}
      >
        <div className="flex flex-col gap-3 text-white">
          <p className="font-bold text-[24px] leading-[28px]">{sport}</p>
          <p className="font-normal text-[16px] leading-[24px]">{desc}</p>
        </div>
        <span className="flex items-center justify-center px-6 py-4 rounded-[4px] font-bold text-[16px] text-black leading-[20px] bg-white w-full group">
          <ArrowLabel>Learn More</ArrowLabel>
        </span>
      </div>
    </Link>
  );
}

function SportsProductsSection() {
  return (
    <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn className="text-center mb-10 lg:mb-14 flex flex-col gap-4 items-center">
          <h2 className="font-bold text-white text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px] capitalize">
            Sports products
          </h2>
          <p className="font-normal text-[#818181] text-[16px] leading-[24px]">
            Built on the same engine. Tailored to each sport.
          </p>
        </FadeIn>

        {/* Mobile: all stacked */}
        <div className="flex flex-col gap-6 lg:hidden">
          {sports.map((c, i) => (
            <FadeIn key={c.sport} delay={i * 0.08}>
              <SportCardMobile {...c} />
            </FadeIn>
          ))}
        </div>

        {/* Desktop: 2×2 grid */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="flex gap-6 h-[420px]">
            {sports.slice(0, 2).map((c, i) => (
              <FadeIn key={c.sport} delay={i * 0.1} className="flex-1 h-full">
                <SportCard {...c} />
              </FadeIn>
            ))}
          </div>
          <div className="flex gap-6 h-[420px]">
            {sports.slice(2, 4).map((c, i) => (
              <FadeIn key={c.sport} delay={i * 0.1} className="flex-1 h-full">
                <SportCard {...c} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison Section ───────────────────────────────────────────────────────
function ComparisonSection() {
  const CheckGreen = () => (
    <div className="flex-shrink-0 w-[24px] h-[24px] rounded-full bg-[#62d947] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="3,8 6,11 13,4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const CheckDark = () => (
    <div className="flex-shrink-0 w-[24px] h-[24px] rounded-full bg-[#30393e] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="3,8 6,11 13,4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const benchmarkRows = [
    "Video Recording",
    "Analyzes",
    "Suggests specific fixes",
    "Updates the plan with each session",
    "Detects movement patterns over time",
    "Tracks progress session by session",
    "Always available, no scheduling",
  ];

  const competitors = [
    {
      title: "Human Coaches",
      subtitle: "Strong influence, but depends on the person and schedule.",
      rows: [
        "The assessment is often subjective",
        "Progress may be uneven",
        "The frequency of classes is limited by time, place",
        "Limited budget",
      ],
    },
    {
      title: "Expensive simulators",
      subtitle: "Great metrics, but they rarely turn numbers into a clear next step.",
      rows: [
        "They show the result but do not explain the reason",
        "Do not lead to steady improvement step by step",
        "High price",
        "Location binding",
      ],
    },
    {
      title: "Video Content",
      subtitle: "Endless advice, but no feedback loop for your specific mistakes.",
      rows: [
        "One content for all",
        "Without feedback on your movement",
        "You spend a lot of time",
        "Little progress",
      ],
    },
  ];

  const totalRows = benchmarkRows.length; // 7

  return (
    <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6 border-t border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn className="max-w-[800px] mx-auto text-center mb-10 lg:mb-16 flex flex-col gap-4 items-center">
          <h2 className="font-bold text-white text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px]">
            Why this wins vs traditional coaching
          </h2>
          <p className="font-normal text-[#818181] text-[16px] leading-[24px]">
            Benchmark turns training into a system: you see the movement, understand the reason behind it, receive a plan, and progress faster.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Scrollable on mobile */}
          <div className="overflow-x-auto -mx-3 px-3 lg:mx-0 lg:px-0">
            {/* 4 independent flex columns side-by-side, gap-[4px] between them */}
            <div className="flex gap-[24px] lg:gap-[24px] min-w-[1200px] lg:min-w-0">

              {/* ── Benchmark column ── */}
              <div className="flex-1 bg-[#1f2225] rounded-[4px] flex flex-col">
                {/* Header */}
                <div className="flex flex-col gap-[12px] items-center px-[16px] pt-[24px] pb-[16px]">
                  <div className="h-[48px] flex items-center justify-center w-full">
                    <img
                      src="/images/logo.svg"
                      alt="benchmark SPORTS"
                      className="brightness-0 invert"
                      style={{ height: "32px", width: "auto" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-normal text-[#717171] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-center">
                    Data-based, always-on coaching that adapts to you.
                  </p>
                </div>
                {/* Rows */}
                <div className="flex flex-col px-[4px] pb-[4px]">
                  {benchmarkRows.map((row, i) => (
                    <div
                      key={i}
                      className={`flex gap-[10px] lg:gap-[12px] items-center px-[10px] lg:px-[12px] h-[64px] ${
                        i < benchmarkRows.length - 1 ? "border-b border-[#2d2f31]" : ""
                      }`}
                    >
                      <CheckGreen />
                      <p className="flex-1 font-semibold text-[14px] lg:text-[14px] text-white leading-[20px] lg:leading-[20px]">
                        {row}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Competitor columns ── */}
              {competitors.map((col) => (
                <div key={col.title} className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex flex-col gap-[12px] items-center px-[16px] pt-[24px] pb-[16px]">
                    <div className="h-[48px] flex items-center justify-center w-full">
                      <p className="font-bold text-white text-[16px] lg:text-[20px] leading-[22px] lg:leading-[26px] text-center">
                        {col.title}
                      </p>
                    </div>
                    <p className="font-normal text-[#717171] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-center">
                      {col.subtitle}
                    </p>
                  </div>
                  {/* Active rows */}
                  <div className="flex flex-col">
                    {col.rows.map((row, i) => (
                      <div
                        key={i}
                        className={`flex gap-[10px] lg:gap-[12px] items-center px-[10px] lg:px-[12px] h-[64px] ${
                          i < totalRows - 1 ? "border-b border-[#2d2f31]" : ""
                        }`}
                      >
                        <CheckDark />
                        <p className="flex-1 font-semibold text-[14px] lg:text-[14px] text-white leading-[20px] lg:leading-[20px]">
                          {row}
                        </p>
                      </div>
                    ))}
                    {/* Dash rows for remaining slots */}
                    {Array.from({ length: totalRows - col.rows.length }).map((_, di) => (
                      <div
                        key={`dash-${di}`}
                        className={`flex items-center justify-center px-[10px] lg:px-[12px] h-[64px] ${
                          col.rows.length + di < totalRows - 1 ? "border-b border-[#2d2f31]" : ""
                        }`}
                      >
                        <p className="font-semibold text-[16px] text-[#818181] leading-[20px]">—</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────
function ProcessSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const steps = [
    {
      title: "Record real reps",
      body: "Any range. Any court. Indoors or outdoors.\nSet up your phone and capture real movement in real conditions — not a studio simulation. Train where you actually play and build technique that transfers to the game.",
      image: { src: "/images/process-image.webp", bg: "/images/process-bg.webp", offset: { width: "115.44%", height: "115.44%", left: "-13.76%", top: "-13.93%" } },
    },
    {
      title: "Understand what's actually happening",
      body: "The platform breaks down your movement frame by frame, identifies technique issues, and explains the mechanics behind them in plain language.",
      image: { src: "/images/process-step2.webp", bg: null, offset: null },
    },
    {
      title: "Fix with a plan",
      body: "Get a personalised training plan with specific drills tailored to your movement. Every session updates the plan based on your progress.",
      image: { src: "/images/process-step3.webp", bg: null, offset: { width: "114.77%", height: "114.77%", left: "-11.83%", top: "-7.38%" } },
    },
  ];

  const activeImage = openIndex >= 0 ? steps[openIndex].image : steps[0].image;

  const ProcessImage = ({ className }) => (
    <div className={`rounded-[8px] overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 bg-[#515151] rounded-[8px]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={openIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {activeImage.bg && (
            <img src={activeImage.bg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[8px]" loading="lazy" decoding="async" />
          )}
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            {activeImage.offset ? (
              <img
                src={activeImage.src}
                alt="Training"
                className="absolute"
                style={{ width: activeImage.offset.width, height: activeImage.offset.height, left: activeImage.offset.left, top: activeImage.offset.top, maxWidth: "none", objectFit: "cover" }}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <img src={activeImage.src} alt="Training" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const Accordion = ({ showImage = false }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return (
      <div className="flex flex-col gap-[24px]">
        {steps.map((step, i) => {
          const isActive = openIndex === i;
          const isHovered = hoveredIndex === i;
          return (
            <div key={step.title}>
              <div
                className="flex gap-[16px] items-start justify-between cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex-1">
                  <motion.p
                    className="font-bold text-[24px] leading-[28px] text-white"
                    initial={{ opacity: isActive ? 1 : 0.4 }}
                    animate={{ opacity: isActive || isHovered ? 1 : 0.4 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {step.title}
                  </motion.p>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      // Outer: clips height — "wipe open" effect
                      <motion.div
                        key="body"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        {/* Inner: content fades + slides up, slightly delayed */}
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        >
                          {showImage && (
                            <div className="mt-4 mb-4">
                              <ProcessImage className="w-full h-[260px]" />
                            </div>
                          )}
                          <p className="font-normal text-[16px] leading-[24px] text-white whitespace-pre-line mt-4">
                            {step.body}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.div
                  className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center mt-0.5"
                  initial={{ opacity: isActive ? 1 : 0.3 }}
                  animate={{ opacity: isActive || isHovered ? 1 : 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    initial={false}
                    variants={{
                      open:   { rotate: 45, transition: { duration: 0.4,  ease: [0.34, 1.56, 0.64, 1] } },
                      closed: { rotate: 0,  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
                    }}
                    animate={isActive ? "open" : "closed"}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </motion.svg>
                </motion.div>
              </div>
              {i < steps.length - 1 && <div className="h-px bg-white/20 mt-[24px]" />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile */}
        <div className="flex flex-col gap-10 lg:hidden">
          <FadeIn className="flex flex-col gap-8">
            <h2 className="font-bold text-white text-[32px] leading-[40px] capitalize">
              A simple process, built around technique.
            </h2>
            <Accordion showImage />
          </FadeIn>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex gap-[64px] items-start">
          <FadeIn className="flex flex-col gap-[40px] w-[540px] flex-shrink-0">
            <h2 className="font-bold text-white text-[48px] leading-[62px] capitalize">
              A simple process, built around technique.
            </h2>
            <Accordion />
          </FadeIn>
          <FadeIn delay={0.2} className="flex-1">
            <ProcessImage className="h-[596px]" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      {/* Hero block — 480px on mobile (40px bar + 64px header + 376px image), 100vh on desktop */}
      <div className="h-[480px] lg:h-screen flex flex-col">
        <AnnouncementBar />
        <div className="relative overflow-hidden" style={{ flex: 1 }}>
          <Header />
          <HeroSection />
        </div>
      </div>
      <MobileFeatureSection />
      <StatsSection />
      <CollectionSection />
      <SportsProductsSection />
      <ComparisonSection />
      <ProcessSection />
    </div>
  );
}
