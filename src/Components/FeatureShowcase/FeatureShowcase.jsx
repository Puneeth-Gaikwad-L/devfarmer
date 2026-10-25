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
        <section id="services" className="theme-section--violet relative w-full overflow-hidden scroll-mt-24 py-20">
            <div className="site-container site-container--narrow flex flex-col items-center gap-12 md:flex-row md:gap-16">
                {/* LEFT: Title-matched slide artwork */}
                <div className="relative w-full max-w-md shrink-0">
                    <div className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgb(var(--brand-amethyst-rgb)/0.72),_transparent_60%),radial-gradient(circle_at_bottom,_rgb(var(--brand-cyan-rgb)/0.24),_transparent_55%)] blur-3xl" />
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeSlide.id}
                            src={activeSlide.image}
                            alt={activeSlide.imageAlt}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -18, scale: 0.98 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl shadow-brand-amethyst/60"
                        />
                    </AnimatePresence>
                </div>

                {/* RIGHT: Text + Controls */}
                <div
                    className="relative w-full max-w-xl text-left text-brand-white"
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={resetTimer}
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-amethyst-border bg-surface-card/90 px-3 py-1 text-xs font-medium tracking-wide text-brand-cyan">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
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
                            <div className="text-sm uppercase tracking-[0.2em] text-brand-cyan">
                                {activeSlide.eyebrow}
                            </div>

                            <h2 className="text-balance text-3xl font-semibold leading-tight text-brand-white md:text-4xl">
                                {activeSlide.title}
                            </h2>

                            <p className="max-w-xl text-sm leading-relaxed text-brand-muted md:text-base">
                                {activeSlide.description}
                            </p>

                            {activeSlide.bullets && (
                                <ul className="mt-3 space-y-2 text-sm text-brand-muted/95">
                                    {activeSlide.bullets.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-brand-amethyst to-brand-cyan" />
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
                                                ? "border-brand-cyan bg-brand-cyan text-brand-black shadow-[0_0_20px_rgb(var(--brand-cyan-rgb)/0.22)]"
                                                : "border-brand-amethyst-border/70 bg-surface-deep text-brand-muted hover:border-brand-cyan/70 hover:text-brand-cyan"
                                            }`}
                                    >
                                        {slide.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill-glow"
                                                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,_rgb(var(--brand-cyan-rgb)/0.15),_transparent_60%)]"
                                            />
                                        )}
                                    </button>

                                );
                            })}
                        </div>

                        {/* Progress indicator */}
                        <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                            <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-brand-amethyst/35">
                                <motion.div
                                    key={activeSlide.id}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: AUTO_PLAY_MS / 1000, ease: "linear" }}
                                    className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-amethyst"
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
