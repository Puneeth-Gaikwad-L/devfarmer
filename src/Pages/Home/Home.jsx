import Navbar from "../../Components/Common/Navbar/Navbar";
import ContactUs from "../../Components/ContactUs/ContactUs";
import Hero from "../../Components/Hero/Hero";
import Footer from "../../Components/Common/Footer/Footer";
import Testimonials from "../../Components/Testimonials/Testimonials";
import TheTeam from "../../Components/TheTeam/TheTeam";
import ProcessSteps from "../../Components/ProcessSteps/ProcessSteps";
import { FeatureShowcase } from "../../Components/FeatureShowcase/FeatureShowcase";
import ProjectsCarousel from "../../Components/ProjectsCarousel/ProjectsCarousel";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureShowcase />
      <ProcessSteps />
      <ProjectsCarousel />
      <TheTeam />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}

export default Home;
