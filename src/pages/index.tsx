import type { NextPage } from 'next';
import Header from '@/components/Header';
import HomeSubHeading from '@/components/HomeSubHeading';
import ImageList from '@/components/ImageList';
import GetStartedButton from '@/components/GetStartedButton';

const images = [
  { src: '/images/demo3.png', alt: 'Image 3' },
  { src: '/images/demo2.png', alt: 'Image 2' },
  { src: '/images/demo1.png', alt: 'Image 1' },
  { src: '/images/demo4.png', alt: 'Image 4' },
];

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen items-stretch">
      <Header />
      <HomeSubHeading />
      <div className="flex-grow overflow-y-scroll pb-24">
        <ImageList images={images} />
      </div>
      <GetStartedButton />
    </div>
  );
}

export default Home;
