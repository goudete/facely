import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';

const Pay: NextPage = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  useEffect(() => {
    if (stripe) {
      const amount = 499;
      const currency = 'usd';
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'ChefKiss',
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        const response = await fetch('/api/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency,
          }),
        });

        if (response.ok) {
          const { client_secret } = await response.json();

          const { paymentIntent, error } = await stripe.confirmCardPayment(
            client_secret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

          if (error) {
            ev.complete('fail');
          } else if (paymentIntent.status === 'requires_action') {
            ev.complete('success');
            stripe.confirmCardPayment(client_secret);
          } else {
            ev.complete('success');
          }
        } else {
          ev.complete('fail');
        }
      });
    }
  }, [stripe]);

  if (paymentRequest) {
    const options = {
      paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'default' as 'default',
          theme: 'light' as 'light',
          height: '64px',
        },
      }
    }
    return (
      <div className='fixed inset-x-0 bottom-0 p-6'>
        <div className='flex items-center justify-center w-10/12'>
          <PaymentRequestButtonElement options={options} />
        </div>
      </div>
    );
  }

  return (
    <div>
      No Payment Available
    </div>
  );
};

export default Pay;
