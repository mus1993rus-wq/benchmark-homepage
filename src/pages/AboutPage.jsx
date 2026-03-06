import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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

function CollectionCard({ img, title, desc }) {
  return (
    <div className="flex-1 relative rounded-[8px] overflow-hidden h-full">
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute bottom-0 left-0 right-0 px-[24px] py-[24px] rounded-[8px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(35,35,35,0) 0%, rgba(35,35,35,0.6) 100%)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="flex flex-col gap-4 text-white">
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
        src="/images/about-problem-lines.png"
        alt="Scalable Movement Intelligence Platform diagram"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans antialiased bg-white">
      <AnnouncementBar />

      {/* Hero */}
      <div className="relative h-[880px] overflow-hidden">
        <img
          src="/images/about-hero-bg.png"
          alt="About Benchmark Sports"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <Header />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
          <div className="max-w-[849px] flex flex-col gap-4 items-center">
            <h1 className="text-white font-extrabold text-[64px] leading-[80px] uppercase">
              Building the future of technique training.
            </h1>
            <p className="text-white text-[16px] leading-[24px] font-normal">
              Benchmark Sports exists to make high-level coaching accessible across sports — not just for those who can afford private lessons. So the next 100 million people learn sports through our digital platform.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section — dark bg */}
      <section className="bg-[#171a1c] py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center relative z-10">
          {/* Watermark */}
          <p
            className="text-white text-[144px] font-extrabold uppercase leading-none text-center select-none absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
            style={{ opacity: "0.03" }}
          >
            Our Mission
          </p>
          <div className="max-w-[800px] text-center pt-8 relative z-10">
            <div className="font-bold text-[18px] text-white leading-[20px]">
              <p className="mb-0">Traditional technique coaching works — but it doesn't scale.</p>
              <p className="mb-0">It's expensive. It's time-bound. It's location-dependent.</p>
              <p className="mb-4"></p>
              <p className="mb-0">We're building a multi-sport training platform that turns movement into measurable data — and data into structured improvement.</p>
              <p className="mb-4"></p>
              <p className="mb-0">From golf to tennis, padel, cricket and beyond, our goal is simple:</p>
              <p className="mb-4"></p>
              <p>Make elite-level technique training available anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section — dark bg */}
      <section className="bg-[#171a1c] py-20 px-6 border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto flex gap-16 items-center">
          {/* Left: text */}
          <div className="flex-1 flex flex-col gap-8">
            <h2 className="font-bold text-[44px] text-white leading-[54px] capitalize">
              The Problem We Couldn't Ignore
            </h2>
            <ul className="flex flex-col gap-3 list-disc pl-6 text-white">
              <li className="text-[16px] leading-[24px]">Coaching is effective — but fundamentally unscalable.</li>
              <li className="text-[16px] leading-[24px]">Most sports technology measures outcomes, not movement.</li>
              <li className="text-[16px] leading-[24px]">Hardware-first systems are expensive and limited to clubs.</li>
            </ul>
            {/* Quote */}
            <div className="bg-[#1f2225] border-l-2 border-white flex items-center justify-center px-10 py-8">
              <p className="font-normal italic text-white text-[22px] leading-normal">
                There is no mass pathway from beginner to confident athlete. We're building one.
              </p>
            </div>
          </div>
          {/* Right: diagram */}
          <ProblemDiagram />
        </div>
      </section>

      {/* Our Approach — white bg */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-bold text-black text-[48px] leading-[62px] capitalize text-center mb-14">
            Our Approach
          </h2>
          <div className="flex gap-6 h-[480px]">
            <CollectionCard
              img="/images/about-approach-1.png"
              title="Movement First"
              desc="We measure how you move — not just where the ball goes."
            />
            <CollectionCard
              img="/images/about-approach-2.png"
              title="Structured Progression"
              desc="Every session builds on the last. No random drills."
            />
            <CollectionCard
              img="/images/about-approach-3.png"
              title="Platform, Not Product"
              desc="One core engine. Multiple sports. Consistent experience."
            />
          </div>
        </div>
      </section>

      {/* Engine Section — white bg */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto flex gap-16 items-center">
          {/* Left: image */}
          <div className="flex-1 h-[538px] rounded-[4px] overflow-hidden">
            <img
              src="/images/about-analyze.png"
              alt="The Benchmark Engine"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right: content */}
          <div className="flex-1 flex flex-col gap-8">
            <h2 className="text-[44px] font-bold text-black leading-[54px] capitalize">
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
                <CheckItem
                  title="3D pose"
                  desc="Full body motion captured from video, built for real world training."
                />
                <CheckItem
                  title="Pattern recognition"
                  desc="We spot repeat issues across sessions, not one off mistakes."
                />
                <CheckItem
                  title="Session learning"
                  desc="The system adapts as you improve, tracking what actually changes."
                />
                <CheckItem
                  title="Adaptive planning"
                  desc="You get next steps that fit your patterns and progress."
                />
              </div>
              <p className="font-normal text-[16px] text-black leading-[24px]">
                Built for golf first, designed to scale.{" "}
                <strong>Golf today. Tennis, Padel, Cricket next.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section — dark bg */}
      <section className="bg-[#171a1c] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 flex flex-col gap-4">
            <h2 className="text-[48px] font-bold text-white leading-[62px]">
              The Team Behind Benchmark
            </h2>
            <p className="text-[16px] font-normal text-white leading-[24px]">
              Lean team. Extreme talent bar. Built to work fast.
            </p>
          </div>
          <div className="flex gap-[34px] items-stretch">
            {[
              {
                img: "/images/team-daniel.png",
                name: "Daniel Puumalainen",
                role: "CEO",
                desc: "Technical product vision, consumer obsession, deep regional roots + global ambition",
              },
              {
                img: "/images/team-paul.png",
                name: "Paul Boranian",
                role: "CMO",
                desc: "Brand + distribution engine; turning product into demand",
              },
              {
                img: "/images/team-arne.png",
                name: "Arne Noori",
                role: "Head of Engineering",
                desc: "Execution, platform reliability, engineering culture",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="flex-1 flex flex-col overflow-hidden rounded-[4px]"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="w-full aspect-square overflow-hidden rounded-[8px]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-[20px] py-[24px] flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-[24px] text-white leading-[28px]">
                      {member.name}
                    </p>
                    <p className="font-normal text-[#818181] text-[16px] leading-[22px]">
                      {member.role}
                    </p>
                  </div>
                  <p className="font-normal text-[16px] text-white leading-[22px]">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Build Section — dark bg */}
      <section className="bg-[#171a1c] py-20 px-6 border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 flex flex-col gap-4">
            <p className="font-bold text-[24px] text-white leading-[28px] text-center max-w-[770px] mx-auto">
              And 20 team members across engineering, product, and ops, operating with speed, taste, and extreme ownership.
            </p>
            <h2 className="font-bold text-[48px] text-white leading-[62px]">
              How We Build
            </h2>
          </div>
          <div className="bg-[#1f2225] rounded-[8px] flex">
            {[
              { label: "Speed over bureaucracy", icon: "/images/about-build-icon-1.svg" },
              { label: "Product obsession", icon: "/images/about-build-icon-2.svg" },
              { label: "Long-term thinking", icon: "/images/about-build-icon-3.svg" },
              { label: "Measurable outcomes", icon: "/images/about-build-icon-4.svg" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex-1 flex flex-col gap-4 items-center px-6 py-8 border border-[#2d2f31] ${
                  i === 0 ? "rounded-l-[4px]" : ""
                } ${i === 3 ? "rounded-r-[4px]" : ""}`}
              >
                <div
                  className="w-16 h-16 rounded-[45px] border border-white/24 backdrop-blur-[32px] flex items-center justify-center overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <img src={item.icon} alt="" className="w-8 h-8" />
                </div>
                <p className="font-semibold text-[18px] text-white text-center leading-[26px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
