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
  onTransitionStart,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const shouldReduceMotion =
    useReducedMotion();

  const hasStartedTransitionRef =
    useRef(false);

  const { intro } = invitationData;

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const delay = shouldReduceMotion
      ? 380
      : 1750;

    const timer = window.setTimeout(() => {
      if (hasStartedTransitionRef.current) {
        return;
      }

      hasStartedTransitionRef.current = true;
      onTransitionStart?.();
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    isOpen,
    onTransitionStart,
    shouldReduceMotion,
  ]);

  return (
    <motion.section
      dir="rtl"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
            }
      }
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      className="
        relative flex min-h-[100svh]
        w-full items-center justify-center
        overflow-hidden bg-[#f2e7db]
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
          pointer-events-none absolute inset-0
          h-full w-full select-none
          object-cover object-center
        "
      />

      {/* Soft background overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(242,230,219,0.12))]
        "
      />

      <div
        className="
          relative z-10 flex
          min-h-[100svh] w-full
          max-w-[470px]
          flex-col items-center
          justify-center px-5
          pb-[max(2rem,env(safe-area-inset-bottom))]
          pt-[max(1.5rem,env(safe-area-inset-top))]
        "
      >
        {/* Sentence above the envelope */}
        <motion.header
          animate={{
            opacity: isOpen ? 0.35 : 1,
            y: isOpen ? -10 : 0,
          }}
          transition={{
            duration: 0.45,
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
              font-medium tracking-[0.25em]
              text-[#9b8069]
            "
          >
            {intro.kicker}
          </p>

          <h1
            className="
              font-serif text-[clamp(1.35rem,6vw,1.8rem)]
              font-normal leading-[1.7]
              text-[#6c5748]
            "
          >
            {intro.heading}
          </h1>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-3 h-px w-14
              bg-gradient-to-r
              from-transparent
              via-[#bd9a64]
              to-transparent
            "
          />
        </motion.header>

        <Envelope
          isOpen={isOpen}
          onOpen={handleOpen}
        />

        {/* Sentence below the envelope */}
        <motion.div
          animate={{
            opacity: isOpen ? 0 : 1,
            y: isOpen ? 8 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="
            mt-1 flex min-h-12
            flex-col items-center
            justify-center text-center
          "
        >
          <p
            className="
              text-[13px]
              font-normal text-[#75675c]
              drop-shadow-sm
            "
          >
            {isOpen
              ? intro.openingLabel
              : intro.openLabel}
          </p>

          <motion.span
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 4, 0],
                    opacity: [0.45, 1, 0.45],
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