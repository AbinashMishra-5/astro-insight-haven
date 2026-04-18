import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, CreditCard, IndianRupee } from "lucide-react";
import { BookingService } from "@/lib/firestoreService";
import { PayUService, SERVICE_PRICES } from "@/lib/payuService";
import { useToast } from "@/hooks/use-toast";
import { EmailService } from "@/lib/emailService";
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
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  const consultationTypes = [
    { type: "Career Guidance", price: 999 },
    { type: "Marriage Consultation", price: 1499 },
    { type: "Personal Counselling", price: 799 },
    { type: "Horoscope Matching", price: 1299 },
    { type: "Health & Wellness", price: 899 },
    { type: "Financial Planning", price: 1199 },
    { type: "Education & Studies", price: 699 },
    { type: "Spiritual Guidance", price: 599 }
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

    // Date validation - ensure preferred date is within allowed range
    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      maxDate.setHours(23, 59, 59, 999);
      
      if (selectedDate < today) {
        newErrors.preferredDate = "Please select a date from today onwards";
      } else if (selectedDate > maxDate) {
        newErrors.preferredDate = "Please select a date within 30 days from today";
      }
    }

    // Date of Birth validation - ensure it's a valid birth date
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const minDate = new Date("1900-01-01");
      
      if (birthDate > today) {
        newErrors.dateOfBirth = "Birth date cannot be in the future";
      } else if (birthDate < minDate) {
        newErrors.dateOfBirth = "Please enter a valid birth date";
      }
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
          amount: PayUService.getServicePrice(formData.consultationType),
          paymentStatus: "pending",
          message: `Birth Date: ${formData.dateOfBirth}${formData.message ? `\n\nAdditional Message: ${formData.message}` : ''}`
        };
        
          // Save booking to Firestore (with pending payment)
          const generatedBookingId = await BookingService.createBooking(bookingData);
          setBookingId(generatedBookingId);

          // --- EMAIL LOGIC ADDED BELOW ---
          // Send confirmation email to client
          await EmailService.sendBookingConfirmation({
            to_email: formData.email,
            to_name: formData.fullName,
            booking_id: generatedBookingId,
            service_type: formData.consultationType,
            appointment_date: formData.preferredDate,
            appointment_time: formData.preferredTime,
            phone: formData.phone,
            birth_date: formData.dateOfBirth,
            message: `Booking Confirmed\nName: ${formData.fullName}\nConsultation: ${formData.consultationType}\nDate: ${formData.preferredDate}\nTime: ${formData.preferredTime}\nBooking ID: ${generatedBookingId}`
          });

          // Send notification email to astrologer
          await EmailService.sendBookingConfirmation({
            to_email: "astroclinic1967@gmail.com",
            to_name: "Astrologer",
            booking_id: generatedBookingId,
            service_type: formData.consultationType,
            appointment_date: formData.preferredDate,
            appointment_time: formData.preferredTime,
            phone: formData.phone,
            birth_date: formData.dateOfBirth,
            message: `New Consultation Booked\nClient: ${formData.fullName}\nConsultation: ${formData.consultationType}\nDate: ${formData.preferredDate}\nTime: ${formData.preferredTime}\nPhone: ${formData.phone}\nBooking ID: ${generatedBookingId}`
          });
          // --- END EMAIL LOGIC ---

          toast({
            variant: "success",
            title: "Booking successful",
            description: "Your booking has been confirmed and emails have been sent.",
            duration: 6000,
          });
          // Optionally reset form here if desired:
          // setFormData({ ...initialFormData });
        
      } catch (error: any) {
        console.error("Error creating booking:", error);
        
        let errorMessage = "Sorry, there was an error creating your booking. ";
        
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

  const handlePayment = () => {
    try {
      // Prepare payment data
      const paymentData = PayUService.preparePaymentData({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        consultationType: formData.consultationType,
        bookingId: bookingId
      });

      console.log('💳 Initiating payment for booking:', bookingId);
      // Initiate PayU payment
      PayUService.initiatePayment(paymentData);
    } catch (error) {
      console.error('❌ Payment initiation failed:', error);
      toast({
        variant: "destructive",
        title: "❌ Payment Failed",
        description: "Unable to initiate payment. Please try again.",
        duration: 6000,
      });
    }
  };

  const handleBackToForm = () => {
    setShowPayment(false);
  };



  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Get current service price
  const currentPrice = formData.consultationType ? PayUService.getServicePrice(formData.consultationType) : 0;

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

        {!showPayment ? (
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
                  max={(() => {
                    const today = new Date();
                    return today.toISOString().split('T')[0];
                  })()}
                  min="1900-01-01"
                />
                {errors.dateOfBirth && <p className="text-destructive text-sm">{errors.dateOfBirth}</p>}
                <p className="text-xs text-muted-foreground">
                  Select your birth date using the calendar picker
                </p>
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
                      {consultationTypes.map((service) => (
                        <SelectItem key={service.type} value={service.type}>
                          {service.type}
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
                    max={(() => {
                      const maxDate = new Date();
                      maxDate.setDate(maxDate.getDate() + 30);
                      return maxDate.toISOString().split('T')[0];
                    })()}
                  />
                  {errors.preferredDate && <p className="text-destructive text-sm">{errors.preferredDate}</p>}
                  <p className="text-xs text-muted-foreground">
                    You can book appointments from today ({new Date().toLocaleDateString()}) up to {(() => {
                      const maxDate = new Date();
                      maxDate.setDate(maxDate.getDate() + 30);
                      return maxDate.toLocaleDateString();
                    })()}
                  </p>
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
                {isSubmitting ? "Submitting..." : "Book Consultation"}
              </Button>
            </form>
          </CardContent>
        </Card>
        ) : (
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-center flex items-center justify-center gap-2">
                <CreditCard className="w-6 h-6" />
                Confirm Payment
              </CardTitle>
              <CardDescription className="text-center">
                Review your booking details and proceed with payment
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{formData.consultationType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(formData.preferredDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{formData.preferredTime}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {currentPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToForm}
                  className="flex-1"
                >
                  Back to Form
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1 btn-aurora py-6 text-lg font-semibold"
                >
                  <CreditCard className="mr-2 w-5 h-5" />
                  Pay ₹{currentPrice} with PayU
                </Button>
              </div>

              {/* Security Info */}
              <div className="text-center text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Secure Payment by PayU</span>
                </div>
                <p>Your payment is processed securely through PayU's encrypted payment gateway.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default BookingForm;