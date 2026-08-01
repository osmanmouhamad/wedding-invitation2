import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
} from "motion/react";

import ContactSection from "./sections/ContactSection";
import Countdown from "./sections/Countdown";
import FatimaMoussaPage from "./sections/FatimaMoussaPage";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import WeddingDetails from "./sections/WeddingDetails";

const SHOW_CONTACT_SECTION = false;

function getCurrentPage() {
  return window.location.hash ===
    "#/fatima-moussa"
    ? "fatima"
    : "invitation";
}

export default function App() {
  const [currentPage, setCurrentPage] =
    useState(getCurrentPage);

  const [showIntro, setShowIntro] =
    useState(true);

  const [showHero, setShowHero] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const handleRevealHero =
    useCallback(() => {
      setShowHero(true);
    }, []);

  const handleIntroComplete =
    useCallback(() => {
      setShowIntro(false);
    }, []);

  const handleShowDetails =
    useCallback(() => {
      setShowDetails(true);
    }, []);

  const handleOpenCredit =
    useCallback(() => {
      window.history.pushState(
        {
          page: "fatima",
        },
        "",
        "#/fatima-moussa",
      );

      setCurrentPage("fatima");

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, []);

  const handleCloseCredit =
    useCallback(() => {
      window.history.pushState(
        {
          page: "invitation",
        },
        "",
        window.location.pathname,
      );

      setCurrentPage("invitation");

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, []);

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPage(
        getCurrentPage(),
      );

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    };

    window.addEventListener(
      "popstate",
      handleNavigation,
    );

    window.addEventListener(
      "hashchange",
      handleNavigation,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleNavigation,
      );

      window.removeEventListener(
        "hashchange",
        handleNavigation,
      );
    };
  }, []);

  useEffect(() => {
    if (!showDetails) {
      return undefined;
    }

    const frameId =
      window.requestAnimationFrame(
        () => {
          document
            .getElementById("details")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        },
      );

    return () => {
      window.cancelAnimationFrame(
        frameId,
      );
    };
  }, [showDetails]);

  if (currentPage === "fatima") {
    return (
      <FatimaMoussaPage
        onBack={handleCloseCredit}
      />
    );
  }

  return (
    <main
      className="
        relative min-h-[100svh]
        overflow-x-hidden
        bg-[#f5ede6]
      "
    >
      {showHero && (
        <>
          <Hero
            onShowDetails={
              handleShowDetails
            }
            detailsVisible={
              showDetails
            }
          />

          <AnimatePresence
            initial={false}
          >
            {showDetails && (
              <div key="invitation-details">
                <WeddingDetails />

                <Countdown />

                {SHOW_CONTACT_SECTION && (
                  <ContactSection />
                )}

                <Footer
                  onOpenCredit={
                    handleOpenCredit
                  }
                />
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      <AnimatePresence initial={false}>
        {showIntro && (
          <Intro
            key="intro"
            onRevealHero={
              handleRevealHero
            }
            onComplete={
              handleIntroComplete
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}