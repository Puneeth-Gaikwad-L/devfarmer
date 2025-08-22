import React from "react";
import responsiveAccrossDeevicesImg from '../../../public/responsive-2.jpg'

function BentoCards() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-[#7161ef]">
          Built by teamwork
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-[#7161ef] sm:text-5xl">
          Skills that power great products
        </p>

        <div className="mt-10 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* 1st Card */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-xl bg-[#7161ef]/20 backdrop-blur-lg border border-[#7161ef]/30 shadow-lg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1a1a1a] max-lg:text-center">
                  Seamless Across Devices
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Our solutions are built mobile-first and responsive by default, ensuring a flawless experience on any screen size.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-2xl border border-[#7161ef]/30 bg-[#7161ef]/10 backdrop-blur-md">
                  <img
                    alt=""
                    src={responsiveAccrossDeevicesImg}
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Card */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-xl bg-[#7161ef]/20 backdrop-blur-lg border border-[#7161ef]/30 shadow-lg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1a1a1a] max-lg:text-center">
                  Blazing Fast Performance
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  We optimize every layer — from backend APIs to frontend rendering — so your product runs smooth, even at scale
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
          </div>

          {/* 3rd Card */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-xl bg-[#7161ef]/20 backdrop-blur-lg border border-[#7161ef]/30 shadow-lg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1a1a1a] max-lg:text-center">
                  Security You Can Trust
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  With enterprise-grade security, encrypted data flows, and robust authentication, we keep your users and business protected.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4th Card */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-xl bg-[#7161ef]/20 backdrop-blur-lg border border-[#7161ef]/30 shadow-lg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1a1a1a] max-lg:text-center">
                  Built for Growth
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Our modular APIs and integrations give you the flexibility to scale, adapt, and connect with the tools you already love.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-[#7161ef]/10 backdrop-blur-md border border-[#7161ef]/30">
                  <div className="flex bg-white/20 backdrop-blur-sm border-b border-[#7161ef]/30">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-700">
                      <div className="border-r border-[#7161ef]/30 bg-[#7161ef]/20 px-4 py-2 text-[#1a1a1a]">
                        NotificationSetting.jsx
                      </div>
                      <div className="border-r border-[#7161ef]/30 px-4 py-2">
                        App.jsx
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14">
                    {/* Your code example */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default BentoCards;
