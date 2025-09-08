import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Sparkles } from "lucide-react";

interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  dates: string;
  traits: string[];
  description: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    dates: "March 21 - April 19",
    traits: ["Bold", "Ambitious", "Energetic", "Independent"],
    description: "You are a natural leader with boundless energy and enthusiasm. Your pioneering spirit drives you to take on new challenges fearlessly."
  },
  {
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    dates: "April 20 - May 20",
    traits: ["Reliable", "Patient", "Practical", "Devoted"],
    description: "You value stability and comfort, with a deep appreciation for beauty and luxury. Your determination helps you achieve lasting success."
  },
  {
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    dates: "May 21 - June 20",
    traits: ["Curious", "Adaptable", "Witty", "Sociable"],
    description: "Your quick wit and versatility make you excellent at communication. You thrive on variety and mental stimulation."
  },
  {
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    dates: "June 21 - July 22",
    traits: ["Nurturing", "Intuitive", "Protective", "Emotional"],
    description: "You have a deep emotional intelligence and strong protective instincts. Home and family are central to your happiness."
  },
  {
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    dates: "July 23 - August 22",
    traits: ["Confident", "Generous", "Creative", "Dramatic"],
    description: "You naturally command attention with your charisma and creativity. Your warm heart and generous spirit inspire others."
  },
  {
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    dates: "August 23 - September 22",
    traits: ["Analytical", "Helpful", "Organized", "Perfectionist"],
    description: "Your attention to detail and desire to help others makes you invaluable. You find fulfillment in creating order and efficiency."
  },
  {
    name: "Libra",
    symbol: "♎",
    element: "Air",
    dates: "September 23 - October 22",
    traits: ["Diplomatic", "Charming", "Balanced", "Social"],
    description: "You seek harmony and beauty in all aspects of life. Your diplomatic nature helps you build bridges between people."
  },
  {
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    dates: "October 23 - November 21",
    traits: ["Intense", "Passionate", "Mysterious", "Transformative"],
    description: "You possess incredible depth and intensity. Your transformative power helps you overcome any challenge life presents."
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    dates: "November 22 - December 21",
    traits: ["Adventurous", "Optimistic", "Philosophical", "Free-spirited"],
    description: "Your love for adventure and higher learning drives you to explore new horizons. You inspire others with your optimism."
  },
  {
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    dates: "December 22 - January 19",
    traits: ["Ambitious", "Disciplined", "Responsible", "Traditional"],
    description: "Your determination and discipline help you achieve long-term goals. You build lasting legacies through persistent effort."
  },
  {
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    dates: "January 20 - February 18",
    traits: ["Independent", "Innovative", "Humanitarian", "Unique"],
    description: "Your innovative thinking and humanitarian spirit make you a visionary. You're ahead of your time in many ways."
  },
  {
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    dates: "February 19 - March 20",
    traits: ["Compassionate", "Artistic", "Intuitive", "Spiritual"],
    description: "Your deep empathy and artistic nature allow you to connect with others on a profound level. You see beauty in everything."
  }
];

const SunSignFinder = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<ZodiacSign | null>(null);

  const findZodiacSign = () => {
    if (!birthDate) return;

    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    let sign: ZodiacSign;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      sign = zodiacSigns[0]; // Aries
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      sign = zodiacSigns[1]; // Taurus
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      sign = zodiacSigns[2]; // Gemini
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      sign = zodiacSigns[3]; // Cancer
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      sign = zodiacSigns[4]; // Leo
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      sign = zodiacSigns[5]; // Virgo
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      sign = zodiacSigns[6]; // Libra
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      sign = zodiacSigns[7]; // Scorpio
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      sign = zodiacSigns[8]; // Sagittarius
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      sign = zodiacSigns[9]; // Capricorn
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      sign = zodiacSigns[10]; // Aquarius
    } else {
      sign = zodiacSigns[11]; // Pisces
    }

    setResult(sign);
  };

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 gradient-text">
            Discover Your Sun Sign
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your birth date to discover your zodiac sign and cosmic personality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="cosmic-card">
            <CardHeader className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center glow-primary">
                <Sun className="text-primary-foreground" size={28} />
              </div>
              <CardTitle className="text-xl font-playfair">Find Your Sign</CardTitle>
              <CardDescription>
                Enter your birth date to reveal your cosmic identity
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={findZodiacSign}
                className="w-full btn-aurora"
                disabled={!birthDate}
              >
                <Sparkles className="mr-2" size={20} />
                Reveal My Sign
              </Button>
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card className="cosmic-card">
            <CardContent className="p-8">
              {result ? (
                <div className="text-center space-y-6">
                  <div className="text-8xl mb-4 animate-pulse">
                    {result.symbol}
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-playfair font-bold gradient-text mb-2">
                      {result.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{result.dates}</p>
                    
                    <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full font-medium mb-6">
                      {result.element} Sign
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {result.description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-3">Key Traits:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {result.traits.map((trait, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl text-muted-foreground/50 mb-4">✨</div>
                  <p className="text-muted-foreground">
                    Enter your birth date to discover your sun sign and unlock the secrets of your cosmic personality
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SunSignFinder;