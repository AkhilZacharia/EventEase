import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  // Step 1: Create a payment intent when the component mounts
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        // POST request to backend to create payment intent
        const response = await axios.post('http://localhost:3000/create-payment-intent', { amount });
        // Set the client secret from the backend response
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  // Step 2: Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;  // Stripe.js has not yet loaded
    }

    if (!clientSecret) {
      console.error("No client secret found.");
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (error) {
      console.log('[Error]', error);
    } else if (paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pay {amount / 100} USD</h2>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay Now</button>
    </form>
  );
};

export default PaymentForm;
