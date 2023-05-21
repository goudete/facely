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
            placeholder={'blur'}
            blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
          />
        </div>
      ))}
    </div>
  );
}

export default GeneratedImages;
