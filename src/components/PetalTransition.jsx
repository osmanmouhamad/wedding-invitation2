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

const images = [petal1, petal2, petal3];

function seededValue(index, salt) {
  const value =
    Math.sin(index * 12.9898 + salt * 78.233) *
    43758.5453;

  return value - Math.floor(value);
}

const petals = Array.from(
  { length: 22 },
  (_, index) => {
    const angle =
      (index / 22) * Math.PI * 2 +
      seededValue(index, 1) * 0.45;

    const middleDistance =
      16 + seededValue(index, 2) * 20;

    const endDistanceX =
      78 + seededValue(index, 3) * 46;

    const endDistanceY =
      72 + seededValue(index, 4) * 42;

    return {
      id: index,

      image:
        images[index % images.length],

      size:
        30 + seededValue(index, 5) * 38,

      startX:
        (seededValue(index, 6) - 0.5) * 8,

      startY:
        (seededValue(index, 7) - 0.5) * 6,

      middleX:
        Math.cos(angle) * middleDistance,

      middleY:
        Math.sin(angle) * middleDistance,

      endX:
        Math.cos(angle) * endDistanceX,

      endY:
        Math.sin(angle) * endDistanceY,

      rotation:
        seededValue(index, 8) * 360,

      delay:
        (index % 7) * 0.04,

      duration:
        1.7 + seededValue(index, 9) * 0.45,
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

  useEffect(() => {
    callbacksRef.current = {
      onCover,
      onComplete,
    };
  }, [onCover, onComplete]);

  useEffect(() => {
    const coverDelay =
      shouldReduceMotion ? 170 : 1050;

    const completeDelay =
      shouldReduceMotion ? 470 : 2350;

    const coverTimer = window.setTimeout(() => {
      callbacksRef.current.onCover?.();
    }, coverDelay);

    const completeTimer =
      window.setTimeout(() => {
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
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.48,
          times: [0, 0.35, 0.62, 1],
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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="
          absolute inset-0
          bg-[#f7ede5]
        "
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.08, 0.98, 0.98, 0],
        }}
        transition={{
          duration: 2.25,
          times: [0, 0.24, 0.48, 0.68, 1],
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
            absolute left-1/2 top-[47%]
            select-none object-contain
            will-change-transform
          "
          style={{
            width: petal.size,
            translate: "-50% -50%",
          }}
          initial={{
            x: `${petal.startX}vw`,
            y: `${petal.startY}vh`,
            rotate: petal.rotation,
            scale: 0.12,
            opacity: 0,
          }}
          animate={{
            x: [
              `${petal.startX}vw`,
              `${petal.middleX}vw`,
              `${petal.endX}vw`,
            ],

            y: [
              `${petal.startY}vh`,
              `${petal.middleY}vh`,
              `${petal.endY}vh`,
            ],

            rotate: [
              petal.rotation,
              petal.rotation + 150,
              petal.rotation + 330,
            ],

            rotateX: [
              index % 2 === 0 ? 16 : -14,
              index % 2 === 0 ? -14 : 18,
              index % 2 === 0 ? 12 : -16,
            ],

            rotateY: [
              index % 3 === 0 ? -18 : 15,
              index % 3 === 0 ? 16 : -18,
              index % 3 === 0 ? -12 : 15,
            ],

            scale: [0.12, 1.08, 0.68],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            times: [0, 0.36, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </motion.div>
  );
}