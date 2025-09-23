import React from "react";
import { motion } from "framer-motion";
import AnimatedHeroText from "../AnimatedHeroText/AnimatedHeroText";
import StarBackground from "../backgrounds/StarBackground";

function Hero() {
  // Variants for heading animation
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
      <div
        id="home"
        className="w-full h-dvh flex items-center flex-col justify-center sticky top-0 left-0 px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Hero animated text component */}
        <AnimatedHeroText />

        {/* Heading with Framer Motion animation */}
        <motion.h1
          className="m-0 text-[1.5em] sm:text-[1.8em] md:text-[2.2em] lg:text-[2.5em] xl:text-[2.5em] text-center leading-tight sm:leading-normal md:leading-normal lg:leading-normal px-2 sm:px-4 md:px-6 lg:px-0"
          initial="hidden"
          animate="visible"
          variants={headingVariants}>
          Brands Through Thoughtful{" "}
          <span className="text-purple-800 font-semibold">Software</span>{" "}
          Solutions
        </motion.h1>
      </div>
    </StarBackground>
  );
}

export default Hero;
