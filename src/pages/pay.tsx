import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';
import Header from '@/components/Header';

const Pay: NextPage = () => {
  const router = useRouter();
  const { number, folder, gender, theme } = router.query;
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [stripeError, setStripeError] = useState<boolean>(false);

  const themes = [
    { id: 0, key: 'viking', url: "https://public-michelangelo-ai.s3.amazonaws.com/viking.png", label: 'Viking' },
    { id: 1, key: 'gta', url: "https://public-michelangelo-ai.s3.amazonaws.com/gta.png", label: 'GTA' },
    { id: 2, key: 'dream', url: "https://public-michelangelo-ai.s3.amazonaws.com/dream.jpg", label: 'Dream' },
    { id: 3, key: 'dream_portrait', url: "https://public-michelangelo-ai.s3.amazonaws.com/dream_portrait.jpg", label: 'Artistic Portrait' },
    { id: 4, key: 'got', url: "https://public-michelangelo-ai.s3.amazonaws.com/got.png", label: 'Game of Thrones' }
  ];

  const getThemeLabelByKey = (key: string): string | null => {
    const theme = themes.find(theme => theme.key === key);
    return theme ? theme.label : null;
  }


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
            paymentMethodId: ev.paymentMethod.id,
            amount,
            currency,
          }),
        });

        if (response.ok) {
          const { clientSecret } = await response.json();

          const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

          if (error) {
            ev.complete('fail');
            return setStripeError(true);
          } else if (paymentIntent.status === 'requires_action') {
            ev.complete('success');
            stripe.confirmCardPayment(clientSecret);

            router.push({
              pathname: '/home',
              query: { number },
            });

            fetch('/api/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                phoneNumber: number,
                folderName: folder,
                theme,
                gender
              }),
            });
          } else {
            ev.complete('success');

            router.push({
              pathname: '/home',
              query: { number },
            });

            fetch('/api/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                phoneNumber: number,
                folderName: folder,
                theme,
                gender
              }),
            });
          }
        } else {
          ev.complete('fail');
          return setStripeError(true);
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
          <h1 className="text-center mx-auto text-xl">{`Create 30 ${getThemeLabelByKey(theme as string)} Avatars`}</h1>
        </header>
        {stripeError && (
          <div className="flex justify-between items-center p-1 mt-12">
            <h1 className="text-center mx-auto max-w-[90%] rounded-md bg-red-700 p-3">
              Error with payment. Please try again.
            </h1>
          </div>
        )}
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
        <h1 className="text-center mx-auto text-xl">{`Create 30 ${getThemeLabelByKey(theme as string)} Avatars`}</h1>
      </header>
    </div>
  );
};

export default Pay;
