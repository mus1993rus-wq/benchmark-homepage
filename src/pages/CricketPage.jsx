import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { useHeroScroll } from "../hooks/useHeroScroll";

export default function CricketPage() {
  const { outerRef, innerRef } = useHeroScroll();
  return (
    <div className="min-h-screen font-sans antialiased">
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#000" }}>
        <AnnouncementBar />

        {/* Hero — animated expand on scroll */}
        <div ref={outerRef} style={{ flex: 1, padding: "16px" }}>
        <div ref={innerRef} className="relative overflow-hidden" style={{ borderRadius: "20px", height: "100%", willChange: "border-radius" }}>
        <img
          src="/images/cricket-hero.png"
          alt="Benchmark Cricket"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay — left to right dark blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.48) 47%, rgba(0,0,0,0) 86%)",
            mixBlendMode: "overlay",
          }}
        />
        <Header />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 pt-[40px]">
          <div className="flex flex-col gap-8 items-center w-full max-w-[800px]">
            <div className="flex flex-col gap-4 items-center w-full">
              {/* Coming Soon badge — solid dark bg (Cricket) */}
              <div
                className="backdrop-blur-[24px] flex items-center justify-center px-3 py-1.5 rounded"
                style={{ background: "#30393e" }}
              >
                <span className="font-bold text-[16px] leading-5 text-[#ffc32c]">
                  Coming soon
                </span>
              </div>
              <h1 className="font-extrabold text-[32px] leading-[40px] lg:text-[64px] lg:leading-[80px] uppercase text-white text-center">
                Benchmark Cricket
              </h1>
              <div className="font-bold text-[18px] leading-[26px] lg:text-[24px] lg:leading-[28px] text-white text-center">
                <p>AI technique coaching for cricket.</p>
                <p>
                  Built for real deliveries, real batting, real improvement.
                </p>
              </div>
            </div>
            <p className="font-normal text-[16px] leading-[24px] text-white text-center w-full">
              Benchmark Cricket turns your phone into a training system that
              records your movement, analyzes batting mechanics and bowling
              action, and helps you fix what actually matters on the pitch.
            </p>
          </div>
        </div>
        </div>
        </div>
      </div>

    </div>
  );
}
