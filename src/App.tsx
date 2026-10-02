import React, { useEffect, useState } from 'react';
import { initLenis } from './lib/animations';
import { Loader } from './components/sections/Loader';
import { Hero } from './components/sections/Hero';
import { Quote } from './components/sections/Quote';
import { Celebrator } from './components/sections/Celebrator';
import { Milestones } from './components/sections/Milestones';
import { ManOfTheMatch } from './components/sections/ManOfTheMatch';
import { MomentsGallery } from './components/sections/MomentsGallery';
import { BirthdayWishes } from './components/sections/BirthdayWishes';
import { FinalSection } from './components/sections/FinalSection';

import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { MiniNav } from './components/ui/MiniNav';
import { EasterEgg } from './components/ui/EasterEgg';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1A3A] text-[#FFF8E7] relative selection:bg-[#FFC83D] selection:text-[#0A1A3A]">
      {/* 0 to 100 Initial Loader */}
      <Loader onLoadingComplete={() => setIsLoaded(true)} />

      {/* Global Interactive Elements */}
      <CustomCursor />
      <ScrollProgressBar />
      <MiniNav />
      <EasterEgg />

      {/* Main Single-Page Scroll Storytelling Experience */}
      <main className="relative z-10">
        <Hero isLoaded={isLoaded} />
        <Quote />
        <Celebrator />
        <Milestones />
        <ManOfTheMatch />
        <MomentsGallery />
        <BirthdayWishes />
        <FinalSection />
      </main>
    </div>
  );
}

export default App;
