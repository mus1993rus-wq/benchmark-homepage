import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
    <div className="flex-1 relative rounded-[8px] overflow-hidden">
      {image}
      <div
        className="absolute bottom-0 left-0 right-0 px-[24px] pb-[32px] pt-[64px] rounded-[8px] flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(to bottom, rgba(35,35,35,0) 0%, rgba(35,35,35,0.6) 100%)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="flex flex-col gap-4 text-white">
          <p className="font-bold text-[32px] leading-[40px]">{title}</p>
          <p className="font-normal text-[16px] leading-[24px] opacity-80">{desc}</p>
        </div>
      </div>
    </div>
  );
}

const golfCards = [
  {
    title: "For beginners",
    desc: "Start with correct fundamentals. Avoid bad habits.",
    image: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/golf-card1.png"
          alt=""
          className="absolute max-w-none"
          style={{ height: "125.16%", left: "-28.43%", top: "0", width: "156.77%" }}
        />
      </div>
    ),
  },
  {
    title: "For golfers who feel stuck",
    desc: "Stop guessing. Fix what's holding you back.",
    image: (
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/golf-card2a.png"
            alt=""
            className="absolute max-w-none"
            style={{ height: "81.03%", left: "-0.68%", top: "-1.72%", width: "101.35%" }}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/golf-card2b.png"
            alt=""
            className="absolute max-w-none"
            style={{ height: "100%", left: "-27.16%", top: "0", width: "187.66%" }}
          />
        </div>
      </div>
    ),
  },
  {
    title: "For performance players",
    desc: "Dial in details. Track measurable improvement.",
    image: (
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/golf-card3a.png"
            alt=""
            className="absolute max-w-none"
            style={{ height: "79.93%", left: "0", top: "-0.05%", width: "100%" }}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/golf-card3b.png"
            alt=""
            className="absolute max-w-none"
            style={{ height: "144.87%", left: "-10.79%", top: "-32.65%", width: "121.49%" }}
          />
        </div>
      </div>
    ),
  },
];

