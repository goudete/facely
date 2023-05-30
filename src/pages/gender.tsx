import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import GenderSubHeading from '@/components/SubHeadings/GenderSubHeading';

interface GenderProps {
  id: number;
  key: string;
};

const Genders: NextPage = () => {
  const router = useRouter();
  const { number } = router.query;

  const handleGenderSelection = (genderKey: string) => {

    router.push({
      pathname: '/upload',
      query: { number, gender: genderKey }
    });

    fetch('/api/gender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
        gender: genderKey,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error recording gender', error);
      });
  };

  const genders: GenderProps[] = [
    { id: 0, key: 'male' },
    { id: 1, key: 'female' },
    { id: 2, key: 'other' },
  ];

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <GenderSubHeading />
      <div className="flex flex-wrap justify-center mt-20">
        {genders.map((gender) => (
          <button
            key={gender.id}
            className="flex items-center justify-center w-10/12 mx-auto py-4 text-xl font-semibold text-white bg-indigo-600 drop-shadow-xl rounded-full block my-4"
            onClick={() => handleGenderSelection(gender.key)}
          >
            {gender.key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Genders;