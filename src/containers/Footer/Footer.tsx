import React, { useState, useEffect, useContext } from 'react';
import Atom from '../../components/Atom/Atom';
import GlobalContext from '../../contexts/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LEFT_ELEMENTS, RIGHT_ELEMENTS } from './utils';
import './footer.scss';

const Footer = (): React.ReactElement => {
  const { scrollY } = useContext(GlobalContext);
  const [loadInit, setLoadInit] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      scrollY > 500
    ) {
      setShow(true);
      if (!loadInit) {
        setLoadInit(true);
      }
    } else {
      setShow(false);
    }
  });

  return (
    <footer
      className={`h-[350px] bg-transparent block relative overflow-hidden transition-colors duration-1000  ${
        show && 'footerBg'
      }`}
    >
      {loadInit && (
        <div className='h-full max-w-screen-lg mx-auto px-6'>
          <div
            className={`absolute -ml-24 left-1/2 top-1/3 animate__animated animate__fast ${
              show ? 'animate__fadeInUp' : 'animate__fadeOutDown'
            }`}
          >
            <div className='h-48 w-48 scale-75'>
              <Atom />
            </div>
          </div>
          <div className='flex justify-between pb-12 h-full'>
            <div className='flex flex-col justify-end'>
              <span
                className={`color-slate-50 text-xl mb-4 ml-1 relative animate__animated ${
                  show ? 'animate__fadeInLeft' : 'animate__fadeOutRight'
                }`}
              >
                MIS REDES
              </span>
              {LEFT_ELEMENTS.map(
                ({ animDelay, color, href, icon, text }, i) => (
                  <div className='color-slate-400 flex pb-1' key={i}>
                    <a
                      href={href}
                      target='_blank'
                      className={`hover:text-white text-slate-400 no-underline text-inherit font-normal hover:color-slate-50 animate__animated animate__delay-1s ${
                        show ? 'animate__fadeInLeft' : 'animate__fadeOutRight'
                      }`}
                      style={{
                        ['--animate-delay' as any]: `${animDelay}s`,
                      }}
                      rel='noreferrer'
                    >
                      <FontAwesomeIcon
                        className='w-5 mr-2'
                        icon={icon}
                        style={{ color }}
                      />
                      <span>{text}</span>
                    </a>
                  </div>
                )
              )}
            </div>
            <div className='flex flex-col justify-end'>
              <span
                className={`color-slate-50 text-xl mb-4 ml-1 relative text-right w-full animate__animated ${
                  show ? 'animate__fadeInRight' : 'animate__fadeOutLeft'
                }`}
              >
                REDES INFORMALES
              </span>
              {RIGHT_ELEMENTS.map(
                ({ animDelay, color, href, icon, text }, i) => (
                  <div
                    className='color-slate-400 flex justify-end pb-1'
                    key={i}
                  >
                    <a
                      href={href}
                      target='_blank'
                      className={`hover:text-white text-slate-400 text-inherit font-normal no-underline animate__animated animate__delay-1s ${
                        show ? 'animate__fadeInRight' : 'animate__fadeOutLeft'
                      }`}
                      style={{
                        ['--animate-delay' as any]: `${animDelay}s`,
                      }}
                      rel='noreferrer'
                    >
                      <span>{text}</span>
                      <FontAwesomeIcon
                        className='w-5 ml-2'
                        icon={icon}
                        style={{ color }}
                      />
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
