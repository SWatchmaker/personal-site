import React from 'react';

export interface ITitleLetter {
  letter: string;
  rotation: number;
}

export interface IProfilePictureProps {
  letters: ITitleLetter[];
  radius: number;
  show: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
}

const ProfilePicture = ({
  letters,
  radius,
  show,
  imageRef,
}: IProfilePictureProps): React.ReactElement => {
  return (
    <div
      className={`relative animate__animated ${
        show ? 'animate__fadeIn' : 'animate__fadeOutUp'
      }`}
    >
      <img
        className='animate__animated animate__fadeIn animate__delay-1s mx-auto rounded-full md:w-1/3 w-2/3'
        src='/images/78ec3e1d-d68f-455b-a9d0-bfdbadc14aa8.jpg'
        alt='Developer Profile Picture'
        ref={imageRef}
      />
      <div className='absolute text-white text-2xl md:text-3xl left-1/2 -top-9'>
        {letters.map((letter, i) => {
          const rotation = `rotate(${letter.rotation}deg)`;
          return (
            <p
              key={i}
              className='animate__animated animate__fadeIn animate__delay-1s curvedLetter absolute font-bebas text-turquoise'
              style={{
                height: radius,
                transform: rotation,
                transformOrigin: '0 100%',
                ['--animate-delay' as any]: `${i * 0.05}s`,
              }}
            >
              {letter.letter}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePicture;
