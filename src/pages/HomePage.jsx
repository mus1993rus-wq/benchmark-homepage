import { useState } from "react";
import { Link } from "react-router-dom";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full h-[443px] lg:h-[880px] overflow-hidden bg-gray-900">
      <img
        src="/images/hero-bg.png"
        alt="Athletes in motion"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))" }}
      />
      <div className="relative z-20 flex flex-col items-center text-center px-3 lg:px-6 pt-[94px] lg:pt-[431px]">
        <div className="w-full lg:w-[840px] flex flex-col gap-4 mb-0 lg:mb-[57px]">
          <h1 className="text-white font-bold text-[48px] leading-[62px] capitalize lg:font-extrabold lg:text-[64px] lg:leading-[80px] lg:uppercase">
            Scaling the teaching of sports
          </h1>
          <p className="text-white font-bold text-[16px] lg:font-semibold lg:text-[18px] lg:capitalize">
            Consumer applications that can teach hundreds of millions of people
          </p>
        </div>

        {/* Desktop feature icons (inside hero, white text) */}
        <div className="hidden lg:flex items-start gap-6">
          <FeatureIcon
            icon={<img src="/images/icon-wearable.svg" alt="" className="w-8 h-8" />}
            label="No wearables"
            dark
          />
          <FeatureIcon
            icon={<img src="/images/icon-camera.svg" alt="" className="w-8 h-8" />}
            label={<>Just your camera<br />and real swings.</>}
            dark
          />
          <FeatureIcon
            icon={<img src="/images/icon-sensor.svg" alt="" className="w-8 h-8" />}
            label="No sensors"
            dark
          />
        </div>
      </div>
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

