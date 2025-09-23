import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Brand from "../Brand/Brand";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#skills" },
    { name: "Projects", href: "#circle-section" },
    { name: "Blogs", href: "#" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion variants
  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-5000 w-[90%] max-w-6xl font-sans">
      <motion.nav
        className={`flex justify-between items-center px-6 py-3 rounded-3xl 
          backdrop-blur-2xl border border-white/40 shadow-lg shadow-black/20 
          transition-all duration-500 
          ${isScrolled ? "bg-white/40 scale-85 py-2" : "bg-white/10"}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Brand />

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex space-x-8 mx-10 justify-center items-center">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={linkVariants}>
                <a
                  href={link.href}
                  className="hover:text-indigo-600 transition-colors font-[500]">
                  {link.name}
                </a>
              </motion.li>
            ))}
            <li>
              <button className="relative rounded-3xl text-indigo-800 px-5 py-2 flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-xl hover:shadow-indigo-800/40 hover:before:h-56 hover:before:w-56 hover:text-white">
                <span className="relative z-10">
                  <a href="#contact-us">Contact us</a>
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
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
        </div>
      </motion.nav>

      {/* ACTIVE Bulb with Notch */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="relative flex justify-center mt-2"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={bulbVariants}>
            <div className="flex items-center gap-2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md relative z-10 animate-pulse">
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
              className="fixed top-0 left-0 w-full h-full bg-white z-40"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ type: "tween", duration: 0.3 }}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <Brand />
                  <button
                    onClick={closeMenu}
                    className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none">
                    <span className="block w-6 h-0.5 bg-black rotate-45 translate-y-1.5"></span>
                    <span className="block w-6 h-0.5 bg-black -rotate-45 -translate-y-1.5"></span>
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center space-y-8 bg-[#ffffffec] backdrop-blur-xl border border-white/20 shadow-lg p-20 rounded-2xl">
                  <ul className="flex flex-col space-y-8 text-center">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.name}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={linkVariants}
                        onClick={closeMenu}>
                        <a
                          href={link.href}
                          className="text-2xl font-medium hover:text-indigo-600 transition-colors">
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                    <li className="pt-4">
                      <button
                        className="relative rounded-3xl text-indigo-800 px-8 py-3 text-lg font-medium flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-xl hover:shadow-indigo-800/40 hover:before:h-56 hover:before:w-56 hover:text-white"
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
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
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
