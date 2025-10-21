import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_wedtkka', // Your EmailJS service ID
  templateId: 'template_ik7s4za',   // Your existing template ID
  publicKey: 'DIg6o3rlUG2kPB_hz', // Your EmailJS public key
};

export interface EmailData {
  to_email: string;
  to_name: string;
  booking_id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  phone: string;
  birth_date: string;
  message?: string;
}

export class EmailService {
  // Initialize EmailJS
  static init() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('📧 EmailJS initialized with public key:', EMAILJS_CONFIG.publicKey);
  }

  // Send booking confirmation email to customer
  static async sendBookingConfirmation(emailData: EmailData): Promise<boolean> {
    try {
      console.log('📧 EmailJS Config:', EMAILJS_CONFIG);
      
      const templateParams = {
        // Try both formats to match EmailJS template variables
        to_email: emailData.to_email,
        to_name: emailData.to_name,
        from_name: emailData.to_name,
        reply_to: emailData.to_email,
        booking_id: emailData.booking_id,
        service_type: emailData.service_type,
        appointment_date: emailData.appointment_date,
        appointment_time: emailData.appointment_time,
        phone: emailData.phone,
        birth_date: emailData.birth_date,
        message: emailData.message || 'No additional message',
        // Common EmailJS default variables
        user_name: emailData.to_name,
        user_email: emailData.to_email,
        // Company info
        company_name: 'AstroClinic',
        company_email: 'info@astroclinic.com',
        company_phone: '+91 98765 43210',
      };

      console.log('📧 Template params:', templateParams);
      console.log('📧 Sending email with service:', EMAILJS_CONFIG.serviceId);
      console.log('📧 Using template:', EMAILJS_CONFIG.templateId);

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('✅ Email sent successfully! Result:', result);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send email. Full error:', error);
      console.error('❌ Error status:', error.status);
      console.error('❌ Error text:', error.text);
      return false;
    }
  }

  // Send notification to admin/astrologer
  static async sendAdminNotification(emailData: EmailData): Promise<boolean> {
    try {
      const templateParams = {
        admin_email: 'admin@astroclinic.com', // Replace with your admin email
        customer_name: emailData.to_name,
        customer_email: emailData.to_email,
        customer_phone: emailData.phone,
        booking_id: emailData.booking_id,
        service_type: emailData.service_type,
        appointment_date: emailData.appointment_date,
        appointment_time: emailData.appointment_time,
        birth_date: emailData.birth_date,
        message: emailData.message || 'No additional message',
      };

      // You can create a separate template for admin notifications
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        'template_admin_notification', // Create this template in EmailJS
        templateParams
      );

      console.log('Admin notification sent:', result);
      return true;
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      return false;
    }
  }
}

// Template for customer confirmation email (copy this to EmailJS)
export const CUSTOMER_EMAIL_TEMPLATE = `
Dear {{to_name}},

Thank you for booking a consultation with AstroClinic! 🌟

Your booking details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Booking ID: {{booking_id}}
🔮 Service: {{service_type}}
📅 Date: {{appointment_date}}
⏰ Time: {{appointment_time}}
📞 Phone: {{phone}}
🎂 Birth Date: {{birth_date}}

💬 Your Message: {{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happens next?
✅ We'll confirm your appointment within 24 hours
✅ Our astrologer will call you at the scheduled time
✅ Have your questions ready for the session

Need to make changes?
📧 Email us: {{company_email}}
📱 Call us: {{company_phone}}

Thank you for choosing AstroClinic for your spiritual guidance!

With cosmic blessings,
The AstroClinic Team 🌟

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated confirmation. Please do not reply to this email.
For support, contact us at {{company_email}}
`;

// Template for admin notification email
export const ADMIN_EMAIL_TEMPLATE = `
New Booking Alert! 🚨

A new consultation has been booked:

Customer Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: {{customer_name}}
📧 Email: {{customer_email}}
📱 Phone: {{customer_phone}}
🎂 Birth Date: {{birth_date}}

Booking Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Booking ID: {{booking_id}}
🔮 Service: {{service_type}}
📅 Date: {{appointment_date}}
⏰ Time: {{appointment_time}}

Customer Message:
{{message}}

Action Required:
- Contact customer to confirm appointment
- Prepare for the consultation session
- Update calendar with appointment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AstroClinic Admin System
`;