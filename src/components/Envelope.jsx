import {
  motion,
  useReducedMotion,
} from "motion/react";

import invitationData from "../data/invitationData";
import OpeningPetals from "./OpeningPetals";

const smoothEase = [0.22, 1, 0.36, 1];

export default function Envelope({
  isOpen = false,
  onOpen,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const { couple, intro } = invitationData;

  const [firstLetter, secondLetter] =
    couple.sealLetters;

  const duration = shouldReduceMotion
    ? 0.18
    : 0.72;

  const handleOpen = () => {
    if (isOpen) return;

    onOpen?.();
  };

  return (
    <motion.div
      animate={
        shouldReduceMotion || isOpen
          ? {
              y: 0,
            }
          : {
              y: [0, -3, 0],
            }
      }
      transition={{
        duration: 4.2,
        repeat: isOpen ? 0 : Infinity,
        ease: "easeInOut",
      }}
      className="
        relative w-full
        max-w-[410px]
      "
    >
      <div
        className="
          relative aspect-[1.42]
          w-full
        "
      >
        {/* Ground shadow */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isOpen ? 0.11 : 0.23,
            scaleX: isOpen ? 0.78 : 1,
            y: isOpen ? 13 : 0,
          }}
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
          className="
            absolute bottom-[1%] left-1/2
            h-[9%] w-[82%]
            -translate-x-1/2
            rounded-full bg-[#5d4332]
            blur-xl
          "
        />

        {/* Envelope base */}
        <motion.div
          aria-hidden="true"
          animate={{
            scale: isOpen ? 1.015 : 1,
            opacity: isOpen ? 0.86 : 1,
          }}
          transition={{
            duration,
            ease: smoothEase,
          }}
          className="
            absolute inset-x-[3%]
            bottom-[7%] top-[6%]
            overflow-hidden rounded-[12px]
            border border-[#cbb39d]/80
            bg-[linear-gradient(145deg,#f3e7d9_0%,#dfcbb8_48%,#d5bba4_100%)]
            shadow-[0_18px_30px_rgba(75,52,37,0.17)]
          "
        >
          {/* Paper texture */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.7),transparent_34%),linear-gradient(135deg,transparent_35%,rgba(112,77,52,0.055)_100%)]
            "
          />

          {/* Inner depth */}
          <motion.div
            aria-hidden="true"
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              duration: 0.45,
              delay: isOpen ? 0.35 : 0,
            }}
            className="
              absolute inset-x-[8%] top-[8%]
              h-[26%] rounded-[50%]
              bg-[#70503b]/20 blur-md
            "
          />
        </motion.div>

        {/* Invitation card */}
        <motion.article
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? "-17%" : "8%",
            scale: isOpen ? 1.18 : 0.94,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0.2
              : 0.82,

            delay: isOpen
              ? shouldReduceMotion
                ? 0
                : 0.5
              : 0,

            ease: smoothEase,
          }}
          style={{
            x: "-50%",
          }}
          className="
            absolute left-1/2 top-[20%]
            z-10 h-[58%] w-[68%]
            overflow-hidden rounded-[6px]
            border border-[#d9c6b3]
            bg-[#fffaf2]
            shadow-[0_18px_38px_rgba(73,50,35,0.2)]
            will-change-transform
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.96),transparent_38%),linear-gradient(145deg,rgba(199,166,132,0.09),transparent_52%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              inset-[7px] rounded-[3px]
              border border-[#c9ab82]/30
            "
          />

          <div
            className="
              relative flex h-full
              flex-col items-center
              justify-center px-5
              text-center
            "
          >
            <span
              dir="ltr"
              className="
                mb-3 text-[8px]
                tracking-[0.3em]
                text-[#a48a71]
              "
            >
              {intro.cardEyebrow}
            </span>

            <p
              className="
                font-serif text-[22px]
                text-[#715947]
              "
            >
              {intro.cardTitle}
            </p>

            <div
              aria-hidden="true"
              className="
                my-3 h-px w-12
                bg-gradient-to-r
                from-transparent
                via-[#bf9b65]
                to-transparent
              "
            />

            <span
              dir="ltr"
              className="
                font-serif text-[15px]
                tracking-[0.08em]
                text-[#8a725c]
              "
            >
              {couple.initials}
            </span>
          </div>
        </motion.article>

        {/* Left panel */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            x: isOpen ? "-61%" : "0%",
            rotate: isOpen ? -6 : 0,
            opacity: isOpen ? 0.9 : 1,
          }}
          transition={{
            duration,
            delay: isOpen
              ? shouldReduceMotion
                ? 0
                : 0.24
              : 0,
            ease: smoothEase,
          }}
          className="
            absolute bottom-[7%]
            left-[3%] top-[6%]
            z-20 w-[49%]
            origin-left
            [clip-path:polygon(0_0,100%_50%,0_100%)]
            bg-[linear-gradient(115deg,#f3e7da_0%,#d5bca6_100%)]
            drop-shadow-[3px_2px_3px_rgba(75,53,39,0.08)]
            will-change-transform
          "
        >
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(90deg,rgba(255,255,255,0.2),transparent)]
            "
          />
        </motion.div>

        {/* Right panel */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            x: isOpen ? "61%" : "0%",
            rotate: isOpen ? 6 : 0,
            opacity: isOpen ? 0.9 : 1,
          }}
          transition={{
            duration,
            delay: isOpen
              ? shouldReduceMotion
                ? 0
                : 0.24
              : 0,
            ease: smoothEase,
          }}
          className="
            absolute bottom-[7%]
            right-[3%] top-[6%]
            z-20 w-[49%]
            origin-right
            [clip-path:polygon(100%_0,0_50%,100%_100%)]
            bg-[linear-gradient(245deg,#f3e7da_0%,#d5bca6_100%)]
            drop-shadow-[-3px_2px_3px_rgba(75,53,39,0.08)]
            will-change-transform
          "
        >
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(270deg,rgba(255,255,255,0.2),transparent)]
            "
          />
        </motion.div>

        {/* Bottom panel */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            y: isOpen ? "66%" : "0%",
            scale: isOpen ? 0.95 : 1,
            opacity: isOpen ? 0.92 : 1,
          }}
          transition={{
            duration,
            delay: isOpen
              ? shouldReduceMotion
                ? 0
                : 0.38
              : 0,
            ease: smoothEase,
          }}
          className="
            absolute bottom-[7%]
            left-[3%] right-[3%]
            z-[26] h-[53%]
            origin-bottom
            [clip-path:polygon(0_100%,50%_0,100%_100%)]
            bg-[linear-gradient(180deg,#f1e2d2_0%,#d1b59e_100%)]
            drop-shadow-[0_-2px_3px_rgba(71,50,36,0.08)]
            will-change-transform
          "
        >
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.28),transparent_55%)]
            "
          />
        </motion.div>

        {/* Top panel */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            y: isOpen ? "-72%" : "0%",
            scaleX: isOpen ? 0.92 : 1,
            scaleY: isOpen ? 0.9 : 1,
            rotate: isOpen ? -1.5 : 0,
            opacity: isOpen ? 0.92 : 1,
          }}
          transition={{
            duration,
            delay: isOpen
              ? shouldReduceMotion
                ? 0
                : 0.08
              : 0,
            ease: smoothEase,
          }}
          className="
            absolute left-[3%]
            right-[3%] top-[6%]
            z-30 h-[52%]
            origin-top
            [clip-path:polygon(0_0,100%_0,50%_100%)]
            bg-[linear-gradient(180deg,#f2e5d6_0%,#d4bba5_100%)]
            drop-shadow-[0_4px_4px_rgba(70,49,35,0.12)]
            will-change-transform
          "
        >
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_48%)]
            "
          />

          <div
            className="
              absolute left-1/2 top-[8%]
              h-px w-[64%]
              -translate-x-1/2
              bg-white/35
            "
          />
        </motion.div>

        {/* First petals from the invitation */}
        <OpeningPetals active={isOpen} />

        {/* Gold seal */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            isOpen
              ? {
                  opacity: 0,
                  scale: 0.38,
                  rotate: -18,
                  y: 9,
                }
              : shouldReduceMotion
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    opacity: 1,
                    scale: [1, 1.045, 1],
                  }
          }
          transition={
            isOpen
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
            absolute left-1/2
            top-[51%] z-40
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <span className="gold-seal">
            <span className="gold-seal__center">
              <span
                dir="ltr"
                className="gold-seal__letters"
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
        </motion.div>

        {/* Click area */}
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpen}
          aria-label={intro.openLabel}
          className="
            absolute inset-0 z-50
            cursor-pointer rounded-[18px]
            bg-transparent
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#b48d54]/55
            focus-visible:ring-offset-4
            disabled:pointer-events-none
          "
        />
      </div>
    </motion.div>
  );
}