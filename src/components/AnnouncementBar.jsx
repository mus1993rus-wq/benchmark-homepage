export function AnnouncementBar() {
  return (
    <div className="w-full bg-black text-white flex items-center justify-center h-10 px-12">
      <span className="font-normal text-base leading-6">AI golf training is now live</span>
      <a
        href="https://golfdaddy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 font-bold text-base leading-5 no-underline transition-opacity hover:opacity-60"
      >
        Learn More
      </a>
    </div>
  );
}
