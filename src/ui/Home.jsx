import Heor from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import ProjectsSc from "../components/ProjectsSc";
import Contact from "../components/Contact";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <>
      <Heor />
      <About />
      <Services />
      <TechStack />
      <ProjectsSc />
      <Contact />
    </>
  );
}

export default Home;
