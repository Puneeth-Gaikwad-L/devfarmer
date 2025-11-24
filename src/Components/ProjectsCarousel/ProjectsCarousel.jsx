import React, { useEffect, useRef, useState, useCallback } from 'react'
import { projects as projectsList } from '../../util/util'

export default function ProjectsCarousel({ projects = projectsList }) {
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  const cursorsRef = useRef([])
  const progressRef = useRef(0)
  const progressBarRef = useRef(null)
  const rafRef = useRef(null)
  const scrollMultiplier = 3

  const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v))
  const getZindex = (len, i, active) => len - Math.abs(i - active)

  // Direct DOM manipulation - no React state
  const animate = useCallback((p) => {
    const clamped = clamp(p)
    // Use continuous float value instead of floored integer
    const activeFloat = (clamped / 100) * (projects.length - 1)
    const activeIndex = Math.round(activeFloat) // Only for z-index calculation
    itemsRef.current.forEach((item, i) => {
      if (!item) return
      item.style.setProperty('--zIndex', getZindex(projects.length, i, activeIndex))
      // Use float for smooth continuous movement
      item.style.setProperty('--active', i - activeFloat)
    })
    if (progressBarRef.current) {
      progressBarRef.current.style.height = `${clamped}%`
    }
  }, [projects.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      // Cancel any pending frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      
      // Schedule update on next frame
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const containerHeight = container.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollableDistance = containerHeight - viewportHeight
        const scrolled = -rect.top
        
        if (scrollableDistance <= 0) return
        
        const newProgress = clamp((scrolled / scrollableDistance) * 100)
        progressRef.current = newProgress
        animate(newProgress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  // Mouse cursor tracking (decorative)
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorsRef.current.forEach((c) => {
        if (!c) return
        c.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const onItemClick = (i) => {
    const container = containerRef.current
    if (!container) return
    
    // Calculate scroll position for this item
    const targetProgress = (i / (projects.length - 1)) * 100
    const containerTop = container.offsetTop
    const containerHeight = container.offsetHeight
    const viewportHeight = window.innerHeight
    const scrollableDistance = containerHeight - viewportHeight
    const targetScroll = containerTop + (targetProgress / 100) * scrollableDistance
    
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  // Initial animation
  useEffect(() => { animate(0) }, [animate])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full font-['Roboto']"
      style={{ 
        // Make container tall enough to allow scroll-based progress
        height: `${scrollMultiplier * 100}vh`
      }}
    >
      {/* Sticky inner container that stays in view while scrolling through */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={(el) => (cursorsRef.current[0] = el)} className="cursor fixed z-50 hidden md:block pointer-events-none" />
        <div ref={(el) => (cursorsRef.current[1] = el)} className="cursor2 fixed z-50 hidden md:block pointer-events-none" />

        <div className="carousel relative h-full w-full pointer-events-none">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => { e.preventDefault(); onItemClick(i); window.open(p.link, '_blank') }}
              className="carousel-item absolute pointer-events-auto rounded-lg shadow-2xl bg-black/80 overflow-hidden"
              ref={(el) => (itemsRef.current[i] = el)}
              aria-label={p.title || `Project ${i + 1}`}
            >
              <div className="carousel-box absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-400/30 via-transparent to-black/50 z-10" />
                <img src={p.src} alt={p.title || `project-${i + 1}`} className="w-full h-full object-cover pointer-events-none" />
                <div className="title absolute left-5 bottom-5 z-20 text-white text-[clamp(20px,3vw,30px)] drop-shadow">{p.title || `Project ${i + 1}`}</div>
                <div className="num absolute left-5 top-3 z-20 text-white text-[clamp(20px,10vw,80px)]">{String(i + 1).padStart(2, '0')}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="layout pointer-events-none">
          <div className="box absolute bottom-0 left-8 text-white/40 -rotate-90 text-xs tracking-widest">Projects — Portfolio</div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-32 w-0.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="w-full bg-white/80 rounded-full"
            style={{ height: '0%' }}
          />
        </div>
      </div>

      <style>{`
        .carousel-item {
          --items: ${projects.length};
          --width: clamp(150px, 30vw, 300px);
          --height: clamp(200px, 40vw, 400px);
          --x: calc(var(--active) * 70%);
          --y: calc(var(--active) * 25%);
          --rot: calc(var(--active) * 18deg);
          --opacity: calc(1 - abs(var(--active)) * 0.4);
          z-index: var(--zIndex);
          width: var(--width);
          height: var(--height);
          top: 50%;
          left: 50%;
          margin: calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5);
          transform-origin: 0% 100%;
          transform: translate3d(var(--x), var(--y), 0) rotate(var(--rot));
          transition: none;
          will-change: transform, opacity;
        }
        .carousel-item .carousel-box { 
          opacity: var(--opacity); 
          transition: none;
        }
        .cursor { --size: 40px; width: var(--size); height: var(--size); margin: calc(var(--size) * -0.5) 0 0 calc(var(--size) * -0.5); border-radius: 9999px; border: 1px solid rgba(255,255,255,0.2); transition: transform .85s cubic-bezier(0,0.02,0,1); }
        .cursor2 { --size: 2px; width: var(--size); height: var(--size); transition-duration: .7s; }
      `}</style>
    </div>
  )
}