import { motion, useReducedMotion } from "motion/react";

import invitationData, { introTiming } from "../data/invitationData";

const slowEase = [0.22, 1, 0.36, 1];

const closedPanelState = {
  x: "0%",
  y: "0%",
  rotate: 0,
  scaleY: 1,
  opacity: 1,
};

const envelopePanels = [
  {
    name: "left",
    delay: 0.18,
    times: [0, 0.3, 0.72, 1],
    animation: {
      x: ["0%", "-6%", "-16%", "-24%"],
      rotate: [0, -1, -3, -4],
      opacity: [1, 0.96, 0.48, 0],
    },
    style: {
      left: "3%",
      top: "6%",
      bottom: "7%",
      width: "49%",
      zIndex: 20,
      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
      transformOrigin: "left center",
      background: "linear-gradient(115deg, #f3e7da 0%, #d5bca6 100%)",
    },
    shine: "linear-gradient(90deg, rgba(255,255,255,0.22), transparent)",
  },
  {
    name: "right",
    delay: 0.18,
    times: [0, 0.3, 0.72, 1],
    animation: {
      x: ["0%", "6%", "16%", "24%"],
      rotate: [0, 1, 3, 4],
      opacity: [1, 0.96, 0.48, 0],
    },
    style: {
      right: "3%",
      top: "6%",
      bottom: "7%",
      width: "49%",
      zIndex: 20,
      clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
      transformOrigin: "right center",
      background: "linear-gradient(245deg, #f3e7da 0%, #d5bca6 100%)",
    },
    shine: "linear-gradient(270deg, rgba(255,255,255,0.22), transparent)",
  },
  {
    name: "bottom",
    delay: 0.28,
    times: [0, 0.32, 0.74, 1],
    animation: {
      y: ["0%", "7%", "19%", "28%"],
      opacity: [1, 0.96, 0.46, 0],
    },
    style: {
      left: "3%",
      right: "3%",
      bottom: "7%",
      height: "53%",
      zIndex: 24,
      clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
      transformOrigin: "bottom center",
      background: "linear-gradient(180deg, #f1e2d2 0%, #d1b59e 100%)",
    },
    shine: "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 55%)",
  },
  {
    name: "top",
    delay: 0.04,
    times: [0, 0.28, 0.7, 1],
    animation: {
      y: ["0%", "-8%", "-23%", "-34%"],
      scaleY: [1, 0.98, 0.93, 0.88],
      opacity: [1, 0.94, 0.4, 0],
    },
    style: {
      left: "3%",
      right: "3%",
      top: "6%",
      height: "52%",
      zIndex: 32,
      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
      transformOrigin: "top center",
      background: "linear-gradient(180deg, #f2e5d6 0%, #d4bba5 100%)",
    },
    shine:
      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.55), transparent 52%)",
  },
];

function EnvelopePanel({ panel, isOpen, shouldReduceMotion }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={isOpen ? panel.animation : closedPanelState}
      transition={{
        duration: shouldReduceMotion ? 0.2 : introTiming.envelopeOpenSeconds,
        delay: isOpen && !shouldReduceMotion ? panel.delay : 0,
        times: isOpen ? panel.times : undefined,
        ease: slowEase,
      }}
      style={panel.style}
      className="absolute will-change-transform"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: panel.shine }}
      />
    </motion.div>
  );
}

