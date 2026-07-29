import {
  motion,
  useReducedMotion,
} from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import invitationData from "../data/invitationData";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const { couple, hero } = invitationData;

  return (
    <section
      dir="rtl"
      className="
        relative isolate flex min-h-[100svh]
        items-center justify-center overflow-hidden
        px-5 py-10
      "
    >
      <img
        src={introBackground}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        className="
          pointer-events-none absolute inset-0 -z-20
          h-full w-full select-none
          object-cover object-center
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(180deg,rgba(255,252,248,0.2),rgba(246,237,229,0.82))]
        "
      />

      <motion.div
        initial={
          shouldReduceMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: 20,
                scale: 0.98,
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
            : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          w-full max-w-[430px]
          rounded-[32px]
          border border-white/65
          bg-white/55
          px-7 py-12 text-center
          shadow-[0_30px_80px_rgba(100,72,52,0.16)]
          backdrop-blur-md
        "
      >
        <p
          className="
            mb-5 text-[11px] font-medium
            tracking-[0.28em]
            text-[#9a7f68]
          "
        >
          {hero.eyebrow}
        </p>

        <div
          className="
            mx-auto mb-7 grid size-24
            place-items-center rounded-full
            border border-[#cba866]/45
            bg-[#fffaf2]/80
            shadow-[inset_0_0_0_7px_rgba(203,168,102,0.08)]
          "
        >
          <span
            dir="ltr"
            className="
              font-serif text-3xl
              text-[#80684f]
            "
          >
            {couple.initials}
          </span>
        </div>

        <h1
          className="
            font-serif
            text-[clamp(2rem,9vw,3.1rem)]
            leading-tight text-[#6f5948]
          "
        >
          {hero.title}
        </h1>

        <div
          className="
            mx-auto my-6 h-px w-16
            bg-gradient-to-r
            from-transparent
            via-[#c7a46a]
            to-transparent
          "
        />

        <p
          className="
            mx-auto max-w-[300px]
            text-[15px] leading-8
            text-[#77685d]
          "
        >
          {hero.subtitle}
        </p>
      </motion.div>
    </section>
  );
}