import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  original: string;
}

interface ImageListProps {
  images: ImageProps[];
}

const ImageGallery: React.FC<ImageListProps> = ({ images }) => {
  return (
    <div className="flex flex-col items-center py-4">
      {images.map((image, index) => (
        <div key={index} className="my-4 max-w-[85%]">
          <div className='overflow-x-scroll flex flex-nowrap space-x-2'>
            <Image
              src={image.original}
              alt={image.alt}
              width={150}
              height={150}
              className="rounded-lg"
              priority={index < 2}
              placeholder={'blur'}
              blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
            />
            <Image
              src={image.src}
              alt={image.alt}
              width={150}
              height={150}
              className="rounded-lg"
              priority={index < 2}
              placeholder={'blur'}
              blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
