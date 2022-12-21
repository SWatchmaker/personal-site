import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faGit,
  faLinkedin,
  faInstagram,
  faFacebook,
  faTwitter,
  faSteam,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

interface IFooterElement {
  icon: IconDefinition;
  href: string;
  animDelay: number;
  color: string;
  text: string;
}
interface ILeftElementsNames {
  linkedin: string;
  github: string;
  mail: string;
  whatsapp: string;
}

interface IRightElementsNames {
  instagram: string;
  facebook: string;
  twitter: string;
  steam: string;
}

interface IElementsNames extends ILeftElementsNames, IRightElementsNames {}

const elementsFactory = ({
  linkedin,
  github,
  mail,
  whatsapp,
  instagram,
  facebook,
  twitter,
  steam,
}: IElementsNames): {
  LEFT_ELEMENTS: IFooterElement[];
  RIGHT_ELEMENTS: IFooterElement[];
} => ({
  LEFT_ELEMENTS: [
    {
      icon: faLinkedin,
      href: 'https://www.linkedin.com/in/sebaweidmann',
      animDelay: 0.4,
      color: '#0077b5',
      text: linkedin,
    },
    {
      icon: faGit,
      href: 'https://github.com/SWatchmaker',
      animDelay: 0.8,
      color: '#6e5494',
      text: github,
    },
    {
      icon: faEnvelopeSquare,
      href: 'mailto:sebastian.weidmann.l@gmail.com',
      animDelay: 1.2,
      color: '#ea4335',
      text: mail,
    },
    {
      icon: faWhatsapp,
      href: 'https://wa.link/io5hce',
      animDelay: 1.6,
      color: '#25d366',
      text: whatsapp,
    },
  ],
  RIGHT_ELEMENTS: [
    {
      icon: faInstagram,
      href: 'https://www.instagram.com/xoclomaster',
      animDelay: 0.4,
      color: '#c13584',
      text: instagram,
    },
    {
      icon: faFacebook,
      href: 'https://www.facebook.com/SW.Watchmaker',
      animDelay: 0.8,
      color: '#3b5998',
      text: facebook,
    },
    {
      icon: faTwitter,
      href: 'https://twitter.com/sawlrock',
      animDelay: 1.2,
      color: '#1da1f2',
      text: twitter,
    },
    {
      icon: faSteam,
      href: 'https://steamcommunity.com/id/SWatchmaker/',
      animDelay: 1.6,
      color: '#00adee',
      text: steam,
    },
  ],
});

export default elementsFactory;
