import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Blog from "@/components/sections/Blog";

export default function Page() {
  return (
    <main>
      <section id="home" className="section">
        <Hero />
      </section>
      <section id="portfolio" className="section">
        <Portfolio />
      </section>
      <section id="blog" className="section">
        <Blog />
      </section>
      <section id="testimonials" className="section">
        <Testimonials />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
    </main>
  );
}
