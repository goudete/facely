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
            placeholder={'blur'}
            blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
          />
          <div className="absolute top-0 right-0 h-6 w-6 m-1 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 text-white-500"
              onClick={() => onRemove(index)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageSelectionPreview;
