import {
  motion,
  useReducedMotion,
} from "motion/react";

const smoothEase = [0.22, 1, 0.36, 1];

function LeafMark() {
  return (
    <svg
      viewBox="0 0 80 42"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-24"
    >
      <path d="M40 38C36 22 28 10 12 4" />
      <path d="M40 38C45 21 54 10 69 4" />

      <path d="M27 18c-8 0-13-4-16-10 8 0 13 4 16 10Z" />
      <path d="M53 18c8 0 13-4 16-10-8 0-13 4-16 10Z" />

      <path d="M35 28c-6-1-10-5-11-10 6 1 10 5 11 10Z" />
      <path d="M45 28c6-1 10-5 11-10-6 1-10 5-11 10Z" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[17px]"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export default function FatimaMoussaPage({
  onBack,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
      return;
    }

    window.location.hash = "/";
  };

  return (
    <main
      dir="rtl"
      className="
        relative isolate
        flex min-h-[100svh]
        items-center justify-center
        overflow-hidden
        bg-[#f2e7db]
        p-3 text-center
        sm:p-5
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          size-[560px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#fffaf4]/65
          blur-3xl
        "
      />

      <motion.section
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 24,
                scale: 0.985,
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
            : 0.9,
          ease: smoothEase,
        }}
        className="
          relative w-full
          max-w-[620px]
          overflow-hidden
          rounded-[30px]
          border border-[#b9935e]/35
          bg-[#fffaf4]
          px-6 py-14
          shadow-[0_24px_70px_rgba(96,75,61,0.1)]
          sm:px-12 sm:py-16
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-[8px]
            rounded-[23px]
            border border-[#b9935e]/18
          "
        />

        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.65,
              delay: shouldReduceMotion
                ? 0
                : 0.1,
              ease: smoothEase,
            }}
            className="
              mx-auto flex
              justify-center
              text-[#b9935e]
            "
          >
            <LeafMark />
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.7,
              delay: shouldReduceMotion
                ? 0
                : 0.2,
              ease: smoothEase,
            }}
            className="
              mt-6
              text-sm
              tracking-[0.06em]
              text-[#987a63]
            "
          >
            هذه الدعوة مقدَّمة بكل محبة من
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.8,
              delay: shouldReduceMotion
                ? 0
                : 0.3,
              ease: smoothEase,
            }}
            className="
              mt-3
              font-serif
              text-[clamp(2.6rem,12vw,4.4rem)]
              leading-[1.3]
              text-[#604b3d]
            "
          >
            فاطمة موسى
          </motion.h1>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-7
              flex items-center
              justify-center gap-3
            "
          >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#b9935e]/75" />

            <span className="size-[7px] rotate-45 border border-[#b9935e]/70 bg-[#fffaf4]" />

            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#b9935e]/75" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.75,
              delay: shouldReduceMotion
                ? 0
                : 0.42,
              ease: smoothEase,
            }}
            className="
              mx-auto mt-9
              max-w-[420px]
              rounded-[22px]
              border border-[#b9935e]/28
              bg-[#f7eee4]/70
              px-6 py-6
            "
          >
            <p
              className="
                font-serif
                text-[clamp(1.2rem,5vw,1.55rem)]
                leading-8
                text-[#604b3d]
              "
            >
              لإزالة رسالة التقدمة
            </p>

            <p
              className="
                mt-3
                text-sm
                text-[#806958]
              "
            >
              الدفع عبر
            </p>

            <p
              dir="ltr"
              className="
                font-latin
                mt-1
                text-[clamp(1.3rem,5vw,1.65rem)]
                font-medium
                tracking-[0.08em]
                text-[#b0874e]
              "
            >
              Wish Money
            </p>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleBack}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.75,
              delay: shouldReduceMotion
                ? 0
                : 0.52,
              ease: smoothEase,
            }}
            className="
              mt-10 inline-flex
              min-h-11
              cursor-pointer
              items-center justify-center
              gap-2 rounded-full
              border border-[#b9935e]/40
              bg-[#f7eee4]/75
              px-5 py-2.5
              text-sm
              text-[#806958]
              transition-colors
              hover:bg-[#fffaf4]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#b9935e]/50
              focus-visible:ring-offset-4
            "
          >
            <BackArrowIcon />
            <span>العودة إلى الدعوة</span>
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
}