import AboutUs from "../../Components/AboutUs/AboutUs";
import BentoCards from "../../Components/BentoCards/BentoCards";
import Navbar from "../../Components/Common/Navbar/Navbar";
import ContactUs from "../../Components/ContactUs/ContactUs";
import Hero from "../../Components/Hero/Hero";
import RotatingCircle from "../../Components/ProjectSection/ProjectSection";
import Testimonials from "../../Components/Testimonials/Testimonials";
import TheTeam from "../../Components/TheTeam/TheTeam";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BentoCards />
      <RotatingCircle />
      <TheTeam />
      <Testimonials />
      <ContactUs />
    </>
  );
}

export default Home;
