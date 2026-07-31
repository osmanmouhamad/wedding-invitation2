import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import Envelope from "../components/Envelope";
import invitationData from "../data/invitationData";

export default function Intro({
  onRevealHero,
  onComplete,
}) {
  const [isOpening, setIsOpening] =
    useState(false);

  const [isFading, setIsFading] =
    useState(false);

  const shouldReduceMotion =
    useReducedMotion();

  const hasStartedRef = useRef(false);

  const { intro } = invitationData;

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);
  };

  useEffect(() => {
    if (
      !isOpening ||
      hasStartedRef.current
    ) {
      return;
    }

    hasStartedRef.current = true;

    if (shouldReduceMotion) {
      onRevealHero?.();

      const completeTimer =
        window.setTimeout(() => {
          onComplete?.();
        }, 400);

      return () => {
        window.clearTimeout(
          completeTimer,
        );
      };
    }

    /*
      0ms:
      يبدأ فتح الظرف ببطء.

      2900ms:
      يبدأ ظهور الـHero من الخلف.

      3600ms:
      تبدأ خلفية الـIntro بالاختفاء.

      5500ms:
      ينتهي الانتقال ويُحذف الـIntro.
    */

    const revealTimer =
      window.setTimeout(() => {
        onRevealHero?.();
      }, 2900);

    const fadeTimer =
      window.setTimeout(() => {
        setIsFading(true);
      }, 3600);

    const completeTimer =
      window.setTimeout(() => {
        onComplete?.();
      }, 5500);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(
        completeTimer,
      );
    };
  }, [
    isOpening,
    shouldReduceMotion,
    onRevealHero,
    onComplete,
  ]);

  return (
    <motion.section
      dir="rtl"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: isFading ? 0 : 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: shouldReduceMotion
          ? 0.2
          : 1.9,

        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute inset-0 z-20
        flex min-h-[100svh] w-full
        items-center justify-center
        overflow-hidden
        bg-[#f2e7db]
      "
    >
      {/* Background */}
      <img
        src={introBackground}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full select-none
          object-cover object-center
        "
      />

      {/* Soft overlay */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: isOpening
            ? 0.15
            : 1,
        }}
        transition={{
          duration: 4.3,
          ease: "easeOut",
        }}
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(242,230,219,0.12))]
        "
      />

      <div
        className="
          relative z-10
          flex min-h-[100svh]
          w-full max-w-[470px]
          flex-col items-center
          justify-center px-5
          pb-[max(2rem,env(safe-area-inset-bottom))]
          pt-[max(1.5rem,env(safe-area-inset-top))]
        "
      >
        {/* Text above envelope */}
        <motion.header
          animate={{
            opacity: isOpening
              ? [1, 0.75, 0]
              : 1,

            y: isOpening
              ? [0, -4, -14]
              : 0,
          }}
          transition={{
            duration: 2.2,
            times: [0, 0.45, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-5 max-w-[340px]
            text-center
          "
        >
          <p
            className="
              mb-2 text-[10px]
              font-medium
              tracking-[0.25em]
              text-[#9b8069]
            "
          >
            {intro.kicker}
          </p>

          <h1
            className="
              font-serif
              text-[clamp(1.35rem,6vw,1.8rem)]
              font-normal leading-[1.7]
              text-[#6c5748]
            "
          >
            {intro.heading}
          </h1>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-3
              h-px w-14
              bg-gradient-to-r
              from-transparent
              via-[#bd9a64]
              to-transparent
            "
          />
        </motion.header>

        <Envelope
          isOpen={isOpening}
          onOpen={handleOpen}
        />

        {/* Text below envelope */}
        <motion.div
          animate={{
            opacity: isOpening
              ? [1, 0.6, 0]
              : 1,

            y: isOpening
              ? [0, 3, 10]
              : 0,
          }}
          transition={{
            duration: 1.6,
            times: [0, 0.42, 1],
            ease: "easeOut",
          }}
          className="
            mt-2 flex min-h-12
            flex-col items-center
            justify-center text-center
          "
        >
          <p
            className="
              text-[13px]
              text-[#75675c]
              drop-shadow-sm
            "
          >
            {intro.openLabel}
          </p>

          <motion.span
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 4, 0],
                    opacity: [
                      0.4,
                      1,
                      0.4,
                    ],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              mt-2 block text-[12px]
              text-[#a78d77]
            "
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </motion.section>
  );
}