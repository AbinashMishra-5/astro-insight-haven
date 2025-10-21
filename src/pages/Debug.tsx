import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testFirebaseConnection } from "@/lib/testFirebase";
import { BookingService } from "@/lib/firestoreService";

const DebugPage = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testFirebaseBasic = async () => {
    setIsLoading(true);
    addLog("🔍 Testing Firebase basic connection...");
    
    try {
      const result = await testFirebaseConnection();
      if (result.success) {
        addLog(`✅ Firebase basic test SUCCESS - Document ID: ${result.id}`);
      } else {
        addLog(`❌ Firebase basic test FAILED - Error: ${JSON.stringify(result.error)}`);
      }
    } catch (error: any) {
      addLog(`❌ Firebase basic test ERROR - ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const testBookingService = async () => {
    setIsLoading(true);
    addLog("🔍 Testing Booking Service...");
    
    try {
      const testBooking = {
        name: "Debug Test",
        email: "debug@test.com",
        phone: "1234567890",
        service: "Test Service",
        astrologer: "Test Astrologer",
        date: "2025-10-21",
        time: "10:00-10:30",
        message: "This is a debug test booking"
      };
      
      addLog("📤 Attempting to create booking...");
      const bookingId = await BookingService.createBooking(testBooking);
      addLog(`✅ Booking Service SUCCESS - Booking ID: ${bookingId}`);
      
    } catch (error: any) {
      addLog(`❌ Booking Service FAILED - Code: ${error.code}, Message: ${error.message}`);
      addLog(`❌ Full error: ${JSON.stringify(error, null, 2)}`);
    }
    
    setIsLoading(false);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🐛 Firebase Debug Console</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Test Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={testFirebaseBasic}
                disabled={isLoading}
                variant="outline"
              >
                Test Firebase Connection
              </Button>
              
              <Button 
                onClick={testBookingService}
                disabled={isLoading}
                variant="outline"
              >
                Test Booking Service
              </Button>
              
              <Button 
                onClick={clearLogs}
                variant="destructive"
                size="sm"
              >
                Clear Logs
              </Button>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="text-center p-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-sm text-muted-foreground">Running tests...</p>
              </div>
            )}

            {/* Debug Logs */}
            <Card className="bg-black text-green-400 font-mono text-sm">
              <CardHeader>
                <CardTitle className="text-lg">Debug Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {logs.length === 0 ? (
                    <p className="text-gray-500">Click a test button to start debugging...</p>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Firebase Config Display */}
            <Card>
              <CardHeader>
                <CardTitle>Firebase Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded text-sm font-mono">
                  <p><strong>Project ID:</strong> astro-24868</p>
                  <p><strong>Auth Domain:</strong> astro-24868.firebaseapp.com</p>
                  <p><strong>Storage Bucket:</strong> astro-24868.firebasestorage.app</p>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">🔧 Debugging Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Click "Test Firebase Connection" to verify basic setup</li>
                  <li>Click "Test Booking Service" to test the actual booking functionality</li>
                  <li>Check the logs below for detailed error information</li>
                  <li>If tests fail, check your Firebase Console for database setup</li>
                </ol>
              </CardContent>
            </Card>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebugPage;