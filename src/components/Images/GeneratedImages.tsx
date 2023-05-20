import Image from 'next/image';

interface GeneratedImagesProps {
  images: string[];
}

const GeneratedImages = ({ images }: GeneratedImagesProps) => {
  return (
    <div className="flex flex-col items-center py-4">
      {images.map((url, index) => (
        <div key={index} className="my-2">
          <Image
            src={url}
            alt={`${index}`}
            width={250}
            height={250}
            className="rounded-lg"
            priority={index < 2}
          />
        </div>
      ))}
    </div>
  );
}

export default GeneratedImages;
