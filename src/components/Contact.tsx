import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import { ContactService } from "@/lib/firestoreService";
import { EmailService } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Contact = () => {
  const { toast } = useToast();

  // Initialize EmailJS when component loads
  useEffect(() => {
    EmailService.init();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Prepare contact data for Firestore
        const contactData = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "General Inquiry",
          message: `${formData.message}${formData.phone ? `\n\nPhone: ${formData.phone}` : ''}`
        };

        // Save to Firestore
        const contactId = await ContactService.createContact(contactData);
        console.log('💾 Contact message saved to Firestore with ID:', contactId);

        // Send emails via EmailJS
        console.log('📧 Attempting to send emails...');
        try {
          const emailData = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject || "General Inquiry",
            message: formData.message
          };

          // Send confirmation email to customer only
          console.log('📧 Sending confirmation email to customer...');
          const customerEmailSent = await EmailService.sendContactConfirmation(emailData);

          if (customerEmailSent) {
            console.log('✅ Confirmation email sent successfully!');
            toast({
              title: "✨ Message Sent Successfully!",
              description: `Thank you for reaching out! We've received your message and sent you a confirmation email. We'll get back to you within 24 hours. Message ID: ${contactId}`,
              duration: 8000,
            });
          } else {
            console.log('⚠️ Confirmation email failed but message saved');
            toast({
              title: "✨ Message Received!",
              description: `Your message has been saved successfully! We'll get back to you soon. Message ID: ${contactId}`,
              duration: 8000,
            });
          }

        } catch (emailError: any) {
          console.error('❌ Email error details:', emailError);
          toast({
            title: "✨ Message Received!",
            description: `Your message has been saved successfully! Email confirmation failed but we'll contact you directly. Message ID: ${contactId}`,
            duration: 8000,
          });
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });

      } catch (error) {
        console.error("Error submitting contact form:", error);
        toast({
          variant: "destructive",
          title: "❌ Message Failed",
          description: "Sorry, there was an error sending your message. Please try again or contact us directly.",
          duration: 6000,
        });
      } finally {
        setIsSubmitting(false);
      }
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
                      Astro Clinic<br />
                      Near Kuchinda Bus Stand<br />
                      Kuchinda, Odisha 768222
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
                    disabled={isSubmitting}
                    className="w-full btn-aurora py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-16">
          <Card className="cosmic-card overflow-hidden">
            <div className="h-[400px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.7307595781145!2d84.01852641744384!3d21.872191600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a20e500514de8ff%3A0x2f3e008c890ff299!2sAstro%20Clinic!5e0!3m2!1sen!2sin!4v1695042433411!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;