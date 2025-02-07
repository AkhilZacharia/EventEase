const express = require('express');
const stripe = require('stripe')('sk_test_51QoqaxG2dIymtWxM0EBtlMnGihU5ACbOYI9mAVVBKxilEc1NJH1sqw3q59PpS13Iteju0lQfcj63qUpx7pkI3TTv00GKFQnxDF'); // Replace with your Stripe Secret Key
const bodyParser = require('body-parser');
const paymentRouter = express.Router(); 
paymentRouter.use(bodyParser.json());


paymentRouter.post('/create-payment-intent', async (req, res) => {
    console.log('hi'); 
  try {
    const { amount } = req.body; 
    if (!amount) {
      return res.status(400).send({ error: 'Amount is required' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'inr', 
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});


module.exports = paymentRouter;