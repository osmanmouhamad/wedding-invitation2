import {
  useEffect,
  useRef,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import petal1 from "../assets/envelope/rose-petal-1.webp";
import petal2 from "../assets/envelope/rose-petal-2.webp";
import petal3 from "../assets/envelope/rose-petal-3.webp";

const petalImages = [
  petal1,
  petal2,
  petal3,
];

const PETAL_COUNT = 18;

function seededValue(index, salt) {
  const value =
    Math.sin(
      index * 12.9898 +
        salt * 78.233,
    ) * 43758.5453;

  return value - Math.floor(value);
}

const petals = Array.from(
  { length: PETAL_COUNT },
  (_, index) => {
    const angle =
      (index / PETAL_COUNT) * Math.PI * 2 +
      seededValue(index, 1) * 0.5;

    const middleDistance =
      18 +
      seededValue(index, 2) * 18;

    const endDistanceX =
      76 +
      seededValue(index, 3) * 44;

    const endDistanceY =
      70 +
      seededValue(index, 4) * 40;

    return {
      id: index,

      image:
        petalImages[
          index % petalImages.length
        ],

      size:
        30 +
        seededValue(index, 5) * 34,

      startX:
        (seededValue(index, 6) - 0.5) *
        10,

      startY:
        (seededValue(index, 7) - 0.5) *
        8,

      middleX:
        Math.cos(angle) *
        middleDistance,

      middleY:
        Math.sin(angle) *
        middleDistance,

      endX:
        Math.cos(angle) *
        endDistanceX,

      endY:
        Math.sin(angle) *
        endDistanceY,

      rotation:
        seededValue(index, 8) * 360,

      delay:
        (index % 6) * 0.045 +
        Math.floor(index / 6) * 0.025,

      duration:
        1.65 +
        seededValue(index, 9) * 0.4,
    };
  },
);

export default function PetalTransition({
  onCover,
  onComplete,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const callbacksRef = useRef({
    onCover,
    onComplete,
  });

  const hasCoveredRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    callbacksRef.current = {
      onCover,
      onComplete,
    };
  }, [onCover, onComplete]);

  useEffect(() => {
    const coverDelay =
      shouldReduceMotion ? 160 : 920;

    const completeDelay =
      shouldReduceMotion ? 450 : 2150;

    const coverTimer =
      window.setTimeout(() => {
        if (hasCoveredRef.current) return;

        hasCoveredRef.current = true;
        callbacksRef.current.onCover?.();
      }, coverDelay);

    const completeTimer =
      window.setTimeout(() => {
        if (hasCompletedRef.current) return;

        hasCompletedRef.current = true;
        callbacksRef.current.onComplete?.();
      }, completeDelay);

    return () => {
      window.clearTimeout(coverTimer);
      window.clearTimeout(completeTimer);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none fixed inset-0
          z-[100] bg-[#f7ede5]
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.45,
          times: [0, 0.35, 0.62, 1],
          ease: "easeInOut",
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="
        pointer-events-none fixed inset-0
        z-[100] overflow-hidden
      "
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.18,
      }}
    >
      {/* Screen cover */}
      <motion.div
        className="
          absolute inset-0
          bg-[#f7ede5]
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [
            0,
            0.1,
            0.97,
            0.97,
            0,
          ],
        }}
        transition={{
          duration: 2.1,
          times: [
            0,
            0.2,
            0.45,
            0.67,
            1,
          ],
          ease: "easeInOut",
        }}
      />

      {petals.map((petal, index) => (
        <motion.img
          key={petal.id}
          src={petal.image}
          alt=""
          draggable="false"
          decoding="async"
          className="
            absolute left-1/2 top-[48%]
            select-none object-contain
            will-change-transform
          "
          style={{
            width: petal.size,
            height: "auto",
            translate: "-50% -50%",
          }}
          initial={{
            x: `${petal.startX}vw`,
            y: `${petal.startY}vh`,
            rotate: petal.rotation,

            rotateX:
              index % 2 === 0
                ? 15
                : -13,

            rotateY:
              index % 3 === 0
                ? -17
                : 14,

            scale: 0.15,
            opacity: 0,
          }}
          animate={{
            x: [
              `${petal.startX}vw`,
              `${petal.middleX}vw`,
              `${petal.endX * 0.78}vw`,
              `${petal.endX}vw`,
            ],

            y: [
              `${petal.startY}vh`,
              `${petal.middleY}vh`,
              `${petal.endY * 0.78}vh`,
              `${petal.endY}vh`,
            ],

            rotate: [
              petal.rotation,
              petal.rotation + 120,
              petal.rotation + 230,
              petal.rotation + 350,
            ],

            rotateX: [
              15,
              -12,
              17,
              -13,
            ],

            rotateY: [
              -17,
              16,
              -14,
              13,
            ],

            scale: [
              0.15,
              1.08,
              0.94,
              0.64,
            ],

            opacity: [
              0,
              1,
              1,
              0,
            ],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            times: [0, 0.35, 0.76, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </motion.div>
  );
}