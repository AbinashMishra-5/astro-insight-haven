import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const zodiacSigns = [
  {
    name: "Aries",
    symbol: "♈",
    date: "Mar 21 - Apr 19",
    element: "Fire",
    description: "Bold and ambitious, you're ready to conquer new challenges this month."
  },
  {
    name: "Taurus",
    symbol: "♉",
    date: "Apr 20 - May 20",
    element: "Earth",
    description: "Stability and growth are highlighted in your cosmic journey ahead."
  },
  {
    name: "Gemini",
    symbol: "♊",
    date: "May 21 - Jun 20",
    element: "Air",
    description: "Communication and learning take center stage in your celestial forecast."
  },
  {
    name: "Cancer",
    symbol: "♋",
    date: "Jun 21 - Jul 22",
    element: "Water",
    description: "Emotional depths and intuitive insights guide your path forward."
  },
  {
    name: "Leo",
    symbol: "♌",
    date: "Jul 23 - Aug 22",
    element: "Fire",
    description: "Your natural leadership and creativity shine brighter than ever."
  },
  {
    name: "Virgo",
    symbol: "♍",
    date: "Aug 23 - Sep 22",
    element: "Earth",
    description: "Attention to detail and practical wisdom lead to success."
  },
  {
    name: "Libra",
    symbol: "♎",
    date: "Sep 23 - Oct 22",
    element: "Air",
    description: "Harmony and balance bring beautiful opportunities your way."
  },
  {
    name: "Scorpio",
    symbol: "♏",
    date: "Oct 23 - Nov 21",
    element: "Water",
    description: "Transformation and deep insights reveal hidden truths within."
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    date: "Nov 22 - Dec 21",
    element: "Fire",
    description: "Adventure and philosophical growth expand your horizons."
  },
  {
    name: "Capricorn",
    symbol: "♑",
    date: "Dec 22 - Jan 19",
    element: "Earth",
    description: "Determination and structure build the foundation for lasting success."
  },
  {
    name: "Aquarius",
    symbol: "♒",
    date: "Jan 20 - Feb 18",
    element: "Air",
    description: "Innovation and humanitarian ideals guide your unique vision."
  },
  {
    name: "Pisces",
    symbol: "♓",
    date: "Feb 19 - Mar 20",
    element: "Water",
    description: "Intuition and compassion open doors to spiritual understanding."
  }
];

const Horoscope = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Daily Horoscope
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what the stars have in store for your zodiac sign today
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {zodiacSigns.map((sign, index) => (
            <Card key={index} className="cosmic-card hover-float group cursor-pointer">
              <CardHeader className="text-center pb-2">
                <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {sign.symbol}
                </div>
                <CardTitle className="text-lg font-playfair">{sign.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {sign.date}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                    {sign.element}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sign.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Want a detailed reading?</p>
          <button className="btn-aurora px-8 py-3 rounded-lg font-semibold">
            Get Personal Horoscope
          </button>
        </div>
      </div>
    </section>
  );
};

export default Horoscope;