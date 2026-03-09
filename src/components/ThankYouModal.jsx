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
      style={{ background: "rgba(0,0,0,0.24)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[4px] px-[24px] pt-[40px] pb-[40px] max-w-[343px] w-full flex flex-col items-center gap-3 text-center"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.28)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Text */}
        <div className="flex flex-col gap-3 w-full">
          <h2 className="font-bold text-[24px] leading-[28px] text-black">
            Thank you!
          </h2>
          <p className="font-normal text-[16px] leading-[24px] text-black">
            Your message has been sent.<br />
            Our team will get back to you shortly.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="bg-[#0f1010] text-white font-bold text-[16px] leading-[20px] px-10 py-5 rounded-[4px] hover:bg-[#2a2a2a] transition-colors w-full mt-3"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
