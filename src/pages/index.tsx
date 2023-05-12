import type { NextPage } from 'next';
import Header from '@/components/Header';
import HomeSubHeading from '@/components/HomeSubHeading';
import ImageGallery from '@/components/ImageGallery';
import GetStartedButton from '@/components/GetStartedButton';

const images = [
  { src: '/images/demo3.png', alt: 'Image 3' },
  { src: '/images/demo2.png', alt: 'Image 2' },
  { src: '/images/demo1.png', alt: 'Image 1' },
  { src: '/images/demo4.png', alt: 'Image 4' },
];

const Home: NextPage = () => {
  return (
    <div className="flex flex-col pt-24">
      <Header />
      <HomeSubHeading />
      <div className="overflow-y-scroll pt-5 pb-28">
        <ImageGallery images={images} />
      </div>
      <GetStartedButton />
    </div>
  );
}

export default Home;
