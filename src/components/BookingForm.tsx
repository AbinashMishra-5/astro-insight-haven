import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.consultationType) newErrors.consultationType = "Please select a consultation type";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    
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
      alert("Thank you! Your consultation request has been submitted. We'll contact you soon to confirm your appointment.");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        timeOfBirth: "",
        placeOfBirth: "",
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
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
            <CardTitle className="text-2xl font-playfair text-center">Consultation Details</CardTitle>
            <CardDescription className="text-center">
              Please provide your accurate birth details for precise astrological analysis
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Birth Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <div className="space-y-2">
                  <Label htmlFor="timeOfBirth" className="flex items-center gap-2">
                    <Clock size={16} />
                    Time of Birth
                  </Label>
                  <Input
                    id="timeOfBirth"
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth" className="flex items-center gap-2">
                    <MapPin size={16} />
                    Place of Birth
                  </Label>
                  <Input
                    id="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
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
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select onValueChange={(value) => handleInputChange("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
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
                className="w-full btn-aurora py-6 text-lg font-semibold"
              >
                Submit Consultation Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;