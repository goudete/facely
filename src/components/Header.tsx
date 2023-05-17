
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-black z-10">
      <h1 className="text-center mx-auto text-2xl	font-semibold pl-1">Michelangelo AI</h1>
      {/* <div className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div> */}
    </header>
  );
}

export default Header;
