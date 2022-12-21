import React, { useState } from 'react';
import {
  faWhatsappSquare,
  faLinkedin,
  faGithubSquare,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './contactBox.scss';

interface IContactIcons {
  id: string;
  icon: IconDefinition;
  href: string;
  color: string;
}

const CONTACT_ICONS: IContactIcons[] = [
  {
    id: 'wsIcon',
    icon: faWhatsappSquare,
    href: 'https://wa.link/io5hce',
    color: '#25d366',
  },
  {
    id: 'mailIcon',
    icon: faEnvelopeSquare,
    href: 'mailto:sebastian.weidmann.l@gmail.com',
    color: '#ea4335',
  },
  {
    id: 'ldIcon',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/sebaweidmann',
    color: '#0077b5',
  },
  {
    id: 'gitIcon',
    icon: faGithubSquare,
    href: 'https://github.com/SWatchmaker',
    color: '#6e5494',
  },
];

const ContactBox = ({ text }: { text: string }): React.ReactElement => {
  const [animationOn, setAnimationOn] = useState(false);
  const [displayIcons, setDisplayIcons] = useState(false);

  const inAnim = (): void => {
    setAnimationOn(true);
  };

  const outAnim = (): void => {
    setAnimationOn(false);
  };

  return (
    <div
      className='nav-item contact p-3.5 text-turquoise flex justify-between items-center text-center h-14 min-w-[105px]'
      onMouseEnter={inAnim}
      onMouseLeave={outAnim}
    >
      {CONTACT_ICONS.map(({ icon, id, href, color }, i) => (
        <div
          id={id}
          key={id}
          style={{ display: displayIcons ? 'inline-block' : 'none' }}
          className={`rsIcon cursor-pointer animate__animated ${
            i > 0 && 'animate__delay-1s'
          } ${animationOn ? 'animate__fadeInDown' : 'animate__fadeOutRight'}`}
          onAnimationEnd={
            i === CONTACT_ICONS.length - 1
              ? () => {
                  if (!animationOn) setDisplayIcons(false);
                }
              : undefined
          }
        >
          <a href={href} target='_blank' rel='noreferrer'>
            <FontAwesomeIcon
              icon={icon}
              className={`fa-2x`}
              style={{
                color,
              }}
            />
          </a>
        </div>
      ))}
      <div
        id='contactText'
        style={{ display: !displayIcons ? 'inline-block' : 'none' }}
        className={`font-medium flex flex-column justify-center px-5 cursor-default animate__animated ${
          animationOn ? 'animate__fadeOutDown' : 'animate__fadeInDown'
        }`}
        onAnimationEnd={() => {
          if (animationOn) setDisplayIcons(true);
        }}
      >
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ContactBox;
