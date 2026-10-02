import React, { useRef, useEffect, useState } from 'react';
import { BIRTHDAY_DATA } from '../../data/content';
import { gsap, ScrollTrigger } from '../../lib/animations';
import { fireCelebrationConfetti } from '../../lib/confetti';
import { Trophy, Award, Sparkles, Flame, Shield, Activity } from 'lucide-react';

export const ManOfTheMatch: React.FC = () => {
  const { manOfTheMatch } = BIRTHDAY_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spotlight sweep effect on trophy card
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 60,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            onEnter: () => startCountUp(),
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startCountUp = () => {
    manOfTheMatch.stats.forEach((stat, index) => {
      let current = 0;
      const target = stat.value;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounts((prev) => ({ ...prev, [index]: current }));
      }, 30);
    });
  };

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Shield className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Activity className="w-5 h-5 text-yellow-300" />;
      case 2:
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 3:
        return <Award className="w-5 h-5 text-yellow-400" />;
      default:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section
      id="match"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-[#071329] bg-noise flex flex-col items-center justify-center overflow-hidden border-b border-navy-800"
    >
      {/* Sweeping Spotlight Animation Background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[700px] pointer-events-none opacity-30">
        <div className="w-full h-full bg-[conic-gradient(from_220deg_at_50%_0%,_transparent_0deg,_rgba(255,200,61,0.35)_40deg,_transparent_80deg)] blur-xl" />
      </div>

      {/* Decorative Cricket Icons (bat, ball, stumps motifs) */}
      <div className="absolute top-12 left-12 opacity-15 hidden md:block select-none pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18" strokeDasharray="2 2" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-16 opacity-15 hidden md:block select-none pointer-events-none">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="1.5">
          <path d="M4 22V2M12 22V2M20 22V2M2 5h20" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Top Award Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 shadow-glow-yellow">
          <Trophy className="w-4 h-4 text-yellow-400 animate-bounce" />
          <span>{manOfTheMatch.awardTitle}</span>
        </div>

        {/* Big Presentation Trophy Card */}
        <div
          ref={cardRef}
          className="w-full rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-10 lg:p-12 border-2 border-yellow-400/50 shadow-glow-lg relative overflow-hidden bg-gradient-to-b from-navy-800/90 via-navy-900/95 to-navy-950/95"
        >
          {/* Subtle Golden Sheen on card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Trophy Header */}
          <div className="text-center pb-6 sm:pb-8 border-b border-yellow-400/20 flex flex-col items-center">
            {/* Clickable Interactive Trophy */}
            <div
              onClick={() => fireCelebrationConfetti()}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-300 p-0.5 shadow-glow-yellow cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 mb-3 sm:mb-4 group"
              title="Click for Trophy Fireworks!"
            >
              <div className="w-full h-full rounded-full bg-navy-950 flex items-center justify-center text-yellow-400">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            <h3 className="font-display tracking-wider text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-yellow-400 uppercase">
              {manOfTheMatch.headline}
            </h3>

            <p className="font-mono text-[11px] sm:text-sm text-cream/70 tracking-widest uppercase mt-2">
              {manOfTheMatch.matchDetails}
            </p>
          </div>

          {/* Player Stats Grid with Count-up */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 my-6 sm:my-8">
            {manOfTheMatch.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-navy-900/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-yellow-400/25 hover:border-yellow-400 transition-colors text-center flex flex-col items-center justify-between"
              >
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-navy-800 border border-yellow-400/20 mb-1.5">
                  {getStatIcon(idx)}
                </div>

                <div className="flex items-baseline justify-center">
                  <span className="font-display text-3xl sm:text-5xl text-yellow-400 tracking-wider">
                    {counts[idx] ?? 0}
                  </span>
                  <span className="font-display text-lg sm:text-2xl text-yellow-300 ml-0.5">
                    {stat.suffix}
                  </span>
                </div>

                <span className="font-display tracking-wider text-xs sm:text-base text-cream uppercase mt-1">
                  {stat.label}
                </span>

                <span className="text-[10px] sm:text-[11px] text-cream/60 font-body mt-0.5 leading-tight">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>

          {/* Trophy Bottom Quote Badge */}
          <div className="pt-6 border-t border-yellow-400/20 text-center">
            <p className="font-script text-xl sm:text-2xl text-cream/90 italic">
              {manOfTheMatch.quoteBadge}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-yellow-400/80">
                Official Citation • Sealed & Approved by Soubhik
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
