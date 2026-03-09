import { motion } from "framer-motion";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";

export default function PadelPage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AnnouncementBar />

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ flex: 1 }}>
        <img
          src="/images/padel-hero.webp"
          alt="Benchmark Padel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blur layer */}
        <div className="absolute inset-0 backdrop-blur-[4px]" />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(23,26,29,0.2), rgba(0,0,0,0))",
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
              {/* Coming Soon badge — solid dark bg (Padel) */}
              <div
                className="backdrop-blur-[24px] flex items-center justify-center px-3 py-1.5 rounded"
                style={{ background: "#30393e" }}
              >
                <span className="font-bold text-[16px] leading-5 text-[#ffc32c]">
                  Coming soon
                </span>
              </div>
              <h1 className="font-extrabold text-[32px] leading-[40px] lg:text-[64px] lg:leading-[80px] uppercase text-white text-center">
                Benchmark Padel
              </h1>
              <p className="font-bold text-[18px] leading-[26px] lg:text-[24px] lg:leading-[28px] text-white text-center">
                AI technique coaching for Padel. Built for real-time swing,
                positioning, and placement feedback
              </p>
            </div>
            <p className="font-normal text-[16px] leading-[24px] text-white text-center w-full">
              Benchmark Padel will turn your phone and other devices into a
              training system that records your strokes, analyzes technique, and
              helps you fix what actually matters.
            </p>
          </div>
        </motion.div>
      </div>
      </div>

    </div>
  );
}
