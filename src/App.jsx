import {
  useCallback,
  useState,
} from "react";

import { AnimatePresence } from "motion/react";

import PetalTransition from "./components/PetalTransition";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";

export default function App() {
  const [screen, setScreen] =
    useState("intro");

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(false);

  const handleTransitionStart =
    useCallback(() => {
      setIsTransitioning(true);
    }, []);

  const handleScreenCovered =
    useCallback(() => {
      setScreen("hero");
    }, []);

  const handleTransitionComplete =
    useCallback(() => {
      setIsTransitioning(false);
    }, []);

  return (
    <main
      className="
        relative min-h-[100svh]
        overflow-hidden bg-[#f5ede6]
      "
      aria-busy={isTransitioning}
    >
      {screen === "intro" ? (
        <Intro
          onTransitionStart={
            handleTransitionStart
          }
        />
      ) : (
        <Hero />
      )}

      <AnimatePresence>
        {isTransitioning && (
          <PetalTransition
            key="petal-transition"
            onCover={handleScreenCovered}
            onComplete={
              handleTransitionComplete
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}