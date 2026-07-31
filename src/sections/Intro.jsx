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
        }, 350);

      return () => {
        window.clearTimeout(
          completeTimer,
        );
      };
    }

    /*
      0ms:
      يبدأ فتح الظرف.

      3250ms:
      يبدأ ظهور الـHero من الخلف.

      4150ms:
      تبدأ شاشة الـIntro بالاختفاء.

      6100ms:
      ينتهي الانتقال بالكامل.
    */

    const revealTimer =
      window.setTimeout(() => {
        onRevealHero?.();
      }, 3250);

    const fadeTimer =
      window.setTimeout(() => {
        setIsFading(true);
      }, 4150);

    const completeTimer =
      window.setTimeout(() => {
        onComplete?.();
      }, 6100);

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
          : 1.85,

        ease: smoothEase,
      }}
      className="
        absolute inset-0 z-20
        flex min-h-[100svh]
        w-full items-center
        justify-center overflow-hidden
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
        animate={{
          scale: isOpening
            ? 1.035
            : 1,

          opacity: isOpening
            ? 0.88
            : 1,
        }}
        transition={{
          duration: 5.8,
          ease: smoothEase,
        }}
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full select-none
          object-cover object-center
        "
      />

      {/* Background overlay */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: isOpening
            ? 0.2
            : 1,
        }}
        transition={{
          duration: 4.8,
          ease: "easeOut",
        }}
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(242,230,219,0.14))]
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
          initial={false}
          animate={{
            opacity: isOpening
              ? [1, 0.75, 0]
              : 1,

            y: isOpening
              ? [0, -5, -16]
              : 0,
          }}
          transition={{
            duration: 2.4,
            times: [
              0,
              0.48,
              1,
            ],
            ease: smoothEase,
          }}
          className="
            mb-5 w-full
            max-w-[360px]
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
              text-[clamp(1.3rem,5.8vw,1.75rem)]
              font-normal
              leading-[1.7]
              text-[#6c5748]
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
          initial={false}
          animate={{
            opacity: isOpening
              ? [1, 0.6, 0]
              : 1,

            y: isOpening
              ? [0, 3, 12]
              : 0,
          }}
          transition={{
            duration: 1.8,
            times: [
              0,
              0.42,
              1,
            ],
            ease: "easeOut",
          }}
          className="
            mt-2 flex
            min-h-[72px]
            flex-col items-center
            justify-center text-center
          "
        >
          <p
            className="
              text-[14px]
              leading-7
              text-[#6f6055]
              drop-shadow-sm
            "
          >
            {intro.openLabel}
          </p>

          <p
            className="
              mt-1 text-[11px]
              text-[#9c836e]
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
                      1.45,
                      1,
                    ],

                    opacity: [
                      0.3,
                      0.85,
                      0.3,
                    ],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              mt-3 block size-[5px]
              rounded-full
              bg-[#b5915a]
            "
          />
        </motion.div>
      </div>
    </motion.section>
  );
}