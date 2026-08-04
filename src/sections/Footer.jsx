import {
  motion,
  useReducedMotion,
} from "motion/react";

import OrnamentDivider from "../components/ui/OrnamentDivider";
import invitationData from "../data/invitationData";

function LeafMark({
  mirrored = false,
  className = "",
}) {
  return (
    <svg
      viewBox="0 0 80 42"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`
        h-10 w-20
        ${mirrored ? "-scale-x-100" : ""}
        ${className}
      `}
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
    <div className="mt-8">
      <div
        className="
          flex flex-wrap
          items-center justify-center
          gap-x-4 gap-y-3
        "
      >
        <span
          className="
            font-serif
            text-[clamp(1.9rem,8vw,2.8rem)]
            leading-none
            text-[#604b3d]
          "
        >
          {groomName}
        </span>

        <span
          aria-hidden="true"
          className="
            flex size-10
            items-center justify-center
            rounded-full
            border border-[#b9935e]/35
            bg-[#fffaf4]/70
            font-serif text-lg
            text-[#b9935e]
          "
        >
          و
        </span>

        <span
          className="
            font-serif
            text-[clamp(1.9rem,8vw,2.8rem)]
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
          mt-6 flex
          items-center justify-center
          gap-3 text-[#b9935e]/75
        "
      >
        <span
          className="
            h-px w-12
            bg-gradient-to-r
            from-transparent
            to-current
          "
        />

        <span className="text-[0.65rem]">
          ✦
        </span>

        <span
          className="
            h-px w-12
            bg-gradient-to-l
            from-transparent
            to-current
          "
        />
      </div>
    </div>
  );
}

export default function Footer() {
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

  const itemAnimation = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.3,
    },
    transition: {
      duration: shouldReduceMotion
        ? 0.2
        : 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <footer
      dir="rtl"
      className="
        relative isolate
        overflow-hidden
        bg-[#f2e7db]
        px-5 pb-12 pt-20
        text-center
        sm:px-8 sm:pb-14
        sm:pt-24
      "
    >
      {/* إضاءة خلفية ناعمة */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-[38%]
          -z-20
          size-[540px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#fffaf4]/65
          blur-3xl
        "
      />

      {/* زخارف جانبية */}
      <LeafMark
        className="
          pointer-events-none
          absolute -bottom-1
          -right-5
          -z-10
          scale-[2.4]
          rotate-[-10deg]
          text-[#b9935e]/15
        "
      />

      <LeafMark
        mirrored
        className="
          pointer-events-none
          absolute -bottom-1
          -left-5
          -z-10
          scale-[2.4]
          rotate-[10deg]
          text-[#b9935e]/15
        "
      />

      {/* الخط العلوي */}
      <div
        aria-hidden="true"
        className="
          absolute left-1/2 top-0
          h-px w-[78%]
          max-w-3xl
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#b9935e]/45
          to-transparent
        "
      />

      <div
        className="
          relative mx-auto
          max-w-2xl
        "
      >
        <motion.div {...itemAnimation}>
          <span
            className="
              mx-auto flex
              justify-center
              text-[#b9935e]
            "
          >
            <LeafMark />
          </span>
        </motion.div>

        <motion.p
          {...itemAnimation}
          transition={{
            ...itemAnimation.transition,
            delay: 0.08,
          }}
          className="
            mt-5
            font-serif
            text-[clamp(1.7rem,7vw,2.5rem)]
            leading-[1.6]
            text-[#604b3d]
          "
        >
          {footer?.welcomeMessage ||
            "بفرحٍ كبير ننتظر حضوركم"}
        </motion.p>

        <motion.p
          {...itemAnimation}
          transition={{
            ...itemAnimation.transition,
            delay: 0.16,
          }}
          className="
            mx-auto mt-4
            max-w-xl
            whitespace-pre-line
            text-sm
            leading-8
            text-[#806958]
            sm:text-base sm:leading-9
          "
        >
          {footer?.message}
        </motion.p>

        <motion.div
          {...itemAnimation}
          transition={{
            ...itemAnimation.transition,
            delay: 0.24,
          }}
        >
          <OrnamentDivider
            tone="gold"
            size="small"
            className="mt-8"
          />
        </motion.div>

        <motion.div
          {...itemAnimation}
          transition={{
            ...itemAnimation.transition,
            delay: 0.32,
          }}
        >
          <CoupleSignature
            groomName={groomFirstName}
            brideName={brideFirstName}
          />
        </motion.div>

        <motion.p
          {...itemAnimation}
          transition={{
            ...itemAnimation.transition,
            delay: 0.4,
          }}
          className="
            mx-auto mt-5
            max-w-md
            font-serif
            text-[1.05rem]
            leading-8
            text-[#806958]
            sm:text-lg
          "
        >
          {footer?.closingMessage ||
            "بوجودكم تكتمل فرحتنا"}
        </motion.p>

        <motion.div
          {...itemAnimation}
          transition={{
            ...itemAnimation.transition,
            delay: 0.48,
          }}
          aria-hidden="true"
          className="
            mt-8 flex
            items-center justify-center
            gap-3 text-[#b9935e]/65
          "
        >
          <span
            className="
              h-px w-16
              bg-gradient-to-r
              from-transparent
              to-current
            "
          />

          <span className="text-xs">
            ◇
          </span>

          <span
            className="
              h-px w-16
              bg-gradient-to-l
              from-transparent
              to-current
            "
          />
        </motion.div>
      </div>

    <div
  className="
    relative mt-14
    flex flex-col
    items-center
    text-center
  "
>
  <p
    className="
      font-serif
      text-[clamp(1.45rem,6vw,2rem)]
      leading-relaxed
      text-[#604b3d]
    "
  >
     منّي ومن فاطمة نقول لكم :
  </p>

  <span
    aria-hidden="true"
    className="
      my-4 h-px w-20
      bg-gradient-to-r
      from-transparent
      via-[#b9935e]/80
      to-transparent
    "
  />

  <p
    className="
      max-w-lg
      font-serif
      text-sm
      leading-8
      text-[#806958]/80
      sm:text-base
    "
  >
    بارك الله لكما وعليكما، وجمع بينكما في خير
  </p>
</div>
    </footer>
  );
}