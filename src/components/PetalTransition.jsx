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

function seededValue(index, salt) {
  const value =
    Math.sin(
      index * 12.9898 +
        salt * 78.233,
    ) * 43758.5453;

  return value - Math.floor(value);
}

/*
  المرحلة الأولى:
  خمس بتلات تخرج من مكان الختم
  بعد أن يبدأ غطاء الظرف بالفتح.
*/
const openingPetals = Array.from(
  { length: 5 },
  (_, index) => {
    const direction = index - 2;

    return {
      id: `opening-${index}`,

      image:
        petalImages[
          index % petalImages.length
        ],

      size:
        34 +
        seededValue(index, 1) * 18,

      startX:
        direction * 1.1,

      startY:
        3 +
        seededValue(index, 2) * 2,

      firstX:
        direction * 3.5,

      firstY:
        -7 -
        seededValue(index, 3) * 5,

      middleX:
        direction * 7 +
        (seededValue(index, 4) - 0.5) *
          5,

      middleY:
        -20 -
        seededValue(index, 5) * 8,

      endX:
        direction * 22 +
        (seededValue(index, 6) - 0.5) *
          18,

      endY:
        -52 -
        seededValue(index, 7) * 26,

      rotation:
        seededValue(index, 8) * 240,

      delay:
        0.48 + index * 0.1,

      duration:
        2.7 +
        seededValue(index, 9) * 0.35,
    };
  },
);

/*
  المرحلة الثانية:
  بعد البتلات الأولى تظهر مجموعة كبيرة
  وتنتشر لتغطي الشاشة.
*/
const burstPetals = Array.from(
  { length: 23 },
  (_, index) => {
    const angle =
      (index / 23) * Math.PI * 2 +
      seededValue(index, 10) * 0.45;

    const middleDistance =
      18 +
      seededValue(index, 11) * 18;

    const endDistanceX =
      78 +
      seededValue(index, 12) * 48;

    const endDistanceY =
      72 +
      seededValue(index, 13) * 42;

    return {
      id: `burst-${index}`,

      image:
        petalImages[
          index % petalImages.length
        ],

      size:
        30 +
        seededValue(index, 14) * 38,

      startX:
        (seededValue(index, 15) - 0.5) *
        7,

      startY:
        1 +
        (seededValue(index, 16) - 0.5) *
          7,

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
        seededValue(index, 17) * 360,

      delay:
        1.08 +
        (index % 7) * 0.045 +
        Math.floor(index / 7) * 0.035,

      duration:
        2.25 +
        seededValue(index, 18) * 0.55,
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
      shouldReduceMotion
        ? 180
        : 2050;

    const completeDelay =
      shouldReduceMotion
        ? 500
        : 3950;

    const coverTimer =
      window.setTimeout(() => {
        if (hasCoveredRef.current) {
          return;
        }

        hasCoveredRef.current = true;
        callbacksRef.current.onCover?.();
      }, coverDelay);

    const completeTimer =
      window.setTimeout(() => {
        if (hasCompletedRef.current) {
          return;
        }

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
          z-[100] bg-[#f8eee8]
        "
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          times: [0, 0.35, 0.6, 1],
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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      {/* Cover layer */}
      <motion.div
        className="
          absolute inset-0
          bg-[#f8eee8]
        "
        initial={{ opacity: 0 }}
        animate={{
          opacity: [
            0,
            0,
            0.08,
            0.98,
            0.98,
            0,
          ],
        }}
        transition={{
          duration: 3.8,
          times: [
            0,
            0.2,
            0.33,
            0.49,
            0.7,
            1,
          ],
          ease: "easeInOut",
        }}
      />

      {/* First petals */}
      {openingPetals.map(
        (petal, index) => (
          <motion.img
            key={petal.id}
            src={petal.image}
            alt=""
            draggable="false"
            decoding="async"
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
                index % 2 === 0
                  ? 18
                  : -16,

              rotateY:
                index % 2 === 0
                  ? -18
                  : 16,

              scale: 0.15,
              opacity: 0,
            }}
            animate={{
              x: [
                `${petal.startX}vw`,
                `${petal.firstX}vw`,
                `${petal.middleX}vw`,
                `${petal.endX}vw`,
              ],

              y: [
                `${petal.startY}vh`,
                `${petal.firstY}vh`,
                `${petal.middleY}vh`,
                `${petal.endY}vh`,
              ],

              rotate: [
                petal.rotation,
                petal.rotation + 65,
                petal.rotation + 170,
                petal.rotation + 300,
              ],

              rotateX: [
                18,
                -12,
                16,
                -10,
              ],

              rotateY: [
                -18,
                14,
                -16,
                12,
              ],

              scale: [
                0.15,
                0.85,
                1,
                0.68,
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
              times: [0, 0.25, 0.62, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ),
      )}

      {/* Petal burst */}
      {burstPetals.map(
        (petal, index) => (
          <motion.img
            key={petal.id}
            src={petal.image}
            alt=""
            draggable="false"
            decoding="async"
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
                index % 2 === 0
                  ? 16
                  : -14,

              rotateY:
                index % 3 === 0
                  ? 18
                  : -15,

              scale: 0.12,
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
                petal.rotation + 100,
                petal.rotation + 220,
                petal.rotation + 340,
              ],

              rotateX: [
                16,
                -12,
                18,
                -14,
              ],

              rotateY: [
                -15,
                18,
                -14,
                16,
              ],

              scale: [
                0.12,
                1.1,
                0.96,
                0.65,
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
              times: [0, 0.34, 0.76, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ),
      )}
    </motion.div>
  );
}