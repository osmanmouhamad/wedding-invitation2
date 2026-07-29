import { useState } from "react";
import { AnimatePresence } from "motion/react";

import PetalTransition from "./components/PetalTransition";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const handleOpenInvitation = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
  };

  const handleScreenCovered = () => {
    setScreen("hero");
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <main
      className="
        relative min-h-[100svh]
        overflow-hidden bg-[#f6efe8]
      "
      aria-busy={isTransitioning}
    >
      {screen === "intro" ? (
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