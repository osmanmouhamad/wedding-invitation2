import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";

import PetalTransition from "./components/PetalTransition";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";

const SCREEN = {
  INTRO: "intro",
  HERO: "hero",
};

export default function App() {
  const [screen, setScreen] = useState(SCREEN.INTRO);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpenInvitation = useCallback(() => {
    setIsTransitioning((currentValue) => {
      if (currentValue || screen !== SCREEN.INTRO) {
        return currentValue;
      }

      return true;
    });
  }, [screen]);

  const handleScreenCovered = useCallback(() => {
    setScreen(SCREEN.HERO);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <main
      className="relative min-h-[100svh] overflow-hidden bg-[#f6efe8]"
      aria-busy={isTransitioning}
    >
      {screen === SCREEN.INTRO ? (
        <Intro
          onOpen={handleOpenInvitation}
          isOpening={isTransitioning}
        />
      ) : (
        <Hero />
      )}

      <AnimatePresence>
        {isTransitioning && (
          <PetalTransition
            key="petal-transition"
            onCover={handleScreenCovered}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>
    </main>
  );
}