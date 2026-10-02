import React, { useRef, useEffect } from 'react';
import { BIRTHDAY_DATA } from '../../data/content';
import { SafeImage } from '../ui/SafeImage';
import { gsap, ScrollTrigger } from '../../lib/animations';
import { Shield, Sparkles, Waves, Flame, Award, Dumbbell, Film, Trophy } from 'lucide-react';

export const Celebrator: React.FC = () => {
  const { celebrator, person } = BIRTHDAY_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const getTraitIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-5 h-5 text-yellow-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'waves':
        return <Waves className="w-5 h-5 text-yellow-300" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      default:
        return <Award className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'cricket':
        return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'film':
        return <Film className="w-4 h-4 text-amber-500" />;
      case 'dumbbell':
        return <Dumbbell className="w-4 h-4 text-yellow-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on photo container
      if (imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Stagger reveal on trait cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="celebrator"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-navy-900 bg-noise overflow-hidden border-b border-navy-800"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-navy-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <div className="flex flex-col items-center sm:items-start mb-16">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-cream tracking-wider uppercase text-center sm:text-left">
            DEVJIT RATH
          </h2>
          <p className="text-cream/80 max-w-2xl text-base sm:text-lg mt-3 text-center sm:text-left font-body">
            {celebrator.description}
          </p>

          {/* Running Joke Badge */}
          <div className="mt-4 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-yellow-300 font-mono text-xs sm:text-sm flex items-center gap-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="font-semibold">{celebrator.runningJokeBadge}</span>
          </div>
        </div>

        {/* Split Grid: Photo with giant overlapping name & Trait Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Photo with huge overlapping DEV lettering */}
          <div className="lg:col-span-5 relative flex justify-center w-full max-w-[360px] sm:max-w-[420px] mx-auto">
            {/* Huge Background Typography behind image */}
            <span className="absolute -top-8 sm:-top-16 -left-2 sm:-left-8 font-display text-[7rem] sm:text-[12rem] lg:text-[14rem] text-stroke-yellow select-none opacity-20 pointer-events-none z-0">
              DEV
            </span>

            {/* Photo Container with clip-path and yellow borders */}
            <div
              ref={imageContainerRef}
              className="relative z-10 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-400/40 group"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-navy-950">
                <SafeImage
                  src="/images/about.jpg"
                  alt="Devjit Rath"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackTitle="Devjit Rath"
                  fallbackSubtitle="The Man • The Myth • The 19-Year-Old Legend"
                />
              </div>

              {/* Photo Bottom Glass Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-navy-950 via-navy-900/90 to-transparent flex flex-col justify-end">
                <span className="font-script text-2xl sm:text-3xl text-yellow-400">
                  {person.nickname}
                </span>
                <span className="font-display tracking-widest text-lg sm:text-xl text-cream uppercase">
                  {person.fullName}
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-yellow-300/80 mt-0.5">
                  19 Years of Pure Unfiltered Vibe
                </span>
              </div>
            </div>

            {/* Big Overlapping Front "DEV" badge accent */}
            <div className="absolute -bottom-4 right-1 sm:-bottom-6 sm:-right-4 z-20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-yellow-400 text-navy-950 shadow-glow-yellow border-2 border-white transform rotate-2 hover:rotate-0 transition-transform">
              <span className="font-display text-xl sm:text-3xl tracking-wider uppercase block leading-none">
                100% UNBOTHERED
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase block mt-0.5 text-navy-900 font-bold">
                Certified Brother
              </span>
            </div>
          </div>

          {/* Right Column: Traits + Hobby Chips */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Hobby Chips */}
            <div className="glass-panel p-6 rounded-2xl border border-yellow-400/25">
              <h3 className="font-display tracking-wider text-xl text-yellow-400 uppercase mb-4 flex items-center gap-2">
                <span>Passions & Daily Grind</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {celebrator.hobbies.map((hobby, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-navy-800/80 border border-yellow-400/20 hover:border-yellow-400 transition-all hover:-translate-y-1 group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-navy-700 border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-colors">
                        {getHobbyIcon(hobby.icon)}
                      </div>
                      <span className="font-display tracking-wide text-sm text-cream uppercase">
                        {hobby.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-cream/70 leading-relaxed font-body">
                      {hobby.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Animated Trait Cards with 3D Tilt Hover */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {celebrator.traits.map((trait) => (
                <div
                  key={trait.id}
                  className="glass-panel p-5 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-glow-yellow hover:-translate-y-1.5 group flex flex-col justify-between"
                >
                  <div>
                    {/* Trait Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-navy-800 border border-yellow-400/30 group-hover:scale-110 transition-transform">
                          {getTraitIcon(trait.icon)}
                        </div>
                        <h4 className="font-display tracking-wider text-xl text-yellow-400 uppercase">
                          {trait.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-yellow-300/80 uppercase">
                        Verified
                      </span>
                    </div>

                    {/* Roast Joke */}
                    <div className="mb-3 p-2.5 rounded-lg bg-navy-950/60 border-l-2 border-amber-500">
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block font-bold">
                        The Roast:
                      </span>
                      <p className="text-xs text-cream/80 italic mt-0.5 font-body">
                        "{trait.joke}"
                      </p>
                    </div>
                  </div>

                  {/* Heartfelt Truth */}
                  <div className="p-2.5 rounded-lg bg-navy-800/40 border-l-2 border-yellow-400">
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block font-bold">
                      The Truth:
                    </span>
                    <p className="text-xs text-cream/95 font-medium mt-0.5 font-body">
                      {trait.truth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