// ─── Mobile Feature Icons Section (below hero, white bg) ─────────────────────
function MobileFeatureSection() {
  const features = [
    { icon: "/images/icon-wearable.svg", label: "No wearables" },
    { icon: "/images/icon-camera.svg", label: <>Just your camera<br />and real swings.</> },
    { icon: "/images/icon-sensor.svg", label: "No sensors" },
  ];

  return (
    <section className="lg:hidden bg-white py-10 px-3 flex flex-col gap-6 items-center">
      {features.map((f, i) => (
        <FeatureIcon
          key={i}
          icon={<img src={f.icon} alt="" className="w-8 h-8" />}
          label={f.label}
          dark={false}
        />
      ))}
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { value: "500,000+", label: "Happy Players" },
    { value: "500,000,000+", label: "Video Analysis" },
    { value: "78%", label: "Users train again within 7 days" },
  ];

  return (
    <section className="bg-white py-16 px-3 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-center text-[#818181] font-bold text-[18px] leading-normal mb-10">
          Trusted by athletes who put in the work.
        </p>
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 text-center">
              <p className="font-bold text-[#0f1010] text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px] capitalize mb-3">
                {s.value}
              </p>
              <p className="text-black font-semibold text-[18px] leading-[26px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Collection Cards Section ("What Benchmark Sports is") ───────────────────
function CollectionSection() {
  const cards = [
    {
      title: "Movement First",
      desc: "We measure how you move — not just where the ball goes.",
      image: (
        <img src="/images/home-card-1.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      ),
    },
    {
      title: "Structured Progression",
      desc: "Every session builds on the last. No random drills.",
      image: (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/home-card-2.png"
            alt=""
            className="absolute max-w-none"
            style={{ height: "115.67%", left: "-8.11%", top: "-13.19%", width: "183.62%" }}
          />
        </div>
      ),
    },
    {
      title: "Platform, Not Product",
      desc: "One core engine. Multiple sports. Consistent experience.",
      image: (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <img src="/images/home-card-3.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/home-card-3b.png"
              alt=""
              className="absolute max-w-none"
              style={{ height: "101.48%", left: "-8.34%", top: "-0.75%", width: "116.67%" }}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <section className="bg-white py-20 px-3 lg:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 items-center">
        <div className="text-center w-full lg:w-[800px] flex flex-col gap-4">
          <h2 className="font-bold text-[#0f1010] text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px] capitalize">
            What Benchmark Sports is
          </h2>
          <p className="font-normal text-black text-[16px] leading-[24px]">
            Benchmark Sports is a multi-sport simulation platform for technique and performance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {cards.map((card) => (
            <div key={card.title} className="lg:flex-1 relative rounded-[8px] overflow-hidden h-[480px] img-zoom">
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sports Products Section ──────────────────────────────────────────────────
const sports = [
  { img: "/images/sports-golf.png", badge: null, sport: "Benchmark Golf", desc: "Golf-at-home simulator + coaching", to: "/golf" },
  { img: "/images/sports-tennis.png", badge: "Coming soon", sport: "Benchmark Tennis", desc: "Racket technique analysis + drills", to: "/tennis" },
  { img: "/images/sports-padel.png", badge: "Coming soon", sport: "Benchmark Padel", desc: "Real-time swing & positioning feedback", to: "/padel" },
  { img: "/images/sports-cricket.png", badge: "Coming soon", sport: "Benchmark Cricket", desc: "Batting motion & timing analysis", to: "/cricket" },
];

function SportCard({ img, badge, sport, desc, to }) {
  return (
    <div className="flex-1 rounded-[8px] overflow-hidden relative img-zoom">
      <img src={img} alt={sport} className="absolute inset-0 w-full h-full object-cover" />
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
        <Link to={to} className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-[4px] font-bold text-[16px] text-white leading-[20px] whitespace-nowrap bg-white/10 transition-colors hover:bg-white hover:text-black">
          Learn More
        </Link>
      </div>
    </div>
  );
}

function SportCardMobile({ img, badge, sport, desc, to }) {
  return (
    <div className="rounded-[8px] overflow-hidden relative h-[400px] img-zoom">
      <img src={img} alt={sport} className="absolute inset-0 w-full h-full object-cover" />
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
        <Link to={to} className="flex items-center justify-center px-6 py-4 rounded-[4px] font-bold text-[16px] text-black leading-[20px] bg-white w-full transition-colors hover:bg-white hover:text-black">
          Learn More
        </Link>
      </div>
    </div>
  );
}

function SportsProductsSection() {
  return (
    <section className="bg-[#171a1c] py-20 px-3 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14 flex flex-col gap-4 items-center">
          <h2 className="font-bold text-white text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px] capitalize">
            Sports products
          </h2>
          <p className="font-normal text-[#818181] text-[16px] leading-[24px]">
            Built on the same engine. Tailored to each sport.
          </p>
        </div>

        {/* Mobile: all stacked */}
        <div className="flex flex-col gap-6 lg:hidden">
          {sports.map((c) => <SportCardMobile key={c.sport} {...c} />)}
        </div>

        {/* Desktop: 2×2 grid */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="flex gap-6 h-[420px]">
            {sports.slice(0, 2).map((c) => <SportCard key={c.sport} {...c} />)}
          </div>
          <div className="flex gap-6 h-[420px]">
            {sports.slice(2, 4).map((c) => <SportCard key={c.sport} {...c} />)}
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

  const benchmarkRows = [
    "Video Recording", "Analyzes", "Suggests specific fixes",
    "Updates the plan with each session.",
    "Detects movement patterns over time",
    "Tracks progress session by session",
    "Always available, no scheduling",
  ];

  const humanCoachRows = [
    { text: "The assessment is often subjective.", hasCheck: true },
    { text: "Progress may be uneven", hasCheck: true },
    { text: "The frequency of classes is limited by time, place.", hasCheck: true },
    { text: "Limited budget", hasCheck: true },
    { text: "-", hasCheck: false }, { text: "-", hasCheck: false }, { text: "-", hasCheck: false },
  ];

  const simulatorRows = [
    { text: "They show the result but do not explain the reason.", hasCheck: true },
    { text: "Do not lead to steady improvement step by step.", hasCheck: true },
    { text: "High price", hasCheck: true },
    { text: "Location binding", hasCheck: true },
    { text: "-", hasCheck: false }, { text: "-", hasCheck: false }, { text: "-", hasCheck: false },
  ];

  const videoRows = [
    { text: "One content for all", hasCheck: true },
    { text: "Without feedback on your movement.", hasCheck: true },
    { text: "You spend a lot of time", hasCheck: true },
    { text: "Little progress", hasCheck: true },
    { text: "-", hasCheck: false }, { text: "-", hasCheck: false }, { text: "-", hasCheck: false },
  ];

  const OtherColumn = ({ title, subtitle, rows }) => (
    <div className="w-[297px] lg:flex-1 flex-shrink-0 bg-[#1f2225] rounded-[4px] flex flex-col gap-[16px] items-center px-[16px] py-[24px]">
      <div className="flex flex-col gap-[12px] items-center w-full">
        <div className="h-[48px] flex items-center justify-center w-full">
          <p className="font-bold text-white text-[16px] leading-[22px] text-center">{title}</p>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="font-normal text-[#818181] text-[16px] leading-[24px] text-center">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        {rows.map((row, i) => (
          <div key={i} className={`flex gap-[16px] h-[64px] items-center px-[12px] py-[16px] w-full ${i < rows.length - 1 ? "border-b border-[#2d2f31]" : ""}`}>
            {row.hasCheck ? (
              <><CheckDark /><p className="flex-1 font-semibold text-[16px] text-white leading-[22px]">{row.text}</p></>
            ) : (
              <p className="flex-1 font-semibold text-[16px] text-white leading-[20px] text-center">{row.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-[#171a1c] py-20 px-3 lg:px-6 border-t border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[800px] mx-auto text-center mb-16 flex flex-col gap-4 items-center">
          <h2 className="font-bold text-white text-[32px] leading-[40px] lg:text-[48px] lg:leading-[62px]">
            Why this wins vs traditional coaching
          </h2>
          <p className="font-normal text-[#818181] text-[16px] leading-[24px]">
            Benchmark turns training into a system: you see the movement, understand the reason behind it, receive a plan, and progress faster.
          </p>
        </div>

        {/* Scrollable container on mobile */}
        <div className="overflow-x-auto -mx-3 px-3 lg:mx-0 lg:px-0">
          <div className="flex gap-[4px] items-stretch min-w-max lg:min-w-0">
            {/* Benchmark column */}
            <div className="w-[297px] lg:flex-1 flex-shrink-0 bg-[#1f2225] rounded-[4px] flex flex-col gap-[16px] items-center px-[16px] py-[24px]">
              <div className="flex flex-col gap-[12px] items-center w-full">
                <div className="h-[48px] w-full flex items-center justify-center">
                  <img
                    src="/images/logo.svg"
                    alt="benchmark SPORTS"
                    className="brightness-0 invert"
                    style={{ height: '32px', width: 'auto' }}
                  />
                </div>
                <p className="font-normal text-[#818181] text-[16px] leading-[24px] text-center">
                  Data-based, always-on coaching that adapts to you.
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex gap-[16px] h-[56px] items-center px-[12px] py-[16px] w-full border-b border-[#2d2f31]">
                  <CheckGreen />
                  <p className="font-semibold text-[16px] text-white leading-[22px] whitespace-nowrap">Video Recording</p>
                </div>
                {benchmarkRows.slice(1).map((row, i) => (
                  <div key={i} className={`flex gap-[16px] h-[64px] items-center px-[12px] py-[16px] w-full ${i < benchmarkRows.length - 2 ? "border-b border-[#2d2f31]" : ""}`}>
                    <CheckGreen />
                    <p className="flex-1 font-semibold text-[16px] text-white leading-[22px]">{row}</p>
                  </div>
                ))}
              </div>
            </div>

            <OtherColumn title="Human Coaches" subtitle="Strong influence, but depends on the person and schedule." rows={humanCoachRows} />
            <OtherColumn title="Expensive simulators" subtitle="Cool metrics, but no clear fixes." rows={simulatorRows} />
            <OtherColumn title="Video Content" subtitle="Cheap, but without personalization." rows={videoRows} />
          </div>
        </div>
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
      image: { src: "/images/process-image.png", bg: "/images/process-bg.png", offset: { width: "115.44%", height: "115.44%", left: "-13.76%", top: "-13.93%" } },
    },
    {
      title: "Understand what's actually happening",
      body: "The platform breaks down your movement frame by frame, identifies technique issues, and explains the mechanics behind them in plain language.",
      image: { src: "/images/process-step2.png", bg: null, offset: null },
    },
    {
      title: "Fix with a plan",
      body: "Get a personalised training plan with specific drills tailored to your movement. Every session updates the plan based on your progress.",
      image: { src: "/images/process-step3.png", bg: null, offset: { width: "114.77%", height: "114.77%", left: "-11.83%", top: "-7.38%" } },
    },
  ];

  const activeImage = openIndex >= 0 ? steps[openIndex].image : steps[0].image;

  const ProcessImage = ({ className }) => (
    <div className={`rounded-[8px] overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 bg-[#515151] rounded-[8px]" />
      {activeImage.bg && (
        <img src={activeImage.bg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[8px]" />
      )}
      <div className="absolute inset-0 overflow-hidden rounded-[8px]">
        {activeImage.offset ? (
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt="Training"
            className="absolute transition-opacity duration-300"
            style={{ width: activeImage.offset.width, height: activeImage.offset.height, left: activeImage.offset.left, top: activeImage.offset.top, maxWidth: "none", objectFit: "cover" }}
          />
        ) : (
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt="Training"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );

  const Accordion = () => (
    <div className="flex flex-col gap-[24px]">
      <div className="h-px bg-white/20" />
      {steps.map((step, i) => (
        <div key={step.title}>
          <div className="flex gap-[16px] items-start justify-between cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
            <div className="flex-1">
              {openIndex === i ? (
                <div className="flex flex-col gap-[16px] text-white">
                  <p className="font-bold text-[24px] leading-[28px]">{step.title}</p>
                  <p className="font-normal text-[16px] leading-[24px] whitespace-pre-line">{step.body}</p>
                </div>
              ) : (
                <p className="font-bold text-[24px] leading-[28px] text-white opacity-50">{step.title}</p>
              )}
            </div>
            <div className={`flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center ${openIndex !== i ? "opacity-30" : ""}`}>
              {openIndex === i ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
          </div>
          <div className="h-px bg-white/20 mt-[24px]" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-[#171a1c] py-20 px-3 lg:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile: image on top, text below */}
        <div className="flex flex-col gap-10 lg:hidden">
          <ProcessImage className="w-full h-[349px]" />
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-white text-[32px] leading-[40px] capitalize">
              A simple process, built around technique.
            </h2>
            <Accordion />
          </div>
        </div>

        {/* Desktop: text on left, image on right */}
        <div className="hidden lg:flex gap-[64px] items-start">
          <div className="flex flex-col gap-[32px] w-[540px] flex-shrink-0">
            <h2 className="font-bold text-white text-[48px] leading-[62px] capitalize">
              A simple process, built around technique.
            </h2>
            <Accordion />
          </div>
          <ProcessImage className="flex-1 h-[596px]" />
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
      <Footer />
    </div>
  );
}
