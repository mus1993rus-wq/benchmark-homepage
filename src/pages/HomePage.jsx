import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";

// ─── Scroll-reveal fade-in wrapper (doubleplay.studio style) ──────────────────
function FadeIn({ children, delay = 0, y = 32, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

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

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As user scrolls through the hero: text floats up slightly then fades
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55], [1, 1, 0]);

  // Image darkens on scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[443px] lg:h-[880px] overflow-hidden bg-gray-900"
    >
      <img
        src="/images/hero-bg.webp"
        alt="Athletes in motion"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Static gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))" }}
      />
      {/* Scroll-driven darkening overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-3 lg:px-6 pt-[40px] lg:pt-[431px]"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="w-full lg:w-[840px] flex flex-col gap-4 mb-0 lg:mb-[57px]">
          <h1 className="text-white font-bold text-[30px] leading-normal uppercase lg:font-extrabold lg:text-[64px] lg:leading-[80px]">
            Scaling the teaching of sports
          </h1>
          <p className="text-white font-bold text-[16px] lg:font-semibold lg:text-[18px] capitalize">
            Consumer applications that can teach hundreds of millions of people
          </p>
        </div>

        {/* Desktop feature icons */}
        <div className="hidden lg:flex items-start gap-6">
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
                  className="absolute bottom-0 left-0 right-0 p-6 rounded-[8px]"
                  style={{
                    background: "linear-gradient(to bottom, rgba(35,35,35,0) 0%, rgba(35,35,35,0.6) 100%)",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                  }}
                >
                  <div className="flex flex-col gap-4 text-white">
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
    <Link to={to} className="flex-1 rounded-[8px] overflow-hidden relative img-zoom group block">
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
        className="absolute bottom-0 left-0 right-0 p-6 rounded-[8px] flex gap-6 items-end"
        style={{ background: "linear-gradient(to bottom, rgba(35,35,35,0) 0%, rgba(35,35,35,0.6) 100%)", backdropFilter: "blur(30px)" }}
      >
        <div className="flex-1 flex flex-col gap-3 text-white">
          <p className="font-bold text-[24px] leading-[28px]">{sport}</p>
          <p className="font-normal text-[16px] leading-[24px]">{desc}</p>
        </div>
        <span className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-[4px] font-bold text-[16px] text-white leading-[20px] whitespace-nowrap bg-white/10 transition-colors hover:bg-white hover:text-black">
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
        className="absolute bottom-0 left-0 right-0 p-4 rounded-[8px] flex flex-col gap-4"
        style={{ background: "linear-gradient(to bottom, rgba(35,35,35,0) 0%, rgba(35,35,35,0.6) 100%)", backdropFilter: "blur(30px)" }}
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
              <FadeIn key={c.sport} delay={i * 0.1} className="flex-1">
                <SportCard {...c} />
              </FadeIn>
            ))}
          </div>
          <div className="flex gap-6 h-[420px]">
            {sports.slice(2, 4).map((c, i) => (
              <FadeIn key={c.sport} delay={i * 0.1} className="flex-1">
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
        <polyline points="3,8 6,11 13,4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

  const columnHeaders = [
    { logo: true,  subtitle: "Data-based, always-on coaching that adapts to you." },
    { title: "Human Coaches",       subtitle: "Strong influence, but depends on the person and schedule." },
    { title: "Expensive simulators", subtitle: "Cool metrics, but no clear fixes." },
    { title: "Video Content",        subtitle: "Cheap, but without personalization." },
  ];

  const tableRows = [
    [
      { check: "green", text: "Video Recording" },
      { check: "dark",  text: "The assessment is often subjective." },
      { check: "dark",  text: "They show the result but do not explain the reason." },
      { check: "dark",  text: "One content for all" },
    ],
    [
      { check: "green", text: "Analyzes" },
      { check: "dark",  text: "Progress may be uneven" },
      { check: "dark",  text: "Do not lead to steady improvement step by step." },
      { check: "dark",  text: "Without feedback on your movement." },
    ],
    [
      { check: "green", text: "Suggests specific fixes" },
      { check: "dark",  text: "The frequency of classes is limited by time, place." },
      { check: "dark",  text: "High price" },
      { check: "dark",  text: "You spend a lot of time" },
    ],
    [
      { check: "green", text: "Updates the plan with each session." },
      { check: "dark",  text: "Limited budget" },
      { check: "dark",  text: "Location binding" },
      { check: "dark",  text: "Little progress" },
    ],
    [
      { check: "green", text: "Detects movement patterns over time" },
      { check: false, text: "—" }, { check: false, text: "—" }, { check: false, text: "—" },
    ],
    [
      { check: "green", text: "Tracks progress session by session" },
      { check: false, text: "—" }, { check: false, text: "—" }, { check: false, text: "—" },
    ],
    [
      { check: "green", text: "Always available, no scheduling" },
      { check: false, text: "—" }, { check: false, text: "—" }, { check: false, text: "—" },
    ],
  ];

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
            {/* CSS grid: 4 equal columns — each row auto-sizes to its tallest cell */}
            <div
              className="grid min-w-[1200px] lg:min-w-0"
              style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}
            >
              {/* ── Column Headers ── */}
              {columnHeaders.map((col, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-[12px] items-center px-[16px] pt-[24px] pb-[16px] ${i === 0 ? "bg-[#1f2225] rounded-t-[4px]" : ""}`}
                >
                  <div className="h-[48px] flex items-center justify-center w-full">
                    {col.logo ? (
                      <img
                        src="/images/logo.svg"
                        alt="benchmark SPORTS"
                        className="brightness-0 invert"
                        style={{ height: "32px", width: "auto" }}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <p className="font-bold text-white text-[24px] leading-[28px] text-center">{col.title}</p>
                    )}
                  </div>
                  <p className="font-normal text-[#717171] text-[16px] leading-[24px] text-center">{col.subtitle}</p>
                </div>
              ))}

              {/* ── Data Rows ── */}
              {tableRows.map((row, rowIdx) =>
                row.map((cell, colIdx) => (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`flex gap-[16px] items-center px-[12px] py-[16px] w-full
                      ${colIdx === 0 ? "bg-[#1f2225]" : ""}
                      ${rowIdx < tableRows.length - 1 ? "border-b border-[#2d2f31]" : colIdx === 0 ? "rounded-b-[4px]" : ""}`}
                  >
                    {cell.check ? (
                      <>
                        {cell.check === "green" ? <CheckGreen /> : <CheckDark />}
                        <p className="flex-1 font-semibold text-[16px] text-white leading-[22px]">{cell.text}</p>
                      </>
                    ) : (
                      <p className="flex-1 font-semibold text-[16px] text-white leading-[20px] text-center">{cell.text}</p>
                    )}
                  </div>
                ))
              )}
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

  const Accordion = () => (
    <div className="flex flex-col gap-[24px]">
      <div className="h-px bg-white/20" />
      {steps.map((step, i) => (
        <div key={step.title}>
          <div
            className="flex gap-[16px] items-start justify-between cursor-pointer group"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            <div className="flex-1">
              <motion.p
                className="font-bold text-[24px] leading-[28px] text-white"
                animate={{ opacity: openIndex === i ? 1 : 0.4 }}
                transition={{ duration: 0.25 }}
              >
                {step.title}
              </motion.p>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="body"
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="font-normal text-[16px] leading-[24px] text-white whitespace-pre-line mt-4">
                      {step.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center mt-0.5"
              animate={{ opacity: openIndex === i ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            </motion.div>
          </div>
          <div className="h-px bg-white/20 mt-[24px]" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile */}
        <div className="flex flex-col gap-10 lg:hidden">
          <FadeIn>
            <ProcessImage className="w-full h-[349px]" />
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-8">
            <h2 className="font-bold text-white text-[32px] leading-[40px] capitalize">
              A simple process, built around technique.
            </h2>
            <Accordion />
          </FadeIn>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex gap-[64px] items-start">
          <FadeIn className="flex flex-col gap-[32px] w-[540px] flex-shrink-0">
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
      <AnnouncementBar />
      <div className="relative">
        <Header />
        <HeroSection />
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
