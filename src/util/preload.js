import { projects, teamMembers } from "./util";

// Below-the-fold sections are separate chunks; Home lazy-loads them from these same functions
export const loadProjects = () => import("../Components/ProjectsCarousel/ProjectsCarousel");
export const loadTestimonials = () => import("../Components/Testimonials/Testimonials");
export const loadContact = () => import("../Components/ContactUs/ContactUs");

export const preloadSections = () =>
  Promise.all([loadProjects(), loadTestimonials(), loadContact()]);

// Resolves on error too: one broken image must never trap the visitor on the intro
const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });

const siteImages = () => [
  "/macbook.webp",
  "/brand.png",
  ...projects.map((project) => project.src),
  ...teamMembers.map((member) => member.img),
];

const pageLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  });

// Everything the page needs: document + stylesheet load, fonts, lazy sections and all images
export const preloadSiteAssets = () =>
  Promise.all([
    pageLoaded(),
    document.fonts?.ready,
    preloadSections(),
    ...siteImages().map(preloadImage),
  ]);
