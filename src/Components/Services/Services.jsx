import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, services } from "../../util/util";
import { selectService } from "../../util/contact";

const EASE = [0.16, 1, 0.3, 1];
const DEFAULT_ACTIVE = null; // no card is lit until the visitor points at one

const imageFor = (title) =>
  projects.find((project) => project.title === title)?.src;

// Illustration for Digital Marketing: a growth chart, not client work (no projects yet)
function MarketingVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(160deg,#1a0f2e,#07050c)] p-4">
      <div className="flex gap-2">
        {["SEO", "Social", "Ads"].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-brand-cyan"
          >
            {chip}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 200 80" className="h-16 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mk-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00e5ff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mk-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b79ced" />
            <stop offset="1" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
        <path
          d="M0 66 C 28 62, 46 56, 68 48 S 108 36, 132 26 S 172 12, 200 6 L200 80 L0 80 Z"
          fill="url(#mk-area)"
        />
        <path
          d="M0 66 C 28 62, 46 56, 68 48 S 108 36, 132 26 S 172 12, 200 6"
          fill="none"
          stroke="url(#mk-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="200" cy="6" r="3.5" fill="#00e5ff" />
      </svg>
      <div className="flex items-end gap-1.5">
        {[35, 50, 42, 66, 58, 80].map((height, index) => (
          <span
            key={index}
            className="w-full rounded-t bg-brand-violet/40"
            style={{ height: `${height * 0.2}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, index, active, onActivate }) {
  const image = service.project ? imageFor(service.project) : null;

  return (
    // The wrapper isn't clipped, so the arrow button can sit in the cut-away corner
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
      onClick={onActivate}
      className={`group relative transition-[translate] duration-500 ${
        active ? "lg:-translate-y-2" : ""
      }`}
    >
      <article
        className={`notch-card flex h-full flex-col overflow-hidden rounded-[26px] rounded-br-none p-6 transition-colors duration-500 ${
          active
            ? "bg-brand-cyan text-brand-black"
            : "bg-[#1c1926] text-brand-white"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl leading-tight font-medium lg:min-h-[3.75rem]">
            {service.title}
          </h3>
          <span
            className={`pt-1 font-mono text-xs tracking-widest ${
              active ? "text-black/50" : "text-brand-muted-deep"
            }`}
          >
            0{index + 1}
          </span>
        </div>
        {/* full-width hairline, edge to edge like the reference */}
        <div
          className={`-mx-6 my-4 h-px ${active ? "bg-black/15" : "bg-white/10"}`}
        />

        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-500 ${
            active
              ? "border-black/20 bg-black/10 text-black"
              : "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan"
          }`}
        >
          {service.tag}
        </span>

        <p
          className={`mt-4 text-sm leading-relaxed transition-colors duration-500 ${
            active ? "text-black/75" : "text-brand-muted"
          }`}
        >
          {service.description}
        </p>
        <p
          className={`mt-3 mb-14 text-xs leading-relaxed transition-colors duration-500 ${
            active ? "text-black/60" : "text-brand-muted-deep"
          }`}
        >
          <span className="font-semibold">Best for:</span> {service.bestFor}
        </p>

        {/* full-bleed preview: runs to the card's left, right and bottom edges */}
        <div className="relative -mx-6 -mb-6 mt-auto">
          <span
            aria-hidden="true"
            className={`absolute inset-x-[10%] -top-[38px] h-16 rounded-t-[1.4rem] transition-colors duration-500 ${
              active ? "bg-white/30" : "bg-white/[0.07]"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute inset-x-[4.5%] -top-[19px] h-16 rounded-t-[1.4rem] transition-colors duration-500 ${
              active ? "bg-white/50" : "bg-white/[0.12]"
            }`}
          />
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-[1.4rem] bg-surface-card">
            {image ? (
              <img
                src={image}
                alt={`${service.project} website`}
                className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <MarketingVisual />
            )}
          </div>
        </div>
      </article>

      {/* the button takes the card's own color and sits in the cut-away corner */}
      <a
        href="#contact"
        onClick={() => selectService(service.title)}
        aria-label={`Start a ${service.title} project`}
        className={`absolute right-[14px] bottom-[14px] z-10 grid size-[60px] place-items-center rounded-full transition-[background-color,transform] duration-500 hover:scale-105 ${
          active
            ? "bg-brand-cyan text-brand-black"
            : "bg-[#1c1926] text-brand-white"
        }`}
      >
        <ArrowUpRight size={24} aria-hidden="true" />
      </a>
    </motion.div>
  );
}

function Services() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);

  return (
    <section
      id="services"
      className="theme-section--violet relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="site-container">
        <div className="rounded-[2rem] border border-white/10 bg-[#0d0a14]/80 p-6 shadow-[0_40px_120px_rgb(0_0_0/0.5)] backdrop-blur sm:p-10 lg:p-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-4xl leading-tight font-medium text-brand-white sm:text-5xl"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
                Services
              </span>
            </motion.h2>
          </div>
          <div className="mt-8 mb-10 h-px bg-white/10" />

          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:pt-2"
            // nothing stays lit once the cursor leaves the row
            onMouseLeave={() => setActiveIndex(DEFAULT_ACTIVE)}>
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                active={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
