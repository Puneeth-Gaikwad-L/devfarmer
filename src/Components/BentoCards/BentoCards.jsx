import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import responsiveAccrossDeevicesImg from "/responsive-2.jpg";

export default function BentoCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // smooth cubic
      },
    },
  };

  return (
    <section
      id="skills"
      className="section-padding bg-transparent from-white to-[#f5f3ff]"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-base font-semibold text-purple-400">
            💡 Built by teamwork
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-purple-800 sm:text-5xl">
            Skills that power{" "}
            <span className="text-purple-400">great products</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-gray-600 text-base">
            Every card below highlights a principle we live by when building
            modern, scalable, and user-friendly digital products.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          variants={containerVariant}
          initial="hidden"
          animate={controls}
          className="mt-10 grid gap-8 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2"
        >
          {/* 1️⃣ Responsive Across Devices */}
          <motion.div
            variants={cardVariant}
            className="relative lg:row-span-2 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute inset-px rounded-2xl bg-[#7161ef]/10 backdrop-blur-lg border border-[#7161ef]/30 shadow-2xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-xl font-semibold text-[#1a1a1a] max-lg:text-center">
                  📱 Seamless Across Devices
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  Our solutions are built mobile-first and responsive by default,
                  ensuring a flawless experience on any screen size.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-2xl border border-[#7161ef]/30 bg-[#7161ef]/10 backdrop-blur-md">
                  <img
                    alt="Responsive design preview"
                    src={responsiveAccrossDeevicesImg}
                    className="size-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2️⃣ Performance */}
          <motion.div
            variants={cardVariant}
            className="relative max-lg:row-start-1 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute inset-px rounded-2xl bg-[#7161ef]/10 backdrop-blur-lg border border-[#7161ef]/30 shadow-2xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-xl font-semibold text-[#1a1a1a] max-lg:text-center">
                  ⚡ Blazing Fast Performance
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  We optimize every layer — from backend APIs to frontend
                  rendering — so your product runs smooth, even at scale.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt="Performance illustration"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                  className="w-full max-lg:max-w-xs"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* 3️⃣ Security */}
          <motion.div
            variants={cardVariant}
            className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute inset-px rounded-2xl bg-[#7161ef]/10 backdrop-blur-lg border border-[#7161ef]/30 shadow-2xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-xl font-semibold text-[#1a1a1a] max-lg:text-center">
                  🔒 Security You Can Trust
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  With enterprise-grade security, encrypted data flows, and
                  robust authentication, we keep your users and business safe.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <img
                  alt="Security preview"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* 4️⃣ Growth */}
          <motion.div
            variants={cardVariant}
            className="relative lg:row-span-2 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute inset-px rounded-2xl bg-[#7161ef]/10 backdrop-blur-lg border border-[#7161ef]/30 shadow-2xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-xl font-semibold text-[#1a1a1a] max-lg:text-center">
                  🌱 Built for Growth
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  Our modular APIs and integrations give you the flexibility to
                  scale, adapt, and connect with the tools you already love.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-[#7161ef]/10 backdrop-blur-md border border-[#7161ef]/30">
                  <div className="flex bg-white/30 backdrop-blur-sm border-b border-[#7161ef]/30">
                    <div className="-mb-px flex text-sm font-medium text-gray-700">
                      <div className="border-r border-[#7161ef]/30 bg-[#7161ef]/20 px-4 py-2 text-[#1a1a1a]">
                        NotificationSetting.jsx
                      </div>
                      <div className="border-r border-[#7161ef]/30 px-4 py-2">
                        App.jsx
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14 text-sm text-gray-600"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
