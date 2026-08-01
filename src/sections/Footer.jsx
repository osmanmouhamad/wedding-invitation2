import {
  motion,
  useReducedMotion,
} from "motion/react";

import OrnamentDivider from "../components/ui/OrnamentDivider";
import invitationData from "../data/invitationData";

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
      className="h-10 w-20"
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

function CoupleSignature({
  groomName,
  brideName,
}) {
  return (
    <div
      className="
        mt-9 flex
        flex-col items-center
      "
    >
      <div
        aria-hidden="true"
        className="
          flex items-center
          justify-center gap-3
        "
      >
        <span
          className="
            h-px w-14
            bg-gradient-to-r
            from-transparent
            to-[#b9935e]/75
          "
        />

        <span
          className="
            size-[7px]
            rotate-45
            border border-[#b9935e]/75
            bg-[#fffaf4]
          "
        />

        <span
          className="
            h-px w-14
            bg-gradient-to-l
            from-transparent
            to-[#b9935e]/75
          "
        />
      </div>

      <div
        className="
          mt-5 flex
          flex-wrap items-center
          justify-center gap-x-3 gap-y-2
        "
      >
        <span
          className="
            font-serif
            text-[clamp(1.8rem,7vw,2.45rem)]
            leading-none
            text-[#604b3d]
          "
        >
          {groomName}
        </span>

        <span
          className="
            flex items-center
            gap-2
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px w-5
              bg-[#b9935e]/65
            "
          />

          <span
            className="
              font-serif
              text-[1.15rem]
              text-[#b9935e]
            "
          >
            و
          </span>

          <span
            aria-hidden="true"
            className="
              h-px w-5
              bg-[#b9935e]/65
            "
          />
        </span>

        <span
          className="
            font-serif
            text-[clamp(1.8rem,7vw,2.45rem)]
            leading-none
            text-[#604b3d]
          "
        >
          {brideName}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="
          mt-5 flex
          items-center justify-center
          gap-2 text-[#b9935e]/75
        "
      >
        <span className="h-px w-7 bg-current" />
        <span className="text-[0.65rem]">
          ✦
        </span>
        <span className="h-px w-7 bg-current" />
      </div>
    </div>
  );
}

export default function Footer({
  onOpenCredit,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const { couple, footer } =
    invitationData;

  const groomFirstName =
    couple?.groomName
      ?.trim()
      .split(/\s+/)[0] || "علي";

  const brideFirstName =
    couple?.brideName
      ?.trim()
      .split(/\s+/)[0] || "منة";

  const handleOpenCredit = () => {
    if (
      typeof onOpenCredit === "function"
    ) {
      onOpenCredit();
      return;
    }

    window.location.hash =
      "/fatima-moussa";
  };

  return (
    <footer
      dir="rtl"
      className="
        relative overflow-hidden
        bg-[#f2e7db]
        px-4 py-20
        text-center
        sm:px-6 sm:py-24
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-[35%]
          size-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#fffaf4]/55
          blur-3xl
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: shouldReduceMotion
            ? 0
            : 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: shouldReduceMotion
            ? 0.2
            : 0.75,
        }}
        className="
          relative mx-auto
          max-w-2xl
          overflow-hidden
          rounded-[30px]
          border border-[#b9935e]/32
          bg-[#fffaf4]/82
          px-6 py-12
          shadow-[0_18px_55px_rgba(96,75,61,0.08)]
          backdrop-blur-sm
          sm:px-10 sm:py-14
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-[8px]
            rounded-[23px]
            border border-[#b9935e]/16
          "
        />

        <div className="relative z-10">
          <span
            className="
              mx-auto flex
              justify-center
              text-[#b9935e]
            "
          >
            <LeafMark />
          </span>

          <p
            className="
              mt-5
              font-serif
              text-[clamp(1.55rem,6vw,2.15rem)]
              leading-[1.6]
              text-[#604b3d]
            "
          >
            {footer.welcomeMessage}
          </p>

          <p
            className="
              mx-auto mt-4
              max-w-xl
              whitespace-pre-line
              text-sm
              leading-8
              text-[#806958]
            "
          >
            {footer.message}
          </p>

          <OrnamentDivider
            tone="gold"
            size="small"
            className="mt-8"
          />

          <CoupleSignature
            groomName={groomFirstName}
            brideName={brideFirstName}
          />

          <p
            className="
              mt-4 text-sm
              text-[#806958]
            "
          >
            {footer.closingMessage}
          </p>

          <motion.button
            type="button"
            onClick={handleOpenCredit}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="
              group mx-auto mt-10
              inline-flex
              cursor-pointer
              flex-col items-center
              rounded-[20px]
              border border-[#b9935e]/30
              bg-[#f8efe5]/70
              px-8 py-4
              text-center
              shadow-[0_10px_28px_rgba(96,75,61,0.06)]
              transition-colors
              hover:bg-[#fffaf4]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#b9935e]/50
              focus-visible:ring-offset-4
            "
            aria-label="فتح صفحة فاطمة موسى"
          >
            <span
              className="
                text-[0.72rem]
                tracking-[0.08em]
                text-[#9b806b]
              "
            >
              تقدمة
            </span>

            <span
              className="
                mt-1
                font-serif
                text-[clamp(1.35rem,5vw,1.7rem)]
                text-[#604b3d]
                transition-colors
                group-hover:text-[#8b683f]
              "
            >
              فاطمة موسى
            </span>

            <span
              aria-hidden="true"
              className="
                mt-2 h-px w-12
                bg-gradient-to-r
                from-transparent
                via-[#b9935e]
                to-transparent
                transition-all
                group-hover:w-20
              "
            />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}