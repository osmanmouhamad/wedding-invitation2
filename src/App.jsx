import { useState } from "react";
import { AnimatePresence } from "motion/react";

import Intro from "./sections/Intro";
import PetalTransition from "./components/PetalTransition";

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    <main className="relative min-h-[100svh] overflow-hidden">
      {screen === "intro" ? (
        <Intro onOpen={handleOpenInvitation} />
      ) : (
        <section
          className="
            flex min-h-[100svh]
            items-center justify-center
            bg-[#f8f1e9]
          "
        >
          <h1 className="font-serif text-5xl text-[#725d4c]">
            M &amp; A
          </h1>
        </section>
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