import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do online consultations work?",
    answer: "Our online consultations are conducted via secure video calls, phone calls, or chat sessions based on your preference. We'll send you a consultation link at your scheduled time. All you need is a stable internet connection and your birth details."
  },
  {
    question: "Is my birth data and personal information private?",
    answer: "Absolutely. We follow strict privacy policies and never share your personal information with third parties. All birth data and consultation details are encrypted and stored securely. Your privacy is our top priority."
  },
  {
    question: "What information do I need for a consultation?",
    answer: "For accurate predictions, we need your full name, date of birth, time of birth (as precise as possible), and place of birth. If you don't know your exact birth time, our astrologers can work with approximate times or provide general guidance."
  },
  {
    question: "How long does a consultation session last?",
    answer: "Standard consultations typically last 45-60 minutes, depending on the complexity of your questions. Marriage compatibility sessions may take up to 90 minutes. We ensure you have enough time to address all your concerns."
  },
  {
    question: "Can astrology predict exact future events?",
    answer: "Astrology provides insights into potential trends, favorable timings, and possible outcomes based on planetary influences. Rather than fixed predictions, we offer guidance to help you make informed decisions and navigate life's challenges."
  },
  {
    question: "Do you provide remedial solutions?",
    answer: "Yes, our experienced astrologers suggest appropriate remedies when needed, including gemstone recommendations, mantras, charitable activities, and lifestyle adjustments. All remedies are practical and aligned with your beliefs."
  },
  {
    question: "What types of consultations do you offer?",
    answer: "We offer comprehensive consultations for career guidance, marriage compatibility, personal counseling, health insights, financial planning, education decisions, and spiritual guidance. Each session is tailored to your specific needs."
  },
  {
    question: "How far in advance should I book a consultation?",
    answer: "We recommend booking at least 2-3 days in advance to secure your preferred time slot. For urgent consultations, we also offer same-day appointments based on astrologer availability."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our astrological consultations and services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            
            return (
              <Card key={index} className="cosmic-card overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 hover:bg-muted/5 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold font-playfair pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="text-primary" size={24} />
                      ) : (
                        <ChevronDown className="text-primary" size={24} />
                      )}
                    </div>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? Our team is here to help.
          </p>
          <button className="btn-aurora px-8 py-3 rounded-lg font-semibold">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;