import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import ThemesSubHeading from '@/components/SubHeadings/ThemesSubHeading';
import ThemesButton from '@/components/Buttons/ThemesButton';

const Themes: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/upload')
  }

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <ThemesSubHeading />
      <ThemesButton handleClick={handleClick} />
    </div>
  );
}

export default Themes;
