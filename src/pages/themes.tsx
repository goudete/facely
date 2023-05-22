import React, { useState } from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import ThemesSubHeading from '@/components/SubHeadings/ThemesSubHeading';
import ThemesButton from '@/components/Buttons/ThemesButton';

interface ThemeProps {
  id: number;
  key: string;
  url: string;
};
const Themes: NextPage = () => {
  const router = useRouter();
  const { number, folder } = router.query;
  const [selectedTheme, setselectedTheme] = useState<number | null>(null);
  const [displayThemeError, setDisplayThemeError] = useState<boolean>(false);

  const handleClick = () => {
    if (selectedTheme === null) {
      setDisplayThemeError(true);
      return;
    }
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
        theme: getThemeKeyById(selectedTheme)
      }),
    });
  }

  const toggleThemeSelection = (id: number) => {
    if (selectedTheme === id) {
      setselectedTheme(null);
    } else {
      if (displayThemeError) setDisplayThemeError(false);
      setselectedTheme(id);
    }
  };

  const getThemeKeyById = (id: number): string | null => {
    const theme = themes.find(theme => theme.id === id);
    return theme ? theme.key : null;
  }

  const themes: ThemeProps[] = [
    { id: 0, key: 'viking', url: "https://public-michelangelo-ai.s3.amazonaws.com/viking.png" },
    { id: 1, key: 'gta', url: "https://public-michelangelo-ai.s3.amazonaws.com/gta.png" },
    { id: 2, key: 'dream', url: "https://public-michelangelo-ai.s3.amazonaws.com/dream.jpg" },
    { id: 3, key: 'dream_portrait', url: "https://public-michelangelo-ai.s3.amazonaws.com/dream_portrait.jpg" },
    { id: 4, key: 'got', url: "https://public-michelangelo-ai.s3.amazonaws.com/got.png" }
  ];

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <ThemesSubHeading />
      {displayThemeError && (
        <div className="flex justify-between items-center p-1 mt-5">
          <h1 className="text-center mx-auto max-w-[90%] rounded-md bg-indigo-500 p-3">
            Please select a theme
          </h1>
        </div>
      )}
      <div className="flex flex-wrap justify-center mt-4 pb-48">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="m-1 relative"
            onClick={() => toggleThemeSelection(theme.id)}
          >
            <Image
              src={theme.url}
              alt={`Image ${index}`}
              width={150}
              height={150}
              className="rounded-lg"
              placeholder={'blur'}
              blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
            />
            {selectedTheme === theme.id && (
              <div className="absolute top-0 right-0 h-6 w-6 m-1 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

            )}
          </div>
        ))}
      </div>
      <ThemesButton handleClick={handleClick} />
    </div>
  );
}

export default Themes;
