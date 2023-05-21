import Image from 'next/image';

const PendingAvatars = () => {
  const images = [
    { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo3.png', alt: 'Image 3' },
    { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo5.png', alt: 'Image 5' },
    { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo2.png', alt: 'Image 2' },
    { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo1.png', alt: 'Image 1' },
    { src: 'https://public-michelangelo-ai.s3.amazonaws.com/demo4.png', alt: 'Image 4' },
  ];

  return (
    <>
      <div className="flex flex-col justify-between items-center p-1 mt-6">
        <h5 className="text-center mx-auto text-xl font-semibold text-neutral-700 max-w-[60%]">We are creating your avatars.</h5>
        <h5 className="text-center mx-auto text-xl font-semibold text-neutral-700 max-w-[60%] mt-5">You will receive a text when they are ready.</h5>
      </div>
      <div className="flex flex-col items-center py-4">
        {images.map((image, index) => (
          <div key={index} className="my-4 relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={250}
              height={250}
              className="rounded-lg"
              priority={index < 2}
              placeholder={'blur'}
              blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md rounded-lg"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PendingAvatars;
