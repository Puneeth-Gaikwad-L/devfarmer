import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Brand from "../Brand/Brand";

const NAV_BACKGROUND = "rgba(5,5,5,0.78)";
const NAV_BACKGROUND_SCROLLED = "rgba(14,7,23,0.94)";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
];

// Every section in page order. Sections without a nav link still count, so that scrolling past
// "Projects" into "How we work" etc. doesn't leave the wrong link highlighted.
const SECTION_IDS = ["home", "services", "process", "projects", "about", "testimonials", "contact"];
const NAV_IDS = navLinks.map((link) => link.href.slice(1));

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  // Scrolled state + which section is currently under the top third of the screen
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 100);

      const line = window.innerHeight * 0.35;
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      // Sections with no nav link (e.g. "How we work") highlight nothing
      setActiveId(NAV_IDS.includes(current) ? current : null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock page scroll only while the mobile menu is open; Escape closes it
  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const bulbVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <div className="fixed top-4 left-1/2 z-[5000] flex w-full -translate-x-1/2 justify-center px-2 sm:px-4">
      <motion.nav
        aria-label="Main"
        className="flex w-full max-w-7xl items-center justify-between rounded-xl border border-brand-amethyst-edge/70 px-4 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all sm:px-6 lg:px-8"
        initial={{
          padding: "0.5rem 1rem",
          backgroundColor: NAV_BACKGROUND,
        }}
        animate={{
          width: isMobile ? "fit-content" : isScrolled ? "75%" : "90%",
          marginTop: "0rem",
          padding: isScrolled ? "0.2rem 1rem" : "0rem 1rem",
          backgroundColor: isScrolled
            ? NAV_BACKGROUND_SCROLLED
            : NAV_BACKGROUND,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}>
        {/* Brand: left side on desktop, links home */}
        <a href="#home" aria-label="DevFarmer home" className="shrink-0">
          <Brand />
        </a>

        {/* Desktop navigation: centre */}
        <motion.div
          className="hidden flex-1 justify-center lg:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <ul className="flex items-center space-x-6 xl:space-x-10">
            {navLinks.map((link, index) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <motion.li
                  key={link.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative py-1 text-sm font-medium transition-colors hover:text-brand-cyan xl:text-base ${
                      isActive ? "text-brand-cyan" : ""
                    }`}>
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand-cyan shadow-[0_0_8px_rgb(0_229_255/0.8)] transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Desktop CTA: right side, not a menu item */}
        <a
          href="#contact"
          className="relative hidden shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-brand-cyan px-6 py-2 text-xs text-brand-cyan transition-colors duration-300 hover:bg-brand-cyan hover:text-brand-black hover:shadow-xl hover:shadow-brand-cyan/30 lg:inline-flex xl:px-10 xl:text-sm">
          <span className="relative z-10">Let&apos;s talk</span>
        </a>

        {/* Mobile hamburger */}
        <div className="ml-2 lg:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="flex h-8 w-8 flex-col items-center justify-center space-y-1 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation">
            <span
              className={`block h-0.5 w-6 bg-brand-cyan transition-all duration-300 ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-brand-cyan transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-brand-cyan transition-all duration-300 ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Active status message */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute top-full mt-2 flex justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={bulbVariants}>
            <div className="relative z-10 flex items-center gap-2 rounded-full bg-brand-amethyst px-3 py-1 text-xs font-semibold text-white shadow-md sm:text-sm animate-pulse">
              <span className="h-2 w-2 rounded-full bg-brand-cyan" />
              Looking forward to connect!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation"
              className="fixed top-0 left-0 z-40 h-full w-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}>
              <div className="m-4 flex min-h-[65vh] max-h-[calc(100dvh-2rem)] flex-col overflow-y-auto rounded-2xl border border-brand-amethyst-edge/70 bg-surface-card/95 p-4 shadow-lg backdrop-blur-xl">
                <div className="flex w-full items-center justify-between">
                  <Brand />

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="relative flex h-8 w-8 items-center justify-center focus:outline-none"
                    aria-label="Close menu">
                    <span className="absolute block h-0.5 w-6 rotate-45 bg-brand-cyan" />
                    <span className="absolute block h-0.5 w-6 -rotate-45 bg-brand-cyan" />
                  </button>
                </div>

                <div className="mt-6 flex w-full flex-1 flex-col items-center justify-center">
                  <ul className="flex w-full flex-col space-y-6 text-center sm:space-y-8">
                    {navLinks.map((link, index) => {
                      const isActive = activeId === link.href.slice(1);
                      return (
                        <motion.li
                          key={link.name}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={linkVariants}
                          onClick={closeMenu}
                          className="flex w-full justify-center">
                          <a
                            href={link.href}
                            aria-current={isActive ? "location" : undefined}
                            className={`text-lg font-medium transition-colors hover:text-brand-cyan sm:text-2xl ${
                              isActive ? "text-brand-cyan" : ""
                            }`}>
                            {link.name}
                          </a>
                        </motion.li>
                      );
                    })}

                    {/* CTA remains in the mobile menu */}
                    <li className="flex w-full justify-center pt-4">
                      <a
                        href="#contact"
                        className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-brand-cyan px-6 py-2 text-base font-medium text-brand-cyan transition-colors duration-300 hover:bg-brand-cyan hover:text-brand-black hover:shadow-xl hover:shadow-brand-cyan/30 sm:px-8 sm:py-3 sm:text-lg"
                        onClick={closeMenu}>
                        <span className="relative z-10">Let&apos;s talk</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-30 h-[100vh] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
