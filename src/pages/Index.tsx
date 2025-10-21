import Hero from "@/components/Hero";
import Services from "@/components/Services";  
import Astrologers from "@/components/Astrologers";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import Horoscope from "@/components/Horoscope";
import Testimonials from "@/components/Testimonials";
import SunSignFinder from "@/components/SunSignFinder";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="services">
          <Services />
        </section>

        <section id="gallery">
          <Gallery />
        </section>
        
        <section id="astrologers">
          <Astrologers />
        </section>
        
        <section id="booking">
          <BookingForm />
        </section>
        
        <section id="horoscope">
          <Horoscope />
        </section>
        
        <SunSignFinder />
        
        <Testimonials />
        
        <section id="blog">
          <Blog />
        </section>
        
        <FAQ />
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
