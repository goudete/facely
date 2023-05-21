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
        <p className="text-sm text-slate-200 ml-1">
          Close up selfies from different angles
        </p>
        <div className="flex space-x-2 overflow-x-auto">
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/sample-1.jpg" className="rounded-lg" alt="1" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/sample-5.jpg" className="rounded-lg" alt="5" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/sample-4.jpg" className="rounded-lg" alt="4" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/sample-2.jpg" className="rounded-lg" alt="2" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/sample-3.jpg" className="rounded-lg" alt="3" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
        </div>
      </div>
      <div className="flex flex-col items-start space-y-2 max-w-[85%] md:max-w-[45%] flex-wrap rounded-lg bg-gray-600 p-4">
        <div className='flex flex-row justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-medium ml-2">Bad Photos</h2>
        </div>
        <p className="text-sm text-slate-200 ml-1">
          Group pics, face not visible, sunglasses, far away.
        </p>
        <div className="flex space-x-2 overflow-x-auto">
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/bad-6.jpg" className="rounded-lg" alt="4" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/bad-2.jpg" className="rounded-lg" alt="5" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/bad-4.jpg" className="rounded-lg" alt="6" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/hasbi-2.jpeg" className="rounded-lg" alt="6" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
          <Image width={85} height={85} src="https://public-michelangelo-ai.s3.amazonaws.com/hasbi-3.jpeg" className="rounded-lg" alt="6" placeholder={'blur'} blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
        </div>
      </div>
    </div>
  );
}

export default SampleUpload;
