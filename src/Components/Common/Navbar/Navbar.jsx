import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Brand from "../Brand/Brand";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#skills" },
    { name: "Projects", href: "#circle-section" },
    { name: "Blogs", href: "#" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const bulbVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[5000] w-full flex justify-center px-2 sm:px-4">
      {/* Navbar */}
      <motion.nav
        className="flex items-center justify-between rounded-xl 
                   backdrop-blur-2xl border border-white/50 shadow-lg shadow-black/20
                   w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all"
        initial={{
          padding: "0.5rem 1rem",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
        animate={{
          width: isMobile ? "fit-content" : isScrolled ? "75%" : "15%",
          marginTop: isScrolled ? "0rem" : "6rem",
          padding: isScrolled ? "0.2rem 1rem" : "0rem 1rem",
          backgroundColor: isScrolled
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}>
        {/* Brand - always visible */}
        <div className="sm:block m-auto">
          <Brand />
        </div>

        {/* Desktop Navigation - animate on scroll */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              className="hidden lg:flex flex-1 justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}>
              <ul className="flex space-x-6 xl:space-x-10 mx-4 items-center">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}>
                    <a
                      href={link.href}
                      className="hover:text-indigo-600 transition-colors font-medium text-sm xl:text-base">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <li>
                  <button className="text-xs xl:text-sm relative rounded-3xl text-indigo-800 px-6 xl:px-10 py-2 flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-xl hover:shadow-indigo-800/40 hover:before:h-56 hover:before:w-56 hover:text-white">
                    <span className="relative z-10">
                      <a href="#contact-us">Contact us</a>
                    </span>
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Hamburger - show only when scrolled */}
        <div className="lg:hidden ml-2">
          {isScrolled && (
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
              aria-label="Toggle menu">
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}></span>
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}></span>
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}></span>
            </button>
          )}
        </div>
      </motion.nav>

      {/* ACTIVE Bulb */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute top-full mt-2 flex justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={bulbVariants}>
            <div className="flex items-center gap-2 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md relative z-10 animate-pulse">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Looking forward to connect!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-full h-full z-40"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}>
              {/* Outer container with unified glass effect */}
              <div className="flex flex-col h-[42vh] backdrop-blur-xl bg-white/80 border border-white/80 shadow-lg rounded-2xl m-4 p-4">
                {/* Mobile Header */}
                <div className="flex justify-between items-center w-full">
                  <Brand />
                  <button
                    onClick={closeMenu}
                    className="w-8 h-8 flex items-center justify-center relative focus:outline-none">
                    <span
                      className={`absolute block w-6 h-0.5 bg-black transition-all duration-300 ${
                        isMenuOpen ? "rotate-45" : ""
                      }`}></span>
                    <span
                      className={`absolute block w-6 h-0.5 bg-black transition-all duration-300 ${
                        isMenuOpen ? "-rotate-45" : ""
                      }`}></span>
                  </button>
                </div>

                {/* Mobile Nav */}
                <div className="flex-1 flex flex-col justify-center items-center w-full mt-6">
                  <ul className="flex flex-col space-y-6 sm:space-y-8 text-center w-full">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.name}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={linkVariants}
                        onClick={closeMenu}
                        className="w-full flex justify-center">
                        <a
                          href={link.href}
                          className="text-lg sm:text-2xl font-medium hover:text-indigo-600 transition-colors">
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                    <li className="pt-4 w-full flex justify-center">
                      <button
                        className="relative rounded-3xl text-indigo-800 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-xl hover:shadow-indigo-800/40 hover:before:h-56 hover:before:w-56 hover:text-white"
                        onClick={closeMenu}>
                        <span className="relative z-10">Contact us</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Mobile Overlay */}
            <motion.div
              className="fixed top-[-20px] h-[100vh] inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
