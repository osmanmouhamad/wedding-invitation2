import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import petal1 from "../assets/envelope/rose-petal-1.webp";
import petal2 from "../assets/envelope/rose-petal-2.webp";
import petal3 from "../assets/envelope/rose-petal-3.webp";

const petalImages = [petal1, petal2, petal3];

const PETAL_COUNT = 24;

function seededValue(index, salt) {
  const value =
    Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;

  return value - Math.floor(value);
}

const petals = Array.from(
  { length: PETAL_COUNT },
  (_, index) => {
    const angle =
      (index / PETAL_COUNT) * Math.PI * 2 +
      seededValue(index, 1) * 0.42;

    const distanceX =
      74 + seededValue(index, 2) * 42;

    const distanceY =
      68 + seededValue(index, 3) * 38;

    const endX = Math.cos(angle) * distanceX;
    const endY = Math.sin(angle) * distanceY;

    return {
      id: index,
      image: petalImages[index % petalImages.length],

      startX:
        (seededValue(index, 4) - 0.5) * 8,

      startY:
        (seededValue(index, 5) - 0.5) * 8,

      middleX:
        endX *
        (0.24 + seededValue(index, 6) * 0.12),

      middleY:
        endY *
        (0.24 + seededValue(index, 7) * 0.12),

      endX,
      endY,

      size:
        32 + seededValue(index, 8) * 36,

      rotation:
        seededValue(index, 9) * 360,

      delay:
        (index % 8) * 0.055 +
        Math.floor(index / 8) * 0.035,

      duration:
        2.55 + seededValue(index, 10) * 0.55,
    };
  },
);

export default function PetalTransition({
  onCover,
  onComplete,
}) {
  const shouldReduceMotion = useReducedMotion();

  const callbackRef = useRef({
    onCover,
    onComplete,
  });

  const hasCoveredRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    callbackRef.current = {
      onCover,
      onComplete,
    };
  }, [onCover, onComplete]);

  useEffect(() => {
    const coverDelay = shouldReduceMotion
      ? 180
      : 1450;

    const completeDelay = shouldReduceMotion
      ? 480
      : 3350;

    const coverTimer = window.setTimeout(() => {
      if (hasCoveredRef.current) return;

      hasCoveredRef.current = true;
      callbackRef.current.onCover?.();
    }, coverDelay);

    const completeTimer = window.setTimeout(() => {
      if (hasCompletedRef.current) return;

      hasCompletedRef.current = true;
      callbackRef.current.onComplete?.();
    }, completeDelay);

    return () => {
      window.clearTimeout(coverTimer);
      window.clearTimeout(completeTimer);
    };
  }, [shouldReduceMotion]);

  const visiblePetals = shouldReduceMotion
    ? petals.slice(0, 4)
    : petals;

  return (
    <motion.div
      aria-hidden="true"
      className="
        fixed inset-0 z-[100]
        overflow-hidden bg-transparent
      "
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* طبقة تغطي الشاشة وقت تبديل الصفحة */}
      <motion.div
        className="absolute inset-0 bg-[#f8eee8]"
        initial={{ opacity: 0 }}
        animate={
          shouldReduceMotion
            ? {
                opacity: [0, 1, 1, 0],
              }
            : {
                opacity: [0, 0.08, 0.98, 0.98, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? {
                duration: 0.48,
                times: [0, 0.35, 0.58, 1],
                ease: "easeInOut",
              }
            : {
                duration: 3.3,
                times: [0, 0.2, 0.44, 0.62, 1],
                ease: "easeInOut",
              }
        }
      />

      {visiblePetals.map((petal, index) => (
        <motion.img
          key={petal.id}
          src={petal.image}
          alt=""
          draggable="false"
          className="
            absolute left-1/2 top-1/2
            select-none object-contain
            will-change-transform
          "
          style={{
            width: `${petal.size}px`,
            height: "auto",
            translate: "-50% -50%",
          }}
          initial={{
            x: `${petal.startX}vw`,
            y: `${petal.startY}vh`,
            rotate: petal.rotation,
            rotateX:
              index % 2 === 0 ? 14 : -12,
            rotateY:
              index % 3 === 0 ? 18 : -15,
            scale: 0.2,
            opacity: 0,
          }}
          animate={
            shouldReduceMotion
              ? {
                  opacity: [0, 0.85, 0],
                  scale: [0.8, 1, 0.9],
                }
              : {
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
                    petal.rotation + 110,
                    petal.rotation + 220,
                    petal.rotation + 320,
                  ],

                  rotateX: [
                    14,
                    -10,
                    16,
                    -12,
                  ],

                  rotateY: [
                    -15,
                    18,
                    -12,
                    14,
                  ],

                  scale: [
                    0.2,
                    1.08,
                    0.95,
                    0.72,
                  ],

                  opacity: [
                    0,
                    1,
                    1,
                    0,
                  ],
                }
          }
          transition={
            shouldReduceMotion
              ? {
                  duration: 0.42,
                  delay: index * 0.025,
                  ease: "easeOut",
                }
              : {
                  duration: petal.duration,
                  delay: petal.delay,
                  times: [0, 0.38, 0.78, 1],
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        />
      ))}
    </motion.div>
  );
}