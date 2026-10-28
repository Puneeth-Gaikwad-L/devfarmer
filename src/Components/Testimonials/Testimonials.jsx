import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "../Common/SectionHeading/SectionHeading";
import { projects, testimonials } from "../../util/util";

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 9000;

const initialsOf = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;
  const current = testimonials[active];
  const project = current.project
    ? projects.find((item) => item.title === current.project)
    : null;
  const autoplay = !reduceMotion && !paused && total > 1;

  const go = (index) => setActive((index + total) % total);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setActive((index) => (index + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, autoplay, total]);

  return (
    <section id="testimonials" className="theme-section relative scroll-mt-24 py-24 md:py-32">
      <div className="site-container">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Client feedback"
            title="What clients say about"
            accent="working with us"
          />
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous review"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-brand-white transition-colors hover:border-brand-cyan hover:text-brand-cyan">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next review"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-brand-white transition-colors hover:border-brand-cyan hover:text-brand-cyan">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mt-14 grid gap-6 lg:grid-cols-[1.7fr_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}>
          {/* featured quote */}
          <div className="relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgb(59_10_107/0.4),rgb(10_8_15/0.92)_65%)] p-8 shadow-[0_30px_100px_rgb(0_0_0/0.45)] md:min-h-[26rem] md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand-cyan/10 blur-3xl"
            />
            <Quote
              className="relative size-12 text-brand-cyan/70 md:size-14"
              aria-hidden="true"
              strokeWidth={1.5}
            />

            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative mt-6 flex flex-1 flex-col justify-between gap-10"
                aria-live="polite">
                <blockquote className="text-xl leading-relaxed font-medium text-brand-white md:text-[1.7rem] md:leading-snug">
                  {current.feedback}
                </blockquote>
                <figcaption className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-amethyst-edge to-brand-violet text-sm font-semibold text-brand-black">
                      {initialsOf(current.name)}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-brand-white">{current.name}</p>
                      <p className="text-sm text-brand-muted">{current.role}</p>
                    </div>
                  </div>
                  {project && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand-white transition-colors hover:border-brand-cyan hover:text-brand-cyan">
                      View project
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* who said it: pick any review */}
          <ul className="flex flex-col gap-3" aria-label="Choose a review">
            {testimonials.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => go(index)}
                    aria-current={isActive}
                    className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-500 ${
                      isActive
                        ? "border-brand-cyan/50 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    }`}>
                    <span
                      aria-hidden="true"
                      className={`grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-brand-amethyst-edge to-brand-violet text-brand-black"
                          : "bg-brand-amethyst/60 text-brand-white"
                      }`}>
                      {initialsOf(item.name)}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block truncate text-sm font-semibold transition-colors duration-500 ${
                          isActive ? "text-brand-white" : "text-brand-text-soft"
                        }`}>
                        {item.name}
                      </span>
                      <span className="block truncate text-xs text-brand-muted">{item.role}</span>
                    </span>
                    {isActive && autoplay && (
                      <motion.span
                        key={`progress-${active}`}
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-violet to-brand-cyan"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
