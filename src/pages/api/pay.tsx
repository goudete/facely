import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { consts } from '../../../consts';
const stripe = new Stripe(consts.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { amount, currency } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency
      });

      return res.status(200).send({
        clientSecret: paymentIntent.client_secret
      });
    } catch (err: any) {
      console.log('Error: ', err.message);
      return res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
};

export default handler;