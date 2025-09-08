import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form submission logic would go here
      alert("Thank you for your message! We'll get back to you within 24 hours.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to discover your cosmic path? Contact us for personalized astrological guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="text-xl font-playfair">Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Cosmic Avenue<br />
                      Astrology District<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-sm text-muted-foreground">
                      +91 98765 43210<br />
                      +91 87654 32109
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-sm text-muted-foreground">
                      info@astroclinic.com<br />
                      consultations@astroclinic.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 11:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="cosmic-card">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Star className="text-secondary" size={32} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-lg mb-2">
                      Trusted by Thousands
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Over 5000+ satisfied clients across the globe trust our astrological guidance
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-xs text-muted-foreground">Happy Clients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">15+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">24/7</div>
                      <div className="text-xs text-muted-foreground">Support</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={errors.message ? "border-destructive" : ""}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                    />
                    {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-aurora py-6 text-lg font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16">
          <Card className="cosmic-card overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-xl font-playfair font-semibold mb-2">Find Us Here</h3>
                <p className="text-muted-foreground">
                  Interactive map showing our clinic location would be displayed here
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;