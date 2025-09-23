import React from "react";
import { motion } from "framer-motion";

function TeamCards({ bgColor, name, position, img, imgBg }) {
  // Variants for scroll-triggered animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      className={`w-[50%] h-[80%] sm:w-[15%] sm:h-[90%] ${
        bgColor || "bg-red-500"
      } rounded-full overflow-hidden flex flex-col`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Animate only once, trigger when 30% visible
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {/* Top text section */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm">{position}</p>
      </div>

      {/* Bottom section */}
      <div
        className={`w-full h-[75%] ${imgBg} rounded-t-full bg-cover bg-center`}
        style={{ backgroundImage: `url(${img})` }}
      />
    </motion.div>
  );
}

export default TeamCards;
