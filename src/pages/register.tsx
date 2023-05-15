import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import RegisterSubHeading from '@/components/SubHeadings/RegisterSubHeading';
import Phone from '@/components/Inputs/Phone';

import { parsePhoneNumber } from 'libphonenumber-js'


const Register: NextPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const submitNumber = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'User already exists') {
          router.push({
            pathname: '/upload',
            query: { number: phoneNumber }
          });
        } else {
          router.push({
            pathname: '/verify',
            query: { number: phoneNumber }
          });
        }
      } else {
        console.error('Request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error Submitting number', error);
    }
  };

  const onChange = (value: string) => {
    setPhoneNumber(value);
  }
  const handleClick = async () => {
    if (phoneNumber === '' || !isValidPhoneNumber(phoneNumber)) {
      return;
    };
    await submitNumber();
  };
  const isValidPhoneNumber = (phoneNumber: string) => {
    try {
      const phone = parsePhoneNumber(phoneNumber);
      return phone.isValid();
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (isValidPhoneNumber(phoneNumber)) {
      submitNumber();
      router.push({
        pathname: '/verify',
        query: { number: phoneNumber }
      });
      return;
    }
  }, [phoneNumber]);

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <RegisterSubHeading />
      <Phone onChange={onChange} phoneNumber={phoneNumber} handleClick={handleClick} />
    </div>
  );
}

export default Register;
