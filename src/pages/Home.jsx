import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import Freelancers from "../components/Freelancers/Freelancers";
import Projects from "../components/Projects/Projects";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Stats from "../components/Stats/Stats";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Freelancers />
      <Projects />
      <WhyChoose />
      <Stats />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;