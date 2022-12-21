import { useNavigate } from '@tanstack/react-location';
import React, { useEffect, useState, useContext, useRef } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePicture, {
  ITitleLetter,
} from '../../components/ProfilePicture/ProfilePicture';
import './homePage.scss';
import PuzzleHead from '../../assets/icons/PuzzleHead';
import Workbench from '../../assets/icons/Workbench';
import { TranslationContext } from '../../contexts/TranslationContext';

const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();
  const {
    translation: { home },
  } = useContext(TranslationContext);

  const profileImg = useRef<HTMLImageElement>(null);
  const motivationBox = useRef<HTMLDivElement>(null);
  const lookingForBox = useRef<HTMLDivElement>(null);

  const [postInitialAnim, setPostInitialAnim] = useState(false);
  const { scrollY, maxScrollY, postWelcome, calculateMaxScrollY } =
    useContext(GlobalContext);

  const [titleLetters, setTittleLetters] = useState<ITitleLetter[]>([]);
  const [titleRadius, setTitleRadius] = useState(0);

  const [sectionsYPosition, setSectionsYPosition] = useState({
    motivations: 2000,
    lookingFor: 2000,
  });
  const [animatedBgPosition, setAnimatedBgPosition] = useState({
    top: 0,
    height: 0,
  });

  const [elementWithBg, setElementWithBg] = useState(motivationBox.current);

  const afterImageAppear = (): void => {
    if (!profileImg.current) return;
    const height = profileImg.current.offsetHeight;
    createCircularText('Software Developer', height / 2 + 30);
    if (elementWithBg) stickBackgroundToElement(elementWithBg);
  };

  const onWindowResize = (): void => {
    if (!profileImg.current) return;
    if (profileImg.current.offsetHeight / 2 + 30 !== titleRadius) {
      setTitleRadius(profileImg.current.offsetHeight / 2 + 30);
    }

    if (elementWithBg) stickBackgroundToElement(elementWithBg);
  };

  useEffect(() => {
    if (!postWelcome) navigate({ to: '/welcome', replace: true });

    if (profileImg.current) {
      profileImg.current.addEventListener('animationend', afterImageAppear);
      window.addEventListener('resize', onWindowResize);
    }

    return () => {
      profileImg.current?.removeEventListener('animationend', afterImageAppear);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  useEffect(() => {
    onScrollChange();
    if (calculateMaxScrollY) calculateMaxScrollY();
  }, [scrollY]);

  const onScrollChange = (): void => {
    if (!motivationBox.current || !lookingForBox.current) return;
    if (
      scrollY <= sectionsYPosition.lookingFor &&
      elementWithBg !== motivationBox.current
    ) {
      stickBackgroundToElement(motivationBox.current);
      setElementWithBg(motivationBox.current);
    } else if (
      scrollY > sectionsYPosition.lookingFor &&
      elementWithBg !== lookingForBox.current
    ) {
      stickBackgroundToElement(lookingForBox.current);
      setElementWithBg(lookingForBox.current);
    }
  };

  const stickBackgroundToElement = (element: HTMLDivElement): void => {
    const windowWidth = window.innerWidth;
    const topCorrection = windowWidth > 768 ? 150 : 80;
    const bgTop = element.offsetTop - topCorrection;

    if (Math.abs(bgTop - animatedBgPosition.top) >= 20) {
      const heightCorrection = windowWidth > 768 ? 300 : 150;
      const bgHeight = element.offsetHeight + heightCorrection;
      setAnimatedBgPosition({ top: bgTop, height: bgHeight });
    }

    scrollAdjust();
  };

  const scrollAdjust = (): void => {
    if (!motivationBox.current || !lookingForBox.current) return;
    const motivScroll = motivationBox.current.offsetTop - 600;
    const lookingScroll = lookingForBox.current.offsetTop - 600;
    setSectionsYPosition({
      motivations: motivScroll,
      lookingFor: lookingScroll,
    });
  };

  const createCircularText = (txt: string, radius: number): void => {
    const lettersArr: ITitleLetter[] = [];
    const txtArray = txt.split('');

    const deg = 125 / txt.length;
    let origin = 300;

    txtArray.forEach((ea) => {
      lettersArr.push({
        letter: ea,
        rotation: origin,
      });
      origin += deg;
    });
    setTitleRadius(radius);
    setTittleLetters(lettersArr);
  };

  return (
    <div>
      <div
        className='max-w-screen-lg min-h-screen mx-auto my-0 py-0 px-6 '
        id='homePage'
      >
        <div
          className={`w-screen overflow-hidden ${
            !postInitialAnim && 'opacity-0'
          }`}
        >
          <div
            className={`bgAnim1 content-[''] absolute left-0 opacity-0 transition-all duration-500 overflow-hidden ${
              scrollY > sectionsYPosition.motivations ? 'bgAnimIn' : 'bgAnimOut'
            } ${
              scrollY > sectionsYPosition.lookingFor
                ? 'bgAnim1-1 right-0'
                : 'bg-eva-purple/10 right-0'
            }`}
            style={{
              top: animatedBgPosition.top,
              height: animatedBgPosition.height,
            }}
          ></div>
          <div
            className={`bgAnim2 content-[''] absolute right-0 opacity-0 transition-all duration-500 overflow-hidden ${
              scrollY > sectionsYPosition.motivations ? 'bgAnimIn' : 'bgAnimOut'
            } ${
              scrollY > sectionsYPosition.lookingFor
                ? 'bgAnim2-1 left-0'
                : 'bg-eva-purple/10 left-0'
            }`}
            style={{
              top: animatedBgPosition.top,
              height: animatedBgPosition.height,
            }}
          ></div>
        </div>
        <div className='pt-40 text-center'>
          <div className='mb-16'>
            <ProfilePicture
              letters={titleLetters}
              radius={titleRadius}
              imageRef={profileImg}
              show={scrollY <= sectionsYPosition.motivations}
            />
          </div>

          {titleLetters.length > 0 && (
            <div>
              <div id='presentationBox'>
                <div
                  className={`mb-60 lg:mb-72 text-center flex items-center flex-col overflow-hidden animate__animated ${
                    scrollY <= sectionsYPosition.motivations
                      ? 'animate__fadeIn'
                      : 'animate__fadeOut'
                  }`}
                  id='resumeText'
                >
                  <p
                    className={`m-auto text-2xl lg:text-3xl font-code font-semibold max-w-[90%] md:max-w-[75%] lg:max-w-[65%] animate__animated ${
                      scrollY <= sectionsYPosition.motivations
                        ? 'animate__fadeInLeft'
                        : 'animate__fadeOutUp'
                    }`}
                    onAnimationEnd={() => setPostInitialAnim(true)}
                  >
                    {home.presentation.main.text1}{' '}
                    <span className='text-turquoise'>
                      {home.presentation.main.highlight1}
                    </span>
                    {home.presentation.main.text2}
                  </p>
                  <p
                    className={`m-auto text-md lg:text-lg font-code font-semibold max-w-[80%] md:max-w-[60%] lg:max-w-[50%] animate__animated ${
                      scrollY <= sectionsYPosition.motivations
                        ? 'animate__fadeInRight'
                        : 'animate__fadeOutUp'
                    }`}
                  >
                    {home.presentation.sub.text1}{' '}
                    <span className='text-turquoise'>
                      {home.presentation.sub.highlight1}
                    </span>{' '}
                    {home.presentation.sub.text2}
                  </p>
                </div>
              </div>
              <div
                className={`relative ${!postInitialAnim && 'opacity-0'}`}
                id='motivations'
                ref={motivationBox}
              >
                <div
                  className={`mb-72 mb-72 text-left flex items-start flex-col overflow-hidden animate__animated ${
                    scrollY > sectionsYPosition.motivations &&
                    scrollY <= sectionsYPosition.lookingFor
                      ? 'animate__fadeIn'
                      : 'animate__fadeOut'
                  }`}
                >
                  <span
                    className={`with-underline pb-2 uppercase relative mb-4 font-semibold after:bg-turquoise`}
                  >
                    {home.motivations.title}
                  </span>
                  <p
                    className={`text-2xl lg:text-3xl font-code font-semibold max-w-[70%] animate__animated ${
                      scrollY > sectionsYPosition.motivations &&
                      scrollY <= sectionsYPosition.lookingFor
                        ? 'animate__fadeInLeft'
                        : 'animate__fadeOutRight'
                    }`}
                  >
                    {home.motivations.main.text1}
                    <span className='text-turquoise'>
                      {' '}
                      {home.motivations.main.highlight1}
                    </span>{' '}
                    {home.motivations.main.text2}{' '}
                    <span className='text-turquoise'>
                      {home.motivations.main.highlight2}
                    </span>{' '}
                    {home.motivations.main.text3}
                  </p>
                  <p
                    className={`text-md lg:text-lg font-code font-semibold max-w-[50%] animate__animated ${
                      scrollY > sectionsYPosition.motivations &&
                      scrollY <= sectionsYPosition.lookingFor
                        ? 'animate__fadeInRight'
                        : 'animate__fadeOutLeft'
                    }`}
                  >
                    {home.motivations.sub.text1}{' '}
                    <span className='text-turquoise'>
                      {home.motivations.sub.highlight1}
                    </span>
                    {home.motivations.sub.text2}
                  </p>
                </div>
                <div
                  className={`absolute bottom-2 right-0 animate__animated ${
                    scrollY > sectionsYPosition.motivations &&
                    scrollY <= sectionsYPosition.lookingFor
                      ? 'animate__fadeIn animate__slower'
                      : 'animate__fadeOut'
                  }`}
                >
                  <Workbench className='h-24 w-24 md:h-40 md:w-40 fill-turquoise' />
                </div>
              </div>
              <div
                className={`relative ${!postInitialAnim && 'opacity-0'}`}
                id='lookingFor'
                ref={lookingForBox}
              >
                <div
                  className={`mb-72 mb-72 text-right flex items-end flex-col overflow-hidden  animate__animated ${
                    scrollY > sectionsYPosition.lookingFor
                      ? 'animate__fadeIn'
                      : 'animate__fadeOut'
                  }`}
                >
                  <span
                    className={`with-underline pb-2 uppercase relative mb-4 font-semibold after:bg-eva-purple-light`}
                  >
                    {home.lookingFor.title}
                  </span>
                  <p
                    className={`text-2xl lg:text-3xl font-code font-semibold max-w-[70%] animate__animated ${
                      scrollY > sectionsYPosition.lookingFor
                        ? 'animate__fadeInRight'
                        : 'animate__fadeOutLeft'
                    }`}
                  >
                    {home.lookingFor.main.text1}
                    <span className='text-eva-purple-light'>
                      {' '}
                      {home.lookingFor.main.highlight1}
                    </span>{' '}
                    {home.lookingFor.main.text2}
                  </p>
                  <p
                    className={`text-md lg:text-lg font-code font-semibold max-w-[50%] animate__animated ${
                      scrollY > sectionsYPosition.lookingFor
                        ? 'animate__fadeInLeft'
                        : 'animate__fadeOutRight'
                    }`}
                  >
                    {home.lookingFor.sub.text1}{' '}
                    <span className='text-eva-purple-light'>
                      {' '}
                      {home.lookingFor.sub.highlight1}
                    </span>{' '}
                    y
                    <span className='text-eva-purple-light'>
                      {' '}
                      {home.lookingFor.sub.highlight2}
                    </span>{' '}
                    {home.lookingFor.sub.text3}
                  </p>
                </div>
                <div
                  className={`absolute bottom-2 left-0 animate__animated ${
                    scrollY > sectionsYPosition.lookingFor
                      ? 'animate__fadeIn animate__slower'
                      : 'animate__fadeOut'
                  }`}
                >
                  <PuzzleHead className='h-24 w-24 md:h-40 md:w-40 text-eva-purple' />
                </div>
              </div>
            </div>
          )}

          {maxScrollY - scrollY > 20 && (
            <div className='home__downArrow'>
              <FontAwesomeIcon
                className='-ml-[7px] fixed bottom-1 left-1/2 text-turquoise z-50'
                icon={faChevronDown}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
