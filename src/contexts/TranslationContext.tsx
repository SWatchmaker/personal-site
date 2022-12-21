import React, { createContext, useState } from 'react';
import AllTranslations, { Languages } from '../translations';
import { TTranslation } from '../translations/types';

interface ITranslationContext {
  translation: TTranslation;
  language?: string;
  setTranslation?: (language: Languages) => void;
}

export const TranslationContext = createContext<ITranslationContext>({
  translation: AllTranslations.ES,
});

export const TranslationContextProvider = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  const [translation, setTranslation] = useState<TTranslation>(
    AllTranslations.ES
  );
  const [language, setLanguage] = useState<Languages>('ES');

  const setTranslationByCode = (language: Languages): void => {
    const translation = AllTranslations[language];
    setLanguage(language);
    setTranslation(translation);
  };

  return (
    <TranslationContext.Provider
      value={{
        translation,
        language,
        setTranslation: setTranslationByCode,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
