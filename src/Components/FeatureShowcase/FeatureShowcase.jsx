import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "../../util/util";

const AUTO_PLAY_MS = 8000;

const renderLaptopContent = (slideId) => {
  switch (slideId) {
    case "responsive":
      return (
        <div className="flex h-full flex-col gap-4 p-4">
          {/* Top title bar */}
          <div className="h-7 w-2/3 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#6366f1]" />
          {/* Three columns layout to hint responsive grid */}
          <div className="flex gap-3 mt-2">
            <div className="flex-1 space-y-3">
              <div className="h-3 w-5/6 rounded-lg bg-white/10" />
              <div className="h-3 w-4/6 rounded-lg bg-white/7" />
              <div className="h-3 w-3/4 rounded-lg bg-white/5" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-3 w-4/6 rounded-lg bg-white/10" />
              <div className="h-3 w-full rounded-lg bg-white/7" />
              <div className="h-3 w-3/5 rounded-lg bg-white/5" />
            </div>
            <div className="flex-1 space-y-3 hidden md:block">
              <div className="h-3 w-5/6 rounded-lg bg-white/10" />
              <div className="h-3 w-4/6 rounded-lg bg-white/7" />
              <div className="h-3 w-2/3 rounded-lg bg-white/5" />
            </div>
          </div>
          {/* Bottom CTA */}
          <div className="mt-auto h-6 w-1/2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a855f7]" />
        </div>
      );

    case "performance":
      return (
        <div className="flex h-full flex-col gap-4 p-4">
          {/* Top bar */}
          <div className="h-6 w-1/2 rounded-lg bg-gradient-to-r from-[#22c55e] to-[#4ade80]" />
          {/* Graph / speed bars */}
          <div className="mt-2 flex-1 flex items-end gap-2">
            <div className="h-10 w-4 rounded-full bg-white/10" />
            <div className="h-16 w-4 rounded-full bg-white/20" />
            <div className="h-24 w-4 rounded-full bg-gradient-to-t from-[#22d3ee] to-[#a855f7]" />
            <div className="h-14 w-4 rounded-full bg-white/15" />
            <div className="h-20 w-4 rounded-full bg-gradient-to-t from-[#4ade80] to-[#22c55e]" />
          </div>
          {/* Latency row */}
          <div className="flex gap-3 text-[10px] text-slate-200/70">
            <div className="flex-1 h-5 rounded-md bg-white/5" />
            <div className="flex-1 h-5 rounded-md bg-white/5" />
          </div>
        </div>
      );

    case "security":
      return (
        <div className="flex h-full flex-col gap-4 p-4">
          {/* Shield / lock block */}
          <div className="mx-auto mt-2 h-16 w-16 rounded-2xl border border-violet-400/60 bg-gradient-to-br from-[#4c1d95] to-[#020617] flex items-center justify-center shadow-[0_0_30px_rgba(129,140,248,0.6)]">
            <div className="h-7 w-5 rounded-md border border-violet-200/70 bg-violet-500/30 flex items-center justify-center">
              <div className="h-3 w-3 rounded-sm bg-white/90" />
            </div>
          </div>
          {/* Security rows */}
          <div className="space-y-3 mt-2">
            <div className="h-3 w-3/4 rounded-lg bg-white/10" />
            <div className="h-3 w-2/3 rounded-lg bg-white/7" />
            <div className="h-3 w-1/2 rounded-lg bg-white/5" />
          </div>
          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-2 text-[10px]">
            <span className="rounded-full bg-white/10 px-2 py-1">OAuth</span>
            <span className="rounded-full bg-white/10 px-2 py-1">JWT</span>
            <span className="rounded-full bg-white/10 px-2 py-1">TLS</span>
          </div>
        </div>
      );

    case "growth":
      return (
        <div className="flex h-full flex-col gap-4 p-4">
          {/* Title */}
          <div className="h-6 w-2/3 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#f97316]" />
          {/* Growth chart */}
          <div className="mt-3 flex-1 flex items-end gap-3">
            <div className="h-6 w-5 rounded-lg bg-white/8" />
            <div className="h-10 w-5 rounded-lg bg-white/10" />
            <div className="h-16 w-5 rounded-lg bg-white/20" />
            <div className="h-24 w-5 rounded-lg bg-gradient-to-t from-[#f97316] to-[#a855f7]" />
          </div>
          {/* Integration pills */}
          <div className="mt-auto flex flex-wrap gap-2 text-[10px] text-slate-200/80">
            <div className="rounded-full bg-white/5 px-2 py-1">APIs</div>
            <div className="rounded-full bg-white/5 px-2 py-1">Microservices</div>
            <div className="rounded-full bg-white/5 px-2 py-1">Integrations</div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="h-7 w-3/4 rounded-xl bg-gradient-to-r from-[#b48cff] to-[#7dd3fc]" />
          <div className="flex gap-3">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-5/6 rounded-lg bg-white/8" />
              <div className="h-4 w-4/6 rounded-lg bg-white/6" />
              <div className="h-4 w-3/6 rounded-lg bg-white/4" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-full rounded-lg bg-white/8" />
              <div className="h-4 w-5/6 rounded-lg bg-white/6" />
              <div className="h-4 w-4/6 rounded-lg bg-white/4" />
            </div>
          </div>
          <div className="mt-auto h-6 w-2/3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
        </div>
      );
  }
};

