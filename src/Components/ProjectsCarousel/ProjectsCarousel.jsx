import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { projects as projectsList } from "../../util/util"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsCarousel({ projects = projectsList }) {
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = projects.length

      itemsRef.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          {
            xPercent: index * 70,
            yPercent: index * 25,
            rotate: index * 18,
            opacity: 1 - index * 0.4,
            zIndex: total - index
          },
          {
            xPercent: -(total - index - 1) * 70,
            yPercent: -(total - index - 1) * 25,
            rotate: -(total - index - 1) * 18,
            opacity: 1,
            zIndex: total,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [projects])

  return (
    <div
      ref={containerRef}
      className="relative w-full font-['Roboto']"
      style={{ height: "300vh" }}
    >
      {/* Header */}
      <div className="w-full px-4 my-20">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
            <span className="text-purple-400">Ideas</span> in Action
          </h1>
          <p className="text-gray-500 mb-6">
            Transform your ideas into breathtaking visuals with cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          {projects.map((project, index) => (
            <a
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="absolute rounded-lg shadow-2xl bg-black/80 overflow-hidden cursor-pointer"
              style={{
                width: "clamp(150px, 30vw, 300px)",
                height: "clamp(200px, 40vw, 400px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                transformOrigin: "0% 100%",
                willChange: "transform"
              }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-400/30 to-black/60 z-10" />
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute left-5 bottom-5 z-20 text-white text-[clamp(20px,3vw,30px)] font-bold">
                  {project.title}
                </div>

                <div className="absolute left-5 top-3 z-20 text-white/60 text-[clamp(20px,10vw,80px)] font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-8 text-white/40 -rotate-90 text-xs tracking-widest pointer-events-none">
          Projects — Portfolio
        </div>
      </div>
    </div>
  )
}
