import { useEffect, useState } from "react";

export default function RotatingCircle() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("circle-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // how much we've scrolled within this section
      const scrolled = Math.min(
        Math.max(0, windowHeight - rect.top),
        windowHeight
      );

      const percent = scrolled / windowHeight; // 0 → 1
      setProgress(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img8.jpg",
  ];

  const radius = 500;
  const rotation = progress * 360; // tie rotation to scroll %

  return (
    <section id="circle-section" className="relative h-[200vh] mb-20">
      {/* Sticky hero that stays in viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Circle */}
        <div
          className="mt-200 absolute w-[1200px] h-[1200px] rounded-full flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          {images.map((src, i) => {
            const angle = (i / images.length) * (2 * Math.PI);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            return (
              <img
                key={i}
                src={src}
                alt=""
                className="absolute w-40 h-40 rounded-lg shadow-lg object-cover"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}
        </div>

        {/* Center Text */}
        <div className="text-center max-w-xl z-10 self-end mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Stunning AI Generated Photos Instantly
          </h1>
          <p className="text-gray-500 mb-6">
            Transform your ideas into breathtaking visuals with cutting-edge AI
            technology.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full">
            Start Generating Now →
          </button>
        </div>

        {/* Mask bottom half */}
        <div className="absolute bottom-0 left-0 right-0 bg-white z-0"></div>
      </div>
    </section>
  );
}