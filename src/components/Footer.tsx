import { Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center glow-primary">
                <Star className="text-primary-foreground" size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-playfair font-bold gradient-text">
                AstroClinic
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Guiding you through life's journey with ancient wisdom and modern insights. 
              Discover your cosmic path with our experienced astrologers.
            </p>
            <div className="flex items-center gap-4">
              <button 
                className="p-2 bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </button>
              <button 
                className="p-2 bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </button>
              <button 
                className="p-2 bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </button>
              <button 
                className="p-2 bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('astrologers')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Our Astrologers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('horoscope')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Daily Horoscope
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('blog')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                  Career Guidance
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                  Marriage Consultation
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                  Personal Counselling
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                  Horoscope Matching
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                  Birth Chart Analysis
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={16} />
                <span className="text-muted-foreground text-sm">
                  123 Cosmic Avenue<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={16} />
                <span className="text-muted-foreground text-sm">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={16} />
                <span className="text-muted-foreground text-sm">
                  info@astroclinic.com
                </span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-2">Business Hours</h4>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: 11:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 AstroClinic. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="text-sm text-muted-foreground">
              Crafted with ✨ for cosmic guidance seekers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;