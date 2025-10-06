import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "../../util/util";

export default function RotatingCircle() {
  const sectionRef = useRef(null);

  // Track scroll progress only while the section is in view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"], 
    // "start start" → starts when section top touches top of viewport
    // "end end" → ends when bottom touches bottom → keeps rotation full in view
  });

  // Wait until section fully enters viewport before starting rotation
  // Use a small delay offset (0.3 → 0.9 range) to control when animation starts/ends
  const rotation = useTransform(scrollYProgress, [0.3, 0.9], [0, 360]);

  const radius = 400;

  return (
    <section
      ref={sectionRef}
      id="circle-section"
      className="relative h-[250vh] mb-20 mt-20"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Rotating Circle */}
        <motion.div
          className="absolute w-[1200px] h-[1200px] rounded-full flex items-center justify-center"
          style={{
            rotate: rotation,
            transformOrigin: "center center",
            willChange: "transform",
            backfaceVisibility: "hidden",
            translateY: "155px",
          }}
        >
          {projects.map((project, i) => {
            const angle = (i / projects.length) * (2 * Math.PI);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  x,
                  y,
                  willChange: "transform",
                }}
              >
                {/* Counter-rotate to stay upright */}
                <motion.div
                  style={{
                    rotate: useTransform(rotation, (r) => -r),
                    willChange: "transform",
                  }}
                >
                  <img
                    src={project.src}
                    alt=""
                    className="rounded-xl shadow-xl object-cover cursor-pointer hover:shadow-2xl hover:brightness-110 hover:scale-[1.05] hover:z-10 transition-all"
                    style={{
                      width: "260px",
                      height: "200px",
                    }}
                    onClick={() => (window.location.href = project.link)}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center Text */}
        <div className="text-center max-w-xl z-10 self-end mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
            <span className="text-purple-400">Ideas</span> in Action
          </h1>
          <p className="text-gray-500 mb-6">
            Transform your ideas into breathtaking visuals with cutting-edge
            technology.
          </p>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
            <a href="#contact-us" className="no-underline text-white">
              Get in Touch
            </a>
          </button>
        </div>

        {/* Mask bottom half */}
        <div className="absolute bottom-0 left-0 right-0 bg-white z-0 h-1/4"></div>
      </div>
    </section>
  );
}