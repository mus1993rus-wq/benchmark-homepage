import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function TennisPage() {
  return (
    <div className="min-h-screen font-sans antialiased bg-white">
      <AnnouncementBar />

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "780px" }}>
        <img
          src="/images/tennis-hero.png"
          alt="Benchmark Tennis"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay with backdrop blur */}
        <div
          className="absolute inset-0 backdrop-blur-[4px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))",
          }}
        />
        <Header />
        {/* Content — vertically centered, positioned like Figma top-[260px] */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 pt-[40px]">
          <div className="flex flex-col gap-8 items-center w-full max-w-[800px]">
            <div className="flex flex-col gap-4 items-center w-full">
              {/* Coming Soon badge — translucent white (Tennis) */}
              <div
                className="backdrop-blur-[24px] flex items-center justify-center px-3 py-1.5 rounded"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <span className="font-bold text-[16px] leading-5 text-[#ffc32c]">
                  Coming soon
                </span>
              </div>
              <h1 className="font-extrabold text-[64px] leading-[80px] uppercase text-white text-center">
                Benchmark Tennis
              </h1>
              <p className="font-bold text-[24px] leading-[28px] text-white text-center">
                AI technique coaching for tennis. Built for real-time swing,
                positioning, and placement feedback
              </p>
            </div>
            <p className="font-normal text-[16px] leading-[24px] text-white text-center w-full">
              Benchmark Tennis will turn your phone and other devices into a
              training system that records your strokes, analyzes technique, and
              helps you fix what actually matters.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
