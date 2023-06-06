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
  const [pricingSelection, setPricingSelection] = useState('medium');

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
  };

  const priceQuantityPairs = {
    'small': { price: 299, quantity: 20 },
    'medium': { price: 499, quantity: 30 },
    'large': { price: 699, quantity: 60 },
  } as { [key: string]: { price: number, quantity: number } };


  useEffect(() => {
    if (stripe) {
      const amount = priceQuantityPairs[pricingSelection].price;
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
                gender,
                pricingSelection,
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
                gender,
                pricingSelection,
              }),
            });
          }
        } else {
          ev.complete('fail');
          return setStripeError(true);
        }
      });
    }
  }, [stripe, pricingSelection]);

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
        <header className="flex flex-col justify-between items-center p-2">
          <h1 className="text-center mx-auto text-xl">{`Create ${priceQuantityPairs[pricingSelection].quantity} ${getThemeLabelByKey(theme as string)} Avatars`}</h1>
          <h3 className="text-center mx-auto text-md font-semibold text-neutral-700 max-w-[80%] md:max-w-[45%] mt-5">Avatars require tremendous computation power to create. We have made it as affordable as possible ❤️</h3>
        </header>
        {stripeError && (
          <div className="flex justify-between items-center p-1 mt-12">
            <h1 className="text-center mx-auto max-w-[90%] rounded-md bg-red-700 p-3">
              Error with payment. Please try again.
            </h1>
          </div>
        )}
        <div className="flex flex-col px-4 justify-between items-center mt-8 w-full">
          <div className="flex flex-col items-center space-y-4 w-full md:max-w-full flex-wrap p-6 justify-center">
            <div className={`flex flex-row justify-center ${pricingSelection === 'small' ? 'bg-indigo-900' : 'bg-gray-400'} rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 cursor-pointer`} onClick={() => setPricingSelection('small')}>
              {pricingSelection === 'small'
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10" fill="green" />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" stroke="grey" fill="none" />
                </svg>
              }
              <h2 className="text-lg font-medium ml-2">$2.99 for 20 avatars</h2>
            </div>
            <div className={`flex flex-row justify-center ${pricingSelection === 'medium' ? 'bg-indigo-900' : 'bg-gray-400'} rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 cursor-pointer`} onClick={() => setPricingSelection('medium')}>
              {pricingSelection === 'medium'
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10" fill="green" />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" stroke="grey" fill="none" />
                </svg>
              }
              <h2 className="text-lg font-medium ml-2">$4.99 for 30 avatars</h2>
            </div>
            <div className={`flex flex-row justify-center ${pricingSelection === 'large' ? 'bg-indigo-900' : 'bg-gray-400'} rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 cursor-pointer`} onClick={() => setPricingSelection('large')}>
              {pricingSelection === 'large'
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10" fill="green" />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" stroke="grey" fill="none" />
                </svg>
              }
              <h2 className="text-lg font-medium ml-2">$6.99 for 60 avatars</h2>
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
      <header className="flex flex-col justify-between items-center p-2">
        <h1 className="text-center mx-auto text-xl">{`Create ${priceQuantityPairs[pricingSelection].quantity} ${getThemeLabelByKey(theme as string)} Avatars`}</h1>
        <h3 className="text-center mx-auto text-md font-semibold text-neutral-700 max-w-[80%] md:max-w-[45%] mt-5">Avatars require tremendous computation power to create. We have made it as affordable as possible ❤️</h3>
      </header>
      <div className="flex flex-col px-4 justify-between items-center mt-8 w-full">
        <div className="flex flex-col items-center space-y-4 w-full md:max-w-full flex-wrap p-6 justify-center">
          <div className={`flex flex-row justify-center ${pricingSelection === 'small' ? 'bg-indigo-900' : 'bg-gray-400'} rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 cursor-pointer`} onClick={() => setPricingSelection('small')}>
            {pricingSelection === 'small'
              ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                <circle cx="12" cy="12" r="10" fill="green" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" stroke="grey" fill="none" />
              </svg>
            }
            <h2 className="text-lg font-medium ml-2">$2.99 for 20 avatars</h2>
          </div>
          <div className={`flex flex-row justify-center ${pricingSelection === 'medium' ? 'bg-indigo-900' : 'bg-gray-400'} rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 cursor-pointer`} onClick={() => setPricingSelection('medium')}>
            {pricingSelection === 'medium'
              ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                <circle cx="12" cy="12" r="10" fill="green" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" stroke="grey" fill="none" />
              </svg>
            }
            <h2 className="text-lg font-medium ml-2">$4.99 for 30 avatars</h2>
          </div>
          <div className={`flex flex-row justify-center ${pricingSelection === 'large' ? 'bg-indigo-900' : 'bg-gray-400'} rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 cursor-pointer`} onClick={() => setPricingSelection('large')}>
            {pricingSelection === 'large'
              ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                <circle cx="12" cy="12" r="10" fill="green" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" stroke="grey" fill="none" />
              </svg>
            }
            <h2 className="text-lg font-medium ml-2">$6.99 for 60 avatars</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
