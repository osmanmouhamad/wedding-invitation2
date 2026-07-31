import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import Envelope from "../components/Envelope";
import invitationData, { introTiming } from "../data/invitationData";

const smoothEase = [0.22, 1, 0.36, 1];

export default function Intro({ onRevealHero, onComplete }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const hasStartedRef = useRef(false);

  const { intro } = invitationData;
  const headingLines = intro.headingLines ?? [];

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  useEffect(() => {
    if (!isOpening || hasStartedRef.current) return;

    hasStartedRef.current = true;

    if (shouldReduceMotion) {
      setIsFading(true);
      onRevealHero?.();

      const completeTimer = window.setTimeout(() => {
        onComplete?.();
      }, 280);

      return () => {
        window.clearTimeout(completeTimer);
      };
    }

    const revealTimer = window.setTimeout(() => {
      onRevealHero?.();
    }, introTiming.heroRevealMs);

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, introTiming.introFadeMs);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, introTiming.introCompleteMs);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isOpening, shouldReduceMotion, onRevealHero, onComplete]);

  return (
    <motion.section
      dir="rtl"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 1.45,
        ease: smoothEase,
      }}
      className="fixed inset-0 z-20 overflow-x-hidden overflow-y-auto bg-[#f2e7db]"
    >
      <motion.img
        src={introBackground}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        initial={false}
        animate={{
          scale: isOpening ? 1.025 : 1,
          opacity: isOpening ? 0.9 : 1,
        }}
        transition={{
          duration: introTiming.envelopeExitSeconds,
          ease: smoothEase,
        }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
      />

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isOpening ? 0.18 : 1 }}
        transition={{
          duration: introTiming.envelopeOpenSeconds,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(242,230,219,0.1))]"
      />

      <div className="intro-layout">
        <motion.header
          initial={false}
          animate={{
            opacity: isOpening ? [1, 0.62, 0] : 1,
            y: isOpening ? [0, -5, -16] : 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 1.55,
            times: [0, 0.46, 1],
            ease: smoothEase,
          }}
          className="w-full max-w-[390px] text-center"
        >
          <p className="mb-2 text-[clamp(0.9rem,3.8vw,1.05rem)] font-medium leading-7 text-[#9a765c]">
            {intro.kicker}
          </p>

          <h1 className="font-serif text-[clamp(1.65rem,7.4vw,2.3rem)] font-normal leading-[1.36] text-[#604b3d]">
            {headingLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-3.5 h-px w-16 bg-gradient-to-r from-transparent via-[#b9935e] to-transparent"
          />
        </motion.header>

        <div className="intro-envelope-frame">
          <Envelope isOpen={isOpening} onOpen={handleOpen} />
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: isOpening ? [1, 0.45, 0] : 1,
            y: isOpening ? [0, 4, 12] : 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 1.05,
            times: [0, 0.42, 1],
            ease: "easeOut",
          }}
          className="flex min-h-[70px] flex-col items-center justify-center px-4 text-center"
        >
          <p className="text-[clamp(1.05rem,4.5vw,1.25rem)] font-medium leading-8 text-[#655044]">
            {intro.openLabel}
          </p>

          <p className="mt-0.5 text-[clamp(0.8rem,3.2vw,0.9rem)] leading-6 text-[#967b67]">
            {intro.openHint}
          </p>

          <motion.span
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.55, 1],
                    opacity: [0.28, 0.9, 0.28],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-2.5 block size-[6px] rounded-full bg-[#b58d55] shadow-[0_0_8px_rgba(181,141,85,0.35)]"
          />
        </motion.div>

        <p className="sr-only" aria-live="polite">
          {isOpening ? intro.openingLabel : ""}
        </p>
      </div>
    </motion.section>
  );
}