function PhoneScreen({ src, isEdge = false }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 rounded-[8px] bg-[#999]"
      style={{ width: "262px", height: "460px" }}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {isEdge ? (
          <div className="flex items-center justify-center w-[64px] h-[64px]">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 7l22 13-22 13V7z" fill="white" />
            </svg>
          </div>
        ) : (
          <div
            className="bg-white flex items-center justify-center rounded"
            style={{ padding: "20px 24px" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2l10 6-10 6V2z" fill="black" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

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

const phoneScreens = [
  { src: "/images/golf-screen-1.png", isEdge: true },
  { src: "/images/golf-screen-2.png", isEdge: false },
  { src: "/images/golf-screen-3.png", isEdge: false },
  { src: "/images/golf-screen-4.png", isEdge: false },
  { src: "/images/golf-screen-5.png", isEdge: false },
  { src: "/images/golf-screen-6.png", isEdge: false },
  { src: "/images/golf-screen-7.png", isEdge: true },
];

export default function GolfPage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <AnnouncementBar />

      {/* Hero */}
      <div className="relative h-[780px] overflow-hidden">
        <img
          src="/images/golf-hero-bg.png"
          alt="Benchmark Golf"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))",
          }}
        />
        <Header />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
          <div
            className="max-w-[860px] flex flex-col gap-4 items-center"
            style={{ paddingTop: "130px" }}
          >
            <h1 className="text-white font-extrabold text-[64px] leading-[80px] uppercase">
              Benchmark Golf
            </h1>
            <p className="text-white text-[16px] leading-[24px] font-normal">
              AI-powered simulation &amp; swing feedback. No sensors. No guesswork.
            </p>
            <div className="mt-4">
              <button className="bg-white text-black font-bold px-10 py-5 rounded text-base hover:bg-gray-100 transition-colors">
                Visit Benchmark Golf
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dark section */}
      <div className="bg-[#171a1c]">

        {/* Feature Tags with Icons */}
        <section className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto flex gap-6 items-start justify-between">
            {featureTags.map((tag) => (
              <div
                key={tag.label}
                className="flex-1 flex flex-col gap-4 items-center text-center"
              >
                <div
                  className="flex items-center justify-center p-4 rounded-[45px]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(32px)",
                    border: "1px solid rgba(255,255,255,0.24)",
                  }}
                >
                  <img src={tag.icon} alt="" className="w-8 h-8" />
                </div>
                <p className="font-semibold text-[18px] text-white leading-[26px]">
                  {tag.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="h-px" style={{ background: "#2D2F31" }} />
        </div>

        {/* System Section */}
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto flex gap-16 items-center">
            {/* Left: image */}
            <div className="flex-1 h-[538px] rounded-[8px] overflow-hidden">
              <img
                src="/images/golf-coaching.png"
                alt="Benchmark Golf Analysis"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right: content */}
            <div className="w-[570px] flex-shrink-0 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <h2 className="font-bold text-[48px] text-white leading-[62px] capitalize">
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
                <CheckItem
                  title="Swing Recording"
                  desc="Capture unlimited real swings indoors or outdoors."
                />
                <CheckItem
                  title="Simulation"
                  desc="Play realistic scenarios and test decision-making under pressure."
                />
                <CheckItem
                  title="Divot Analysis"
                  desc="Understand ground interaction and strike quality across sessions."
                />
                <CheckItem
                  title="Coaching (Premium)"
                  desc="Adaptive improvement plan built from your movement patterns."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Adaptive Coaching */}
        <section className="px-6 pb-20">
          <div className="max-w-[1200px] mx-auto flex gap-16 items-center">
            {/* Left: text */}
            <div className="flex-1 flex flex-col gap-10">
              <div className="flex flex-col gap-6 text-white">
                <h2 className="font-bold text-[48px] text-white leading-[62px] capitalize">
                  Adaptive Coaching. Built From Real Swings.
                </h2>
                <p className="font-semibold text-[16px] text-white leading-[22px]">
                  Record your swing with just your phone. Benchmark analyzes
                  full-body movement and builds a step-by-step improvement plan
                  based on your actual patterns — not generic drills.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <CheckItem
                  title="Unlimited swing recording"
                  desc="Record every swing - on the range, at home, or indoors. No limits."
                />
                <CheckItem
                  title="Pattern detection across sessions"
                  desc="We don't analyze one swing at a time. We identify patterns across your last sessions."
                />
                <CheckItem
                  title="Adaptive coaching plan"
                  desc="Your plan updates as you improve - or regress. No static plans. Your coaching adapts as you do."
                />
              </div>
            </div>
            {/* Right: image */}
            <div className="flex-1 h-[538px] rounded-[8px] overflow-hidden relative">
              {/* Background */}
              <img
                src="/images/golf-system.png"
                alt="Adaptive Coaching"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Blur overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  backdropFilter: "blur(12px)",
                }}
              />
              {/* Phone UI overlay — above the blur */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src="/images/golf-coaching-overlay.png"
                  alt=""
                  className="absolute max-w-none"
                  style={{ height: "114.98%", left: "-41.56%", top: "-13.01%", width: "193.56%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Built For Every Golfer */}
        <section className="px-6 pb-20">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
            <h2 className="font-bold text-[52px] text-white text-center leading-[62px]">
              Built For Every Golfer
            </h2>
            <div className="flex gap-6 h-[480px]">
              {golfCards.map((card) => (
                <CollectionCard key={card.title} image={card.image} title={card.title} desc={card.desc} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* White section — Become the best player + Stats */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-12">
          <h2 className="font-bold text-[48px] text-black text-center leading-[62px] max-w-[832px]">
            Become the best player in your sport without leaving home
          </h2>
        </div>

        {/* Phone screens gallery — full width with overflow clipping */}
        <div className="overflow-hidden mt-12">
          <div className="flex gap-6 justify-center">
            {phoneScreens.map((screen, i) => (
              <PhoneScreen key={i} src={screen.src} isEdge={screen.isEdge} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-[1200px] mx-auto px-6 mt-12">
          <div className="flex gap-10 items-center justify-between">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-3 items-center text-center w-[260px]"
              >
                <div className="flex gap-3 items-center justify-center">
                  {s.isStar && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffc32c">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                  <p className="font-bold text-[32px] text-black leading-[40px]">
                    {s.value}
                  </p>
                </div>
                <p className="font-semibold text-[18px] text-black leading-[26px]">
                  {s.label}
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
