import React from "react";
import Brand from "../Brand/Brand";

function Navbar() {
  return (
    <nav className="m-auto flex justify-between items-center p-4 text-black w-full 
  bg-white/20 backdrop-blur-lg border-b border-white/30 
  shadow-lg sticky top-0 z-50">
      <Brand />
      <div>
        <ul className="flex space-x-10 mx-10 justify-center items-center">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Projects</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
          <li>
            <button className="relative rounded-3xl text-indigo-800 px-5 py-2 flex items-center justify-center overflow-hidden border border-indigo-800 transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-indigo-700 before:duration-500 before:ease-out hover:shadow-2xl hover:shadow-indigo-800 hover:before:h-56 hover:before:w-56 hover:text-white">
              <span className="relative z-10">Contact us</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>

  );
}

export default Navbar;
