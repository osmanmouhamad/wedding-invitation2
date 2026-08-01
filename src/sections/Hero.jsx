import {
  motion,
  useReducedMotion,
} from "motion/react";

import invitationData from "../data/invitationData";

const smoothEase = [0.22, 1, 0.36, 1];

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[17px]"
    >
      <path d="M12 4v15" />
      <path d="m6.5 13.5 5.5 5.5 5.5-5.5" />
    </svg>
  );
}

function DecorativeDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3"
    >
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#b9935e]/75" />
      <span className="block size-[8px] rotate-45 border border-[#b9935e]/70 bg-[#fffaf4]" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#b9935e]/75" />
    </div>
  );
}

export default function Hero({
  onShowDetails,
  detailsVisible = false,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const { couple, hero } =
    invitationData;

  return (
    <section
      dir="rtl"
      className="
        relative isolate
        flex min-h-[100svh]
        items-stretch justify-center
        overflow-hidden
        bg-[#f2e7db]
        p-2
        sm:p-3
      "
    >
      <motion.article
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 22,
                scale: 0.988,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: shouldReduceMotion
            ? 0.2
            : 1.05,
          delay: shouldReduceMotion
            ? 0
            : 0.08,
          ease: smoothEase,
        }}
        className="
          relative flex
          min-h-[calc(100svh-1rem)]
          w-full max-w-[760px]
          flex-col items-center
          overflow-hidden
          rounded-[30px]
          border border-[#b9935e]/38
          bg-[#fffaf4]
          px-5 pb-8 pt-10
          text-center
          shadow-[0_14px_40px_rgba(96,75,61,0.06)]
          sm:min-h-[calc(100svh-1.5rem)]
          sm:rounded-[34px]
          sm:px-10
          sm:pb-10
          sm:pt-12
        "
      >
        {/* Inner border */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-[8px]
            rounded-[23px]
            border border-[#b9935e]/22
            sm:inset-[10px]
            sm:rounded-[26px]
          "
        />

        <div
          className="
            relative z-10
            flex w-full max-w-[640px]
            flex-1 flex-col
            items-center
          "
        >
          {/* Basmala */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.7,
              delay: shouldReduceMotion
                ? 0
                : 0.12,
              ease: smoothEase,
            }}
            className="
              font-serif
              text-[clamp(1.05rem,4.7vw,1.35rem)]
              leading-[1.8]
              text-[#604b3d]
            "
          >
            {hero.basmala}
          </motion.p>

          {/* Verse */}
          <motion.blockquote
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.82,
              delay: shouldReduceMotion
                ? 0
                : 0.24,
              ease: smoothEase,
            }}
            className="
              mx-auto mt-5
              max-w-[540px]
              font-serif
              text-[clamp(0.88rem,3.5vw,1.05rem)]
              leading-[2.15]
              text-[#735d4d]
            "
          >
            {hero.verse}
          </motion.blockquote>

          {/* Verse reference */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.65,
              delay: shouldReduceMotion
                ? 0
                : 0.38,
            }}
            className="
              mt-3
              font-serif
              text-[clamp(0.84rem,3vw,0.95rem)]
              text-[#8f735d]
            "
          >
            {hero.verseReference}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.86 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.75,
              delay: shouldReduceMotion
                ? 0
                : 0.48,
              ease: smoothEase,
            }}
            className="mt-8"
          >
            <DecorativeDivider />
          </motion.div>

          {/* Couple names */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.9,
              delay: shouldReduceMotion
                ? 0
                : 0.56,
              ease: smoothEase,
            }}
            className="mt-9 flex w-full flex-col items-center"
          >
            {/* Groom */}
            <p
              className="
                font-serif
                text-[clamp(2.35rem,11vw,4.35rem)]
                leading-[1.08]
                text-[#604b3d]
              "
            >
              {couple.groomName}
            </p>

            {/* Separator */}
            <div className="my-3 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-12 bg-gradient-to-r from-transparent to-[#b9935e]"
              />
              <span
                className="
                  font-serif
                  text-[clamp(1.1rem,4.3vw,1.4rem)]
                  leading-none
                  text-[#b9935e]
                "
              >
                و
              </span>
              <span
                aria-hidden="true"
                className="h-px w-12 bg-gradient-to-l from-transparent to-[#b9935e]"
              />
            </div>

            {/* Bride */}
            <p
              className="
                font-serif
                text-[clamp(2.35rem,11vw,4.35rem)]
                leading-[1.08]
                text-[#604b3d]
              "
            >
              {couple.brideName}
            </p>
          </motion.div>

          {/* Button */}
          <motion.button
            type="button"
            onClick={onShowDetails}
            disabled={detailsVisible}
            aria-expanded={detailsVisible}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={
              detailsVisible
                ? undefined
                : { y: -1 }
            }
            whileTap={
              detailsVisible
                ? undefined
                : { scale: 0.985 }
            }
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.8,
              delay: shouldReduceMotion
                ? 0
                : 0.68,
              ease: smoothEase,
            }}
            className="
              mt-auto
              inline-flex min-h-12
              items-center justify-center
              gap-2
              rounded-full
              border border-[#c8a36d]/65
              bg-[#f6eee2]
              px-6 py-3
              text-[clamp(0.84rem,3.2vw,0.95rem)]
              font-medium
              text-[#604b3d]
              shadow-[0_8px_20px_rgba(96,75,61,0.05)]
              transition-colors
              hover:bg-[#fbf6ef]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#b9935e]/55
              focus-visible:ring-offset-4
              disabled:cursor-default
              disabled:opacity-65
            "
          >
            <span>{hero.scrollLabel}</span>
            <ArrowDownIcon />
          </motion.button>
        </div>
      </motion.article>
    </section>
  );
}