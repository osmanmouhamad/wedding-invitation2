import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import OrnamentDivider from "../components/ui/OrnamentDivider";
import invitationData from "../data/invitationData";

const smoothEase = [0.22, 1, 0.36, 1];

function getRemainingTime(targetDate) {
  const targetTime =
    new Date(targetDate).getTime();

  if (Number.isNaN(targetTime)) {
    return {
      isFinished: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const difference = Math.max(
    targetTime - Date.now(),
    0,
  );

  return {
    isFinished: difference === 0,

    days: Math.floor(
      difference /
        (1000 * 60 * 60 * 24),
    ),

    hours: Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24,
    ),

    minutes: Math.floor(
      (difference /
        (1000 * 60)) %
        60,
    ),

    seconds: Math.floor(
      (difference / 1000) % 60,
    ),
  };
}

function TimeUnit({
  value,
  label,
  index,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion
          ? 0
          : 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.45,
      }}
      transition={{
        duration: shouldReduceMotion
          ? 0.2
          : 0.65,

        delay: shouldReduceMotion
          ? 0
          : index * 0.08,

        ease: smoothEase,
      }}
      className="
        relative min-w-0
        overflow-hidden
        rounded-[22px]
        border border-[#b9935e]/30
        bg-[#fffaf4]
        px-2 py-5
        text-center
        shadow-[0_12px_30px_rgba(96,75,61,0.08)]
        sm:px-4 sm:py-6
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-[5px]
          rounded-[17px]
          border border-[#b9935e]/12
        "
      />

      <span
        className="
          font-latin
          relative block
          text-[clamp(1.8rem,8vw,2.8rem)]
          leading-none
          tracking-[0.04em]
          text-[#604b3d]
        "
      >
        {String(value).padStart(
          2,
          "0",
        )}
      </span>

      <span
        className="
          relative mt-2 block
          text-[0.72rem]
          font-medium
          text-[#8f735d]
          sm:text-sm
        "
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const shouldReduceMotion =
    useReducedMotion();

  const { event, countdown } =
    invitationData;

  const [timeLeft, setTimeLeft] =
    useState(() =>
      getRemainingTime(
        event.startsAt,
      ),
    );

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setTimeLeft(
          getRemainingTime(
            event.startsAt,
          ),
        );
      }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [event.startsAt]);

  const timeUnits = [
    {
      value: timeLeft.days,
      label: "يوم",
    },
    {
      value: timeLeft.hours,
      label: "ساعة",
    },
    {
      value: timeLeft.minutes,
      label: "دقيقة",
    },
    {
      value: timeLeft.seconds,
      label: "ثانية",
    },
  ];

  return (
    <section
      dir="rtl"
      className="
        relative overflow-hidden
        bg-[#f2e7db]
        px-4 py-20
        text-center
        sm:px-6 sm:py-28
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-[38%]
          size-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#fffaf4]/45
          blur-3xl
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: shouldReduceMotion
            ? 0
            : 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: shouldReduceMotion
            ? 0.2
            : 0.9,

          ease: smoothEase,
        }}
        className="
          relative mx-auto
          max-w-4xl
          overflow-hidden
          rounded-[30px]
          border border-[#b9935e]/32
          bg-[#fffaf4]/78
          px-4 py-12
          shadow-[0_18px_55px_rgba(96,75,61,0.08)]
          backdrop-blur-sm
          sm:px-10 sm:py-16
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-[8px]
            rounded-[23px]
            border border-[#b9935e]/15
          "
        />

        <div className="relative z-10">
          <motion.p
            initial={{
              opacity: 0,
              y: shouldReduceMotion
                ? 0
                : 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.65,
            }}
            dir="ltr"
            className="
              font-latin
              text-xs
              tracking-[0.28em]
              text-[#b9935e]
            "
          >
            {countdown.eyebrow}
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: shouldReduceMotion
                ? 0
                : 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.75,

              delay: shouldReduceMotion
                ? 0
                : 0.08,

              ease: smoothEase,
            }}
            className="
              mt-4
              font-serif
              text-[clamp(2rem,8vw,3.15rem)]
              leading-[1.4]
              text-[#604b3d]
            "
          >
            {countdown.title}
          </motion.h2>

          <OrnamentDivider
            tone="gold"
            className="mt-8"
          />

          {timeLeft.isFinished ? (
            <motion.p
              initial={{
                opacity: 0,
                scale:
                  shouldReduceMotion
                    ? 1
                    : 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                mt-12
                font-serif
                text-[clamp(1.8rem,7vw,2.6rem)]
                text-[#604b3d]
              "
            >
              {
                countdown.finishedMessage
              }
            </motion.p>
          ) : (
            <div
              className="
                mt-12 grid
                grid-cols-4
                gap-2
                sm:gap-4
              "
            >
              {timeUnits.map(
                (unit, index) => (
                  <TimeUnit
                    key={unit.label}
                    value={unit.value}
                    label={unit.label}
                    index={index}
                  />
                ),
              )}
            </div>
          )}

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : 0.75,

              delay: shouldReduceMotion
                ? 0
                : 0.22,
            }}
            className="
              mx-auto mt-10
              max-w-xl
              text-[0.94rem]
              leading-8
              text-[#806958]
            "
          >
            {
              countdown.supportingText
            }
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}