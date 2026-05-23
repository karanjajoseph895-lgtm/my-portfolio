import { useState, useCallback } from 'react';
import Loader from './sections/Loader';
import Navigation from './sections/Navigation';
import ParallaxCanvas from './sections/ParallaxCanvas';
import HeroSection from './sections/HeroSection';
import SelectedWork from './sections/SelectedWork';
import SkillsSection from './sections/SkillsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  const handleCanvasLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} isLoaded={isLoaded} />
      <Navigation />

      <main>
        {/* Hero with Three.js parallax */}
        <div style={{ position: 'relative' }}>
          <ParallaxCanvas onLoad={handleCanvasLoad} />
          <HeroSection loaderDone={loaderDone} />
        </div>

        {/* Content sections */}
        <SelectedWork />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
