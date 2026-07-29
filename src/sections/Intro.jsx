import { useState } from "react";
import { motion } from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import envelopeBody from "../assets/envelope/envelope-body.svg";
import envelopeFlap from "../assets/envelope/envelope-flap.svg";

export default function Intro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;

    setIsOpening(true);
    onOpen?.();
  };

  return (
    <section
      dir="rtl"
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
        className="
          pointer-events-none absolute inset-0
          h-full w-full select-none
          object-cover object-center
        "
      />

      {/* Soft overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-white/[0.03]
        "
      />

      <div
        className="
          relative z-10 flex min-h-[100svh] w-full
          max-w-[460px] flex-col items-center justify-center
          px-5 pb-8 pt-6
        "
      >
        <div className="flex w-full flex-col items-center">
          {/* Envelope */}
          <div
            className="
              relative aspect-[1000/700]
              w-full max-w-[400px]
            "
          >
            {/* Invitation card */}
            <div
              className="
                absolute left-1/2 top-[16%] z-10
                h-[56%] w-[67%]
                -translate-x-1/2
                overflow-hidden rounded-[3px]
                border border-[#d8c7b5]/70
                bg-[#fffaf3]
                shadow-[0_14px_32px_rgba(85,63,47,0.15)]
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
                  className="
                    mb-2 text-[8px]
                    tracking-[0.3em]
                    text-[#aa9178]
                  "
                >
                  WEDDING INVITATION
                </span>

                <p className="font-serif text-xl text-[#765f4c]">
                  بطاقة الدعوة
                </p>
              </div>
            </div>

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
            <img
              src={envelopeFlap}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="
                pointer-events-none absolute
                inset-x-0 top-[11%] z-30
                block h-auto w-full select-none
                drop-shadow-[0_2px_2px_rgba(75,55,40,0.06)]
              "
            />

            {/* CSS seal */}
            <motion.button
              type="button"
              onClick={handleOpenEnvelope}
              disabled={isOpening}
              aria-label="فتح الدعوة"
              animate={
                isOpening
                  ? {
                      scale: 0.72,
                      opacity: 0,
                    }
                  : {
                      scale: [1, 1.035, 1],
                      opacity: 1,
                    }
              }
              transition={
                isOpening
                  ? {
                      duration: 0.3,
                      ease: "easeIn",
                    }
                  : {
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 1.8,
                      ease: "easeInOut",
                    }
              }
              className="
                absolute left-1/2 top-[50%] z-40
                -translate-x-1/2 -translate-y-1/2
                cursor-pointer rounded-full
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-[#c59a45]/25
                disabled:pointer-events-none
              "
            >
              <span className="gold-seal" aria-hidden="true">
                <span className="gold-seal__center">
                  <span className="gold-seal__letters">
                    <span className="gold-seal__m">M</span>
                    <span className="gold-seal__a">A</span>
                  </span>
                </span>
              </span>
            </motion.button>
          </div>

          {/* Instruction */}
          <motion.button
            type="button"
            onClick={handleOpenEnvelope}
            disabled={isOpening}
            animate={{
              opacity: isOpening ? 0 : 1,
              y: isOpening ? 5 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              -mt-1 cursor-pointer
              px-4 py-3
              text-center text-[13px]
              font-normal text-[#78695c]
              drop-shadow-sm
              transition-opacity duration-200
              hover:opacity-70
              active:opacity-50
              disabled:pointer-events-none
            "
          >
            اضغط لفتح الدعوة
          </motion.button>
        </div>
      </div>
    </section>
  );
}