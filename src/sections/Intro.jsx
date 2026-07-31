import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "motion/react";

import introBackground from "../assets/images/intro-bg.webp";
import Envelope from "../components/Envelope";

export default function Intro({
  onTransitionStart,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const hasStartedTransitionRef =
    useRef(false);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      if (hasStartedTransitionRef.current) {
        return;
      }

      hasStartedTransitionRef.current = true;
      onTransitionStart?.();
    }, 1450);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, onTransitionStart]);

  return (
    <motion.section
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      className="
        relative flex min-h-[100svh]
        w-full items-center justify-center
        overflow-hidden bg-[#f2e7db]
      "
    >
      <img
        src={introBackground}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        className="
          pointer-events-none absolute inset-0
          h-full w-full select-none
          object-cover object-center
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(241,230,219,0.08))]
        "
      />

      <div
        className="
          relative z-10 flex min-h-[100svh]
          w-full max-w-[460px]
          items-center justify-center
          px-5
          pb-[max(2rem,env(safe-area-inset-bottom))]
          pt-[max(1.5rem,env(safe-area-inset-top))]
        "
      >
        <Envelope
          isOpen={isOpen}
          onOpen={handleOpen}
        />
      </div>
    </motion.section>
  );
}