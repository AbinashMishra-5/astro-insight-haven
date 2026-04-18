import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw, Mail } from "lucide-react";
import { BookingService } from "@/lib/firestoreService";
import { useToast } from "@/hooks/use-toast";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const bookingId = searchParams.get('bookingId');
  const error = searchParams.get('error') || 'Payment was unsuccessful';

  useEffect(() => {
    const handlePaymentFailure = async () => {
      if (bookingId) {
        try {
          // Update booking payment status to failed
          await BookingService.updateBookingPaymentStatus(bookingId, {
            paymentStatus: 'failed',
            paymentDate: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error updating booking payment status:', error);
        }
      }

      toast({
        variant: "destructive",
        title: "❌ Payment Failed",
        description: "Your payment could not be processed. Your booking is still reserved for 30 minutes.",
        duration: 8000,
      });
    };

    handlePaymentFailure();
  }, [bookingId, toast]);

  const handleRetryPayment = () => {
    if (bookingId) {
      // Redirect back to booking form with pre-filled data
      window.location.href = `/?retry=true&bookingId=${bookingId}`;
    } else {
      window.location.href = '/#booking';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="cosmic-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-playfair text-red-600">
              Payment Failed
            </CardTitle>
            <p className="text-muted-foreground">
              Unfortunately, your payment could not be processed
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">What happened?</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>

            {bookingId && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Don't worry!</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Your booking slot is reserved for 30 minutes</p>
                  <p>• You can retry the payment without losing your appointment</p>
                  <p>• Booking ID: <span className="font-mono">{bookingId}</span></p>
                </div>
              </div>
            )}

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Common reasons for payment failure:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Insufficient balance in your account</li>
                <li>• Network connectivity issues</li>
                <li>• Card expired or blocked</li>
                <li>• Bank declined the transaction</li>
                <li>• Incorrect payment details</li>
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
                onClick={handleRetryPayment}
                className="flex-1 btn-aurora"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Payment
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Need help with your payment?</p>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/contact'}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFailure;