import React, { useState } from "react";
import Brand from "../Brand/Brand";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="m-auto flex justify-between items-center p-4 text-black w-full 
  bg-white/20 backdrop-blur-lg border-b border-white/30 
  shadow-lg sticky top-0 z-50">
      <Brand />

      {/* Desktop Navigation - Hidden on mobile and tablet */}
      <div className="hidden lg:block">
        <ul className="flex space-x-10 mx-10 justify-center items-center">
          <li>
            <a href="" className="hover:text-indigo-600 transition-colors">Home</a>
          </li>
          <li>
            <a href="" className="hover:text-indigo-600 transition-colors">About</a>
          </li>
          <li>
            <a href="" className="hover:text-indigo-600 transition-colors">Projects</a>
          </li>
          <li>
            <a href="" className="hover:text-indigo-600 transition-colors">Contact</a>
          </li>
          <li>
            <button className="relative rounded-3xl text-indigo-800 px-5 py-2 flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-2xl hover:shadow-indigo-800 hover:before:h-56 hover:before:w-56 hover:text-white">
              <span className="relative z-10">Contact us</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile/Tablet Hamburger Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
          ></span>
        </button>
      </div>

      {/* Mobile/Tablet Navigation Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <Brand />
            <button
              onClick={closeMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
              aria-label="Close menu"
            >
              <span className="block w-6 h-0.5 bg-black rotate-45 translate-y-1.5"></span>
              <span className="block w-6 h-0.5 bg-black -rotate-45 -translate-y-1.5"></span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-8">
            <ul className="flex flex-col space-y-8 text-center">
              <li>
                <a
                  href=""
                  className="text-2xl font-medium hover:text-indigo-600 transition-colors"
                  onClick={closeMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-2xl font-medium hover:text-indigo-600 transition-colors"
                  onClick={closeMenu}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-2xl font-medium hover:text-indigo-600 transition-colors"
                  onClick={closeMenu}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-2xl font-medium hover:text-indigo-600 transition-colors"
                  onClick={closeMenu}
                >
                  Contact
                </a>
              </li>
              <li className="pt-4">
                <button
                  className="relative rounded-3xl text-indigo-800 px-8 py-3 text-lg font-medium flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-2xl hover:shadow-indigo-800 hover:before:h-56 hover:before:w-56 hover:text-white"
                  onClick={closeMenu}
                >
                  <span className="relative z-10">Contact us</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
