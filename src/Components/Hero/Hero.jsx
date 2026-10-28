import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeroText from "../AnimatedHeroText/AnimatedHeroText";
import HeroShowcase from "./HeroShowcase";
import { INTRO_LIFTED_EVENT, shouldShowIntro } from "../../util/intro";

const EASE = [0.16, 1, 0.3, 1];
// How far (in SVG units) each letter of ELEVATING rises as you scroll; uneven so it reads as a wave
const LETTER_LIFT = [70, 120, 85, 140, 95, 125, 80, 135, 100];

// Button that leans toward the cursor
function Magnetic({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * 0.25);
        y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}>
      {children}
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const wordmarkRef = useRef(null);
  const lettersRef = useRef([]);

  // The wordmark waits for the curtain to lift so its animation is seen, not hidden behind it
  const [ready, setReady] = useState(() => !shouldShowIntro());
  useEffect(() => {
    if (ready) return;
    const onLifted = () => setReady(true);
    window.addEventListener(INTRO_LIFTED_EVENT, onLifted, { once: true });
    return () => window.removeEventListener(INTRO_LIFTED_EVENT, onLifted);
  }, [ready]);

  useEffect(() => {
    lettersRef.current = Array.from(wordmarkRef.current?.querySelectorAll("g.line") ?? []);
  }, []);

  // ---- scroll scene (section is tall; the stage inside is sticky)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0.3, 0.62], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.8], ["92vh", "18vh"]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.8], [24, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.8], [0.9, 1]);

  // Each letter rises at its own pace
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion) return;
    const eased = Math.min(Math.max(progress / 0.6, 0), 1) ** 2;
    lettersRef.current.forEach((letter, index) => {
      letter.style.transform = `translateY(${-eased * LETTER_LIFT[index]}px)`;
    });
  });

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`hero-bg relative text-white ${reduceMotion ? "min-h-dvh" : "h-[220vh]"}`}>
      <h1 className="sr-only">Elevating brands through thoughtfully crafted software</h1>

      <div
        className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-10 [perspective:1400px]">
        {/* Project preview that rises from behind the wordmark as you scroll */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="@container absolute top-0 left-1/2 z-0 aspect-[2.1/1] w-[min(88vw,1100px)] overflow-hidden rounded-2xl border border-brand-violet/25 shadow-[0_30px_120px_rgb(0_0_0/0.6)]"
            style={{
              x: "-50%",
              y: cardY,
              rotateX: cardRotate,
              scale: cardScale,
              transformOrigin: "50% 0%",
            }}>
            <HeroShowcase />
          </motion.div>
        )}

        {/* Wordmark + copy */}
        <div className="relative z-10 flex w-full flex-col items-center">
          {/* The animated ELEVATING SVG: the same component, just given the full width */}
          <motion.div
            ref={wordmarkRef}
            className="w-full"
            style={reduceMotion ? undefined : { opacity: wordmarkOpacity }}>
            <AnimatedHeroText
              start={ready}
              traceWidth={1.1}
              outlineWidth={0.8}
              className="flex w-full items-center justify-center"
              svgClassName="h-auto w-[min(94vw,1400px)] overflow-visible"
            />
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col items-center text-center sm:mt-8"
            style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}>
            <motion.p
              {...reveal(0.9)}
              className="text-lg text-brand-white sm:text-2xl md:text-3xl">
              Brands Through Thoughtfully{" "}
              <span className="font-semibold text-brand-cyan">Crafted</span> Software
            </motion.p>
            <motion.p
              {...reveal(1.1)}
              className="mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
              Websites, SaaS, and digital products designed around real business problems.
            </motion.p>

            <motion.div
              {...reveal(1.3)}
              className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="#contact"
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-cyan px-7 py-3 font-semibold text-brand-black shadow-[0_0_0_0_rgb(0_229_255/0.4)] transition-shadow duration-500 hover:shadow-[0_0_40px_6px_rgb(0_229_255/0.35)]">
                  Start a project
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 font-semibold text-brand-white backdrop-blur transition-colors hover:border-brand-cyan/60 hover:text-brand-cyan">
                  View our work
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
