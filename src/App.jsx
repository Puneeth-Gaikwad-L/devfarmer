import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import { useEffect, useRef } from "react";

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const offsetX = 10;
    const offsetY = 10;

    const moveCursor = (e) => {
      // Direct update for instant following (no lag)
      cursor.style.transform = `translate3d(${e.clientX + offsetX}px, ${e.clientY + offsetY}px, 0)`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-4 h-4 bg-indigo-800 rounded-full z-50 hidden md:block will-change-transform"
        style={{
          // Remove CSS transitions and use transform3d for better performance
          transform: 'translate3d(0, 0, 0)',
        }}
      ></div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;