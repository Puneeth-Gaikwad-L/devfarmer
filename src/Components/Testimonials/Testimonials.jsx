import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { testimonials } from "../../util/util";

function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 theme-section py-16 md:py-20">
      <div className="site-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-brand-cyan">
              Client feedback
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-white md:text-4xl">
              What clients say about working with us
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous review"
              className="grid size-10 place-items-center rounded-full border border-brand-amethyst-border/70 text-brand-cyan transition-colors hover:bg-brand-amethyst/50">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next review"
              className="grid size-10 place-items-center rounded-full border border-brand-amethyst-border/70 text-brand-cyan transition-colors hover:bg-brand-amethyst/50">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <Swiper
          className="mt-8"
          modules={[A11y, Autoplay, Keyboard]}
          keyboard={{ enabled: true }}
          autoplay={
            prefersReducedMotion
              ? false
              : {
                  delay: 6000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          rewind
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
          {testimonials.map((testimonial) => {
            const initials = testimonial.name
              .split(/\s+/)
              .map((part) => part[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <SwiperSlide key={testimonial.name} className="!h-auto">
                <article className="testimonial-glass flex h-full min-h-64 flex-col rounded-lg border border-brand-amethyst-border/70 theme-card p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-amethyst/60 text-sm font-semibold text-white">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words text-sm font-semibold text-brand-white">
                        {testimonial.name}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-brand-text-soft">
                    “{testimonial.feedback}”
                  </blockquote>
                  <p className="mt-5 border-t border-brand-amethyst-border/70 pt-3 text-xs text-brand-muted-deep">
                    Client feedback
                  </p>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <p className="mt-4 text-right text-xs text-brand-muted-deep" aria-live="polite">
          {activeIndex + 1} / {testimonials.length}
        </p>
      </div>
    </section>
  );
}

export default Testimonials;
