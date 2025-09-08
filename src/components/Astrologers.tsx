import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import astrologer1 from "@/assets/astrologer-1.jpg";
import astrologer2 from "@/assets/astrologer-2.jpg";
import astrologer3 from "@/assets/astrologer-3.jpg";

const astrologers = [
  {
    name: "Dr. Priya Sharma",
    image: astrologer1,
    specialization: "Vedic Astrology & Career Guidance",
    experience: 15,
    rating: 4.9,
    consultations: 2500,
    languages: ["English", "Hindi", "Sanskrit"],
    expertise: ["Career", "Marriage", "Health"]
  },
  {
    name: "Pandit Raj Kumar",
    image: astrologer2,
    specialization: "Marriage Compatibility & Remedial Astrology",
    experience: 20,
    rating: 4.8,
    consultations: 3200,
    languages: ["English", "Hindi", "Bengali"],
    expertise: ["Marriage", "Relationships", "Remedies"]
  },
  {
    name: "Dr. Meera Gupta",
    image: astrologer3,
    specialization: "Personal Counseling & Spiritual Guidance",
    experience: 18,
    rating: 4.9,
    consultations: 2800,
    languages: ["English", "Hindi", "Gujarati"],
    expertise: ["Counseling", "Spirituality", "Life Path"]
  }
];

const Astrologers = () => {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Meet Our Astrologers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced practitioners who combine ancient wisdom with modern insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {astrologers.map((astrologer, index) => (
            <Card key={index} className="cosmic-card hover-float group overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <img
                    src={astrologer.image}
                    alt={astrologer.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto glow-mystical group-hover:glow-secondary transition-all duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                    {astrologer.experience}+ yrs
                  </div>
                </div>
                
                <CardTitle className="text-xl font-playfair mb-2">{astrologer.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {astrologer.specialization}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="text-secondary" size={16} fill="currentColor" />
                    <span className="font-semibold">{astrologer.rating}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {astrologer.consultations}+ consultations
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Expertise:</h4>
                    <div className="flex flex-wrap gap-1">
                      {astrologer.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Languages:</h4>
                    <p className="text-sm text-muted-foreground">
                      {astrologer.languages.join(", ")}
                    </p>
                  </div>
                </div>
                
                <Button className="w-full btn-aurora">
                  Consult Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Astrologers;