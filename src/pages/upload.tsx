import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import SelectSubHeading from '@/components/SubHeadings/SelectSubHeading';
import SelectPhotosButton from '@/components/Buttons/SelectPhotosButton';

const SelectPhotos: NextPage = () => {
  const router = useRouter();
  // const [images, setImages] = useState([]);


  const handleClick = () => { };

  return (
    <div className="flex flex-col pt-24">
      <Header />
      <SelectSubHeading />
      <div>
        {/* <input type="file" accept="image/*" multiple onChange={handleImageUpload} /> */}
        {/* {images.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} />
        ))} */}
      </div>
      <SelectPhotosButton handleClick={handleClick} />
    </div>
  );
}

export default SelectPhotos;
