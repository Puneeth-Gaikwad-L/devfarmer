import React from "react";
import AnimatedHeroText from "../AnimatedHeroText/AnimatedHeroText";
import ParticlesBackground from "../ParticlesBackground/BackgroundDesign";
function Hero() {
  return (
    <div className="w-full h-dvh flex aline-center items-center flex-col justify-center position-sticky top-0 left-0">
      <AnimatedHeroText />
      <h1 className="m-0 text-[2.5em] opacity-0 animate-[slideInUp_0.8s_ease-out_forwards]">
        Brands Through Thoughtful <span className="text-indigo-800">Software</span> Solutions
      </h1>
    </div>
  );
}

export default Hero;
