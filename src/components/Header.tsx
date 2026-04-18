import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    console.log('🔍 Attempting to scroll to section:', sectionId);
    
    // Wait a moment to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      console.log('🎯 Found element:', element);
      
      if (element) {
        // Get the element's position
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const headerOffset = 100; // Account for fixed header
        const targetPosition = absoluteElementTop - headerOffset;
        
        console.log('📍 Element position:', absoluteElementTop);
        console.log('🎯 Scrolling to position:', targetPosition);
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        console.log('✅ Scroll command sent');
      } else {
        console.error('❌ Element not found with ID:', sectionId);
        console.log('🔍 Available elements with IDs:');
        const elementsWithIds = document.querySelectorAll('[id]');
        elementsWithIds.forEach(el => console.log('  - ' + el.id));
      }
    }, 100);
    
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center glow-primary">
              <Star className="text-primary-foreground" size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-playfair font-bold gradient-text">
              AstroClinic
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('astrologers')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Astrologers
            </button>
            <button 
              onClick={() => scrollToSection('horoscope')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Horoscope
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('booking')}
              className="btn-aurora"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 space-y-4 border-t border-border">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('astrologers')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Astrologers
            </button>
            <button 
              onClick={() => scrollToSection('horoscope')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Horoscope
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-300"
            >
              Contact
            </button>
            <div className="px-4 pt-4">
              <Button 
                onClick={() => scrollToSection('booking')}
                className="w-full btn-aurora"
              >
                Book Consultation
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;