import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import SelectSubHeading from '@/components/SubHeadings/SelectSubHeading';
import SelectPhotosButton from '@/components/Buttons/SelectPhotosButton';
import UploadPhotosButton from '@/components/Buttons/UploadPhotosButton';
import ImageSelectionPreview from '@/components/ImageSelectionPreview';

const Upload: NextPage = () => {
  const router = useRouter();
  const { number } = router.query;
  const [images, setImages] = useState<{url: string, file: File}[]>([]);

  const handleImageSelection = (files: File[]) => {
    const imageObjects = files.map(file => ({url: URL.createObjectURL(file), file}));
    setImages(imageObjects);
  };

  const onUploadClick = async () => {
    const formData = new FormData();
  
    images.forEach((image, index) => {
      formData.append(`file${index}`, image.file);
    });

    if (number !== null && number !== undefined){
      formData.append('phoneNumber', number as any);
    }
  
    try {
      console.log(formData)
      const response = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        console.log('RESPONSE; ', response)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  };

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <SelectSubHeading />
      {images.length > 0 ?
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
