import React, { useEffect, useState } from 'react';

interface NavSection {
  id: string;
  name: string;
}

const SECTIONS: NavSection[] = [
  { id: 'hero', name: 'Hero' },
  { id: 'quote', name: 'The Toast' },
  { id: 'celebrator', name: 'The Celebrator' },
  { id: 'milestones', name: 'Photo Notes' },
  { id: 'match', name: 'Man of the Match' },
  { id: 'gallery', name: 'Moments' },
  { id: 'wishes', name: 'Wishes' },
  { id: 'final', name: 'Letter & Replay' },
];

export const MiniNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mini nav after scrolling down past half hero
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check current active section
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Quick section navigation">
      <div
        className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 p-2 rounded-full glass-panel transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label="Scroll to scene"
            >

              {/* Dot */}
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3 h-3 bg-yellow-400 shadow-glow-yellow scale-125'
                    : 'w-2 h-2 bg-cream/40 hover:bg-yellow-300 hover:scale-110'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};
