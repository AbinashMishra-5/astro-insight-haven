// PayU Configuration
const PAYU_CONFIG = {
  key: 'your_payu_key',
  salt: 'your_payu_salt',
  isDevelopment: true,
  testUrl: 'https://test.payu.in/_payment',
  prodUrl: 'https://secure.payu.in/_payment',
};

export const SERVICE_PRICES = {
  'Career Guidance': 999,
  'Marriage Consultation': 1499,
  'Personal Counselling': 799,
  'Horoscope Matching': 1299,
  'Health & Wellness': 899,
  'Financial Planning': 1199,
  'Education & Studies': 699,
  'Spiritual Guidance': 599,
};

export class PayUService {
  static getServicePrice(type) {
    return SERVICE_PRICES[type] || 0;
  }

  static preparePaymentData({ fullName, email, phone, consultationType, bookingId }) {
    return {
      key: PAYU_CONFIG.key,
      txnid: bookingId,
      amount: this.getServicePrice(consultationType),
      productinfo: consultationType,
      firstname: fullName,
      email,
      phone,
      surl: window.location.origin + '/PaymentSuccess',
      furl: window.location.origin + '/PaymentFailure',
      service_provider: 'payu_paisa',
    };
  }

  static initiatePayment(paymentData) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = PAYU_CONFIG.isDevelopment ? PAYU_CONFIG.testUrl : PAYU_CONFIG.prodUrl;
    Object.keys(paymentData).forEach((key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }
}

export default PayUService;
