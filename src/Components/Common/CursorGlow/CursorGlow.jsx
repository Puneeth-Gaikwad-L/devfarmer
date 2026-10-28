import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

// Soft cyan glow that trails the cursor across the whole page. Fixed to the viewport, so it
// follows the pointer over every section. Fine-pointer devices only (no glow on touch screens).
function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 24 });
  const sy = useSpring(y, { stiffness: 120, damping: 24 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(0 229 255 / 0.14), transparent 65%)`;

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;
    setEnabled(true);

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 mix-blend-screen"
      style={{ background }}
    />
  );
}

export default CursorGlow;
