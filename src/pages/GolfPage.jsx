import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { FadeIn } from "../components/FadeIn";

function CheckItem({ title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="flex-shrink-0 flex items-center justify-center p-1 rounded-full"
        style={{ background: "#62d947" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polyline
            points="3,8 6,11 13,4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="font-bold text-[18px] text-white leading-[20px] mb-2">{title}</p>
        <p className="text-white/80 text-[16px] leading-[24px]">{desc}</p>
      </div>
    </div>
  );
}

function CollectionCard({ image, title, desc }) {
  return (
    <div className="flex-1 h-full relative rounded-[8px] overflow-hidden">
      {image}
      <div
        className="absolute inset-0 px-[24px] pb-[32px] rounded-[8px] flex flex-col justify-end gap-[16px]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        <p className="font-bold text-[24px] leading-[28px] text-white text-center">{title}</p>
        <p className="font-normal text-[16px] leading-[24px] text-white text-center">{desc}</p>
      </div>
    </div>
  );
}

const golfCards = [
  {
    title: "For beginners",
    desc: "Start with correct fundamentals. Avoid bad habits.",
    image: <img src="/images/golf-card1.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />,
  },
  {
    title: "For golfers who feel stuck",
    desc: "Stop guessing. Fix what's holding you back.",
    image: <img src="/images/golf-card2.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />,
  },
  {
    title: "For performance players",
    desc: "Dial in details. Track measurable improvement.",
    image: <img src="/images/golf-card3.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />,
  },
];

const featureTags = [
  { icon: "/images/golf-icon-1.svg", label: "Data-based, not opinion-based" },
  { icon: "/images/golf-icon-2.svg", label: "Always available" },
  { icon: "/images/golf-icon-3.svg", label: "Structured improvement system" },
  { icon: "/images/golf-icon-4.svg", label: "Scales with your progress" },
];

const stats = [
  { value: "500,000+", label: "Happy Golfers" },
  { value: "500,000,000+", label: "Golf Shots Recorded" },
  { value: "4.8", label: "Apple Store Rating", isStar: true },
  { value: "91%", label: "of Golfers see improvement within 14 days" },
];

// Phone screen data with locally hosted video files (downloaded from Instagram)
const phoneScreens = [
  { src: "/images/golf-screen-1.webp", isEdge: true,  videoUrl: "/videos/golf-screen-00001.mp4", title: "Swing Analysis" },
  { src: "/images/golf-screen-2.webp", isEdge: false, videoUrl: "/videos/golf-screen-00002.mp4", title: "Impact Feedback" },
  { src: "/images/golf-screen-3.webp", isEdge: false, videoUrl: "/videos/golf-screen-00003.mp4", title: "Session Overview" },
  { src: "/images/golf-screen-4.webp", isEdge: false, videoUrl: "/videos/golf-screen-00004.mp4", title: "Coaching Plan" },
  { src: "/images/golf-screen-5.webp", isEdge: false, videoUrl: "/videos/golf-screen-00005.mp4", title: "Progress Tracking" },
  { src: "/images/golf-screen-6.webp", isEdge: false, videoUrl: "/videos/golf-screen-00006.mp4", title: "Simulation Mode" },
  { src: "/images/golf-screen-7.webp", isEdge: true,  videoUrl: "/videos/golf-screen-00007.mp4", title: "Divot Analysis" },
];

// ─── Fullscreen Video Modal ──────────────────────────────────────────────────
function VideoModal({ screens, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const current = screens[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % screens.length);
  }, [screens.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + screens.length) % screens.length);
  }, [screens.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-semibold">
        {currentIndex + 1} / {screens.length}
      </div>

      {/* Prev button */}
      <button
        className="absolute left-4 lg:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30"
        onClick={goPrev}
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Video / Image content */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[400px] px-16 lg:px-0">
        <div className="relative w-full rounded-[20px] overflow-hidden bg-black" style={{ aspectRatio: "9/16", maxHeight: "75vh" }}>
          {current.videoUrl ? (
            <video
              key={current.videoUrl}
              src={current.videoUrl}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <>
              <img
                src={current.src}
                alt={current.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <p className="text-white font-bold text-lg text-center">{current.title}</p>
        <div className="flex gap-2 items-center">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="transition-all duration-300"
              style={{
                width: i === currentIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === currentIndex ? "white" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        className="absolute right-4 lg:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={goNext}
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Background click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>,
    document.body
  );
}

// ─── Phone Screen Card ────────────────────────────────────────────────────────
function PhoneScreen({ src, isEdge = false, onClick }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 rounded-[8px] bg-[#999] cursor-pointer group"
      style={{ width: "200px", height: "352px" }}
      onClick={onClick}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

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

export default function GolfPage() {
  const [videoModal, setVideoModal] = useState({ open: false, index: 0 });

  const openModal = (index) => setVideoModal({ open: true, index });
  const closeModal = () => setVideoModal({ open: false, index: 0 });

  const heroRef = useRef(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.45]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55], [1, 1, 0]);

  return (
    <div className="min-h-screen font-sans antialiased">
      {videoModal.open && (
        <VideoModal
          screens={phoneScreens}
          initialIndex={videoModal.index}
          onClose={closeModal}
        />
      )}

      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AnnouncementBar />

        {/* Hero */}
        <div ref={heroRef} className="relative overflow-hidden" style={{ flex: 1 }}>
          {/* Parallax image wrapper */}
          <motion.div
            className="absolute"
            style={{ top: "-4%", left: 0, right: 0, height: "108%", y: isDesktop ? imageY : 0 }}
          >
            <img
              src="/images/golf-hero-bg.webp"
              alt="Benchmark Golf"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))" }}
          />
          {/* Scroll-driven darkening — desktop only */}
          <motion.div
            className="absolute inset-0 z-10 bg-black"
            style={{ opacity: isDesktop ? overlayOpacity : 0 }}
          />
          <Header />
          {/* Text — scroll-driven on desktop, static on mobile */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 lg:px-6"
            style={{ y: isDesktop ? textY : 0, opacity: isDesktop ? textOpacity : 1 }}
          >
            <motion.div
              className="max-w-[860px] flex flex-col gap-4 items-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <h1 className="text-white font-extrabold text-[36px] leading-[44px] lg:text-[64px] lg:leading-[80px] uppercase">
                Golf Daddy By Benchmark Golf
              </h1>
              <p className="text-white text-[16px] leading-[24px] font-normal">
                AI-powered simulation &amp; swing feedback. No sensors. No guesswork.
              </p>
              <div className="mt-4">
                <a
                  href="https://golfdaddy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black font-bold px-8 lg:px-10 py-4 lg:py-5 rounded text-base hover:bg-gray-100 transition-colors inline-block"
                >
                  Visit Golf Daddy
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Dark section */}
      <div className="bg-[#171a1c]">

        {/* Feature Tags */}
        <section className="py-12 lg:py-16 px-4 lg:px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:flex gap-6 lg:items-start lg:justify-between">
            {featureTags.map((tag, i) => (
              <FadeIn key={tag.label} delay={i * 0.08}>
                <div className="flex flex-col gap-4 items-center text-center">
                  <div
                    className="flex items-center justify-center p-4 rounded-[45px]"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(32px)",
                      border: "1px solid rgba(255,255,255,0.24)",
                    }}
                  >
                    <img src={tag.icon} alt="" className="w-8 h-8" loading="lazy" decoding="async" />
                  </div>
                  <p className="font-semibold text-[15px] lg:text-[18px] text-white leading-[22px] lg:leading-[26px]">
                    {tag.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="h-px" style={{ background: "#2D2F31" }} />
        </div>

        {/* System Section */}
        <section className="py-12 lg:py-20 px-4 lg:px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <FadeIn className="w-full lg:flex-1">
              <div className="h-[280px] lg:h-[538px] rounded-[8px] overflow-hidden">
                <img
                  src="/images/golf-coaching.webp"
                  alt="Benchmark Golf Analysis"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="w-full lg:w-[570px] lg:flex-shrink-0">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="font-bold text-[32px] lg:text-[48px] text-white leading-[40px] lg:leading-[62px] capitalize">
                    Benchmark Golf System
                  </h2>
                  <p className="font-bold text-[18px] text-white leading-[20px]">
                    Hardware + App. Built to train anywhere.
                  </p>
                  <p className="font-normal text-[16px] text-white/80 leading-[24px]">
                    Benchmark Golf combines a smart training mat and AI-powered app
                    into one seamless system. Record real swings, simulate rounds,
                    analyze impact, and track progress — all with just your phone.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <CheckItem title="Swing Recording" desc="Capture unlimited real swings indoors or outdoors." />
                  <CheckItem title="Simulation" desc="Play realistic scenarios and test decision-making under pressure." />
                  <CheckItem title="Divot Analysis" desc="Understand ground interaction and strike quality across sessions." />
                  <CheckItem title="Coaching (Premium)" desc="Adaptive improvement plan built from your movement patterns." />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Adaptive Coaching */}
        <section className="px-4 lg:px-6 pb-12 lg:pb-20">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <FadeIn className="w-full lg:flex-1">
              <div className="flex flex-col gap-8 lg:gap-10">
                <div className="flex flex-col gap-6 text-white">
                  <h2 className="font-bold text-[32px] lg:text-[48px] text-white leading-[40px] lg:leading-[62px] capitalize">
                    Adaptive Coaching. Built From Real Swings.
                  </h2>
                  <p className="font-semibold text-[16px] text-white leading-[22px]">
                    Record your swing with just your phone. Benchmark analyzes
                    full-body movement and builds a step-by-step improvement plan
                    based on your actual patterns — not generic drills.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <CheckItem title="Unlimited swing recording" desc="Record every swing - on the range, at home, or indoors. No limits." />
                  <CheckItem title="Pattern detection across sessions" desc="We don't analyze one swing at a time. We identify patterns across your last sessions." />
                  <CheckItem title="Adaptive coaching plan" desc="Your plan updates as you improve - or regress. No static plans. Your coaching adapts as you do." />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="w-full lg:flex-1">
              <div className="h-[280px] lg:h-[538px] rounded-[8px] overflow-hidden relative">
                <img
                  src="/images/golf-system.webp"
                  alt="Adaptive Coaching"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}
                />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src="/images/golf-coaching-overlay.webp"
                    alt=""
                    className="absolute max-w-none"
                    style={{ height: "114.98%", left: "-41.56%", top: "-13.01%", width: "193.56%" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Built For Every Golfer */}
        <section className="px-4 lg:px-6 pb-12 lg:pb-20">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8 lg:gap-12">
            <FadeIn>
              <h2 className="font-bold text-[32px] lg:text-[52px] text-white text-center leading-[40px] lg:leading-[62px]">
                Built For Every Golfer
              </h2>
            </FadeIn>
            {/* Mobile: stacked */}
            <div className="flex flex-col gap-6 lg:hidden">
              {golfCards.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.08}>
                  <div className="relative rounded-[8px] overflow-hidden h-[400px]">
                    <CollectionCard image={card.image} title={card.title} desc={card.desc} />
                  </div>
                </FadeIn>
              ))}
            </div>
            {/* Desktop: row */}
            <div className="hidden lg:flex gap-6 h-[480px]">
              {golfCards.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.1} className="flex-1 h-full">
                  <CollectionCard image={card.image} title={card.title} desc={card.desc} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* White section — Become the best player + Stats */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 flex flex-col items-center gap-8 lg:gap-12">
          <FadeIn>
            <h2 className="font-bold text-[28px] lg:text-[48px] text-black text-center leading-[36px] lg:leading-[62px] max-w-[832px]">
              Become the best player in your sport without leaving home
            </h2>
          </FadeIn>
        </div>

        {/* Phone screens gallery — clickable, opens video modal */}
        <FadeIn delay={0.1} className="overflow-x-auto mt-8 lg:mt-12">
          <div className="flex gap-4 lg:gap-6 justify-start lg:justify-center px-4 lg:px-0" style={{ minWidth: "max-content" }}>
            {phoneScreens.map((screen, i) => (
              <PhoneScreen
                key={i}
                src={screen.src}
                isEdge={screen.isEdge}
                onClick={() => openModal(i)}
              />
            ))}
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 mt-8 lg:mt-12">
          <div className="grid grid-cols-2 lg:flex gap-8 lg:gap-10 lg:items-center lg:justify-between">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="flex flex-col gap-3 items-center text-center lg:w-[260px]">
                  <div className="flex gap-3 items-center justify-center">
                    {s.isStar && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffc32c">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    <p className="font-bold text-[24px] lg:text-[32px] text-black leading-[32px] lg:leading-[40px]">
                      {s.value}
                    </p>
                  </div>
                  <p className="font-semibold text-[14px] lg:text-[18px] text-black leading-[20px] lg:leading-[26px]">
                    {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
