import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import Hero from "./sections/Hero";
import Intro from "./sections/Intro";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);

  const handleRevealHero = useCallback(() => {
    setShowHero(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <main
      className="
        relative min-h-[100svh]
        overflow-hidden bg-[#f5ede6]
      "
    >
      {/* Hero موجود خلف الـIntro */}
      <motion.div
        aria-hidden={!showHero}
        className={showHero ? "" : "pointer-events-none"}
        initial={false}
        animate={{
          opacity: showHero ? 1 : 0,
          scale: showHero ? 1 : 1.02,
        }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Hero />
      </motion.div>

      <AnimatePresence>
        {showIntro && (
          <Intro
            key="intro"
            onRevealHero={handleRevealHero}
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>
    </main>
  );
}