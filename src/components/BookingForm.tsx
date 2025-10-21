import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle } from "lucide-react";
import { BookingService } from "@/lib/firestoreService";
import { EmailService } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const BookingForm = () => {
  const { toast } = useToast();
  
  // Initialize EmailJS when component loads
  useEffect(() => {
    EmailService.init();
  }, []);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultationTypes = [
    "Career Guidance",
    "Marriage Consultation", 
    "Personal Counselling",
    "Horoscope Matching",
    "Health & Wellness",
    "Financial Planning",
    "Education & Studies",
    "Spiritual Guidance"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.consultationType) newErrors.consultationType = "Please select a consultation type";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.preferredTime) newErrors.preferredTime = "Please select a time slot";
    
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
        // Prepare booking data for Firestore
        const bookingData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.consultationType,
          astrologer: "To be assigned",
          date: formData.preferredDate,
          time: formData.preferredTime,
          message: `Birth Date: ${formData.dateOfBirth}${formData.message ? `\n\nAdditional Message: ${formData.message}` : ''}`
        };
        
        // Save to Firestore
        const bookingId = await BookingService.createBooking(bookingData);
        
        // Send confirmation email to customer
        console.log('📧 Attempting to send confirmation email...');
        try {
          const emailData = {
            to_email: formData.email,
            to_name: formData.fullName,
            booking_id: bookingId,
            service_type: formData.consultationType,
            appointment_date: formData.preferredDate,
            appointment_time: formData.preferredTime,
            phone: formData.phone,
            birth_date: formData.dateOfBirth,
            message: formData.message || 'No additional message provided',
          };

          console.log('📧 Email being sent to:', formData.email);
          console.log('📧 Customer name:', formData.fullName);

          console.log('📧 Email data prepared:', emailData);
          
          const emailSent = await EmailService.sendBookingConfirmation(emailData);
          
          if (emailSent) {
            console.log('✅ Email sent successfully!');
            toast({
              title: "🌟 Booking Confirmed!",
              description: `Your consultation has been booked successfully! Booking ID: ${bookingId}. A confirmation email has been sent to ${formData.email}.`,
              duration: 8000,
            });
          } else {
            console.log('❌ Email failed to send');
            toast({
              title: "🌟 Booking Confirmed!",
              description: `Your consultation has been booked successfully! Booking ID: ${bookingId}. Email confirmation failed - we'll contact you directly.`,
              duration: 8000,
            });
          }
          
        } catch (emailError: any) {
          console.error('❌ Email error details:', emailError);
          console.error('❌ Error message:', emailError.message);
          console.error('❌ Error code:', emailError.status || emailError.code);
          
          toast({
            title: "🌟 Booking Confirmed!",
            description: `Your consultation has been booked successfully! Booking ID: ${bookingId}. Email issue detected - we'll contact you directly.`,
            duration: 8000,
          });
        }
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          consultationType: "",
          preferredDate: "",
          preferredTime: "",
          message: ""
        });
        
      } catch (error: any) {
        console.error("Error submitting booking:", error);
        
        // More detailed error message
        let errorMessage = "Sorry, there was an error submitting your booking. ";
        
        if (error.code === 'permission-denied') {
          errorMessage += "Database access denied. Please contact support.";
        } else if (error.code === 'unavailable') {
          errorMessage += "Service temporarily unavailable. Please try again in a few minutes.";
        } else if (error.message) {
          errorMessage += `Error: ${error.message}`;
        } else {
          errorMessage += "Please try again or contact us directly.";
        }
        
        toast({
          variant: "destructive",
          title: "❌ Booking Failed",
          description: errorMessage,
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
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Book Your Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a personalized session with our experienced astrologers
          </p>
        </div>

        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-center">Book Your Consultation</CardTitle>
            <CardDescription className="text-center">
              Fill out this simple form to schedule your personalized astrology session
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User size={16} />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className={errors.dateOfBirth ? "border-destructive" : ""}
                />
                {errors.dateOfBirth && <p className="text-destructive text-sm">{errors.dateOfBirth}</p>}
              </div>

              {/* Consultation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="consultationType">Type of Consultation *</Label>
                  <Select onValueChange={(value) => handleInputChange("consultationType", value)}>
                    <SelectTrigger className={errors.consultationType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.consultationType && <p className="text-destructive text-sm">{errors.consultationType}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                    className={errors.preferredDate ? "border-destructive" : ""}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.preferredDate && <p className="text-destructive text-sm">{errors.preferredDate}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime" className="flex items-center gap-2">
                  <Clock size={16} />
                  Preferred Time Slot *
                </Label>
                <Select onValueChange={(value) => handleInputChange("preferredTime", value)}>
                  <SelectTrigger className={errors.preferredTime ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select your preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10:00-10:30">10:00 AM - 10:30 AM</SelectItem>
                    <SelectItem value="10:30-11:00">10:30 AM - 11:00 AM</SelectItem>
                    <SelectItem value="11:00-11:30">11:00 AM - 11:30 AM</SelectItem>
                    <SelectItem value="11:30-12:00">11:30 AM - 12:00 PM</SelectItem>
                    <SelectItem value="12:00-12:30">12:00 PM - 12:30 PM</SelectItem>
                    <SelectItem value="14:00-14:30">2:00 PM - 2:30 PM</SelectItem>
                    <SelectItem value="14:30-15:00">2:30 PM - 3:00 PM</SelectItem>
                    <SelectItem value="15:00-15:30">3:00 PM - 3:30 PM</SelectItem>
                    <SelectItem value="18:00-18:30">6:00 PM - 6:30 PM</SelectItem>
                    <SelectItem value="18:30-19:00">6:30 PM - 7:00 PM</SelectItem>
                    <SelectItem value="19:00-19:30">7:00 PM - 7:30 PM</SelectItem>
                    <SelectItem value="19:30-20:00">7:30 PM - 8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                {errors.preferredTime && <p className="text-destructive text-sm">{errors.preferredTime}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your specific concerns or questions..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-aurora py-6 text-lg font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;