export default function Envelope({ isOpen = false, onOpen }) {
  const shouldReduceMotion = useReducedMotion();
  const { couple, intro } = invitationData;

  const [groomLetter = "A", brideLetter = "M"] = couple.sealLetters ?? [];

  const handleOpen = () => {
    if (isOpen) return;
    onOpen?.();
  };

  const containerAnimation = shouldReduceMotion
    ? isOpen
      ? { opacity: 0 }
      : { opacity: 1 }
    : isOpen
      ? {
          opacity: [1, 1, 1, 0],
          scale: [1, 1.01, 1.035, 1.055],
          y: [0, -2, -6, -10],
        }
      : {
          opacity: 1,
          scale: 1,
          y: 0,
        };

  return (
    <motion.div
      initial={false}
      animate={containerAnimation}
      transition={{
        duration: shouldReduceMotion ? 0.2 : introTiming.envelopeExitSeconds,
        times: shouldReduceMotion ? undefined : [0, 0.67, 0.82, 1],
        ease: slowEase,
      }}
      className="relative w-full max-w-[410px] will-change-transform"
    >
      <div className="relative aspect-[1.42] w-full">
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            isOpen
              ? {
                  opacity: [0.22, 0.16, 0],
                  scaleX: [1, 0.88, 0.7],
                  y: [0, 7, 14],
                }
              : {
                  opacity: 0.22,
                  scaleX: 1,
                  y: 0,
                }
          }
          transition={{
            duration: shouldReduceMotion
              ? 0.2
              : introTiming.envelopeOpenSeconds,
            times: isOpen ? [0, 0.58, 1] : undefined,
            ease: slowEase,
          }}
          style={{ x: "-50%" }}
          className="absolute bottom-[1%] left-1/2 h-[9%] w-[82%] rounded-full bg-[#5d4332] blur-xl"
        />

        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            isOpen
              ? {
                  opacity: [1, 0.94, 0.42, 0],
                  scale: [1, 1.01, 1.02, 1.025],
                }
              : {
                  opacity: 1,
                  scale: 1,
                }
          }
          transition={{
            duration: shouldReduceMotion
              ? 0.2
              : introTiming.envelopeOpenSeconds,
            delay: isOpen && !shouldReduceMotion ? 0.12 : 0,
            times: isOpen ? [0, 0.5, 0.8, 1] : undefined,
            ease: slowEase,
          }}
          className="absolute inset-x-[3%] bottom-[7%] top-[6%] z-10 overflow-hidden rounded-[12px] border border-[#cbb39d]/80 bg-[linear-gradient(145deg,#f3e7d9_0%,#dfcbb8_48%,#d5bba4_100%)] shadow-[0_18px_30px_rgba(75,52,37,0.17)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.7),transparent_34%),linear-gradient(135deg,transparent_35%,rgba(112,77,52,0.055)_100%)]" />

          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: isOpen ? [0, 0.9, 0.2] : 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0.2
                : introTiming.envelopeOpenSeconds,
              times: isOpen ? [0, 0.32, 1] : undefined,
            }}
            className="absolute inset-x-[8%] top-[7%] h-[25%] rounded-[50%] bg-[#70503b]/20 blur-md"
          />
        </motion.div>

        <motion.article
          initial={false}
          animate={
            isOpen
              ? {
                  opacity: [0, 0.15, 1, 1],
                  y: ["12%", "5%", "-7%", "-13%"],
                  scale: [0.93, 0.97, 1.05, 1.09],
                }
              : {
                  opacity: 0,
                  y: "12%",
                  scale: 0.93,
                }
          }
          transition={{
            duration: shouldReduceMotion
              ? 0.2
              : introTiming.envelopeOpenSeconds,
            delay: isOpen && !shouldReduceMotion ? 0.18 : 0,
            times: isOpen ? [0, 0.12, 0.34, 1] : undefined,
            ease: slowEase,
          }}
          style={{ x: "-50%" }}
          className="absolute left-1/2 top-[15%] z-[28] h-[68%] w-[72%] overflow-hidden rounded-[7px] border border-[#d9c6b3] bg-[#fffaf2] shadow-[0_18px_38px_rgba(73,50,35,0.2)] will-change-transform"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.96),transparent_38%),linear-gradient(145deg,rgba(199,166,132,0.09),transparent_52%)]" />

          <div className="pointer-events-none absolute inset-[7px] rounded-[3px] border border-[#c9ab82]/30" />

          <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
            <span
              dir="ltr"
              className="font-latin mb-2 text-[clamp(0.5rem,2vw,0.62rem)] tracking-[0.25em] text-[#a48a71]"
            >
              {intro.cardEyebrow}
            </span>

            <bdi
              dir="ltr"
              className="font-latin text-[clamp(1.85rem,8vw,2.45rem)] leading-none tracking-[0.04em] text-[#755d49]"
            >
              {couple.monogram}
            </bdi>

            <div className="my-3 h-px w-14 bg-gradient-to-r from-transparent via-[#bf9b65] to-transparent" />

            <p className="font-serif text-[clamp(1.1rem,4.8vw,1.4rem)] leading-7 text-[#715947]">
              {intro.cardTitle}
            </p>
          </div>
        </motion.article>

        {envelopePanels.map((panel) => (
          <EnvelopePanel
            key={panel.name}
            panel={panel}
            isOpen={isOpen}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[51%] z-40 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    opacity: 0,
                    scale: 0.5,
                    rotate: -12,
                    y: 7,
                  }
                : shouldReduceMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      y: 0,
                    }
                  : {
                      opacity: 1,
                      scale: [1, 1.05, 1],
                      rotate: 0,
                      y: 0,
                    }
            }
            transition={
              isOpen
                ? {
                    duration: shouldReduceMotion ? 0.2 : 0.48,
                    ease: "easeIn",
                  }
                : {
                    duration: 2.1,
                    repeat: Infinity,
                    repeatDelay: 1.6,
                    ease: "easeInOut",
                  }
            }
          >
            <span className="gold-seal">
              <span className="gold-seal__center">
                <span dir="ltr" className="gold-seal__monogram">
                  <span className="gold-seal__letter gold-seal__letter--a">
                    {groomLetter}
                  </span>

                  <span className="gold-seal__letter gold-seal__letter--m">
                    {brideLetter}
                  </span>
                </span>
              </span>
            </span>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpen}
          aria-label={intro.openLabel}
          className="absolute inset-0 z-50 cursor-pointer rounded-[18px] bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b48d54]/60 focus-visible:ring-offset-4 disabled:pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
