import Image from 'next/image';

interface ImageSelectionPreviewProps {
  images: string[];
  onRemove: (index: number) => void;
}

const ImageSelectionPreview = ({ images, onRemove }: ImageSelectionPreviewProps) => {
  return (
    <div className="flex flex-col items-center py-4">
      {images.map((url, index) => (
        <div key={index} className="my-2 relative">
          <Image
            src={url}
            alt={`${index}`}
            width={250}
            height={250}
            className="rounded-lg"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="red"
            className="absolute top-0 right-0 h-6 w-6 m-1 cursor-pointer"
            onClick={() => onRemove(index)}
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default ImageSelectionPreview;
