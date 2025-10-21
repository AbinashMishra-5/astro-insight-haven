import emailjs from '@emailjs/browser';

// Simple test function to send email directly
export const testEmailDirectly = async () => {
  try {
    console.log('🔧 Testing EmailJS directly...');
    
    // Validate configuration first
    const serviceId = 'service_wedtkka';
    const templateId = 'template_ik7s4za';
    const publicKey = 'DIg6o3rlUG2kPB_hz';
    
    console.log('🔧 Configuration Check:');
    console.log('  Service ID:', serviceId);
    console.log('  Template ID:', templateId);
    console.log('  Public Key:', publicKey);
    
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('Missing configuration values');
    }
    
    // Initialize EmailJS
    console.log('🔧 Initializing EmailJS...');
    emailjs.init(publicKey);
    
    const templateParams = {
      to_name: 'Abinash Test',
      to_email: 'abinashphoenix123@gmail.com',
      booking_id: 'TEST123',
      service_type: 'Test Service',
      appointment_date: '2025-10-22',
      appointment_time: '2:00 PM',
      phone: '+91 9876543210',
      birth_date: '1990-01-01',
      message: 'This is a test message from booking form'
    };
    
    console.log('🔧 Sending test email with params:', templateParams);
    
    console.log('🔧 Attempting to send email...');
    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    
    console.log('✅ Test email sent successfully!', result);
    return true;
    
  } catch (error: any) {
    console.error('❌ Test email failed - Full Error:', error);
    console.error('❌ Error Message:', error.message);
    console.error('❌ Error Status:', error.status);
    console.error('❌ Error Code:', error.code);
    console.error('❌ Error Text:', error.text);
    console.error('❌ Error Response:', error.response);
    
    // Check for common errors
    if (error.status === 400) {
      console.error('🚨 Status 400: Bad Request - Check service ID, template ID, or template variables');
    } else if (error.status === 401) {
      console.error('🚨 Status 401: Unauthorized - Check your public key');
    } else if (error.status === 404) {
      console.error('🚨 Status 404: Not Found - Service or template doesn\'t exist');
    } else if (error.status === 422) {
      console.error('🚨 Status 422: Template variable mismatch or missing required fields');
    }
    
    return false;
  }
};