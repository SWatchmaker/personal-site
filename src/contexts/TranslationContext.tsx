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

const isSpanish = (): boolean =>
  ['es-ES', 'es'].includes(window.navigator.language);

export const TranslationContextProvider = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  const [translation, setTranslation] = useState<TTranslation>(
    isSpanish() ? AllTranslations.ES : AllTranslations.EN
  );
  const [language, setLanguage] = useState<Languages>(
    isSpanish() ? 'ES' : 'EN'
  );

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
