import {
  motion,
  useReducedMotion,
} from "motion/react";

import invitationData from "../data/invitationData";

const slowEase = [
  0.22,
  1,
  0.36,
  1,
];

export default function Envelope({
  isOpen = false,
  onOpen,
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const { couple, intro } =
    invitationData;

  const [
    groomLetter,
    brideLetter,
  ] = couple.sealLetters;

  const openingDuration =
    shouldReduceMotion
      ? 0.2
      : 4.8;

  const handleOpen = () => {
    if (isOpen) return;

    onOpen?.();
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isOpen
          ? [
              1,
              1,
              1,
              0,
            ]
          : 1,

        scale: isOpen
          ? [
              1,
              1.01,
              1.035,
              1.055,
            ]
          : 1,

        y: isOpen
          ? [
              0,
              -2,
              -6,
              -12,
            ]
          : 0,
      }}
      transition={{
        duration: shouldReduceMotion
          ? 0.25
          : 5.8,

        times: [
          0,
          0.55,
          0.78,
          1,
        ],

        ease: slowEase,
      }}
      className="
        relative w-full
        max-w-[410px]
        will-change-transform
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
          initial={false}
          animate={{
            opacity: isOpen
              ? [
                  0.22,
                  0.16,
                  0,
                ]
              : 0.22,

            scaleX: isOpen
              ? [
                  1,
                  0.88,
                  0.72,
                ]
              : 1,

            y: isOpen
              ? [
                  0,
                  7,
                  14,
                ]
              : 0,
          }}
          transition={{
            duration:
              openingDuration,

            times: [
              0,
              0.58,
              1,
            ],

            ease: slowEase,
          }}
          style={{
            x: "-50%",
          }}
          className="
            absolute bottom-[1%]
            left-1/2
            h-[9%] w-[82%]
            rounded-full
            bg-[#5d4332]
            blur-xl
          "
        />

        {/* Envelope base */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: isOpen
              ? [
                  1,
                  0.9,
                  0.18,
                ]
              : 1,

            scale: isOpen
              ? [
                  1,
                  1.012,
                  1.02,
                ]
              : 1,
          }}
          transition={{
            duration:
              openingDuration,

            delay: isOpen
              ? 0.15
              : 0,

            times: [
              0,
              0.6,
              1,
            ],

            ease: "easeOut",
          }}
          className="
            absolute inset-x-[3%]
            bottom-[7%] top-[6%]
            overflow-hidden
            rounded-[12px]
            border
            border-[#cbb39d]/80
            bg-[linear-gradient(145deg,#f3e7d9_0%,#dfcbb8_48%,#d5bba4_100%)]
            shadow-[0_18px_30px_rgba(75,52,37,0.17)]
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.7),transparent_34%),linear-gradient(135deg,transparent_35%,rgba(112,77,52,0.055)_100%)]
            "
          />

          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: isOpen
                ? [
                    0,
                    1,
                    0.25,
                  ]
                : 0,
            }}
            transition={{
              duration:
                openingDuration,

              times: [
                0,
                0.35,
                1,
              ],
            }}
            className="
              absolute inset-x-[8%]
              top-[7%] h-[25%]
              rounded-[50%]
              bg-[#70503b]/20
              blur-md
            "
          />
        </motion.div>

        {/* Invitation card */}
        <motion.article
          initial={false}
          animate={{
            opacity: isOpen
              ? [
                  0,
                  1,
                  1,
                  1,
                ]
              : 0,

            y: isOpen
              ? [
                  "10%",
                  "-1%",
                  "-9%",
                  "-12%",
                ]
              : "10%",

            scale: isOpen
              ? [
                  0.94,
                  1.01,
                  1.06,
                  1.08,
                ]
              : 0.94,
          }}
          transition={{
            duration:
              openingDuration,

            delay: isOpen
              ? 0.2
              : 0,

            times: [
              0,
              0.24,
              0.72,
              1,
            ],

            ease: slowEase,
          }}
          style={{
            x: "-50%",
          }}
          className="
            absolute left-1/2
            top-[18%] z-10
            h-[63%] w-[70%]
            overflow-hidden
            rounded-[7px]
            border
            border-[#d9c6b3]
            bg-[#fffaf2]
            shadow-[0_18px_38px_rgba(73,50,35,0.2)]
            will-change-transform
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.96),transparent_38%),linear-gradient(145deg,rgba(199,166,132,0.09),transparent_52%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-[7px]
              rounded-[3px]
              border
              border-[#c9ab82]/30
            "
          />

          <div
            className="
              relative flex h-full
              flex-col items-center
              justify-center
              px-4 text-center
            "
          >
            <span
              dir="ltr"
              className="
                mb-1.5 text-[7px]
                tracking-[0.28em]
                text-[#a48a71]
              "
            >
              {intro.cardEyebrow}
            </span>

            <bdi
              dir="ltr"
              className="
                font-serif
                text-[clamp(1.35rem,6vw,1.65rem)]
                tracking-[0.08em]
                text-[#755d49]
              "
            >
              {couple.monogram}
            </bdi>

            <div
              aria-hidden="true"
              className="
                my-2 h-px w-12
                bg-gradient-to-r
                from-transparent
                via-[#bf9b65]
                to-transparent
              "
            />

            <p
              className="
                font-serif
                text-[16px]
                text-[#715947]
              "
            >
              {intro.cardTitle}
            </p>

            <div
              className="
                mt-1.5
                text-[10px]
                leading-[1.75]
                text-[#8a7462]
              "
            >
              {intro.cardMessageLines.map(
                (line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className="block"
                  >
                    {line}
                  </span>
                ),
              )}
            </div>
          </div>
        </motion.article>

        {/* Left panel */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            x: isOpen
              ? [
                  "0%",
                  "-7%",
                  "-15%",
                  "-21%",
                ]
              : "0%",

            rotate: isOpen
              ? [
                  0,
                  -1,
                  -2.5,
                  -3.5,
                ]
              : 0,

            opacity: isOpen
              ? [
                  1,
                  0.94,
                  0.46,
                  0.02,
                ]
              : 1,
          }}
          transition={{
            duration:
              openingDuration,

            delay: isOpen
              ? 0.15
              : 0,

            times: [
              0,
              0.34,
              0.72,
              1,
            ],

            ease: slowEase,
          }}
          className="
            absolute bottom-[7%]
            left-[3%] top-[6%]
            z-20 w-[49%]
            origin-left
            [clip-path:polygon(0_0,100%_50%,0_100%)]
            bg-[linear-gradient(115deg,#f3e7da_0%,#d5bca6_100%)]
            will-change-transform
          "
        >
          <div
            aria-hidden="true"
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
            x: isOpen
              ? [
                  "0%",
                  "7%",
                  "15%",
                  "21%",
                ]
              : "0%",

            rotate: isOpen
              ? [
                  0,
                  1,
                  2.5,
                  3.5,
                ]
              : 0,

            opacity: isOpen
              ? [
                  1,
                  0.94,
                  0.46,
                  0.02,
                ]
              : 1,
          }}
          transition={{
            duration:
              openingDuration,

            delay: isOpen
              ? 0.15
              : 0,

            times: [
              0,
              0.34,
              0.72,
              1,
            ],

            ease: slowEase,
          }}
          className="
            absolute bottom-[7%]
            right-[3%] top-[6%]
            z-20 w-[49%]
            origin-right
            [clip-path:polygon(100%_0,0_50%,100%_100%)]
            bg-[linear-gradient(245deg,#f3e7da_0%,#d5bca6_100%)]
            will-change-transform
          "
        >
          <div
            aria-hidden="true"
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
            y: isOpen
              ? [
                  "0%",
                  "8%",
                  "18%",
                  "25%",
                ]
              : "0%",

            opacity: isOpen
              ? [
                  1,
                  0.94,
                  0.45,
                  0.02,
                ]
              : 1,
          }}
          transition={{
            duration:
              openingDuration,

            delay: isOpen
              ? 0.25
              : 0,

            times: [
              0,
              0.36,
              0.74,
              1,
            ],

            ease: slowEase,
          }}
          className="
            absolute bottom-[7%]
            left-[3%] right-[3%]
            z-[26] h-[53%]
            origin-bottom
            [clip-path:polygon(0_100%,50%_0,100%_100%)]
            bg-[linear-gradient(180deg,#f1e2d2_0%,#d1b59e_100%)]
            will-change-transform
          "
        />

        {/* Top panel */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            y: isOpen
              ? [
                  "0%",
                  "-8%",
                  "-18%",
                  "-26%",
                ]
              : "0%",

            scaleY: isOpen
              ? [
                  1,
                  0.98,
                  0.94,
                  0.9,
                ]
              : 1,

            opacity: isOpen
              ? [
                  1,
                  0.93,
                  0.42,
                  0.02,
                ]
              : 1,
          }}
          transition={{
            duration:
              openingDuration,

            delay: isOpen
              ? 0.05
              : 0,

            times: [
              0,
              0.34,
              0.72,
              1,
            ],

            ease: slowEase,
          }}
          className="
            absolute left-[3%]
            right-[3%] top-[6%]
            z-30 h-[52%]
            origin-top
            [clip-path:polygon(0_0,100%_0,50%_100%)]
            bg-[linear-gradient(180deg,#f2e5d6_0%,#d4bba5_100%)]
            will-change-transform
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_48%)]
            "
          />
        </motion.div>

        {/* Gold seal position */}
        <div
          aria-hidden="true"
          className="
            absolute left-1/2
            top-[51%] z-40
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    opacity: 0,
                    scale: 0.48,
                    rotate: -14,
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
                      scale: [
                        1,
                        1.05,
                        1,
                      ],
                      rotate: 0,
                      y: 0,
                    }
            }
            transition={
              isOpen
                ? {
                    duration: 0.55,
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
                <span
                  dir="ltr"
                  className="gold-seal__letters"
                >
                  <span className="gold-seal__first">
                    {groomLetter}
                  </span>

                  <span className="gold-seal__second">
                    {brideLetter}
                  </span>
                </span>
              </span>
            </span>
          </motion.div>
        </div>

        {/* Full envelope click area */}
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpen}
          aria-label={intro.openLabel}
          className="
            absolute inset-0 z-50
            cursor-pointer
            rounded-[18px]
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