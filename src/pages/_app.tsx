import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from 'next/head';


const stripePromise = loadStripe("pk_live_14GXWJCaggG9wRSm6J2WXfxc00BZ6lboDV");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Facely AI 🤌🏽</title>
      </Head>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    </>
  );
}
