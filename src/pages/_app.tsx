import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from 'next/head';


const stripePromise = loadStripe("pk_test_Xe83eO00w3NS419yVk1pXWPN00t24Ogp1S");

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
