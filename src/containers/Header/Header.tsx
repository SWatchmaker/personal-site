import React, { useContext } from 'react';
import AnimatedLogo from '../../components/AnimatedLogo';
import ContactBox from '../../components/ConctactBox/ContactBox';
import { TranslationContext } from '../../contexts/TranslationContext';

export const Header = (): React.ReactElement => {
  const {
    translation: { header },
  } = useContext(TranslationContext);
  return (
    <header
      className={`fixed t-0 w-full transition-all duration-500 z-50 bg-black/50 animate__delay-1s animate__animated animate__fadeInDown`}
    >
      <div className='max-w-screen-lg mx-auto my-0 py-0 px-6'>
        <div className='flex justify-between items-center py-2'>
          <AnimatedLogo />
          <ContactBox text={header.contact} />
        </div>
      </div>
    </header>
  );
};

export default Header;
