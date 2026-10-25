import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "../../util/util";

const AUTO_PLAY_MS = 8000;

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
    }, [activeIndex]);


    return (
        <section id="services" className="relative w-full overflow-hidden scroll-mt-24 bg-gradient-to-b from-[#faf5ff] via-[#f7f2ff] to-[#f3e8ff] py-20">
            <div className="site-container site-container--narrow flex flex-col items-center gap-12 md:flex-row md:gap-16">
                {/* LEFT: Title-matched slide artwork */}
                <div className="relative w-full max-w-md shrink-0">
                    <div className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(172,116,255,0.55),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(101,220,255,0.4),_transparent_55%)] blur-3xl" />
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeSlide.id}
                            src={activeSlide.image}
                            alt={activeSlide.imageAlt}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -18, scale: 0.98 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl shadow-purple-900/20"
                        />
                    </AnimatePresence>
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
                        <div className="flex items-center gap-2 text-[11px] text-slate-700">
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
