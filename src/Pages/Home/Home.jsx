import AboutUs from "../../Components/AboutUs/AboutUs";
import BentoCards from "../../Components/BentoCards/BentoCards";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import TheTeam from "../../Components/TheTeam/TheTeam";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BentoCards />
      <TheTeam bg />
    </>
  );
}

export default Home;
