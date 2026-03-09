import { motion } from "framer-motion";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { FadeIn } from "../components/FadeIn";

// CheckItem for dark backgrounds (white text)
function CheckItemDark({ title, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-[#62d947] flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polyline points="3,8 6,11 13,4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-[16px] text-white leading-[24px]">{title}</p>
        <p className="text-[#818181] text-[16px] leading-[24px]">{desc}</p>
      </div>
    </div>
  );
}

// CheckItem for light backgrounds (dark text)
function CheckItem({ title, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-[#62d947] flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polyline points="3,8 6,11 13,4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-[16px] text-[#232325] leading-[24px]">{title}</p>
        <p className="text-[#818181] text-[16px] leading-[24px]">{desc}</p>
      </div>
    </div>
  );
}

function CollectionCard({ img, imgStyle, img2, img2Style, title, desc }) {
  return (
    <div className="w-full h-full relative rounded-[8px] overflow-hidden">
      {imgStyle ? (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="absolute max-w-none"
            style={imgStyle}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
      {img2 && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={img2}
            alt=""
            className="absolute max-w-none"
            style={img2Style}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div
        className="absolute inset-0 px-[24px] pb-[32px] rounded-[8px] flex flex-col justify-end"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        <div className="flex flex-col gap-4 text-white text-center">
          <p className="font-bold text-[24px] leading-[28px]">{title}</p>
          <p className="font-normal text-[16px] leading-[22px]">{desc}</p>
        </div>
      </div>
    </div>
  );
}

// Problem section diagram
function ProblemDiagram() {
  return (
    <div className="flex-shrink-0 rounded-[8px] overflow-hidden" style={{ width: "568px", height: "538px" }}>
      <img
        src="/images/about-problem-lines.webp"
        alt="Scalable Movement Intelligence Platform diagram"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      {/* 100vh hero block — same pattern as GolfPage */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AnnouncementBar />
        {/* Hero */}
        <div className="relative overflow-hidden" style={{ flex: 1 }}>
          <img
            src="/images/about-hero-bg.webp"
            alt="About Benchmark Sports"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
            }}
          />
          <Header />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 lg:px-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <div className="max-w-[849px] flex flex-col gap-4 items-center">
              <h1 className="text-white font-extrabold text-[32px] leading-[40px] lg:text-[64px] lg:leading-[80px] uppercase">
                Building the future of technique training.
              </h1>
              <p className="text-white text-[16px] leading-[24px] font-normal">
                Benchmark Sports exists to make high-level coaching accessible across sports — not just for those who can afford private lessons. So the next 100 million people learn sports through our digital platform.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section — dark bg */}
      {/* Layout matches Figma: flex-col, "Our Mission" in flow above content */}
      <section className="bg-[#171a1c] pt-16 lg:pt-20 pb-16 lg:pb-24 px-4 lg:px-6 overflow-hidden">
        <FadeIn className="flex flex-col items-center w-full">
          {/* "Our Mission" — normal flow element, directly above content */}
          <p
            className="w-full text-white text-[48px] lg:text-[144px] font-extrabold uppercase leading-none text-center select-none pointer-events-none whitespace-nowrap"
            style={{ opacity: 0.06 }}
          >
            Our Mission
          </p>
          {/* Content — sits directly below the watermark */}
          <div className="max-w-[800px] text-center mt-6 lg:mt-8">
            <div className="font-bold text-[16px] lg:text-[18px] text-white leading-[24px] lg:leading-[20px]">
              <p className="mb-0">Traditional technique coaching works — but it doesn't scale.</p>
              <p className="mb-0">It's expensive. It's time-bound. It's location-dependent.</p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">We're building a multi-sport training platform that turns movement into measurable data — and data into structured improvement.</p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">From golf to tennis, padel, cricket and beyond, our goal is simple:</p>
              <p className="mb-0">&nbsp;</p>
              <p>Make elite-level technique training available anywhere.</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Problem Section — dark bg */}
      <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6 border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left: text */}
          <FadeIn className="flex-1">
            <div className="flex flex-col gap-8">
              <h2 className="font-bold text-[32px] lg:text-[44px] text-white leading-[40px] lg:leading-[54px] capitalize">
                The Problem We Couldn't Ignore
              </h2>
              <ul className="list-disc text-white" style={{ paddingLeft: 0 }}>
                <li className="ms-6 text-[16px] leading-[24px] mb-0">Coaching is effective — but fundamentally unscalable.</li>
                <li className="ms-6 text-[16px] leading-[24px] mb-0">Most sports technology measures outcomes, not movement.</li>
                <li className="ms-6 text-[16px] leading-[24px]">Hardware-first systems are expensive and limited to clubs.</li>
              </ul>
              {/* Quote */}
              <div className="bg-[#1f2225] border-l-2 border-solid border-white flex items-center justify-center px-[24px] lg:px-[40px] py-[24px] lg:py-[32px]">
                <p className="flex-1 font-normal italic text-white text-[18px] lg:text-[22px] leading-normal">
                  There is no mass pathway from beginner to confident athlete. We're building one.
                </p>
              </div>
            </div>
          </FadeIn>
          {/* Right: diagram — hidden on mobile */}
          <FadeIn delay={0.15} className="hidden lg:block">
            <ProblemDiagram />
          </FadeIn>
        </div>
      </section>

      {/* Our Approach — white bg */}
      <section className="bg-white py-12 lg:py-20 px-4 lg:px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-bold text-black text-[32px] lg:text-[48px] leading-[40px] lg:leading-[62px] capitalize text-center mb-10 lg:mb-14">
              Our Approach
            </h2>
          </FadeIn>
          <div className="flex flex-col lg:flex-row gap-6 lg:h-[480px]">
            <FadeIn delay={0}    className="h-[400px] lg:h-full lg:flex-1">
              <CollectionCard img="/images/about-approach-1.webp" title="Movement First"       desc="We measure how you move — not just where the ball goes." />
            </FadeIn>
            <FadeIn delay={0.1}  className="h-[400px] lg:h-full lg:flex-1">
              <CollectionCard img="/images/about-approach-2.webp" title="Structured Progression" desc="Every session builds on the last. No random drills." />
            </FadeIn>
            <FadeIn delay={0.2}  className="h-[400px] lg:h-full lg:flex-1">
              <CollectionCard img="/images/about-approach-3.webp" title="Platform, Not Product"   desc="One core engine. Multiple sports. Consistent experience." />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Engine Section — white bg */}
      <section className="bg-white py-12 lg:py-20 px-4 lg:px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <FadeIn className="w-full lg:flex-1">
            <div className="h-[300px] lg:h-[538px] rounded-[4px] overflow-hidden">
              <img
                src="/images/about-analyze.webp"
                alt="The Benchmark Engine"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="w-full lg:flex-1">
            <div className="flex flex-col gap-8">
              <h2 className="text-[32px] lg:text-[44px] font-bold text-black leading-[40px] lg:leading-[54px] capitalize">
                The Benchmark Engine
              </h2>
              <div className="flex flex-col gap-6">
                <div className="font-normal text-[16px] text-black leading-[24px]">
                  <p className="mb-0">Benchmark is a multi sport training platform that turns real movement into clear improvement.</p>
                  <p className="mb-0">&nbsp;</p>
                  <p className="mb-0">One engine powers the same workflow across sports:</p>
                  <p><strong>Record → Analyze → Fix</strong></p>
                </div>
                <div className="flex flex-col gap-4">
                  <CheckItem title="3D pose"            desc="Full body motion captured from video, built for real world training." />
                  <CheckItem title="Pattern recognition" desc="We spot repeat issues across sessions, not one off mistakes." />
                  <CheckItem title="Session learning"    desc="The system adapts as you improve, tracking what actually changes." />
                  <CheckItem title="Adaptive planning"   desc="You get next steps that fit your patterns and progress." />
                </div>
                <p className="font-normal text-[16px] text-black leading-[24px]">
                  Built for golf first, designed to scale.{" "}
                  <strong>Golf today. Tennis, Padel, Cricket next.</strong>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Section — dark bg */}
      <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="text-center mb-10 lg:mb-16 flex flex-col gap-4">
            <h2 className="text-[32px] lg:text-[48px] font-bold text-white leading-[40px] lg:leading-[62px]">
              The Team Behind Benchmark
            </h2>
            <p className="text-[16px] font-normal text-white leading-[24px]">
              Lean team. Extreme talent bar. Built to work fast.
            </p>
          </FadeIn>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[24px] items-stretch">
            {[
              {
                img: "/images/team-daniel.webp",
                name: "Daniel Puumalainen",
                role: "CEO",
                desc: "Technical product vision, consumer obsession, deep regional roots + global ambition",
              },
              {
                img: "/images/team-paul.webp",
                name: "Paul Boranian",
                role: "CMO",
                desc: "Brand + distribution engine; turning product into demand",
              },
              {
                img: "/images/team-arne.webp",
                name: "Arne Noori",
                role: "Head of Engineering",
                desc: "Execution, platform reliability, engineering culture",
              },
              {
                img: "/images/team-bernard.webp",
                name: "Bernard Kim",
                role: "Chief of Staff",
                desc: "Priorities, execution rhythm, and org-wide coordination",
              },
            ].map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08} className="flex-1">
                <div
                  className="flex flex-col overflow-hidden rounded-[4px] h-full"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="w-full aspect-square overflow-hidden relative">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="px-[20px] py-[24px] flex flex-col items-center text-center gap-4 w-full">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-[24px] text-white leading-[28px]">{member.name}</p>
                      <p className="font-normal text-[#717171] text-[16px] leading-[22px]">{member.role}</p>
                    </div>
                    <p className="font-normal text-[16px] text-white leading-[22px]">{member.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <p className="font-bold text-[18px] lg:text-[24px] text-white leading-[26px] lg:leading-[28px] text-center max-w-[770px] mx-auto mt-10 lg:mt-12">
              And 20 team members across engineering, product, and ops, operating with speed, taste, and extreme ownership.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How We Build Section — dark bg */}
      <section className="bg-[#171a1c] py-12 lg:py-20 px-4 lg:px-6 border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="text-center mb-10 lg:mb-12">
            <h2 className="font-bold text-[32px] lg:text-[48px] text-white leading-[40px] lg:leading-[62px]">
              How We Build
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-[#1f2225] rounded-[8px] grid grid-cols-2 lg:flex">
              {[
                { label: "Speed over bureaucracy", icon: "/images/about-build-icon-1.svg", flip: true },
                { label: "Product obsession",      icon: "/images/about-build-icon-2.svg", flip: false },
                { label: "Long-term thinking",     icon: "/images/about-build-icon-3.svg", flip: false },
                { label: "Measurable outcomes",    icon: "/images/about-build-icon-4.svg", flip: false },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`flex-1 flex flex-col gap-4 items-center px-4 lg:px-6 py-8 border border-[#2d2f31] ${
                    i === 0 ? "lg:rounded-l-[4px]" : ""
                  } ${i === 3 ? "lg:rounded-r-[4px]" : ""}`}
                >
                  <div
                    className="w-16 h-16 rounded-[45px] border border-white/24 backdrop-blur-[32px] flex items-center justify-center overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className={`w-8 h-8${item.flip ? " -scale-y-100 rotate-180" : ""}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-semibold text-[16px] lg:text-[18px] text-white text-center leading-[22px] lg:leading-[26px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
