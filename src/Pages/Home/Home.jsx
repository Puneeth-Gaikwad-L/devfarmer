import { lazy, Suspense, useEffect } from "react";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import ClientStrip from "../../Components/ClientStrip/ClientStrip";
import Footer from "../../Components/Common/Footer/Footer";
import TheTeam from "../../Components/TheTeam/TheTeam";
import ProcessSteps from "../../Components/ProcessSteps/ProcessSteps";
import Services from "../../Components/Services/Services";
import { loadContact, loadProjects, loadTestimonials } from "../../util/preload";

// Heavy below-the-fold sections (emailjs) load after the hero paints
const ProjectsCarousel = lazy(loadProjects);
const Testimonials = lazy(loadTestimonials);
const ContactUs = lazy(loadContact);

// Reserve space so the page doesn't jump (and #anchors stay roughly right) while chunks load
const placeholder = (minHeight) => <div aria-hidden="true" style={{ minHeight }} />;

function Home() {
  // Warm the chunks once the browser is idle so scrolling never waits on a download
  useEffect(() => {
    const warm = () => {
      loadProjects();
      loadTestimonials();
      loadContact();
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <ClientStrip />
      <Services />
      <ProcessSteps />
      <Suspense fallback={placeholder("560vh")}>
        <ProjectsCarousel />
      </Suspense>
      <TheTeam />
      <Suspense fallback={placeholder("60vh")}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={placeholder("100vh")}>
        <ContactUs />
      </Suspense>
      <Footer />
    </>
  );
}

export default Home;
