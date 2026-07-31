import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";

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
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#f5ede6]">
      {/* Mount the Hero only when its animation should really begin. */}
      {showHero && <Hero />}

      <AnimatePresence initial={false}>
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
