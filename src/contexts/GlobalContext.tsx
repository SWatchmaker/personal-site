import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface IGlobalContext {
  postWelcome: boolean;
  scrollY: number;
  maxScrollY: number;
  setPostWelcome?: Dispatch<SetStateAction<boolean>>;
  calculateMaxScrollY?: () => void;
}

const GlobalContext = createContext<IGlobalContext>({
  postWelcome: false,
  scrollY: 0,
  maxScrollY: 0,
});

let debounceTimer: number;

const debounce = (callback: Function, time: number): void => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  const [postWelcome, setPostWelcome] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [maxScrollY, setMaxScrollY] = useState(
    document.body.offsetHeight - window.innerHeight
  );

  const handleScroll = (): void => {
    const scroll = window.scrollY;
    if (Math.abs(scroll - scrollY) >= 20 || scroll === 0) {
      setScrollY(scroll);
    }
  };

  const calculateMaxScrollY = (): void => {
    debounce(
      () => setMaxScrollY(document.body.offsetHeight - window.innerHeight),
      200
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateMaxScrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateMaxScrollY);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        postWelcome,
        setPostWelcome,
        scrollY,
        maxScrollY,
        calculateMaxScrollY,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
