import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const steps = [
  { title: "Discovery", desc: "We understand your goals and vision." },
  { title: "Planning", desc: "We outline the roadmap and define milestones." },
  { title: "Design", desc: "We craft a sleek, intuitive, and modern experience." },
  { title: "Development", desc: "We build with precision using the latest tech stack." },
  { title: "Launch", desc: "We deploy, test, and ensure everything runs flawlessly." },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  const stepVariants = {
    hidden: { opacity: 0, y: 60, x: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { delay: i * 0.25, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden py-20"
    >
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: steps.length * 0.25 }}
          className="mt-24 text-center px-4"
        >
          <h3 className="m-0 text-4xl sm:text-5xl md:text-7xl font-bold text-purple-900">
            <span className="text-purple-400">How We Bring</span>
            <br />
            Ideas to Life!
          </h3>
          <p className="text-purple-700 mt-2 max-w-xl mx-auto">
            A transparent, step-by-step path from idea to launch — where every
            phase adds clarity and creativity.
          </p>
        </motion.div>
      )}

      {/* Steps go from right to left now */}
      <motion.div
        className="relative w-full max-w-6xl h-[65vh] flex justify-start items-center"
        initial="hidden"
        animate={controls}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={stepVariants}
            initial="hidden"
            animate={controls}
            className="absolute transition-all duration-300"
            style={{
              bottom: `${index * 90}px`,
              right: `calc(30% - 150px + ${index * 120}px)`, // flipped direction
            }}
          >
            <motion.div
              className="group backdrop-blur-lg bg-gradient-to-tr from-purple-700/40 to-purple-400/20 border border-purple-400/40 shadow-lg rounded-2xl px-8 py-4 w-[240px] md:w-[280px] text-center text-purple-900 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl"
              whileHover={{ y: -10 }}
            >
              <h3 className="font-semibold text-lg mb-1 transition-all duration-300">
                {step.title}
              </h3>

              {/* Hidden content - visible on hover */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
                className="opacity-0 group-hover:opacity-100 group-hover:mt-2 text-sm transition-all duration-500 overflow-hidden"
              >
                {step.desc}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}