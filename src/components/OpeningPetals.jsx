import { motion } from "motion/react";

import petal1 from "../assets/envelope/rose-petal-1.webp";
import petal2 from "../assets/envelope/rose-petal-2.webp";
import petal3 from "../assets/envelope/rose-petal-3.webp";

const petals = [
  {
    id: 1,
    image: petal1,
    size: 38,
    x: [0, -20, -72],
    y: [0, -42, -145],
    rotate: [0, -75, -180],
    delay: 0.72,
  },
  {
    id: 2,
    image: petal2,
    size: 34,
    x: [0, 18, 66],
    y: [0, -50, -162],
    rotate: [30, 120, 250],
    delay: 0.84,
  },
  {
    id: 3,
    image: petal3,
    size: 42,
    x: [0, -6, -28],
    y: [0, -58, -178],
    rotate: [-20, -120, -280],
    delay: 0.96,
  },
  {
    id: 4,
    image: petal1,
    size: 31,
    x: [0, 28, 92],
    y: [0, -36, -132],
    rotate: [60, 170, 330],
    delay: 1.07,
  },
];

export default function OpeningPetals({
  active = false,
}) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute
        left-1/2 top-[43%] z-[25]
      "
    >
      {petals.map((petal) => (
        <motion.img
          key={petal.id}
          src={petal.image}
          alt=""
          draggable="false"
          decoding="async"
          className="
            absolute left-0 top-0
            select-none object-contain
            will-change-transform
          "
          style={{
            width: petal.size,
            translate: "-50% -50%",
          }}
          initial={{
            x: 0,
            y: 8,
            scale: 0.15,
            opacity: 0,
            rotate: petal.rotate[0],
          }}
          animate={
            active
              ? {
                  x: petal.x,
                  y: petal.y,
                  rotate: petal.rotate,
                  scale: [0.15, 0.9, 1, 0.72],
                  opacity: [0, 1, 1, 0],
                }
              : {
                  x: 0,
                  y: 8,
                  scale: 0.15,
                  opacity: 0,
                }
          }
          transition={{
            duration: 2.15,
            delay: petal.delay,
            times: [0, 0.28, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}