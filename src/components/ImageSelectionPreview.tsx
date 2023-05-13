import Image from 'next/image';

interface ImageSelectionPreviewProps {
  images: string[];
}

const ImageSelectionPreview = ({ images }: ImageSelectionPreviewProps) => {
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
          />
        </div>
      ))}
    </div>
  );
}

export default ImageSelectionPreview;
