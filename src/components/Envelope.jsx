import {
  motion,
  useReducedMotion,
} from "motion/react";

import envelopeBody from "../assets/envelope/envelope-body.svg";
import envelopeFlap from "../assets/envelope/envelope-flap.svg";
import invitationData from "../data/invitationData";
import OpeningPetals from "./OpeningPetals";

export default function Envelope({
  isOpen = false,
  onOpen,
}) {
  const shouldReduceMotion = useReducedMotion();

  const { couple, intro } = invitationData;

  const [firstLetter, secondLetter] =
    couple.sealLetters;

  const handleOpen = () => {
    if (isOpen) return;

    onOpen?.();
  };

  return (
    <motion.div
      animate={
        shouldReduceMotion || isOpen
          ? { y: 0 }
          : { y: [0, -3, 0] }
      }
      transition={{
        duration: 4,
        repeat: isOpen ? 0 : Infinity,
        ease: "easeInOut",
      }}
      className="
        relative flex w-full
        max-w-[420px] flex-col items-center
      "
    >
      <div
        className="
          relative aspect-[1000/700]
          w-full
          [perspective:1400px]
        "
      >
        {/* الظل الخلفي تحت الظرف */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isOpen ? 0.16 : 0.22,
            scaleX: isOpen ? 0.88 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            absolute bottom-[2%] left-1/2
            h-[8%] w-[82%]
            -translate-x-1/2 rounded-full
            bg-[#604633]
            blur-xl
          "
        />

        {/* داخل الظرف الداكن */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            scaleY: isOpen ? 1 : 0.4,
          }}
          transition={{
            duration: 0.45,
            delay: isOpen ? 0.24 : 0,
            ease: "easeOut",
          }}
          className="
            absolute left-1/2 top-[18%] z-[7]
            h-[36%] w-[70%]
            -translate-x-1/2 origin-top
            [clip-path:polygon(0_0,100%_0,50%_100%)]
            bg-[linear-gradient(180deg,rgba(74,49,34,0.38),rgba(118,83,58,0.08))]
            blur-[0.3px]
          "
        />

        {/* بطاقة الدعوة */}
        <motion.div
          initial={false}
          animate={{
            y: isOpen ? "-24%" : "0%",
            scale: isOpen ? 1.025 : 1,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0.25
              : 0.72,
            delay: isOpen ? 0.48 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            x: "-50%",
          }}
          className="
            absolute left-1/2 top-[16%] z-10
            h-[57%] w-[67%]
            overflow-hidden rounded-[4px]
            border border-[#d9c9b8]/80
            bg-[#fffaf2]
            shadow-[0_16px_34px_rgba(73,53,39,0.18)]
            will-change-transform
          "
        >
          {/* ملمس خفيف للبطاقة */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              opacity-60
              bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.95),transparent_36%),linear-gradient(135deg,rgba(205,180,151,0.08),transparent_48%)]
            "
          />

          <div
            className="
              relative flex h-full flex-col
              items-center justify-center
              px-5 text-center
            "
          >
            <span
              dir="ltr"
              className="
                mb-2 text-[8px]
                tracking-[0.28em]
                text-[#a58b72]
              "
            >
              {intro.eyebrow}
            </span>

            <p
              className="
                font-serif text-xl
                text-[#705b4b]
              "
            >
              {intro.cardTitle}
            </p>
          </div>
        </motion.div>

        {/* جسم الظرف الأمامي */}
        <img
          src={envelopeBody}
          alt=""
          aria-hidden="true"
          draggable="false"
          decoding="async"
          className="
            pointer-events-none absolute
            inset-x-0 bottom-0 z-20
            block h-auto w-full select-none
            drop-shadow-[0_18px_18px_rgba(70,50,35,0.16)]
          "
        />

        {/* غطاء الظرف ثلاثي الأبعاد */}
        <motion.div
          initial={false}
          animate={{
            rotateX: isOpen ? -178 : 0,
            zIndex: isOpen
              ? [30, 30, 8]
              : 30,
          }}
          transition={{
            rotateX: {
              duration: shouldReduceMotion
                ? 0.25
                : 0.78,
              ease: [0.22, 1, 0.36, 1],
            },

            zIndex: {
              duration: 0.78,
              times: [0, 0.54, 1],
            },
          }}
          style={{
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
          }}
          className="
            absolute inset-x-0 top-[11%]
            will-change-transform
          "
        >
          {/* الوجه الخارجي للغطاء */}
          <img
            src={envelopeFlap}
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
            className="
              block h-auto w-full select-none
              [backface-visibility:hidden]
              drop-shadow-[0_3px_3px_rgba(74,53,39,0.08)]
            "
          />

          {/* الوجه الداخلي للغطاء */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              overflow-hidden
              [backface-visibility:hidden]
              [transform:rotateX(180deg)]
              [clip-path:polygon(0_0,100%_0,50%_100%)]
              bg-[linear-gradient(180deg,#eadccc_0%,#f3e8da_44%,#dbc6b2_100%)]
              shadow-[inset_0_-12px_22px_rgba(105,76,55,0.13)]
            "
          >
            <div
              className="
                absolute inset-[2px]
                [clip-path:polygon(0_0,100%_0,50%_100%)]
                border-t border-white/50
                bg-[radial-gradient(circle_at_50%_4%,rgba(255,255,255,0.72),transparent_45%)]
              "
            />

            <div
              className="
                absolute left-1/2 top-[8%]
                h-[1px] w-[70%]
                -translate-x-1/2
                bg-[#bfa993]/35
              "
            />
          </div>
        </motion.div>

        <OpeningPetals active={isOpen} />

        {/* الختم */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            isOpen
              ? {
                  opacity: 0,
                  scale: 0.45,
                  rotate: -14,
                  y: 7,
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
                  duration: 0.26,
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
      </div>

      {/* النص أسفل الظرف */}
      <motion.p
        id="open-envelope-label"
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 6 : 0,
        }}
        transition={{
          duration: 0.28,
        }}
        className="
          -mt-1 px-4 py-3
          text-center text-[13px]
          text-[#74675d]
          drop-shadow-sm
        "
      >
        {isOpen
          ? intro.openingLabel
          : intro.openLabel}
      </motion.p>

      {/* منطقة الضغط */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={isOpen}
        aria-labelledby="open-envelope-label"
        className="
          absolute inset-0 z-50
          cursor-pointer rounded-[28px]
          bg-transparent
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#b68e51]/50
          focus-visible:ring-offset-4
          disabled:cursor-default
        "
      >
        <span className="sr-only">
          {intro.openLabel}
        </span>
      </button>
    </motion.div>
  );
}