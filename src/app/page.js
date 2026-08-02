'use client';
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import ModernDeviceWarning from "./components/ModernDeviceWarning";
import Nav from "./components/Nav";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Jobs from "./sections/Jobs";
import Projects from "./sections/Projects";
import RetroScreen from "./sections/RetroScreen";
import i18n from './utils/i18n';
import { waitForMs } from "./utils/utils";

const RetroComputer = dynamic(() => import('./components/RetroComputer'), {
  ssr: false,
  loading: () => null,
});

const Loader = dynamic(() => import('./components/Loader'), {
  ssr: false,
  loading: () => null,
});


export default function Home() {

  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [hiddenRetroComputer, setHiddenRetroComputer] = useState(false);
  const [scrollFactor, setScrollFactor] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [progress, setProgress] = useState(0);
  const [acceptedMDWarning, setAcceptedMDWarning] = useState(false);
  const [closeMDWarning, setCloseMDWarning] = useState(false);


  useEffect(() => {
    // to know whether it is a touch device or not
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.documentElement.style.overflowY = "scroll";
      setIsTouchDevice(true);
    }

    const updateDimensions = () => setScreenWidth(window.innerWidth);

    let ticking = false;
    const updateScrollFactor = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollFactor(Math.min(scrollY / maxScroll, 1));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollFactor);
        ticking = true;
      }
    };

    updateDimensions();
    updateScrollFactor();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleAcceptMDWarning = useCallback(async () => {
    setCloseMDWarning(true);
    await waitForMs(700);
    setAcceptedMDWarning(true);
  }, []);

  return (
    <>
      {(!isTouchDevice && progress < 100) &&
        <Loader progress={progress} />
      }

      {(isTouchDevice && !acceptedMDWarning) &&
        <ModernDeviceWarning closeMDWarning={closeMDWarning} handleAcceptMDWarning={handleAcceptMDWarning} />
      }

      <div style={{ display: currentLanguage ? "none" : "block" }}>
        <RetroScreen
          i18n={i18n}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          screenWidth={screenWidth}
          isTouchDevice={isTouchDevice}
        />
      </div>

      <div style={{ display: currentLanguage ? "block" : "none" }}>
        <Nav screenWidth={screenWidth} hiddenRetroComputer={hiddenRetroComputer || isTouchDevice} />

        <div className={'bg-white fixed inset-0 z-[999] animate-shuttingOffAnimation'} /> {/* Shutting OFF animation div */}
        {!isTouchDevice && (
          <RetroComputer
            setHiddenRetroComputer={setHiddenRetroComputer}
            scrollFactor={scrollFactor}
            setProgress={setProgress}
          />
        )}

        <Hero />
        <About />
        <Jobs screenWidth={screenWidth} />
        <Projects screenWidth={screenWidth} />
        <Contact />
        <Footer />
      </div>
    </>
  );
}