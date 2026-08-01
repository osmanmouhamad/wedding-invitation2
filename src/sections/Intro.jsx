import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import Envelope from "../components/Envelope";
import invitationData, {
  introTiming,
} from "../data/invitationData";

const smoothEase = [0.22, 1, 0.36, 1];

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

  const intro =
    invitationData?.intro ?? {};

  const headingLines =
    Array.isArray(intro.headingLines)
      ? intro.headingLines
      : [];

  const handleOpen = () => {
    if (isOpening) {
      return;
    }

    setIsOpening(true);
  };

  useEffect(() => {
    if (!isOpening) {
      return undefined;
    }

    if (shouldReduceMotion) {
      const revealTimer =
        window.setTimeout(() => {
          onRevealHero?.();
          setIsFading(true);
        }, 0);

      const completeTimer =
        window.setTimeout(() => {
          onComplete?.();
        }, 280);

      return () => {
        window.clearTimeout(revealTimer);
        window.clearTimeout(completeTimer);
      };
    }

    const revealTimer =
      window.setTimeout(() => {
        onRevealHero?.();
      }, introTiming.heroRevealMs);

    const fadeTimer =
      window.setTimeout(() => {
        setIsFading(true);
      }, introTiming.introFadeMs);

    const completeTimer =
      window.setTimeout(() => {
        onComplete?.();
      }, introTiming.introCompleteMs);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
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
          : 1.45,

        ease: smoothEase,
      }}
      className="
        fixed inset-0 z-20
        overflow-hidden
        overscroll-none
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
          duration:
            introTiming.envelopeExitSeconds,

          ease: smoothEase,
        }}
        className="
          pointer-events-none
          absolute inset-0
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
            ? 0.18
            : 1,
        }}
        transition={{
          duration:
            introTiming.envelopeOpenSeconds,

          ease: "easeOut",
        }}
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(242,230,219,0.1))]
        "
      />

      <div className="intro-layout">
        {/* Heading */}
        <motion.header
          initial={false}
          animate={{
            opacity: isOpening
              ? [1, 0.62, 0]
              : 1,

            y: isOpening
              ? [0, -5, -16]
              : 0,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0.2
              : 1.55,

            times: [0, 0.46, 1],
            ease: smoothEase,
          }}
          className="
            w-full max-w-[390px]
            text-center
          "
        >
          {/* Decorative kicker */}
          <div
            className="
              mb-3 flex items-center
              justify-center gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-8
                bg-gradient-to-r
                from-transparent
                to-[#b9935e]/70
              "
            />

            <p
              className="
                text-[clamp(0.75rem,3vw,0.88rem)]
                font-medium
                tracking-[0.12em]
                text-[#9a765c]
              "
            >
              {intro.kicker ??
                "موعدٌ مع الفرح"}
            </p>

            <span
              aria-hidden="true"
              className="
                h-px w-8
                bg-gradient-to-l
                from-transparent
                to-[#b9935e]/70
              "
            />
          </div>

          {/* Main title */}
          <h1
            className="
              font-serif
              text-[clamp(1.65rem,7.4vw,2.3rem)]
              font-normal
              leading-[1.36]
              text-[#604b3d]
            "
          >
            {headingLines.map(
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
              mx-auto mt-3.5
              h-px w-16
              bg-gradient-to-r
              from-transparent
              via-[#b9935e]
              to-transparent
            "
          />
        </motion.header>

        {/* Envelope — keeps current size */}
        <div className="intro-envelope-frame">
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
              ? [1, 0.45, 0]
              : 1,

            y: isOpening
              ? [0, 4, 12]
              : 0,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0.2
              : 1.05,

            times: [0, 0.42, 1],
            ease: "easeOut",
          }}
          className="
            flex min-h-[70px]
            flex-col items-center
            justify-center
            px-4 text-center
          "
        >

          <div
            className="
              mt-2 inline-flex
              items-center gap-2
              rounded-full
              border border-[#b9935e]/30
              bg-[#fffaf2]/45
              px-3.5 py-1.5
              backdrop-blur-sm
            "
          >
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
                block size-[5px]
                rounded-full
                bg-[#b58d55]
                shadow-[0_0_8px_rgba(181,141,85,0.45)]
              "
            />

            <span
              className="
                text-[clamp(0.72rem,2.8vw,0.82rem)]
                font-medium
                text-[#927866]
              "
            >
              {intro.openHint ??
                "اضغطوا على الختم"}
            </span>
          </div>
        </motion.div>

        {/* Accessibility status */}
        <p
          className="sr-only"
          aria-live="polite"
        >
          {isOpening
            ? intro.openingLabel ??
              "جارٍ فتح الدعوة"
            : ""}
        </p>
      </div>
    </motion.section>
  );
}