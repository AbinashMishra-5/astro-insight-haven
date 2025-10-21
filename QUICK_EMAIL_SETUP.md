# 🚀 Quick Setup for Your Auto-Reply Template

## ✅ What You Have:

- **Template ID**: `template_ik7s4za` ✅
- **Template Name**: Auto-Reply ✅

## 🔧 What You Still Need:

### 1. Get Your Service ID

1. In EmailJS dashboard, go to **"Email Services"**
2. Find your connected email service (Gmail/Outlook/etc.)
3. **Copy the Service ID** (looks like `service_abc1234`)

### 2. Get Your Public Key

1. Go to **"Account"** → **"API Keys"**
2. **Copy your Public Key** (looks like `user_abc1234`)

### 3. Update Your Website Code

Open VS Code and go to file: `src/lib/emailService.ts`

Find this section:

```typescript
const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "template_ik7s4za", // ✅ Already set!
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
};
```

Replace:

- `YOUR_SERVICE_ID` with your actual service ID
- `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key

### 4. Customize Your Auto-Reply Template

1. In EmailJS, click on your **Auto-Reply** template
2. Click **"Edit Template"**
3. Make sure these variables are in your template:

**Required Variables for Booking Confirmation:**

- `{{to_name}}` - Customer's name
- `{{to_email}}` - Customer's email
- `{{booking_id}}` - Booking ID
- `{{service_type}}` - Type of consultation
- `{{appointment_date}}` - Booking date
- `{{appointment_time}}` - Booking time
- `{{phone}}` - Customer's phone
- `{{birth_date}}` - Customer's birth date
- `{{message}}` - Customer's message

### 5. Simple Template Content

If you want to edit your Auto-Reply template, use this content:

**Subject:**

```
🌟 Your AstroClinic Consultation is Confirmed! (Booking #{{booking_id}})
```

**Body:**

```
Dear {{to_name}},

Thank you for booking with AstroClinic! ✨

Your Booking Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Booking ID: {{booking_id}}
🎯 Service: {{service_type}}
📅 Date: {{appointment_date}}
⏰ Time: {{appointment_time}}
📱 Phone: {{phone}}
🎂 Birth Date: {{birth_date}}
💬 Message: {{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What's Next:
✅ We'll confirm within 24 hours
✅ Our astrologer will call you at the scheduled time
✅ Keep your questions ready!

Need help?
📧 info@astroclinic.com
📞 +91 98765 43210

Blessings,
AstroClinic Team 🌟
```

## 🎯 Quick Test Steps:

1. Get your Service ID and Public Key ⬆️
2. Update the code in VS Code
3. Go to your website and submit a test booking
4. Check if you receive the confirmation email

## ✅ Checklist:

- [ ] Service ID obtained and updated in code
- [ ] Public Key obtained and updated in code
- [ ] Template variables added to Auto-Reply template
- [ ] Test booking submitted
- [ ] Confirmation email received

**Need help with any step? Just ask!** 🚀
