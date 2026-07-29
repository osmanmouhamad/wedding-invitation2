import {
  motion,
  useReducedMotion,
} from "motion/react";

import envelopeBody from "../assets/envelope/envelope-body.svg";
import envelopeFlap from "../assets/envelope/envelope-flap.svg";
import introBackground from "../assets/images/intro-bg.webp";
import invitationData from "../data/invitationData";

export default function Intro({
  onOpen,
  isOpening = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  const { couple, intro } = invitationData;
  const [firstLetter, secondLetter] =
    couple.sealLetters;

  const handleOpenEnvelope = () => {
    if (isOpening) return;

    onOpen?.();
  };

  return (
    <motion.section
      dir="rtl"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0 }
      }
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      className="
        relative flex min-h-[100svh] w-full
        items-center justify-center overflow-hidden
        bg-[#f3e9dd]
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

      {/* Background overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(247,238,230,0.08))]
        "
      />

      <div
        className="
          relative z-10 flex min-h-[100svh] w-full
          max-w-[460px] flex-col items-center justify-center
          px-5
          pb-[max(2rem,env(safe-area-inset-bottom))]
          pt-[max(1.5rem,env(safe-area-inset-top))]
        "
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: isOpening
                    ? -4
                    : [0, -2, 0],
                }
          }
          transition={
            isOpening
              ? {
                  duration: 0.35,
                  ease: "easeOut",
                }
              : {
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="
            relative flex w-full flex-col items-center
            rounded-[28px]
            focus-within:outline
            focus-within:outline-2
            focus-within:outline-offset-4
            focus-within:outline-[#b88d3c]/45
          "
        >
          {/* Envelope wrapper */}
          <div
            className="
              relative aspect-[1000/700]
              w-full max-w-[400px]
              [perspective:1100px]
            "
          >
            {/* Envelope inner shadow */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isOpening ? 1 : 0,
                scaleY: isOpening ? 1 : 0.55,
              }}
              transition={{
                duration: 0.4,
                delay: isOpening ? 0.16 : 0,
                ease: "easeOut",
              }}
              className="
                pointer-events-none absolute
                left-1/2 top-[17%] z-[8]
                h-[31%] w-[65%]
                -translate-x-1/2
                origin-top
                bg-[linear-gradient(180deg,rgba(91,62,45,0.28),rgba(91,62,45,0.02))]
                [clip-path:polygon(0_0,100%_0,50%_100%)]
              "
            />

            {/* Invitation card */}
            <motion.div
              initial={false}
              animate={{
                y: isOpening ? "-19%" : "0%",
                scale: isOpening ? 1.025 : 1,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0.2
                  : 0.65,
                delay: isOpening ? 0.28 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                x: "-50%",
              }}
              className="
                absolute left-1/2 top-[16%] z-10
                h-[56%] w-[67%]
                overflow-hidden rounded-[3px]
                border border-[#d8c7b5]/70
                bg-[#fffaf3]
                shadow-[0_14px_32px_rgba(85,63,47,0.15)]
                will-change-transform
              "
            >
              <div
                className="
                  flex h-full flex-col
                  items-center justify-center
                  px-5 text-center
                "
              >
                <span
                  dir="ltr"
                  className="
                    mb-2 text-[8px]
                    tracking-[0.3em]
                    text-[#aa9178]
                  "
                >
                  {intro.eyebrow}
                </span>

                <p
                  className="
                    font-serif text-xl
                    text-[#765f4c]
                  "
                >
                  {intro.cardTitle}
                </p>
              </div>
            </motion.div>

            {/* Envelope body */}
            <img
              src={envelopeBody}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="
                pointer-events-none absolute
                inset-x-0 bottom-0 z-20
                block h-auto w-full select-none
                drop-shadow-[0_18px_18px_rgba(78,58,43,0.15)]
              "
            />

            {/* Envelope flap */}
            <motion.img
              src={envelopeFlap}
              alt=""
              aria-hidden="true"
              draggable="false"
              initial={false}
              animate={
                isOpening
                  ? {
                      rotateX: -168,
                      y: -2,
                      opacity: [1, 1, 0.12],
                    }
                  : {
                      rotateX: 0,
                      y: 0,
                      opacity: 1,
                    }
              }
              transition={{
                rotateX: {
                  duration: shouldReduceMotion
                    ? 0.2
                    : 0.58,
                  ease: [0.22, 1, 0.36, 1],
                },

                y: {
                  duration: shouldReduceMotion
                    ? 0.2
                    : 0.58,
                  ease: [0.22, 1, 0.36, 1],
                },

                opacity: {
                  duration: shouldReduceMotion
                    ? 0.2
                    : 0.58,
                  times: [0, 0.78, 1],
                  ease: "easeOut",
                },
              }}
              style={{
                transformOrigin: "50% 0%",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="
                pointer-events-none absolute
                inset-x-0 top-[11%] z-30
                block h-auto w-full select-none
                drop-shadow-[0_2px_2px_rgba(75,55,40,0.06)]
                will-change-transform
              "
            />

            {/* Gold seal */}
            <motion.span
              aria-hidden="true"
              animate={
                isOpening
                  ? {
                      scale: 0.55,
                      opacity: 0,
                      rotate: -10,
                    }
                  : shouldReduceMotion
                    ? {
                        scale: 1,
                        opacity: 1,
                      }
                    : {
                        scale: [1, 1.045, 1],
                        opacity: 1,
                      }
              }
              transition={
                isOpening
                  ? {
                      duration: 0.25,
                      ease: "easeIn",
                    }
                  : {
                      duration: 2.1,
                      repeat: Infinity,
                      repeatDelay: 1.7,
                      ease: "easeInOut",
                    }
              }
              className="
                absolute left-1/2 top-1/2 z-40
                -translate-x-1/2 -translate-y-1/2
              "
            >
              <span className="gold-seal">
                <span className="gold-seal__center">
                  <span
                    className="gold-seal__letters"
                    dir="ltr"
                  >
                    <span className="gold-seal__first">
                      {firstLetter}
                    </span>

                    <span className="gold-seal__second">
                      {secondLetter}
                    </span>
                  </span>
                </span>
              </span>
            </motion.span>
          </div>

          {/* Open label */}
          <motion.p
            id="open-invitation-label"
            animate={{
              opacity: isOpening ? 0 : 1,
              y: isOpening ? 5 : 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              -mt-1 px-4 py-3
              text-center text-[13px]
              font-normal text-[#78695c]
              drop-shadow-sm
            "
          >
            {isOpening
              ? intro.openingLabel
              : intro.openLabel}
          </motion.p>

          {/* Click area */}
          <button
            type="button"
            onClick={handleOpenEnvelope}
            disabled={isOpening}
            aria-labelledby="open-invitation-label"
            className="
              absolute inset-0 z-50
              cursor-pointer rounded-[28px]
              bg-transparent focus:outline-none
              disabled:cursor-default
            "
          >
            <span className="sr-only">
              {isOpening
                ? intro.openingLabel
                : intro.openLabel}
            </span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}