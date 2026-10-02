import React, { useRef, useEffect } from 'react';
import { BIRTHDAY_DATA } from '../../data/content';
import { gsap, ScrollTrigger } from '../../lib/animations';
import { Dumbbell, Clapperboard, Sun, Sparkles, Heart } from 'lucide-react';

export const BirthdayWishes: React.FC = () => {
  const { wishes } = BIRTHDAY_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        // Flip reveal on scroll
        gsap.from(cards, {
          opacity: 0,
          rotateY: 45,
          y: 60,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 75%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getWishIcon = (iconName: string) => {
    switch (iconName) {
      case 'dumbbell':
        return <Dumbbell className="w-8 h-8 text-yellow-400" />;
      case 'clapper':
        return <Clapperboard className="w-8 h-8 text-amber-500" />;
      case 'sun':
        return <Sun className="w-8 h-8 text-yellow-300" />;
      default:
        return <Sparkles className="w-8 h-8 text-yellow-400" />;
    }
  };

  return (
    <section
      id="wishes"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-[#091632] bg-noise overflow-hidden border-b border-navy-800"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Direct intro without section name */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-script text-3xl sm:text-4xl text-yellow-400">
            For year 19 and every chapter ahead...
          </p>
        </div>

        {/* 3 Big Numbered Cards with 3D Tilt Hover */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000"
        >
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-yellow-400/30 hover:border-yellow-400 transition-all duration-500 hover:shadow-glow-yellow hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden bg-gradient-to-b from-navy-800/80 to-navy-950/90"
            >
              {/* Giant Watermark Number */}
              <span className="absolute -top-4 -right-2 font-display text-7xl sm:text-9xl text-cream/5 group-hover:text-yellow-400/10 transition-colors pointer-events-none select-none">
                {wish.number}
              </span>

              <div>
                {/* Header: Icon + Category */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-navy-900 border border-yellow-400/30 shadow-md group-hover:scale-110 transition-transform">
                    {getWishIcon(wish.icon)}
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs text-yellow-400 tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full bg-navy-900/90 border border-yellow-400/20">
                    Wish {wish.number}
                  </span>
                </div>

                <span className="text-[10px] sm:text-xs font-mono tracking-wider text-amber-500 uppercase block font-bold">
                  {wish.category}
                </span>

                <h3 className="font-display tracking-wide text-xl sm:text-3xl text-cream uppercase mt-1 mb-4 sm:mb-6">
                  {wish.tagline}
                </h3>

                {/* Roast Joke Block */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-navy-900/90 border-l-3 sm:border-l-4 border-amber-500 mb-4 sm:mb-5">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block font-bold mb-1">
                    The Roast Reality:
                  </span>
                  <p className="text-xs sm:text-sm text-cream/85 italic font-body">
                    "{wish.joke}"
                  </p>
                </div>
              </div>

              {/* Heartfelt Wish */}
              <div className="p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 mt-4">
                <span className="text-[10px] font-mono text-yellow-300 uppercase tracking-wider block font-bold mb-1">
                  The Sincere Wish:
                </span>
                <p className="text-xs sm:text-sm text-cream font-medium leading-relaxed font-body">
                  {wish.heartfelt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
