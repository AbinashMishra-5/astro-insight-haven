import { Button } from "@/components/ui/button";
import { Star, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-20 left-20 text-secondary animate-pulse" size={24} />
        <Sparkles className="absolute top-40 right-32 text-accent animate-pulse" size={20} />
        <Star className="absolute bottom-32 left-1/4 text-primary animate-pulse" size={18} />
        <Sparkles className="absolute top-1/3 right-20 text-secondary animate-pulse" size={22} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 leading-tight">
            <span className="gradient-text">AstroClinic</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Guiding You Through Life's Journey
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your cosmic path with personalized astrology consultations from experienced practitioners
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="btn-aurora px-8 py-6 text-lg font-semibold min-w-[200px]">
            Book a Consultation
          </Button>
          <Button 
            variant="outline" 
            className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground min-w-[200px] hover-float"
          >
            Explore Services
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex justify-center items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="text-secondary" size={16} />
            <span>500+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-accent" size={16} />
            <span>15+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-primary" size={16} />
            <span>Certified Astrologers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;