const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QoqaxG2dIymtWxM0EBtlMnGihU5ACbOYI9mAVVBKxilEc1NJH1sqw3q59PpS13Iteju0lQfcj63qUpx7pkI3TTv00GKFQnxDF');  // Secret key from Stripe dashboard

// Create payment intent route
const createPaymentIntent = async (req, res) => {
  const amount  = req.body;  // amount should be in cents (e.g., $10 = 1000 cents)

    try {
      // Create a PaymentIntent with the amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,  // amount in cents, for example 1000 (which is $10)
        currency: 'usd', // currency
      });
  
      // Send the client secret back to the frontend
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).send({
        error: 'Something went wrong while creating the payment intent.',
      });
    }
}

module.exports = { createPaymentIntent };
