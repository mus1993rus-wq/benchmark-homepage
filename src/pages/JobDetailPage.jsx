import { useState, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const JOBS = {
  "corporate-content-and-communications-lead": {
    title: "Corporate Content & Communications Lead",
    location: "Irvine, CA",
    type: "Full-time",
    postedDate: "February 17, 2026",
    overview: {
      whyBenchmark:
        "Benchmark Sports is redefining how golf is played and learned through real-time simulation, AI coaching, and mobile-first product experiences. Joining now means shaping core systems at a high-velocity, profitable startup that's scaling globally. You'll work directly with senior engineers, creators, and product leaders, and have meaningful ownership over features used by hundreds of thousands of players.",
      theRole: {
        intro: [
          "We're hiring a Corporate Content & Communications Lead to own the voice, visual identity, and external presence of Benchmark Sports and its leadership.",
          "This is not a social media intern role. This is a high-agency operator who can:",
        ],
        bullets: [
          "Craft corporate narratives",
          "Build polished decks for partners, investors, and federations",
          "Manage executive-level brand presence",
          "Oversee video storytelling with a buttoned-up, high-credibility tone",
          "Maintain viral edge without sacrificing professionalism",
        ],
        outro:
          "You will sit at the intersection of brand, growth, and executive communications.",
      },
    },
  },
  "short-form-creative-content-producer": {
    title: "Short Form Creative Content Producer",
    location: "Irvine, CA",
    type: "Full-time",
    postedDate: "February 17, 2026",
    overview: {
      whyBenchmark:
        "Benchmark Sports is redefining how athletes train through real-time simulation, AI coaching, and mobile-first product experiences. Joining now means shaping core systems at a high-velocity, profitable startup that's scaling globally. You'll work directly with senior engineers, creators, and product leaders, and have meaningful ownership over content seen by hundreds of thousands of athletes.",
      theRole: {
        intro: [
          "We're hiring a Short Form Creative Content Producer to create compelling, high-performance video content across social platforms.",
          "This is a high-impact creative role for someone who can:",
        ],
        bullets: [
          "Produce short-form video content for TikTok, Instagram Reels, and YouTube Shorts",
          "Develop and maintain a consistent brand voice across platforms",
          "Collaborate with athletes and coaches to capture authentic training moments",
          "Analyze performance metrics and iterate on content strategy",
          "Stay ahead of trends while maintaining brand standards",
        ],
        outro:
          "You will be the creative engine behind Benchmark's social media presence.",
      },
    },
  },
  "product-engineer": {
    title: "Product Engineer",
    location: "Irvine, CA",
    type: "Full-time",
    postedDate: "February 17, 2026",
    overview: {
      whyBenchmark:
        "Benchmark Sports is building the future of athletic training through real-time simulation, AI coaching, and mobile-first product experiences. Joining now means shaping core systems at a high-velocity, profitable startup that's scaling globally. You'll work directly with senior engineers and product leaders, and have meaningful ownership over features used by hundreds of thousands of athletes.",
      theRole: {
        intro: [
          "We're hiring a Product Engineer to own and build core product features from end to end.",
          "This is a high-ownership engineering role for someone who can:",
        ],
        bullets: [
          "Design and implement scalable product features across web and mobile",
          "Work closely with design and product to ship high-quality experiences",
          "Optimize performance and reliability of core platform systems",
          "Contribute to architecture decisions and technical direction",
          "Drive the full engineering lifecycle from ideation to deployment",
        ],
        outro: "You will be a key builder of the Benchmark Sports platform.",
      },
    },
  },
  "unity-engineer-full-stack": {
    title: "Unity Engineer (Full-Stack)",
    location: "Remote",
    type: "Full-time",
    postedDate: "February 17, 2026",
    overview: {
      whyBenchmark:
        "Benchmark Sports is building next-generation sports simulation through real-time physics, AI coaching, and mobile-first experiences. Joining now means shaping core simulation systems at a high-velocity, profitable startup that's scaling globally. You'll work directly with senior engineers and product leaders on technology used by hundreds of thousands of athletes.",
      theRole: {
        intro: [
          "We're hiring a Unity Engineer (Full-Stack) to own the simulation and game engine layer of our platform.",
          "This is a hands-on technical role for someone who can:",
        ],
        bullets: [
          "Build and optimize real-time sports simulation experiences in Unity",
          "Develop backend systems that power simulation data and analytics",
          "Integrate AI and computer vision pipelines into the Unity environment",
          "Collaborate with mobile and web teams on cross-platform architecture",
          "Drive performance optimization across simulation and rendering",
        ],
        outro:
          "You will own the technical foundation of Benchmark's simulation technology.",
      },
    },
  },
};

function OverviewTab({ job }) {
  return (
    <div className="flex flex-col gap-6 items-start text-white w-full max-w-[800px] mx-auto">
      <p className="font-bold text-[18px] leading-[20px] w-full">
        Why Benchmark Sports
      </p>
      <p className="font-normal text-[16px] leading-[24px] opacity-80 w-full">
        {job.overview.whyBenchmark}
      </p>
      <p className="font-bold text-[18px] leading-[20px] w-full">The Role</p>
      <div className="font-normal text-[16px] leading-[24px] opacity-80 w-full flex flex-col gap-0">
        {job.overview.theRole.intro.map((p, i) => (
          <p key={i} className="mb-0">
            {p}
          </p>
        ))}
        <ul className="list-disc pl-6 my-0">
          {job.overview.theRole.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="mb-0">{job.overview.theRole.outro}</p>
      </div>
    </div>
  );
}

function ApplicationTab() {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-[600px] mx-auto">
      {/* Form fields */}
      <div className="flex flex-col gap-4 items-start w-full">
        {/* Name */}
        <div className="flex flex-col gap-2 items-start w-full">
          <label className="text-[16px] leading-[24px] text-white font-normal">
            Name <span className="text-[#e34545]">*</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#1f2225] border border-[rgba(255,255,255,0.08)] rounded-[4px] px-[17px] py-[13px] text-[14px] leading-[18px] text-[#818181] placeholder-[#818181] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 items-start w-full">
          <label className="text-[16px] leading-[24px] text-white font-normal">
            Email <span className="text-[#e34545]">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#1f2225] border border-[rgba(255,255,255,0.08)] rounded-[4px] px-[17px] py-[13px] text-[14px] leading-[18px] text-[#818181] placeholder-[#818181] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>

        {/* Github/Portfolio URL */}
        <div className="flex flex-col gap-2 items-start w-full">
          <label className="text-[16px] leading-[24px] text-white font-normal">
            Github/Portfolio URL
          </label>
          <input
            type="url"
            placeholder="Github/Portfolio URL"
            className="w-full bg-[#1f2225] border border-[rgba(255,255,255,0.08)] rounded-[4px] px-[17px] py-[13px] text-[14px] leading-[18px] text-[#818181] placeholder-[#818181] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>

        {/* Resume */}
        <div className="flex flex-col gap-2 items-start w-full">
          <label className="text-[16px] leading-[24px] text-white font-normal">
            Resume <span className="text-[#e34545]">*</span>
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-[#1f2225] border border-[rgba(255,255,255,0.08)] rounded-[4px] px-[17px] py-[13px] flex gap-3 items-center text-left hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            {/* Upload cloud icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818181"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            <span className="text-[14px] leading-[18px] text-[#818181]">
              {fileName ? fileName : "Upload resume (PDF, DOC, DOCX)"}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* What makes you more than a resume? */}
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex flex-col items-start w-full">
            <label className="text-[16px] leading-[24px] text-white font-normal">
              What makes you more than a resume?{" "}
              <span className="text-[#e34545]">*</span>
            </label>
            <p className="text-[12px] leading-[14px] text-[#818181]">
              Answer in 3 sentences or less
            </p>
          </div>
          <textarea
            placeholder="What makes you more than a resume?"
            rows={4}
            className="w-full bg-[#1f2225] border border-[rgba(255,255,255,0.08)] rounded-[4px] px-[17px] py-[13px] text-[16px] leading-[24px] text-[#818181] placeholder-[#818181] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors resize-none"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-white text-black font-bold text-[16px] leading-[20px] px-10 py-5 rounded-[4px] hover:bg-[#e8e8e8] transition-colors"
      >
        Send Application
      </button>
    </div>
  );
}

export default function JobDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const job = JOBS[slug];

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-[#171b1d]">
      <AnnouncementBar />

      {/* Header */}
      <div className="relative h-[140px]">
        <Header />
      </div>

      {/* Page content */}
      <div className="flex flex-col items-center px-6 pt-[60px] pb-24">
        {/* Job header */}
        <div className="flex flex-col gap-4 items-center w-full max-w-[1135px] mb-10">
          {/* Back link */}
          <Link
            to="/careers"
            className="flex gap-2 items-center text-[#818181] text-[16px] leading-[24px] underline hover:text-white transition-colors no-underline group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-180"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            <span className="underline">See All Positions</span>
          </Link>

          {/* Job title */}
          <h1 className="font-bold text-white text-[48px] leading-[62px] text-center capitalize">
            {job.title}
          </h1>

          {/* Meta */}
          <p className="font-normal text-white text-[16px] leading-[24px] text-center">
            {job.location}&nbsp;&nbsp;{job.type}&nbsp;&nbsp;Posted{" "}
            {job.postedDate}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="bg-black flex gap-1 items-center justify-center p-1 rounded-[4px] w-[380px] h-[48px] mb-10">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 h-full flex items-center justify-center px-6 py-2 rounded-[4px] text-[16px] leading-[24px] transition-colors ${
              activeTab === "overview"
                ? "bg-[#30393e] text-white"
                : "text-[#818181] hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("application")}
            className={`flex-1 h-full flex items-center justify-center px-6 py-2 rounded-[4px] text-[16px] leading-[24px] transition-colors ${
              activeTab === "application"
                ? "bg-[#30393e] text-white"
                : "text-[#818181] hover:text-white"
            }`}
          >
            Application
          </button>
        </div>

        {/* Tab content */}
        <div className="w-full max-w-[800px]">
          {activeTab === "overview" ? (
            <OverviewTab job={job} />
          ) : (
            <ApplicationTab />
          )}
        </div>
      </div>

    </div>
  );
}
