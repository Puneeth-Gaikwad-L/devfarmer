import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import BrowserBar from "../Common/BrowserBar/BrowserBar";
import SectionHeading from "../Common/SectionHeading/SectionHeading";
import { projects as projectsList } from "../../util/util";

// Layered, scroll-linked background word that fades/scales in as its card comes to the front
function BackgroundText({ text, index, progress }) {
  const distance = useTransform(progress, (p) => p - index);
  const opacity = useTransform(distance, [-0.5, 0, 0.5], [0, 1, 0]);
  const scaleY = useTransform(distance, [-0.5, 0, 0.5], [0, 1, 0]);
  const repeated = Array(4).fill(text).join(" ");

  return (
    <motion.div
      style={{ opacity, scaleY, y: "-50%", x: "-50%" }}
      className="absolute top-1/2 left-1/2 overflow-hidden w-[200vw] pointer-events-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        className="flex whitespace-nowrap text-[max(4rem,7.5vw)] font-black uppercase tracking-tighter mix-blend-overlay leading-none text-white/20">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </motion.div>
    </motion.div>
  );
}

// One face of the rotating 3D stack. Every card sits on its own 180deg step of rotateX.
function ProjectCard({ project, index, progress }) {
  const visibility = useTransform(progress, (p) =>
    Math.abs(p - index) <= 1 ? "visible" : "hidden"
  );

  return (
    <motion.div
      style={{ rotateX: index * 180, visibility }}
      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl sm:rounded-[2rem] border [backface-visibility:hidden] bg-[#0a0a0a] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      <BrowserBar url={project.link} />
      <div className="relative min-h-0 flex-1">
        <img
          src={project.src}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-col gap-3 w-full">
          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm sm:text-base font-medium text-white border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} site`}
            className="mt-1 inline-flex w-fit items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-cyan sm:absolute sm:right-10 sm:bottom-10 sm:mt-0">
            View Site
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsCarousel({ projects = projectsList }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lastIndex = Math.max(0, projects.length - 1);
  const rotateX = useTransform(smooth, [0, 1], [0, lastIndex * 180]);
  const activeIndex = useTransform(smooth, [0, 1], [0, lastIndex]);

  if (!projects || projects.length === 0) return null;

  return (
    // The heading sits outside the scroll scene, so the scene's scroll progress starts exactly
    // where the first card does
    <div id="projects" className="theme-section scroll-mt-24">
      <div className="site-container pt-24 pb-10 md:pt-32 md:pb-14">
        <SectionHeading eyebrow="Selected work" title="Projects we've" accent="built and launched" />
      </div>

      <section
        aria-label="Projects"
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${Math.max(projects.length * 100, 100)}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center [perspective:1200px]">
          {projects.map((project, index) => (
            <BackgroundText
              key={`bg-${project.title}`}
              index={index}
              progress={activeIndex}
              text={project.bgText}
            />
          ))}

          <motion.div
            style={{ rotateX, transformStyle: "preserve-3d" }}
            className="relative w-[90%] max-w-6xl aspect-[4/3] sm:aspect-[16/9]">
            {projects.map((project, index) => (
              <ProjectCard
                key={`card-${project.title}`}
                index={index}
                progress={activeIndex}
                project={project}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
