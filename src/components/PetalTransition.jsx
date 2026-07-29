import { motion } from "motion/react";

import petal1 from "../assets/envelope/rose-petal-1.webp";
import petal2 from "../assets/envelope/rose-petal-2.webp";
import petal3 from "../assets/envelope/rose-petal-3.webp";

const petalImages = [petal1, petal2, petal3];

const petals = Array.from({ length: 28 }, (_, index) => {
  const angle = (index / 28) * Math.PI * 2;
  const distance = 65 + (index % 4) * 10;

  return {
    id: index,
    image: petalImages[index % petalImages.length],

    startX: Math.cos(angle) * distance,
    startY: Math.sin(angle) * distance,

    centerX: ((index % 7) - 3) * 10,
    centerY: ((index % 6) - 2.5) * 11,

    endX: Math.cos(angle + 0.7) * (88 + (index % 3) * 10),
    endY: Math.sin(angle + 0.7) * (84 + (index % 4) * 9),

    size: 34 + (index % 5) * 9,
    rotation: (index * 47) % 360,
    delay: (index % 9) * 0.1,
  };
});

export default function PetalTransition({ onCover, onComplete }) {
  return (
    <motion.div
      className="
        pointer-events-none fixed inset-0 z-[100]
        overflow-hidden
      "
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* طبقة التغطية */}
      <motion.div
        className="absolute inset-0 bg-[#f8eee8]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0.96, 0.96, 0],
        }}
        transition={{
          duration: 5.2,
          times: [0, 0.25, 0.48, 0.72, 1],
          ease: "easeInOut",
        }}
      />

      {petals.map((petal, index) => (
        <motion.img
          key={petal.id}
          src={petal.image}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="
            absolute left-1/2 top-1/2
            select-none object-contain
            will-change-transform
          "
          style={{
            width: `${petal.size}px`,
            height: "auto",
          }}
          initial={{
            x: `${petal.startX}vw`,
            y: `${petal.startY}vh`,
            rotate: petal.rotation,
            rotateX: index % 2 === 0 ? 15 : -12,
            rotateY: index % 3 === 0 ? 20 : -16,
            scale: 0.55,
            opacity: 0,
          }}
          animate={{
            x: [
              `${petal.startX}vw`,
              `${petal.centerX}vw`,
              `${petal.centerX * 0.25}vw`,
              `${petal.endX}vw`,
            ],
            y: [
              `${petal.startY}vh`,
              `${petal.centerY}vh`,
              `${petal.centerY * 0.25}vh`,
              `${petal.endY}vh`,
            ],
            rotate: [
              petal.rotation,
              petal.rotation + 75,
              petal.rotation + 150,
              petal.rotation + 300,
            ],
            rotateX: [15, -10, 18, -14],
            rotateY: [-15, 20, -18, 14],
            scale: [0.55, 1, 1.1, 0.65],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4.8,
            delay: petal.delay,
            times: [0, 0.42, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {/* المؤقت المسؤول عن تبديل الشاشة وإنهاء الحركة */}
      <motion.span
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0] }}
        transition={{ duration: 5.3 }}
        onUpdate={(_, animation) => {
          const progress = animation?.progress;

          if (progress >= 0.48) {
            onCover?.();
          }
        }}
        onAnimationComplete={() => {
          onComplete?.();
        }}
      />
    </motion.div>
  );
}