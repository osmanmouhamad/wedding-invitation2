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

const smoothEase = [
  0.22,
  1,
  0.36,
  1,
];

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
      يبدأ فتح الظرف.

      2900ms:
      يبدأ ظهور الـHero من الخلف.

      3600ms:
      يبدأ اختفاء الـIntro.

      5500ms:
      ينتهي الانتقال.
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
      window.clearTimeout(
        revealTimer,
      );

      window.clearTimeout(
        fadeTimer,
      );

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

        ease: smoothEase,
      }}
      className="
        absolute inset-0 z-20
        min-h-[100svh] w-full
        overflow-x-hidden
        overflow-y-auto
        bg-[#f2e7db]
      "
    >
      {/* Background */}
      <motion.img
        src={introBackground}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        initial={false}
        animate={{
          scale: isOpening
            ? 1.025
            : 1,

          opacity: isOpening
            ? 0.9
            : 1,
        }}
        transition={{
          duration: 5.2,
          ease: smoothEase,
        }}
        className="
          pointer-events-none
          fixed inset-0
          h-full w-full
          select-none
          object-cover object-center
        "
      />

      {/* Soft overlay */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isOpening
            ? 0.16
            : 1,
        }}
        transition={{
          duration: 4.3,
          ease: "easeOut",
        }}
        className="
          pointer-events-none
          fixed inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(242,230,219,0.1))]
        "
      />

      {/* Mobile-safe layout */}
      <div
        className="
          relative z-10
          flex min-h-[100svh]
          w-full flex-col
          px-4
          pb-[max(1.25rem,env(safe-area-inset-bottom))]
          pt-[max(1.25rem,env(safe-area-inset-top))]
        "
      >
        <div
          className="
            my-auto flex
            w-full flex-col
            items-center
          "
        >
          {/* Text above envelope */}
          <motion.header
            initial={false}
            animate={{
              opacity: isOpening
                ? [1, 0.72, 0]
                : 1,

              y: isOpening
                ? [0, -5, -15]
                : 0,
            }}
            transition={{
              duration: 2.3,
              times: [
                0,
                0.46,
                1,
              ],
              ease: smoothEase,
            }}
            className="
              mb-[clamp(0.9rem,2.8svh,1.7rem)]
              w-full
              max-w-[390px]
              text-center
            "
          >
            <p
              className="
                mb-2
                font-serif
                text-[clamp(0.95rem,3.8vw,1.1rem)]
                leading-7
                text-[#9a765c]
              "
            >
              {intro.kicker}
            </p>

            <h1
              className="
                font-serif
                text-[clamp(1.6rem,7vw,2.2rem)]
                font-normal
                leading-[1.4]
                text-[#604b3d]
              "
            >
              {intro.headingLines.map(
                (line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className="block"
                  >
                    {line}
                  </span>
                ),
              )}
            </h1>

            <div
              aria-hidden="true"
              className="
                mx-auto mt-3
                h-px w-16
                bg-gradient-to-r
                from-transparent
                via-[#b9935e]
                to-transparent
              "
            />
          </motion.header>

          {/* Envelope adapts to screen height */}
          <div
            className="
              w-[min(86vw,390px,calc(48svh*1.42))]
              min-w-[270px]
            "
          >
            <Envelope
              isOpen={isOpening}
              onOpen={handleOpen}
            />
          </div>

          {/* Text below envelope */}
          <motion.div
            initial={false}
            animate={{
              opacity: isOpening
                ? [1, 0.55, 0]
                : 1,

              y: isOpening
                ? [0, 4, 12]
                : 0,
            }}
            transition={{
              duration: 1.7,
              times: [
                0,
                0.42,
                1,
              ],
              ease: "easeOut",
            }}
            className="
              mt-[clamp(0.85rem,2.5svh,1.5rem)]
              flex min-h-[72px]
              flex-col items-center
              justify-center
              px-4 text-center
            "
          >
            <p
              className="
                font-serif
                text-[clamp(1.15rem,4.8vw,1.4rem)]
                leading-8
                text-[#655044]
              "
            >
              {intro.openLabel}
            </p>

            <p
              className="
                mt-0.5
                text-[clamp(0.8rem,3.2vw,0.9rem)]
                leading-6
                text-[#967b67]
              "
            >
              {intro.openHint}
            </p>

            <motion.span
              aria-hidden="true"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [
                        1,
                        1.55,
                        1,
                      ],

                      opacity: [
                        0.28,
                        0.9,
                        0.28,
                      ],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mt-2.5 block
                size-[6px]
                rounded-full
                bg-[#b58d55]
                shadow-[0_0_8px_rgba(181,141,85,0.35)]
              "
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}