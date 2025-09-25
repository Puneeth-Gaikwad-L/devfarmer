import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedHeroText from "../AnimatedHeroText/AnimatedHeroText";
import StarBackground from "../backgrounds/StarBackground";

function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 4.5]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <StarBackground>
      <section
        ref={sectionRef} // attach ref here
        id="home"
        className="relative w-full h-dvh flex items-center justify-center flex-col overflow-hidden">
        {/* Hero Image with scroll zoom + fade */}
        <motion.img
          src="/macbook.png"
          alt="Hero Background"
          className="
  absolute top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2
  w-[95%] sm:w-[100%] md:w-[100%] lg:w-[100%] 
  h-auto max-h-[90vh]
  object-contain z-0"
          style={{ scale, opacity }}
        />

        {/* Hero Content */}
        <div
          className="
    relative z-10 flex flex-col items-center justify-center
    px-4 sm:px-6 md:px-8 lg:px-0
    max-w-[80%] sm:max-w-[40%] lg:max-w-[50%]
    custom-width
  ">
          <AnimatedHeroText />

          <motion.h1
            className="m-0 text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-2xl 
                       text-center leading-snug sm:leading-normal md:leading-normal 
                       px-2 sm:px-4 md:px-6 lg:px-0"
            initial="hidden"
            animate="visible"
            variants={headingVariants}>
            Brands Through Thoughtful{" "}
            <span className="text-purple-800 font-semibold">Software</span>{" "}
            Solutions
          </motion.h1>
        </div>
      </section>
    </StarBackground>
  );
}

export default Hero;
