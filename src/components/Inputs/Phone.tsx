
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from './phoneInputOverride.module.css';

interface PhoneInputProps {
  onChange: any;
  handleClick: () => void;
  phoneNumber: string;
}
const Phone = ({ onChange, handleClick, phoneNumber }: PhoneInputProps) => {

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <PhoneInput
        className={`${styles.PhoneInput} ${styles.PhoneInputCountrySelectArrow} flex items-center justify-center text-center w-10/12 mx-auto py-4 text-xl font-semibold bg-black border border-white text-black rounded-full block`}
        defaultCountry="US"
        placeholder="(555) 555-5555"
        value={phoneNumber}
        onChange={onChange}
      />
      <button className="flex items-center justify-center w-10/12 mx-auto py-4 text-xl font-semibold text-white bg-green-500 rounded-full block mt-5" onClick={handleClick}>
        Next
      </button>
      <div className="flex flex-row justify-center mt-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <div className="font-semibold ml-2">100% private</div>
      </div>
    </div>
  );
}

export default Phone;
