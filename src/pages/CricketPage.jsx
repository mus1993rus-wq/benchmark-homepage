import { motion } from "framer-motion";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";

export default function CricketPage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AnnouncementBar />

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ flex: 1 }}>
        <img
          src="/images/cricket-hero.webp"
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
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 pt-[40px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
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
        </motion.div>
      </div>
      </div>

    </div>
  );
}
