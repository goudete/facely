import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import SelectSubHeading from '@/components/SubHeadings/SelectSubHeading';
import SelectPhotosButton from '@/components/Buttons/SelectPhotosButton';
import UploadPhotosButton from '@/components/Buttons/UploadPhotosButton';
import ImageSelectionPreview from '@/components/Images/ImageSelectionPreview';
import SampleUpload from '@/components/Images/SampleUpload';

const Upload: NextPage = () => {
  const router = useRouter();
  const { number } = router.query;
  const [images, setImages] = useState<{ url: string, file: File }[]>([]);

  const handleImageSelection = (files: File[]) => {
    const newImages = files.map(file => ({ url: URL.createObjectURL(file), file }));
    setImages([...images, ...newImages]);
  };

  const handleRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onUploadClick = async () => {
    try {
      if (images.length < 5) {
        alert('Please select at least 5 selfies.\n This helps guarantee good avatars.');
        return;
      }
      const currentUpload = Date.now().toString();
      const folderName = `${number}/${currentUpload}/`;
      router.push({ pathname: '/themes', query: { number, folder: folderName } });
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
    } catch (error) {
      console.error('Error uploading images');
    }
  };

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <SelectSubHeading />
      {images.length === 0 && (
        <>
          <div className="overflow-y-scroll pb-48">
            <SampleUpload />
          </div>
          <SelectPhotosButton title={'Select Selfies'} handleImageSelection={handleImageSelection} />
        </>
      )}
      {images.length > 0 && images.length < 5 && (
        <>
          <div className="flex justify-between items-center p-1 mt-12">
            <h1 className="text-center mx-auto max-w-[90%] rounded-md bg-indigo-500 p-3">
              Please select at least 5 selfies
            </h1>
          </div>
          <div className="overflow-y-scroll pt-5 pb-32">
            <ImageSelectionPreview images={images.map(image => image.url)} onRemove={handleRemove} />
          </div>
          <SelectPhotosButton title={'Select more Selfies'} handleImageSelection={handleImageSelection} />
        </>
      )}
      {images.length >= 5 && (
        <>
          <div className="overflow-y-scroll pt-5 pb-32">
            <ImageSelectionPreview images={images.map(image => image.url)} onRemove={handleRemove} />
          </div>
          <UploadPhotosButton onUploadClick={onUploadClick} />
        </>
      )}
    </div>
  );
}

export default Upload;
