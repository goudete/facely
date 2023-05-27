import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_live_14GXWJCaggG9wRSm6J2WXfxc00BZ6lboDV");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <Component {...pageProps} />
    </Elements>
  );
}
