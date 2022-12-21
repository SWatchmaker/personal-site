import {
  faNodeJs,
  faHtml5,
  faReact,
  faCss3Alt,
} from '@fortawesome/free-brands-svg-icons';

export interface IconPosition {
  top: number;
  left: number;
  rotation: number;
  speed: number;
}

export const iconElements = [
  {
    icon: faNodeJs,
    rotationMultiplier: 1,
    delays: [0, 0.3],
  },
  {
    icon: faHtml5,
    rotationMultiplier: 2,
    delays: [0.1, 0.9],
  },
  {
    icon: faReact,
    rotationMultiplier: 3,
    delays: [0.2, 1.5],
  },
  {
    icon: faCss3Alt,
    rotationMultiplier: 4,
    delays: [0.3, 2.1],
  },
];

export const createPos = (
  oldpos: IconPosition,
  containerRef: React.MutableRefObject<HTMLDivElement | null>
): IconPosition => {
  let pos: Partial<IconPosition> = {};
  const moves = [
    { top: 0, left: Math.random() * 100 },
    { top: 100, left: Math.random() * 100 },
    { left: 0, top: Math.random() * 100 },
    { left: 100, top: Math.random() * 100 },
  ];

  if (
    oldpos.top !== 0 &&
    oldpos.left !== 0 &&
    oldpos.top !== 100 &&
    oldpos.left !== 100
  ) {
    const ran = Math.floor(Math.random() * 4);
    pos = moves[ran];
    pos.rotation = oldpos.rotation;
  } else {
    const ran = Math.floor(Math.random() * 3);
    if (oldpos.top === 0) {
      moves.shift();
    } else if (oldpos.top === 100) {
      moves.splice(1, 1);
    } else if (oldpos.left === 0) {
      moves.splice(2, 1);
    } else if (oldpos.left === 100) {
      moves.pop();
    }
    pos = moves[ran];
    pos.rotation = Math.random() * 360;
  }

  if (containerRef.current == null) return oldpos;
  const contHeight = containerRef.current.offsetHeight;
  const contWidth = containerRef.current.offsetWidth;

  const movement = Math.sqrt(
    (Math.abs(oldpos.left - (pos.left ?? 0)) * (contWidth / 100)) ** 2 +
      (Math.abs(oldpos.top - (pos.top ?? 0)) * (contHeight / 100)) ** 2
  );
  const speed = movement / 300;
  pos.speed = speed;

  return pos as IconPosition;
};
