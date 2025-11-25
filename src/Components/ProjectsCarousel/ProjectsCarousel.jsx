import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {projects as projectsList} from '../../util/util'

function CarouselItem({ project, index, scrollProgress, totalItems, onClick }) {
  const activeFloat = useTransform(scrollProgress, [0, 1], [0, totalItems - 1])
  
  // Smooth spring animation for all transforms
  const active = useTransform(activeFloat, (val) => index - val)
  const activeSpring = useSpring(active, { stiffness: 100, damping: 30, mass: 0.5 })
  
  const x = useTransform(activeSpring, (val) => `${val * 70}%`)
  const y = useTransform(activeSpring, (val) => `${val * 25}%`)
  const rotate = useTransform(activeSpring, (val) => `${val * 18}deg`)
  const opacity = useTransform(activeSpring, (val) => Math.max(0, 1 - Math.abs(val) * 0.4))
  
  // Z-index based on distance from center
  const zIndex = useTransform(activeSpring, (val) => 
    totalItems - Math.round(Math.abs(val))
  )

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => {
        e.preventDefault()
        onClick(index)
        window.open(project.link, '_blank')
      }}
      className="carousel-item absolute pointer-events-auto rounded-lg shadow-2xl bg-black/80 overflow-hidden cursor-pointer"
      style={{
        x,
        y,
        rotate,
        zIndex,
        width: 'clamp(150px, 30vw, 300px)',
        height: 'clamp(200px, 40vw, 400px)',
        top: '50%',
        left: '50%',
        marginTop: 'calc(clamp(200px, 40vw, 400px) * -0.5)',
        marginLeft: 'calc(clamp(150px, 30vw, 300px) * -0.5)',
        transformOrigin: '0% 100%',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
      aria-label={project.title || `Project ${index + 1}`}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400/30 via-transparent to-black/50 z-10" />
        <img 
          src={project.src} 
          alt={project.title || `project-${index + 1}`} 
          className="w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />
        <div className="absolute left-5 bottom-5 z-20 text-white text-[clamp(20px,3vw,30px)] drop-shadow-lg font-bold">
          {project.title || `Project ${index + 1}`}
        </div>
        <div className="absolute left-5 top-3 z-20 text-white/60 text-[clamp(20px,10vw,80px)] font-bold">
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </motion.a>
  )
}

export default function ProjectsCarousel({ projects = projectsList }) {
  const containerRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  
  // Use Framer Motion's optimized scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  })

  // Progress bar height
  const progressHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  // Mouse cursor tracking (throttled)
  useEffect(() => {
    let rafId
    const handleMouseMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY })
        rafId = null
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const onItemClick = (index) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const containerTop = rect.top + window.scrollY
    const containerHeight = containerRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const scrollableDistance = containerHeight - viewportHeight
    
    const targetProgress = index / (projects.length - 1)
    const targetScroll = containerTop + targetProgress * scrollableDistance
    
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full font-['Roboto']"
      style={{ height: '300vh' }}
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

      {/* Sticky carousel container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Custom cursors */}
        <motion.div 
          className="fixed z-50 hidden md:block pointer-events-none rounded-full border border-white/20"
          style={{
            width: 40,
            height: 40,
            left: 0,
            top: 0,
            x: cursorPos.x - 20,
            y: cursorPos.y - 20
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <motion.div 
          className="fixed z-50 hidden md:block pointer-events-none rounded-full bg-white"
          style={{
            width: 2,
            height: 2,
            left: 0,
            top: 0,
            x: cursorPos.x - 1,
            y: cursorPos.y - 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Carousel items */}
        <div className="relative h-full w-full pointer-events-none">
          {projects.map((project, index) => (
            <CarouselItem
              key={index}
              project={project}
              index={index}
              scrollProgress={smoothProgress}
              totalItems={projects.length}
              onClick={onItemClick}
            />
          ))}
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-8 text-white/40 -rotate-90 text-xs tracking-widest pointer-events-none">
          Projects — Portfolio
        </div>

        {/* Progress bar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-32 w-0.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-white/80 rounded-full"
            style={{ height: progressHeight }}
          />
        </div>
      </div>
    </div>
  )
}