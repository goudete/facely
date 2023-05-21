import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import HomeSubHeading from '@/components/SubHeadings/HomeSubHeading';
import ImageGallery from '@/components/Images/ImageGallery';
import GetStartedButton from '@/components/Buttons/GetStartedButton';

const images = [
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo3.png', alt: 'Image 3' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo5.png', alt: 'Image 5' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo2.png', alt: 'Image 2' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo1.png', alt: 'Image 1' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo4.png', alt: 'Image 4' },
];

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/register');
  };

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <HomeSubHeading />
      <div className="overflow-y-scroll pt-4 pb-48">
        <ImageGallery images={images} />
      </div>
      <GetStartedButton handleClick={handleClick} />
    </div>
  );
}

export default Home;
