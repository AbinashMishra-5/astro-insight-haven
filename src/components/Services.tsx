import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Briefcase, MessageCircle, Users } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Navigate your professional path with cosmic insights. Discover your ideal career timing, opportunities, and growth potential.",
    features: ["Career timing", "Job transitions", "Business ventures", "Professional growth"]
  },
  {
    icon: Heart,
    title: "Marriage Consultation",
    description: "Find harmony in relationships through vedic compatibility analysis and astrological guidance for lasting partnerships.",
    features: ["Compatibility analysis", "Marriage timing", "Relationship harmony", "Partner selection"]
  },
  {
    icon: MessageCircle,
    title: "Personal Counselling",
    description: "Gain clarity on life's challenges through personalized astrological counseling and spiritual guidance.",
    features: ["Life challenges", "Personal growth", "Spiritual guidance", "Emotional healing"]
  },
  {
    icon: Users,
    title: "Horoscope Matching",
    description: "Traditional Vedic horoscope matching for marriage compatibility, ensuring astrological harmony between partners.",
    features: ["Guna matching", "Manglik analysis", "Compatibility score", "Remedial solutions"]
  }
];

const Services = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive astrological guidance tailored to your unique cosmic blueprint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="cosmic-card hover-float group">
                <CardHeader className="text-center pb-4">
                  <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center glow-primary group-hover:glow-secondary">
                    <Icon className="text-primary-foreground" size={32} />
                  </div>
                  <CardTitle className="text-xl font-playfair">{service.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full mt-6 btn-aurora">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;