import React from "react";
import AnimatedHeroText from "../AnimatedHeroText/AnimatedHeroText";
import ParticlesBackground from "../ParticlesBackground/BackgroundDesign";
import StarBackground from "../backgrounds/StarBackground";
function Hero() {
  return (
    <StarBackground>
      <div id="home" className="w-full h-dvh flex items-center flex-col justify-center position-sticky top-0 left-0 px-4 sm:px-6 md:px-8 lg:px-0">
        <AnimatedHeroText />
        <h1 className="m-0 text-[1.5em] sm:text-[1.8em] md:text-[2.2em] lg:text-[2.5em] xl:text-[2.5em] opacity-0 animate-[slideInUp_0.8s_ease-out_forwards] text-center leading-tight sm:leading-normal md:leading-normal lg:leading-normal px-2 sm:px-4 md:px-6 lg:px-0">
          Brands Through Thoughtful{" "}
          <span className="text-purple-800 font-semibold">Software</span> Solutions
        </h1>
      </div>
    </StarBackground>
  );
}

export default Hero;
