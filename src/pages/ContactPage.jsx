import { useState } from "react";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const subjects = [
    "General Inquiry",
    "Partnership",
    "Media & Press",
    "Technical Support",
    "Careers",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen font-sans antialiased">
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
            Let's Talk
          </h1>
          <p className="text-white text-base leading-6 font-normal">
            Questions about Benchmark Sports, partnerships, or media? We'll get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-[600px] flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-base leading-6">
              Name <span className="text-[#e34545]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="bg-[#1f2225] border border-white/[0.08] rounded px-[17px] py-[13px] text-white text-sm leading-[18px] placeholder-[#818181] focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-base leading-6">
              Email <span className="text-[#e34545]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-[#1f2225] border border-white/[0.08] rounded px-[17px] py-[13px] text-white text-sm leading-[18px] placeholder-[#818181] focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-base leading-6">Subject</label>
            <div className="relative">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#1f2225] border border-white/[0.08] rounded px-[17px] py-[13px] text-[#818181] text-sm leading-[18px] appearance-none focus:outline-none focus:border-white/30 transition-colors"
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#818181"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-base leading-6">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Comment"
              rows={4}
              className="bg-[#1f2225] border border-white/[0.08] rounded px-[17px] py-[13px] text-white text-base leading-6 placeholder-[#818181] focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-2">
            <button className="bg-white text-black font-bold px-10 py-5 rounded text-base hover:bg-gray-100 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
