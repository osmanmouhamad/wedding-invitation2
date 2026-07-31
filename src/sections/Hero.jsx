import {
  motion,
  useReducedMotion,
} from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import invitationData from "../data/invitationData";

const smoothEase = [
  0.22,
  1,
  0.36,
  1,
];

export default function Hero() {
  const shouldReduceMotion =
    useReducedMotion();

  const { couple, hero } =
    invitationData;

  return (
    <section
      dir="rtl"
      className="
        relative isolate flex
        min-h-[100svh]
        items-center justify-center
        overflow-hidden px-5 py-10
      "
    >
      <motion.img
        src={introBackground}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        initial={{
          scale: 1.04,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration:
            shouldReduceMotion
              ? 0.2
              : 2.4,

          ease: smoothEase,
        }}
        className="
          pointer-events-none
          absolute inset-0
          -z-20 h-full w-full
          select-none object-cover
          object-center
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          bg-[linear-gradient(180deg,rgba(255,252,248,0.28),rgba(244,233,223,0.86))]
        "
      />

      <motion.div
        initial={
          shouldReduceMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: 26,
                scale: 0.975,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration:
            shouldReduceMotion
              ? 0.2
              : 1.2,

          delay:
            shouldReduceMotion
              ? 0
              : 0.15,

          ease: smoothEase,
        }}
        className="
          w-full max-w-[430px]
          rounded-[32px]
          border border-white/65
          bg-white/55
          px-7 py-11
          text-center
          shadow-[0_30px_80px_rgba(92,66,48,0.16)]
          backdrop-blur-md
        "
      >
        <motion.p
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: smoothEase,
          }}
          className="
            mb-5 text-[11px]
            tracking-[0.25em]
            text-[#967b65]
          "
        >
          {hero.eyebrow}
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: smoothEase,
          }}
          className="
            mx-auto mb-7
            grid size-24
            place-items-center
            rounded-full
            border
            border-[#c8a764]/45
            bg-[#fffaf2]/85
            shadow-[0_12px_30px_rgba(94,67,45,0.1)]
          "
        >
          <bdi
            dir="ltr"
            className="
              font-serif text-3xl
              tracking-[0.04em]
              text-[#79634e]
            "
          >
            {couple.monogram}
          </bdi>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.45,
            ease: smoothEase,
          }}
          className="
            font-serif
            text-[clamp(1.9rem,8vw,2.8rem)]
            leading-[1.45]
            text-[#695444]
          "
        >
          {hero.title}
        </motion.h1>

        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.65,
            ease: smoothEase,
          }}
          className="
            mx-auto my-6
            h-px w-16
            bg-gradient-to-r
            from-transparent
            via-[#bd9a62]
            to-transparent
          "
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.75,
            ease: smoothEase,
          }}
          className="
            mx-auto max-w-[315px]
            text-[15px]
            leading-8
            text-[#74655a]
          "
        >
          {hero.messageLines.map(
            (line, index) => (
              <p
                key={`${line}-${index}`}
                className={
                  index === 0
                    ? ""
                    : "mt-1"
                }
              >
                {line}
              </p>
            ),
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}