import Image from 'next/image';

const SampleUpload = () => {
  return (
    <div className="flex flex-col space-y-4 px-4 justify-between items-center mt-12 w-full">
      <div className="flex flex-col items-start space-y-2 max-w-[85%] md:max-w-[45%] flex-wrap rounded-lg bg-gray-600 p-4">
        <div className='flex flex-row justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-medium ml-2">Good Photos</h2>
        </div>
        <p className="text-sm text-slate-400 ml-1">
          Close up selfies, with different expressions and angles.
        </p>
        <div className="flex space-x-2">
          <Image width={85} height={85} src="/sample-upload/good-photos/good-2.jpg" className="rounded-lg" alt="1" />
          <Image width={85} height={85} src="/sample-upload/good-photos/good-6.jpg" className="rounded-lg" alt="2" />
          <Image width={85} height={85} src="/sample-upload/good-photos/good-7.jpg" className="rounded-lg" alt="3" />
        </div>
      </div>
      <div className="flex flex-col items-start space-y-2 max-w-[85%] md:max-w-[45%] flex-wrap rounded-lg bg-gray-600 p-4">
        <div className='flex flex-row justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-medium ml-2">Bad Photos</h2>
        </div>
        <p className="text-sm text-slate-400 ml-1">
          Group pics, face not visible, sunglasses.
        </p>
        <div className="flex space-x-2">
          <Image width={85} height={85} src="/sample-upload/bad-photos/bad-6.jpg" className="rounded-lg" alt="4" />
          <Image width={85} height={85} src="/sample-upload/bad-photos/bad-2.jpg" className="rounded-lg" alt="5" />
          <Image width={85} height={85} src="/sample-upload/bad-photos/bad-4.jpg" className="rounded-lg" alt="6" />
        </div>
      </div>
    </div>
  );
}

export default SampleUpload;
