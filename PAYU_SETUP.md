# PayU Payment Gateway Configuration

## Production Configuration

- **Merchant ID**: 9005637
- **API Key**: JPtg9W
- **Salt**: KYgrlXzwOdHLaZIGS749XrD2TRYpTbFL

## URLs

- **Test URL**: https://test.payu.in/_payment
- **Production URL**: https://secure.payu.in/_payment

## Important Notes

1. Currently set to development mode in `payuService.ts`
2. Change `isDevelopment: false` for production
3. Success/Failure URLs are dynamically generated based on current domain
4. Hash verification is implemented for security

## Service Pricing (INR)

- Career Guidance: ₹999
- Marriage Consultation: ₹1,499
- Personal Counselling: ₹799
- Horoscope Matching: ₹1,299
- Health & Wellness: ₹899
- Financial Planning: ₹1,199
- Education & Studies: ₹699
- Spiritual Guidance: ₹599

## Testing

Use PayU test cards for testing:

- Test Card: 5123456789012346
- CVV: 123
- Expiry: Any future date
- Name: Any name

## Security Features

- SHA512 hash generation for payment verification
- Response hash verification
- Secure parameter handling
- Payment status tracking in Firestore
