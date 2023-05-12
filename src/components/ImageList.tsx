import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageListProps {
  images: ImageProps[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  return (
    <div className="flex flex-col items-center py-4">
      {images.map((image, index) => (
        <div key={index} className="my-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={250}
            height={250}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageList;
