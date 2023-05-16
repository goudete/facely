import { useRef } from 'react';

interface SelectPhotosButtonProps {
  handleImageSelection: (files: any) => void;
}
const SelectPhotosButton = ({ handleImageSelection }: SelectPhotosButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      files.forEach((file) => console.log('FILE TYPE: ', file.type));
      handleImageSelection(files);
    }
  };
  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        className="flex items-center justify-center w-10/12 mx-auto py-4 text-xl font-semibold text-white bg-green-500 rounded-full block"
        onClick={handleClick}
      >
        Select Photos
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

export default SelectPhotosButton;
