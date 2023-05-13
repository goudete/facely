import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import VerifySubHeading from '@/components/SubHeadings/VerifySubHeading';
import VerificationCode from '@/components/Inputs/VerificationCode';

const Verify: NextPage = () => {
  const router = useRouter();
  const { number } = router.query;
  const [verificationCode, setVerificationCode] = useState<string>('');

  const confirmVerificationCode = async () => {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode, phoneNumber: number }),
      });

      if (response.ok) {
        console.log('Request succeeded ✅');
        return;
      } else {
        console.error('Request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error Submitting number', error);
    }
  }
  const onChange = (input: string) => {
    setVerificationCode(input);
  };

  useEffect(() => {
    if (verificationCode.length === 4) {
      (async () => {
        try {
          await confirmVerificationCode();
          router.push({ pathname: '/themes', query: { number } });
          return;
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [verificationCode]);

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <VerifySubHeading />
      <VerificationCode onChange={onChange} verificationCode={verificationCode} />
    </div>
  );
}

export default Verify;
