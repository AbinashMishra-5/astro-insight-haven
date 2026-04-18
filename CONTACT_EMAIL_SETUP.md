# 📧 EmailJS Templates Setup Guide

## 🔍 Where to Find Templates

### **Step 1: Access EmailJS Dashboard**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Log in to your EmailJS account
3. Navigate to **"Email Templates"** in the left sidebar

### **Step 2: Your Current Templates**
You should see your existing templates:
- **Template ID**: `template_ik7s4za` (for booking confirmations)

### **Step 3: Contact Template Created ✅**
1. **Template Name**: "template_contact_confirm"
2. **Template ID**: `template_85jrj7j` (your actual template ID)
3. **Status**: Created and configured

## 📝 Contact Confirmation Template

### **Template Content** (Copy this exactly):

**Subject Line:**
```
Thank you for contacting AstroClinic - {{subject}}
```

**Email Body:**
```
Dear {{to_name}},

Thank you for reaching out to AstroClinic! 🌟

We have successfully received your message and wanted to confirm that it's in our system.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 **Your Message Details:**
• Name: {{from_name}}
• Email: {{from_email}}
• Phone: {{phone}}
• Subject: {{subject}}

💬 **Your Message:**
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ **What happens next?**
• We'll review your message within 24 hours
• Our team will respond to you directly at {{from_email}}
• For urgent matters, call us at {{company_phone}}

🌟 **AstroClinic Services:**
• Vedic Astrology Consultations
• Marriage & Relationship Guidance  
• Career & Financial Planning
• Spiritual Life Coaching

📞 **Contact Information:**
Email: {{company_email}}
Phone: {{company_phone}}
Website: www.astroclinic.com

Thank you for choosing AstroClinic for your spiritual guidance!

With cosmic blessings,
The AstroClinic Team 🌟

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated confirmation. Please do not reply to this email.
For support, contact us at {{company_email}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### **Template Settings:**
1. **To Email**: `{{to_email}}`
2. **From Name**: `AstroClinic`
3. **Reply To**: `info@astroclinic.com`
4. **Subject**: `Thank you for contacting AstroClinic - {{subject}}`

## 🔧 Template Variables Used

The contact form sends these variables to EmailJS:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Customer's email | `customer@example.com` |
| `{{to_name}}` | Customer's name | `John Doe` |
| `{{from_name}}` | Customer's name | `John Doe` |
| `{{from_email}}` | Customer's email | `customer@example.com` |
| `{{phone}}` | Customer's phone | `+91 9876543210` |
| `{{subject}}` | Message subject | `General Inquiry` |
| `{{message}}` | Customer's message | `I need career guidance...` |
| `{{company_name}}` | Your business name | `AstroClinic` |
| `{{company_email}}` | Your business email | `info@astroclinic.com` |
| `{{company_phone}}` | Your business phone | `+91 98765 43210` |

## 🎯 Quick Setup Steps

1. **Login to EmailJS** → [Dashboard](https://dashboard.emailjs.com/)
2. **Go to Templates** → Click "Create New Template"
3. **Set Template ID** → `template_85jrj7j` ✅ (already created)
4. **Copy the template content** above
5. **Set the variables** properly
6. **Test the template** with sample data
7. **Save and activate**

## ✅ Testing Your Template

After creating the template:
1. Go to your contact form on the website
2. Fill out the form with your own email
3. Submit the form
4. Check your email for the confirmation
5. Verify all variables are populated correctly

## 🔄 Current Configuration

Your system is configured to use:
- **Service ID**: `service_wedtkka`
- **Booking Template**: `template_ik7s4za` (existing)
- **Contact Template**: `template_85jrj7j` (✅ created and active)
- **Public Key**: `DIg6o3rlUG2kPB_hz`

## 📞 Need Help?

If you need help setting up the template:
1. Check EmailJS documentation
2. Test with EmailJS template tester
3. Verify all variable names match exactly
4. Make sure template ID is correct

The contact form will only send customer confirmations (no admin notifications) as requested! 🌟