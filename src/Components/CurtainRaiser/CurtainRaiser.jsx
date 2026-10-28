import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { preloadSiteAssets } from "../../util/preload";
import { INTRO_LIFTED_EVENT, INTRO_SEEN_KEY, shouldShowIntro } from "../../util/intro";

// Brief pause on the finished word before the curtain is allowed to lift
const HOLD_MS = 600;
// Failsafe: a stalled request must never trap the visitor on the intro forever
const MAX_ASSET_WAIT_MS = 15000;

function CurtainRaiser() {
  const [visible, setVisible] = useState(shouldShowIntro);
  const helloRef = useRef(null);
  // Fetched as its own chunk (118 KB) so it doesn't weigh down the main bundle
  const [helloSvg, setHelloSvg] = useState("");
  // The curtain lifts only when BOTH are true: animation finished AND page assets loaded
  const [scaleDone, setScaleDone] = useState(false);
  const [drawDone, setDrawDone] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    import("../../assets/hello.svg?raw").then((module) => {
      if (!cancelled) setHelloSvg(module.default);
    });
    return () => {
      cancelled = true;
    };
  }, [visible]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // storage unavailable (private mode) — intro just shows again next visit
    }
    setVisible(false);
    window.dispatchEvent(new Event(INTRO_LIFTED_EVENT));
  }, []);

  useEffect(() => {
    if (!visible) return;
    const markLoaded = () => setAssetsLoaded(true);
    preloadSiteAssets().then(markLoaded, markLoaded);
    const failsafe = setTimeout(markLoaded, MAX_ASSET_WAIT_MS);
    return () => clearTimeout(failsafe);
  }, [visible]);

  useEffect(() => {
    if (scaleDone && drawDone) {
      const hold = setTimeout(() => setAnimationDone(true), HOLD_MS);
      return () => clearTimeout(hold);
    }
  }, [scaleDone, drawDone]);

  useEffect(() => {
    if (visible && animationDone && assetsLoaded) dismiss();
  }, [visible, animationDone, assetsLoaded, dismiss]);

  useEffect(() => {
    if (!visible) return;

    // Lock on <html>: the Navbar manages body overflow and would otherwise undo this
    document.documentElement.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, dismiss]);

  useEffect(() => {
    const container = helloRef.current;
    if (!visible || !helloSvg || !container) return;

    // Injected imperatively (not via dangerouslySetInnerHTML): the curtain re-renders as its
    // gates flip, and React re-applying the markup would replace the nodes being animated
    container.innerHTML = helloSvg;

    // The 578 ellipses that make up "hello" fade in one after another
    const ellipses = container.querySelectorAll("ellipse");
    const drawing = ellipses.length
      ? animate(ellipses, {
          opacity: [0, 1],
          duration: 125,
          delay: stagger(6.25),
          ease: "outQuart",
          onComplete: () => setDrawDone(true),
        })
      : null;

    return () => drawing?.cancel();
  }, [visible, helloSvg]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          role="dialog"
          aria-label="DevFarmer intro"
          className="theme-hero fixed inset-0 z-[10000] flex items-center justify-center px-4"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div
            ref={helloRef}
            role="img"
            aria-label="hello"
            className="hello-svg w-[min(80vw,900px)]"
            initial={{ scale: 0.5 }}
            animate={{ scale: helloSvg ? 1 : 0.5 }}
            transition={{ duration: 6.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onAnimationComplete={() => helloSvg && setScaleDone(true)}
          />

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-cyan">
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CurtainRaiser;
