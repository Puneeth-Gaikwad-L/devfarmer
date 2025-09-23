import React, { useState, useEffect } from "react";
import Brand from "../Brand/Brand";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#skills" },
    { name: "Projects", href: "#the-team" },
    { name: "Blogs", href: "#" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl font-sans">
      <nav
        className={`flex justify-between items-center px-6 py-3 rounded-3xl 
        backdrop-blur-2xl border border-white/40 shadow-lg shadow-black/20 
        transition-all duration-500 
        ${isScrolled ? "bg-white/40 scale-85 py-2" : "bg-white/10"}`}>
        {/* Brand */}
        <Brand />

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex space-x-8 mx-10 justify-center items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-indigo-600 transition-colors font-[500]">
                  {link.name}
                </a>
              </li>
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
      </nav>

      {/* ACTIVE Bulb with Notch */}
      {isScrolled && (
        <div className="relative flex justify-center mt-2">
          <div className="flex items-center gap-2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse relative z-10">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            ACTIVE
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}>
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
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-2xl font-medium hover:text-indigo-600 transition-colors"
                    onClick={closeMenu}>
                    {link.name}
                  </a>
                </li>
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
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMenu}></div>
      )}
    </div>
  );
}

export default Navbar;
