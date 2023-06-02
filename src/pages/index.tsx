import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import HomeSubHeading from '@/components/SubHeadings/HomeSubHeading';
import ImageGallery from '@/components/Images/ImageGallery';
import GetStartedButton from '@/components/Buttons/GetStartedButton';

const images = [
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo5.png', original: 'https://public-michelangelo-ai.s3.amazonaws.com/rau.jpeg', alt: 'Image 5' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/ale-avatar.png', original: 'https://public-michelangelo-ai.s3.amazonaws.com/ale-raw.png', alt: 'Image 6' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo3.png', original: 'https://public-michelangelo-ai.s3.amazonaws.com/wa.png', alt: 'Image 6' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/image8.png', original: 'https://public-michelangelo-ai.s3.amazonaws.com/miel.png', alt: 'Image 6' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/luis_got.png', original: 'https://public-michelangelo-ai.s3.amazonaws.com/luis_raw_square_crop.jpg', alt: 'Image 2' },
  { src: 'https://public-michelangelo-ai.s3.amazonaws.com/alfonso_dream_portait.png', original: 'https://public-michelangelo-ai.s3.amazonaws.com/alfonso_raw_square_crop.jpeg', alt: 'Image 1' },
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
