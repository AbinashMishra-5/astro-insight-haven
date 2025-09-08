import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Patel",
    location: "Mumbai, India",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    testimonial: "Dr. Sharma's career guidance was incredibly accurate. Her predictions about my job change came true within the exact timeframe she mentioned. Highly recommended!",
    service: "Career Guidance"
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    testimonial: "The horoscope matching service was thorough and detailed. Pandit ji explained everything clearly and provided excellent remedial solutions for our marriage.",
    service: "Horoscope Matching"
  },
  {
    name: "Anita Krishnan",
    location: "Bangalore, India",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    testimonial: "Dr. Meera's counseling sessions have been life-changing. Her spiritual guidance helped me find clarity during a very difficult period in my life.",
    service: "Personal Counselling"
  },
  {
    name: "Vikram Sharma",
    location: "Pune, India",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    testimonial: "Amazing accuracy in predictions! The marriage consultation helped us understand our compatibility better and we're now happily married for 2 years.",
    service: "Marriage Consultation"
  },
  {
    name: "Deepa Menon",
    location: "Chennai, India",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    testimonial: "The detailed birth chart analysis was incredibly insightful. It helped me understand my strengths and guided me towards the right career path.",
    service: "Birth Chart Analysis"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who found guidance through our astrological consultations
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="w-full flex-shrink-0 cosmic-card mx-4">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 glow-mystical object-cover"
                      />
                      
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-secondary" size={20} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.testimonial}"
                    </blockquote>

                    <div>
                      <h4 className="text-xl font-playfair font-semibold mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {testimonial.location}
                      </p>
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                        {testimonial.service}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-mystical"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-mystical"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-125 glow-primary' 
                  : 'bg-muted hover:bg-accent'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;