import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

// Anything matching this makes the ring swell
const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor]";
// Form fields keep the normal text cursor
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

// Custom cursor for mouse devices: a dot exactly on the pointer plus a springy trailing ring.
// The ring grows over interactive elements, shrinks while pressing, and can show a label via
// data-cursor="View". Touch screens and reduced-motion users keep their normal cursor.
function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [onText, setOnText] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const over = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const field = target?.closest(TEXT_FIELD);
      setOnText(Boolean(field));
      const hit = field ? null : target?.closest(INTERACTIVE);
      setHovering(Boolean(hit));
      setLabel(hit?.getAttribute("data-cursor") ?? "");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const shown = visible && !onText;
  const ringSize = label ? 76 : hovering ? 52 : 34;

  return (
    <>
      {/* ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] grid place-items-center rounded-full border border-brand-cyan/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: shown ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: hovering ? "rgba(0, 229, 255, 0.14)" : "rgba(0, 229, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}>
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[11px] font-semibold tracking-wide text-brand-cyan uppercase">
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* dot: exactly on the pointer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-1.5 rounded-full bg-brand-cyan"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: shown && !label ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

export default Cursor;
