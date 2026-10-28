import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../Common/SectionHeading/SectionHeading";
import { processSteps } from "../../util/util";

const COUNT = processSteps.length;

// How many steps the line has reached for a given scroll progress (0..1)
const stepsReached = (progress) =>
  progress < 0.02 ? 0 : Math.min(COUNT, Math.floor((progress - 0.02) * COUNT) + 1);

export default function ProcessSteps() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const [reached, setReached] = useState(0);

  // The line draws as the timeline scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.55"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!reduceMotion) setReached(stepsReached(progress));
  });

  const litCount = reduceMotion ? COUNT : reached;

  return (
    <section id="process" className="theme-section relative scroll-mt-24 py-24 md:py-32">
      <div className="site-container">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from first conversation to"
          accent="launch"
        />

        <div ref={timelineRef} className="relative mt-16 lg:mt-24">
          {/* track + glowing fill: horizontal on desktop, vertical on small screens */}
          <div
            aria-hidden="true"
            className="absolute top-[7px] left-0 hidden h-px w-full bg-white/10 lg:block"
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-[7px] left-0 hidden h-px w-full origin-left bg-gradient-to-r from-brand-violet to-brand-cyan shadow-[0_0_14px_rgb(0_229_255/0.7)] lg:block"
            style={{ scaleX: reduceMotion ? 1 : scrollYProgress }}
          />
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-white/10 lg:hidden"
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-brand-violet to-brand-cyan shadow-[0_0_14px_rgb(0_229_255/0.7)] lg:hidden"
            style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
          />

          <ol className="grid gap-14 lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => {
              const lit = index < litCount;
              return (
                <li
                  key={step.title}
                  className={`relative pl-12 transition-opacity duration-700 lg:pt-12 lg:pl-0 ${
                    lit ? "opacity-100" : "opacity-45"
                  }`}>
                  <span
                    aria-hidden="true"
                    className={`absolute top-3 left-0 size-[15px] rounded-full border transition-[background-color,border-color,box-shadow] duration-500 lg:top-0 ${
                      lit
                        ? "border-brand-cyan bg-brand-cyan shadow-[0_0_20px_rgb(0_229_255/0.9)]"
                        : "border-white/25 bg-[#0b0812]"
                    }`}
                  />
                  <span
                    className="outline-numeral block text-[5rem] leading-none font-bold lg:text-[5.5rem]"
                    data-lit={lit}>
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-brand-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{step.desc}</p>
                  <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed">
                    <span className="font-semibold text-brand-cyan">You get </span>
                    <span className="text-brand-text-soft">{step.deliverable}</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold text-brand-white md:text-3xl">Ready to start?</p>
            <p className="mt-2 text-sm text-brand-muted md:text-base">
              Tell us about your idea and we&apos;ll take it from there.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-brand-cyan px-7 py-3 font-semibold text-brand-black shadow-[0_0_0_0_rgb(0_229_255/0.4)] transition-shadow duration-500 hover:shadow-[0_0_40px_6px_rgb(0_229_255/0.35)]">
            Start a project
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
