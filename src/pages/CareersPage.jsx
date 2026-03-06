import { Link } from "react-router-dom";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function JobCard({ title, location, type, isRemote }) {
  const slug = toSlug(title);
  return (
    <Link
      to={`/careers/${slug}`}
      className="block no-underline"
    >
      <div className="bg-[#1f2225] rounded flex gap-2 items-center justify-between px-6 py-4 hover:bg-[#262b2e] transition-colors cursor-pointer">
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-semibold text-base text-white leading-[22px]">
            {title}
          </p>
          <div className="flex gap-3 text-base leading-6 font-normal">
            <span className={isRemote ? "text-[#62d947]" : "text-[#818181]"}>
              {location}
            </span>
            <span className="text-[#818181]">{type}</span>
          </div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function CareersPage() {
  const contentJobs = [
    {
      title: "Corporate Content & Communications Lead",
      location: "Irvine, CA",
      type: "Full-time",
      isRemote: false,
    },
    {
      title: "Short Form Creative Content Producer",
      location: "Irvine, CA",
      type: "Full-time",
      isRemote: false,
    },
  ];

  const engineeringJobs = [
    {
      title: "Product Engineer",
      location: "Irvine, CA",
      type: "Full-time",
      isRemote: false,
    },
    {
      title: "Unity Engineer (Full-Stack)",
      location: "Remote",
      type: "Full-time",
      isRemote: true,
    },
  ];

  return (
    <div className="min-h-screen font-sans antialiased bg-[#171b1d]">
      <AnnouncementBar />

      {/* Header */}
      <div className="relative h-[140px]">
        <Header />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center px-6 pt-[60px] pb-24">
        {/* Title */}
        <div className="text-center mb-16 w-full max-w-[1135px]">
          <h1 className="text-white font-bold text-[48px] leading-[62px] capitalize mb-4">
            Careers
          </h1>
          <p className="text-white text-base leading-6 font-normal">
            Join us in building next-generation athlete technology
          </p>
        </div>

        {/* Job listings */}
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          {/* Content section */}
          <div>
            <p className="font-bold text-base text-[#818181] leading-6 mb-2">
              CONTENT
            </p>
            <div className="flex flex-col gap-3">
              {contentJobs.map((job) => (
                <JobCard key={job.title} {...job} />
              ))}
            </div>
          </div>

          {/* Engineering section */}
          <div>
            <p className="font-bold text-base text-[#818181] leading-6 mb-2">
              ENGINEERING
            </p>
            <div className="flex flex-col gap-3">
              {engineeringJobs.map((job) => (
                <JobCard key={job.title} {...job} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
