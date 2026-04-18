import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, User, Mail, Phone, ArrowLeft } from "lucide-react";
import { BookingService } from "@/lib/firestoreService";
import { EmailService } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bookingId = searchParams.get('bookingId');
  const paymentId = searchParams.get('paymentId') || searchParams.get('txnid');
  const status = searchParams.get('status');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!bookingId) {
        toast({
          variant: "destructive",
          title: "❌ Invalid Booking",
          description: "Booking ID not found. Please contact support.",
        });
        return;
      }

      try {
        // Update booking status to paid
        await BookingService.updateBookingPaymentStatus(bookingId, {
          paymentStatus: 'completed',
          paymentId: paymentId || '',
          paymentDate: new Date().toISOString()
        });

        // Get updated booking data
        const booking = await BookingService.getBooking(bookingId);
        setBookingData(booking);

        // Send confirmation email
        try {
          const emailData = {
            to_email: booking.email,
            to_name: booking.name,
            booking_id: bookingId,
            service_type: booking.service,
            appointment_date: booking.date,
            appointment_time: booking.time,
            phone: booking.phone,
            birth_date: 'Payment confirmation',
            message: `Payment successful! Amount: ₹${booking.amount}, Payment ID: ${paymentId || 'N/A'}`
          };

          await EmailService.sendBookingConfirmation(emailData);
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }

        toast({
          title: "🎉 Payment Successful!",
          description: `Your consultation has been confirmed. Booking ID: ${bookingId}`,
          duration: 8000,
        });

      } catch (error) {
        console.error('Error updating booking:', error);
        toast({
          variant: "destructive",
          title: "⚠️ Payment Received",
          description: "Payment successful but there was an issue updating your booking. Our team will contact you shortly.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'success') {
      handlePaymentSuccess();
    } else {
      setIsLoading(false);
    }
  }, [bookingId, paymentId, status, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="cosmic-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-playfair gradient-text">
              Payment Successful!
            </CardTitle>
            <p className="text-muted-foreground">
              Your astrology consultation has been confirmed
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {bookingData && (
              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{bookingData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{bookingData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{bookingData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(bookingData.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{bookingData.time}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Booking ID:</span>
                    <span className="font-mono text-primary">{bookingId}</span>
                  </div>
                  {paymentId && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">Payment ID:</span>
                      <span className="font-mono text-primary">{paymentId}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Amount Paid:</span>
                    <span className="text-lg font-bold text-green-600">₹{bookingData.amount}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• You'll receive a confirmation email with all details</li>
                <li>• Our astrologer will contact you 1 day before your appointment</li>
                <li>• Join the consultation via phone/video call at the scheduled time</li>
                <li>• Keep your booking ID for future reference</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={() => window.location.href = '/contact'}
                className="flex-1"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;