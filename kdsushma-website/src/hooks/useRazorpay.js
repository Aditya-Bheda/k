import { useState } from 'react';

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async ({ amount, itemType, itemName, customerDetails }) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create order on the backend
      const res = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          itemType,
          itemName,
          customerName: customerDetails.name,
          customerEmail: customerDetails.email,
          customerPhone: customerDetails.phone,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) throw new Error(orderData.message || 'Failed to create order');

      const { orderId, amount: orderAmount, currency } = orderData.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency,
        name: 'KDSushma',
        description: itemName,
        order_id: orderId,
        handler: async (response) => {
          // 3. Verify payment on the backend
          const verifyRes = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert('Payment Successful! Transaction ID: ' + response.razorpay_payment_id);
          } else {
            alert('Payment verification failed: ' + verifyData.message);
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        theme: {
          color: '#c9a84c',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError(response.error.description);
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};

export default useRazorpay;
