# 📧 Email Setup Guide for AstroClinic

## 🚀 Quick Setup Steps

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up with your email
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo Mail**
   - **Custom SMTP** (for business emails)
3. Connect your email account
4. **Copy the Service ID** (e.g., `service_abc1234`)

### Step 3: Create Email Templates

#### Template 1: Customer Confirmation

1. Click **"Create New Template"**
2. Name: `Booking Confirmation`
3. Template ID: `template_booking`
4. Copy this content:

```
Subject: 🌟 Your AstroClinic Consultation is Confirmed! (Booking #{{booking_id}})

Dear {{to_name}},

Thank you for booking a consultation with AstroClinic! ✨

🔮 **Your Booking Details:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Booking ID: {{booking_id}}
🎯 Service: {{service_type}}
📅 Date: {{appointment_date}}
⏰ Time: {{appointment_time}}
📱 Phone: {{phone}}
🎂 Birth Date: {{birth_date}}
💬 Message: {{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What happens next?**
✅ We'll confirm your appointment within 24 hours
✅ Our astrologer will call you at the scheduled time
✅ Please keep your questions ready for the session

**Need to make changes?**
📧 Email: info@astroclinic.com
📞 Phone: +91 98765 43210

Thank you for choosing AstroClinic for your cosmic guidance! 🌟

With blessings,
The AstroClinic Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated confirmation. For support, contact info@astroclinic.com
```

5. **Copy the Template ID** (e.g., `template_abc1234`)

#### Template 2: Admin Notification (Optional)

1. Create another template
2. Name: `Admin Notification`
3. Template ID: `template_admin_notification`
4. Copy this content:

```
Subject: 🚨 New Booking Alert - {{customer_name}} ({{booking_id}})

New consultation booked! 🌟

**Customer Details:**
👤 Name: {{customer_name}}
📧 Email: {{customer_email}}
📱 Phone: {{customer_phone}}
🎂 Birth Date: {{birth_date}}

**Booking Details:**
📋 ID: {{booking_id}}
🎯 Service: {{service_type}}
📅 Date: {{appointment_date}}
⏰ Time: {{appointment_time}}
💬 Message: {{message}}

**Action Required:**
- Contact customer to confirm
- Update calendar
- Prepare for session
```

### Step 4: Get Public Key

1. Go to **"Account"** → **"API Keys"**
2. **Copy your Public Key** (e.g., `user_abc123def456`)

### Step 5: Update Your Code

Open `src/lib/emailService.ts` and replace:

```typescript
const EMAILJS_CONFIG = {
  serviceId: "your_service_id_here", // From Step 2
  templateId: "your_template_id_here", // From Step 3
  publicKey: "your_public_key_here", // From Step 4
};
```

### Step 6: Test Email System

1. Go to your website
2. Fill out the booking form
3. Submit it
4. Check if you receive the confirmation email

## 📋 Configuration Checklist

- [ ] EmailJS account created
- [ ] Email service connected (Gmail/Outlook/etc.)
- [ ] Customer confirmation template created
- [ ] Admin notification template created (optional)
- [ ] Public key obtained
- [ ] Configuration updated in code
- [ ] Test booking submitted
- [ ] Confirmation email received

## 🔧 Troubleshooting

### Email not sending?

1. Check browser console for errors
2. Verify service ID, template ID, and public key
3. Make sure email service is properly connected
4. Check EmailJS dashboard for usage limits

### Wrong email content?

1. Verify template variables match the code
2. Check template is published (not in draft)
3. Test template in EmailJS dashboard

### Need help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/contact/

## 💡 Pro Tips

1. **Free Plan**: 200 emails/month (perfect for testing)
2. **Custom Domain**: Use your business email for better credibility
3. **Templates**: You can create multiple templates for different services
4. **Variables**: Add more custom fields as needed
5. **Styling**: Use HTML in templates for better formatting

Once configured, customers will automatically receive beautiful confirmation emails! ✨
