import React, { useEffect, useState, useRef, useContext } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import Atom from '../../components/Atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPosition, iconElements, createPos } from './utils';
import { useNavigate } from '@tanstack/react-location';

import './welcomePage.scss';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { TranslationContext } from '../../contexts/TranslationContext';

const OBJECT_BASE_POSITION: IconPosition = {
  top: 50,
  left: 50,
  speed: 0.3,
  rotation: 0,
};

const WelcomPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const {
    translation: { welcome },
  } = useContext(TranslationContext);

  const rotationAngleSection = 220 / 5;
  const angleStart = 250;

  const bounceContainerRef = useRef<HTMLDivElement | null>(null);
  const { setPostWelcome } = useContext(GlobalContext);

  const [enableButton, setEnableButton] = useState(false);
  const [circleAnim, setCircleAnim] = useState(true);
  const [outAnim, setOutAnim] = useState(false);
  const [icons, setIcons] = useState(
    iconElements.map((icon) => ({ ...icon, position: OBJECT_BASE_POSITION }))
  );

  useEffect(() => {
    if (setPostWelcome) setPostWelcome(false);
    stopBounce();
    const img = new Image();
    img.onload = function () {
      const img2 = new Image();
      img2.onload = function () {
        setEnableButton(true);
      };
      img2.src = '/images/78ec3e1d-d68f-455b-a9d0-bfdbadc14aa8.jpg';
    };
    img.src = '/images/4450358-dark-backgrounds.jpg';
  }, []);

  const setIconPositionByIndex = (
    position: IconPosition,
    index: number
  ): void => {
    const icon = icons[index];
    icon.position = position;
    icons[index] = icon;
    setIcons([...icons]);
  };

  const startBounce = (): void => {
    if (!outAnim) {
      setIcons([
        ...icons.map((icon) => ({
          ...icon,
          position: createPos(icon.position, bounceContainerRef),
        })),
      ]);
      setCircleAnim(false);
    }
  };

  const stopBounce = (): void => {
    setCircleAnim(true);
    setIcons([
      ...icons.map((icon) => ({
        ...icon,
        position: {
          ...OBJECT_BASE_POSITION,
          rotation: angleStart + rotationAngleSection * icon.rotationMultiplier,
        },
      })),
    ]);
  };

  const animOut = (): void => {
    if (enableButton) {
      setOutAnim(true);
    }
  };

  const toHome = (): void => {
    if (setPostWelcome) {
      setPostWelcome(true);
      navigate({ to: '/home' });
    }
  };

  return (
    <div
      className={`welcomePage bg-eva-purple-dark w-screen h-screen overflow-hidden ${
        !circleAnim && 'loader--inactive'
      } ${outAnim && 'animate__animated animate__delay-1s animate__fadeOut'}`}
      style={{
        ['--animate-delay' as any]: '0.8s',
      }}
    >
      <div className='absolute top-2 right-2 z-50'>
        <LanguageSelector />
      </div>
      <div
        className='relative h-full w-full'
        id='bounceContainer'
        ref={bounceContainerRef}
      >
        {icons.map(({ delays, position, icon }, i) => (
          <div
            key={i}
            className={`rollIcon block absolute w-12 animate__animated animate__delay-1s ${
              outAnim ? 'animate__fadeOutUp' : 'animate__fadeIn'
            } ${circleAnim && 'welcomePage__rollIcon--circle'}`}
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
              transitionDuration: `${position.speed}s`,
              ['--animate-delay' as any]: outAnim
                ? `${delays[0]}s`
                : `${delays[1]}s`,
              transform: `rotate(${position.rotation}deg)`,
            }}
            onTransitionEnd={(e) => {
              if (e.propertyName === 'top' && !circleAnim) {
                const oldpos = position;
                setIconPositionByIndex(
                  createPos(oldpos, bounceContainerRef),
                  i
                );
              }
            }}
            onAnimationEnd={
              i === icons.length - 1
                ? () => {
                    setTimeout(() => {
                      startBounce();
                    }, 300);
                  }
                : undefined
            }
          >
            <FontAwesomeIcon
              icon={icon}
              className={`${
                circleAnim ? 'text-5xl' : 'text-9xl'
              } text-eva-purple-darker}`}
            />
          </div>
        ))}
      </div>
      <div className='atom-container h-48 w-48 -ml-24 -mt-24 absolute inset-1/2 animate-spin-slower overflow-hidden'>
        <Atom />
      </div>
      <div
        className={`goInButton absolute inset-x-0 top-1/2 mt-36 mx-auto w-36 h-12 leading-[3rem] hover:w-40 hover:h-16 hover:leading-[4rem] text-center inset-1/2 outline-none cursor-pointer animate__animated animate__delay-1s ${
          outAnim && 'animate__fadeOutDown'
        } ${!enableButton && 'disabled'}`}
        style={{
          ['--animate-delay' as any]: '0.6s',
        }}
        onMouseEnter={() => {
          stopBounce();
        }}
        onMouseLeave={() => {
          startBounce();
        }}
        onClick={() => {
          animOut();
        }}
        onAnimationEnd={() => {
          toHome();
        }}
      >
        <span className='tracking-wide'>{welcome.button}</span>
      </div>
    </div>
  );
};

export default WelcomPage;