const renderPhoneContent = (slideId) => {
  switch (slideId) {
    case "responsive":
      return (
        <div className="flex h-full flex-col gap-3">
          <div className="h-4 w-3/4 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#6366f1]" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-lg bg-white/10" />
            <div className="h-3 w-5/6 rounded-lg bg-white/7" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-4/5 rounded-lg bg-white/10" />
            <div className="h-3 w-3/5 rounded-lg bg-white/7" />
          </div>
          <div className="mt-auto h-7 w-full rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a855f7]" />
        </div>
      );

    case "performance":
      return (
        <div className="flex h-full flex-col gap-3">
          <div className="h-4 w-2/3 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#4ade80]" />
          <div className="mt-1 flex items-end gap-1">
            <div className="h-5 w-2 rounded-full bg-white/10" />
            <div className="h-8 w-2 rounded-full bg-white/15" />
            <div className="h-12 w-2 rounded-full bg-gradient-to-t from-[#22d3ee] to-[#a855f7]" />
            <div className="h-7 w-2 rounded-full bg-white/12" />
          </div>
          <div className="mt-auto h-6 w-3/4 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#6366f1]" />
        </div>
      );

    case "security":
      return (
        <div className="flex h-full flex-col gap-3">
          <div className="h-4 w-1/2 rounded-xl bg-gradient-to-r from-[#4c1d95] to-[#7c3aed]" />
          <div className="mt-1 flex items-center justify-center">
            <div className="h-10 w-10 rounded-2xl border border-violet-300/70 bg-violet-600/40 flex items-center justify-center">
              <div className="h-5 w-4 rounded-md bg-white" />
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="h-3 w-4/5 rounded-lg bg-white/10" />
            <div className="h-3 w-2/3 rounded-lg bg-white/7" />
          </div>
          <div className="mt-auto flex gap-2 text-[9px] text-slate-200/80">
            <span className="rounded-full bg-white/10 px-2 py-1">2FA</span>
            <span className="rounded-full bg-white/10 px-2 py-1">Secure login</span>
          </div>
        </div>
      );

    case "growth":
      return (
        <div className="flex h-full flex-col gap-3">
          <div className="h-4 w-3/4 rounded-xl bg-gradient-to-r from-[#f97316] to-[#a855f7]" />
          <div className="mt-2 flex items-end gap-1">
            <div className="h-4 w-2 rounded-lg bg-white/10" />
            <div className="h-7 w-2 rounded-lg bg-white/14" />
            <div className="h-10 w-2 rounded-lg bg-white/18" />
            <div className="h-14 w-2 rounded-lg bg-gradient-to-t from-[#f97316] to-[#a855f7]" />
          </div>
          <div className="mt-auto h-6 w-4/5 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a855f7]" />
        </div>
      );

    default:
      return (
        <div className="flex h-full flex-col gap-3">
          <div className="h-4 w-3/4 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#6366f1]" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-lg bg-white/10" />
            <div className="h-3 w-5/6 rounded-lg bg-white/7" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded-lg bg-white/10" />
            <div className="h-3 w-4/6 rounded-lg bg-white/7" />
          </div>
          <div className="mt-auto h-7 w-full rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#a855f7]" />
        </div>
      );
  }
};


