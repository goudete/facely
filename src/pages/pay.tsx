import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';
import Header from '@/components/Header';

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
          label: 'Facely',
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
        <Header />
        <header className="flex justify-between items-center p-1">
          <h1 className="text-center mx-auto text-xl">Create Avatars</h1>
        </header>
        <div className="flex flex-col px-4 justify-between items-center mt-12 w-full">
          <div className="flex flex-col items-start space-y-4 w-10/12 md:max-w-[45%] flex-wrap rounded-lg bg-indigo-900 p-6">
            <div className='flex flex-row justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="green" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <h2 className="text-lg font-medium ml-2">$4.99 for 30 avatars</h2>
            </div>
            <div className='flex flex-row justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="green" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <h2 className="text-lg font-medium ml-2">100% secure</h2>
            </div>
            <div className='flex flex-row justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="green" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
    <div className="flex flex-col pt-24">
      <Header />
      <header className="flex justify-between items-center p-1">
        <h1 className="text-center mx-auto text-xl">Create Avatars</h1>
      </header>
    </div>
  );
};

export default Pay;
