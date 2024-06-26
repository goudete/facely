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
      router.push({
        pathname: '/gender',
        query: { number: phoneNumber }
      });

      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
    } catch (error) {
      console.error('Error Submitting number', error);
    }
  };

  const onChange = (value: string) => {
    setPhoneNumber(value);
  }
  const handleClick = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
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
  const isUSOrMexNumber = (phoneNumber: string) => {
    try {
      const phone = parsePhoneNumber(phoneNumber);
      const country = phone.country;
      return country === 'US' || country === 'MX';
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (isValidPhoneNumber(phoneNumber) && isUSOrMexNumber(phoneNumber)) {
      submitNumber();
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
