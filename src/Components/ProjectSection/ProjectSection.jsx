import { useEffect, useRef, useState } from "react";

export default function RotatingCircle() {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("circle-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Before entering section → stay at 0
      if (rect.top > 0) {
        targetProgress.current = 0;
        return;
      }

      // After completely leaving section → stay at 1
      if (rect.bottom < windowHeight) {
        targetProgress.current = 1;
        return;
      }

      // Only start animating when section top reaches viewport top
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // How much we've scrolled past the section start
        const scrolledPastStart = Math.abs(rect.top);
        const availableScrollDistance = rect.height - windowHeight;

        // Calculate progress (0 to 1)
        const percent = Math.min(scrolledPastStart / availableScrollDistance, 1);
        targetProgress.current = percent;
      }
    };

    const animate = () => {
      // Improved lerp with higher factor for smoother animation
      const diff = targetProgress.current - progress;

      // Only animate if the difference is significant enough
      if (Math.abs(diff) > 0.001) {
        setProgress((prev) => prev + diff * 0.15); // Increased from 0.08 to 0.15
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Snap to target when very close to avoid infinite micro-movements
        setProgress(targetProgress.current);
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Throttle scroll events for better performance
    let scrollTimeout;
    const throttledHandleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 8); // ~120fps throttling
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [progress]);

  const projects = [
    { src: "/img1.jpg", link: "https://example.com/gallery/1" },
    { src: "/img2.jpg", link: "https://example.com/gallery/2" },
    { src: "/img3.jpg", link: "https://example.com/gallery/3" },
    { src: "/img4.jpg", link: "https://example.com/gallery/4" },
    { src: "/img5.jpg", link: "https://example.com/gallery/5" },
    { src: "/img6.jpg", link: "https://example.com/gallery/6" },
    { src: "/img7.jpg", link: "https://example.com/gallery/7" },
    { src: "/img8.jpg", link: "https://example.com/gallery/8" },
  ];


  const radius = 400;
  const rotation = progress * 360; // smooth rotation

  return (
    <section id="circle-section" className="relative h-[200vh] mb-20 mt-20">
      {/* Sticky hero that stays in viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Circle */}
        <div
          className="mt-100 absolute w-[1200px] h-[1200px] rounded-full flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            willChange: 'transform', // Optimize for animations
          }}
        >
          {projects.map((project, i) => {
            const angle = (i / projects.length) * (2 * Math.PI);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            // Add parallax scale + fade
            const depth = (Math.sin(angle + progress * 2 * Math.PI) + 1) / 2; // 0 → 1
            const scale = 0.7 + depth * 0.6;
            const opacity = 0.4 + depth * 0.6;

            return (
              <img
                key={i}
                src={project.src}
                alt=""
                className="absolute rounded-xl shadow-xl object-cover transition-all duration-200 cursor-pointer  hover:shadow-2xl hover:brightness-110 hover:scale-[1.05] hover:z-10"
                style={{
                  width: "260px",
                  height: "200px",
                  transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${-rotation}deg)`,
                  opacity,
                  willChange: 'transform, opacity', // Optimize for animations
                }}
                onClick={() => window.location.href = project.link}
              />
            );
          })}
        </div>

        {/* Center Text */}
        <div className="text-center max-w-xl z-10 self-end mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
            <span className="text-purple-400">Ideas</span> in Action
          </h1>
          <p className="text-gray-500 mb-6">
            Transform your ideas into breathtaking visuals with cutting-edge
            technology.
          </p>
          <a href="#contact-us" className="no-underline text-white cursor-pointer">
            <button className="bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition cursor-pointer" >
              Get in Touch
              <span className="relative inline-flex h-3 w-3 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </button>
          </a>
        </div>

        {/* Mask bottom half */}
        <div className="absolute bottom-0 left-0 right-0 bg-white z-0 h-1/4"></div>
      </div>
    </section>
  );
}