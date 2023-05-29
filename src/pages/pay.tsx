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
      <div className="flex flex-col pt-24">
        <div className="flex flex-col space-y-4 px-4 justify-between items-center mt-12 w-full">
          <div className="flex flex-col items-start space-y-2 max-w-[85%] md:max-w-[45%] flex-wrap rounded-lg bg-gray-600 p-4">
            <div className='flex flex-row justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-medium ml-2">$4.99 for 30 avatars</h2>
            </div>
            <div className='flex flex-row justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-medium ml-2">100% secure</h2>
            </div>
            <div className='flex flex-row justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-medium ml-2">100% private</h2>
            </div>
          </div>
        </div>
        <div className='fixed inset-x-0 bottom-0 p-6'>
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
