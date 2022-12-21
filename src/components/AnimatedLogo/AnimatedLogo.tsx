import React, { useState, useEffect, useRef } from 'react';
import './animatedLogo.scss';

const AnimLogo = (): React.ReactElement => {
  const word1 = 'Seba';
  const word2 = 'Weidmann';

  const onExpansion = useRef(false);
  const onContraction = useRef(false);
  const [word1Text, setWord1Text] = useState('S');
  const [word2Text, setWord2Text] = useState('W');

  const startExpansion = (): void => {
    onExpansion.current = true;
    onContraction.current = false;
    if (word1Text.length + word2Text.length === 2)
      setWord1Text(word1Text + '_');
  };

  const startContraction = (): void => {
    onExpansion.current = false;
    onContraction.current = true;

    setWord2Text((word) => {
      if (word.replace(/_/g, '').length === word2.length)
        return getLowDashedTogledText(word);
      else return word;
    });
  };

  const expand = (): void => {
    if (!onExpansion) return;
    const lowDashFilteredText1 = word1Text.replace(/_/g, '');
    const text1Length = lowDashFilteredText1.length;

    const lowDashFilteredText2 = word2Text.replace(/_/g, '');
    const text2Length = lowDashFilteredText2.length;

    if (text1Length < word1.length) {
      const isLastLetter = text1Length === word1.length - 1;
      setWord1Text(
        `${lowDashFilteredText1}${word1[text1Length]}${isLastLetter ? '' : '_'}`
      );
      if (isLastLetter) setWord2Text(word2Text + '_');
    } else if (text2Length < word2.length) {
      setWord2Text(`${lowDashFilteredText2}${word2[text2Length]}_`);
    }
  };

  const contract = (): void => {
    if (!onContraction) return;
    const lowDashFilteredText1 = word1Text.replace(/_/g, '');
    const text1Length = lowDashFilteredText1.length;

    const lowDashFilteredText2 = word2Text.replace(/_/g, '');
    const text2Length = lowDashFilteredText2.length;

    if (text2Length === 1 && word2Text.length > 1) {
      setWord2Text(lowDashFilteredText2);
    } else if (word2Text.length > 1) {
      const isLastLetter = text2Length === 2;
      setWord2Text(
        `${lowDashFilteredText2.slice(0, text2Length - 1)}${
          isLastLetter ? '' : '_'
        }`
      );
      if (isLastLetter) setWord1Text(word1Text + '_');
    } else if (text1Length > 1) {
      const isLastLetter = text1Length === 2;
      setWord1Text(
        `${lowDashFilteredText1.slice(0, text1Length - 1)}${
          isLastLetter ? '' : '_'
        }`
      );
    }
  };

  const getLowDashedTogledText = (text: string): string => {
    if (text.includes('_')) {
      return text.replace(/_/g, '');
    } else {
      return text + '_';
    }
  };

  useEffect(() => {
    const animateOnStartTimeout = setTimeout(() => {
      startExpansion();
      setTimeout(startContraction, 1000);
    }, 2000);

    return () => {
      clearTimeout(animateOnStartTimeout);
    };
  }, []);

  useEffect(() => {
    if (onExpansion.current) {
      if (word2Text.replace(/_/g, '').length === word2.length) {
        setTimeout(() => {
          if (onExpansion.current)
            setWord2Text((word) => getLowDashedTogledText(word));
        }, 500);
      } else {
        setTimeout(expand, 60);
      }
    } else if (onContraction.current) {
      if (word1Text.length + word2Text.length === 2) {
        onContraction.current = false;
      } else {
        setTimeout(contract, 60);
      }
    }
  }, [word1Text, word2Text]);

  return (
    <div
      className={`navbar-brand border-2 font-code p-2 cursor-pointer border-anim  ${
        word1Text.length + word2Text.length > 2
          ? 'rounded-lg border-transparent'
          : 'rounded-full border-turquoise'
      }`}
      onMouseEnter={startExpansion}
      onMouseLeave={startContraction}
    >
      <span className='logo-1'>{word1Text}</span>
      <span className='logo-2'>{word2Text}</span>
    </div>
  );
};

export default AnimLogo;
