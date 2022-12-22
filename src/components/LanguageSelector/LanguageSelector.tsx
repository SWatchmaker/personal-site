import React, { useContext, useState } from 'react';
import { ES, US } from 'country-flag-icons/react/3x2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Languages } from '../../translations';
import { TranslationContext } from '../../contexts/TranslationContext';

interface ILanguageOptionElement {
  code: Languages;
  flag: React.ReactNode;
}

const LanguagesOptions: ILanguageOptionElement[] = [
  {
    code: 'ES',
    flag: <ES className='w-4' />,
  },
  {
    code: 'EN',
    flag: <US className='w-4' />,
  },
];

const LanguageSelector = (): React.ReactElement => {
  const { setTranslation, language } = useContext(TranslationContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    LanguagesOptions.find((option) => option.code === language) ??
      LanguagesOptions[0]
  );

  const translationChangeHandler = (option: ILanguageOptionElement): void => {
    if (!setTranslation) return;
    setSelectedOption(option);
    setTranslation(option.code);
    setIsOpen(false);
  };

  return (
    <div
      className='flex flex-col items-end'
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className='focus:ouline-none flex flex-row rounded bg-white bg-opacity-20 hover:bg-opacity-50 focus:bg-opacity-50 p-2 cursor-pointer items-center transition-colors'
        onClick={() => setIsOpen(true)}
      >
        {selectedOption.flag}
        <FontAwesomeIcon icon={faChevronDown} className='text-xs ml-2' />
      </button>
      {isOpen && (
        <div className='mt-1 border border-transparent rounded overflow-hidden bg-eva-purple bg-opacity-20'>
          {LanguagesOptions.map((option) => (
            <button
              key={option.code}
              className='flex flex-row items-center px-2 py-1 cursor-pointer hover:bg-opacity-10 hover:bg-white transition-colors'
              onClick={() => translationChangeHandler(option)}
            >
              <span className='mr-2'>{option.code}</span>
              <div className='ml-2'>{option.flag}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