export function FeatureShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = useRef(null);

    const activeSlide = slides[activeIndex];

    const goTo = (index) => {
        setActiveIndex((prev) => {
            if (index === prev) return prev;
            if (index < 0) return slides.length - 1;
            if (index >= slides.length) return 0;
            return index;
        });
    };

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            // Always go to "next" based on the latest state
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, AUTO_PLAY_MS);
    };


    useEffect(() => {
        resetTimer();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);


    return (
        <section className=" relative w-[85%] overflow-hidden
    m-auto rounded-3xl
    bg-gradient-to-b from-[#faf5ff] via-[#f7f2ff] to-[#f3e8ff]
    border border-white/60
    shadow-[0_24px_70px_rgba(147,51,234,0.18)]
    py-20">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:gap-16">
                {/* LEFT: Device Mockups */}
                <div className="relative w-full max-w-md shrink-0">
                    {/* Glow */}
                    <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
                        <div className="h-full w-full rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(172,116,255,0.55),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(101,220,255,0.4),_transparent_55%)]" />
                    </div>

                    {/* Laptop */}
                    <motion.div
                        key={`laptop-${activeSlide.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative mx-auto w-full rounded-3xl bg-gradient-to-br from-[#201235] to-[#12081f] p-4 shadow-2xl shadow-purple-900/60"
                    >
                        <div className="mb-3 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-red-400" />
                            <span className="h-2 w-2 rounded-full bg-amber-300" />
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div>
                        <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#080311]">
                            {/* TODO: swap skeleton for your actual desktop UI screenshot */}
                            <div className="flex h-full flex-col gap-4 p-4">
                                <div className="h-7 w-3/4 rounded-xl bg-gradient-to-r from-[#b48cff] to-[#7dd3fc]" />
                                <div className="flex gap-3">
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 w-5/6 rounded-lg bg-white/8" />
                                        <div className="h-4 w-4/6 rounded-lg bg-white/6" />
                                        <div className="h-4 w-3/6 rounded-lg bg-white/4" />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 w-full rounded-lg bg-white/8" />
                                        <div className="h-4 w-5/6 rounded-lg bg-white/6" />
                                        <div className="h-4 w-4/6 rounded-lg bg-white/4" />
                                    </div>
                                </div>
                                <div className="mt-auto h-6 w-2/3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
                            </div>
                        </div>
                        <div className="mt-3 h-2 rounded-b-3xl bg-gradient-to-r from-slate-900 to-slate-800" />
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                        key={`phone-${activeSlide.id}`}
                        initial={{ opacity: 0, y: 40, x: 40 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 40, x: 40 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="pointer-events-none absolute -bottom-6 -right-2 w-40 md:-right-10 md:w-44"
                    >
                        <div className="rounded-[34px] border border-white/20 bg-gradient-to-b from-[#181227] to-[#050209] p-2 shadow-2xl shadow-black/70">
                            <div className="mb-2 flex justify-between px-1">
                                <div className="h-2 w-8 rounded-full bg-white/15" />
                                <div className="flex gap-1">
                                    <div className="h-2 w-3 rounded-full bg-white/20" />
                                    <div className="h-2 w-3 rounded-full bg-white/20" />
                                </div>
                            </div>
                            <div className="aspect-[9/19] overflow-hidden rounded-[26px] border border-white/10 bg-[#05010b] p-3">
                                {/* TODO: swap skeleton for your mobile UI screenshot */}
                                <div className="flex h-full flex-col gap-3">
                                    <div className="h-4 w-3/4 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#6366f1]" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-full rounded-lg bg-white/10" />
                                        <div className="h-3 w-5/6 rounded-lg bg-white/7" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 w-full rounded-lg bg-white/10" />
                                        <div className="h-3 w-4/6 rounded-lg bg-white/7" />
                                    </div>
                                    <div className="mt-auto h-7 w-full rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#a855f7]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Text + Controls */}
                <div
                    className="relative w-full max-w-xl text-left text-slate-900"
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={resetTimer}
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-violet-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>How we build for you</span>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-5"
                        >
                            <div className="text-sm uppercase tracking-[0.2em] text-violet-600/90">
                                {activeSlide.eyebrow}
                            </div>

                            <h2 className="text-balance text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
                                {activeSlide.title}
                            </h2>

                            <p className="max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
                                {activeSlide.description}
                            </p>

                            {activeSlide.bullets && (
                                <ul className="mt-3 space-y-2 text-sm text-slate-700/95">
                                    {activeSlide.bullets.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#a855f7] to-[#38bdf8]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        {/* Pills */}
                        <div className="flex flex-wrap gap-2">
                            {slides.map((slide, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={slide.id}
                                        onClick={() => goTo(index)}
                                        className={`relative overflow-hidden rounded-full border px-3 py-1.5 text-xs font-medium transition
                                            ${isActive
                                                ? "border-violet-300 bg-violet-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                                : "border-violet-100 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700"
                                            }`}
                                    >
                                        {slide.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill-glow"
                                                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.35),_transparent_60%)]"
                                            />
                                        )}
                                    </button>

                                );
                            })}
                        </div>

                        {/* Progress indicator */}
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    key={activeSlide.id}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: AUTO_PLAY_MS / 1000, ease: "linear" }}
                                    className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#a855f7]"
                                />
                            </div>
                            <span>
                                {activeIndex + 1} / {slides.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}