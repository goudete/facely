import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import PendingAvatars from '@/components/PendingAvatars';
import GeneratedImages from '@/components/Images/GeneratedImages';
import { useEffect, useState } from 'react';


const Home: NextPage = () => {
  const router = useRouter();
  const { generation } = router.query;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (generation) {
      (async () => {
        try {
          const response = await fetch('/api/convert-hash-to-images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ generation }),
          });
    
          if (response.ok) {
            console.log('Request succeeded ✅');
            const { urls } = await response.json();
            const cleanUrls = urls.slice(1);
            setImages(cleanUrls);
            return;
          } else {
            console.error('Request failed:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error Submitting number', error);
        }
      })();
    }

  }, [generation]);

  return (
    <div className="flex flex-col pt-24">
      <Header />
      {generation === undefined && <PendingAvatars />}
      {images.length > 0 && (
        <div className="overflow-y-scroll pt-5 pb-32">
          <GeneratedImages images={images} />
        </div>
      )}
    </div>
  );
}

export default Home;
