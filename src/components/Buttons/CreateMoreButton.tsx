
interface CreateMoreButtonProps {
  handleClick: () => void;
}
const CreateMoreButton = ({ handleClick }: CreateMoreButtonProps) => {
  return (
    <div className="fixed inset-x-0 bottom-0 p-6 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <button className="flex items-center justify-center w-10/12 mx-auto py-4 text-xl font-semibold text-white bg-indigo-600 drop-shadow-xl rounded-full block" onClick={handleClick}>
        Create More Avatars
      </button>
      <div className="flex flex-row justify-center mt-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        <div className="font-semibold ml-2">1,569 created today</div>
      </div>
    </div>
  );
}

export default CreateMoreButton;
