import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Use loadSlim for better performance
import particleOptions from "../../static/particlesjs-config.json";

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    // No need to call checkVersion anymore
    await loadSlim(engine);
  };

  const particlesLoaded = async (container) => {
    // Optional callback when particles are loaded
    console.log("Particles loaded", container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default ParticlesBackground;