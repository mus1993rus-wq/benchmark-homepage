import { useEffect } from "react";

export function ThankYouModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] px-8 py-10 max-w-[440px] w-full flex flex-col items-center gap-6 text-center"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.28)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Checkmark */}
        <div
          className="w-[64px] h-[64px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "#62d947" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <polyline
              points="5,14 11,20 23,8"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-[24px] leading-[32px] text-[#0f1010]">
            Thank you!
          </h2>
          <p className="font-normal text-[16px] leading-[24px] text-[#555]">
            We've received your message. Our managers will review it and get back to you shortly.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="bg-[#0f1010] text-white font-bold text-[16px] leading-[20px] px-10 py-4 rounded-[6px] hover:bg-[#2a2a2a] transition-colors w-full"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
