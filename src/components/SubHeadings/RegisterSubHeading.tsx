
const RegisterSubHeading: React.FC = () => {
  return (
    <header className="flex flex-col justify-between items-center p-1">
      <h1 className="text-center mx-auto text-xl font-semibold">What is your number?</h1>
      <h3 className="text-center mx-auto text-md font-semibold text-neutral-700 max-w-[60%] mt-5">You will not be able to login without a valid phone number.</h3>
    </header>
  );
}

export default RegisterSubHeading;
