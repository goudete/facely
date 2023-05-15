import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import SelectSubHeading from '@/components/SubHeadings/SelectSubHeading';
import SelectPhotosButton from '@/components/Buttons/SelectPhotosButton';
import UploadPhotosButton from '@/components/Buttons/UploadPhotosButton';
import ImageSelectionPreview from '@/components/Images/ImageSelectionPreview';

const Upload: NextPage = () => {
  const router = useRouter();
  const { number } = router.query;
  const [images, setImages] = useState<{ url: string, file: File }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageSelection = (files: File[]) => {
    const imageObjects = files.map(file => ({ url: URL.createObjectURL(file), file }));
    setImages(imageObjects);
  };

  const onUploadClick = async () => {
    try {
      setLoading(true);
      const currentUpload = Date.now().toString();
      const folderName = `${number}/${currentUpload}/`;
      for (const image of images) {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: image.file.name,
            fileType: image.file.type,
            folderName,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { url: signedUrl } = await response.json();

        const uploadResponse = await fetch(signedUrl, {
          method: 'PUT',
          body: image.file,
          headers: {
            'Content-Type': image.file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload image: status code ${uploadResponse.status}`);
        }
      }
      setLoading(false);
      fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: number,
          folderName
        }),
      });
      router.push({ pathname: '/home', query: { number } });
    } catch (error) {
      setLoading(false);
      alert('Error uploading images');
    }
  };

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <SelectSubHeading />
      {loading && <>
        <h1>LOADING...</h1>
      </>}
      {(!loading && images.length > 0) ?
        <>
          <div className="overflow-y-scroll pt-5 pb-32">
            <ImageSelectionPreview images={images.map(image => image.url)} />
          </div>
          <UploadPhotosButton onUploadClick={onUploadClick} />
        </>
        : <>
          {/* add sample images here */}
          <SelectPhotosButton handleImageSelection={handleImageSelection} />
        </>
      }

    </div>
  );
}

export default Upload;
