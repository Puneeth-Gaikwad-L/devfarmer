export const INTRO_SEEN_KEY = "devfarmer-intro-seen";
// Fired the moment the curtain starts lifting, so the hero can begin its own entrance
export const INTRO_LIFTED_EVENT = "devfarmer:intro-lifted";

export const shouldShowIntro = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(INTRO_SEEN_KEY);
  } catch {
    return true;
  }
};
