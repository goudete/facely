import { useRef } from 'react';

interface UploadPhotosButtonProps {
  onUploadClick: () => void;
}
const UploadPhotosButton = ({ onUploadClick }: UploadPhotosButtonProps) => {

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <button
        className="flex items-center justify-center w-10/12 mx-auto py-4 text-xl font-semibold text-white bg-indigo-600 drop-shadow-xl rounded-full block"
        onClick={onUploadClick}
      >
        Submit Photos
      </button>
      <div className="flex flex-row justify-center mt-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <div className="font-semibold ml-2">100% secure</div>
      </div>
    </div>
  );
}

export default UploadPhotosButton;
