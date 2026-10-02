import React, { useEffect, useState } from 'react';
import { BIRTHDAY_DATA } from '../../data/content';
import { GlossyBalloon } from '../ui/GlossyBalloon';
import { fireCelebrationConfetti } from '../../lib/confetti';
import { ChevronDown, Sparkles, PartyPopper, Calendar } from 'lucide-react';

interface HeroProps {
  isLoaded: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  const { hero, person } = BIRTHDAY_DATA;
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  // Calculate live countdown in Asia/Kolkata (IST = UTC + 5:30)
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // UTC time in ms
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      // IST time: UTC + 5.5 hours
      const istTime = new Date(utc + 5.5 * 3600000);

      const istYear = istTime.getFullYear();
      const istMonth = istTime.getMonth() + 1; // 1-12
      const istDate = istTime.getDate();

      // Check if TODAY is October 5 in IST
      if (istMonth === 10 && istDate === 5) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      // Determine target 5 October
      let targetYear = istYear;
      // If past Oct 5 in current year, target next year
      if (istMonth > 10 || (istMonth === 10 && istDate > 5)) {
        targetYear = istYear + 1;
      }

      // Target in IST: October 5, 00:00:00 IST
      // In UTC, this is October 4, 18:30:00 UTC
      const targetUtcMs = Date.UTC(targetYear, 9, 4, 18, 30, 0);
      const diffMs = targetUtcMs - now.getTime();

      if (diffMs <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeRemaining({ days, hours, minutes, seconds, isToday: false });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger celebration confetti when loaded
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        fireCelebrationConfetti();
      }, 300);
    }
  }, [isLoaded]);

  const scrollToNext = () => {
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 py-12 pt-20 overflow-hidden bg-navy-900 bg-noise"
    >
      {/* Sunburst background rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden">
        <div className="w-[180vw] h-[180vw] max-w-[1400px] max-h-[1400px] rounded-full animate-spin-slow bg-[radial-gradient(circle,_rgba(255,200,61,0.25)_0%,_transparent_70%)] flex items-center justify-center">
          <div className="w-full h-full bg-[repeating-conic-gradient(from_0deg,_rgba(255,200,61,0.18)_0deg_15deg,_transparent_15deg_30deg)]" />
        </div>
      </div>

      {/* Radial center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Interactive Balloons (left and right) */}
      <div className="absolute top-10 left-2 sm:left-12 lg:left-24 pointer-events-auto z-20">
        <GlossyBalloon color="yellow" size={54} delay={0} label="19" className="sm:scale-125" />
      </div>
      <div className="absolute top-28 left-16 sm:left-32 lg:left-48 pointer-events-auto z-10 hidden sm:block">
        <GlossyBalloon color="amber" size={54} delay={1.4} />
      </div>
      <div className="absolute top-12 right-2 sm:right-16 lg:right-28 pointer-events-auto z-20">
        <GlossyBalloon color="yellow" size={56} delay={0.8} label="DEV" className="sm:scale-125" />
      </div>
      <div className="absolute top-36 right-16 sm:right-36 lg:right-56 pointer-events-auto z-10 hidden sm:block">
        <GlossyBalloon color="navy" size={56} delay={2.1} />
      </div>
      <div className="absolute bottom-24 left-8 sm:left-20 pointer-events-auto z-10 hidden md:block">
        <GlossyBalloon color="white" size={48} delay={1.8} />
      </div>
      <div className="absolute bottom-28 right-8 sm:right-20 pointer-events-auto z-10 hidden md:block">
        <GlossyBalloon color="amber" size={50} delay={2.5} />
      </div>

      {/* Top Eyebrow Badge */}
      <div className="relative z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-navy-800/80 border border-yellow-400/30 text-yellow-300 text-[11px] sm:text-sm font-mono tracking-widest uppercase shadow-glow-yellow mb-4 text-center">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin shrink-0" />
        <span className="truncate max-w-[280px] sm:max-w-none">{hero.eyebrow}</span>
      </div>

      {/* Hero Headline Centerpiece */}
      <div className="relative z-20 text-center flex flex-col items-center max-w-5xl mx-auto my-auto py-4 sm:py-6 w-full">
        {/* Outlined HAPPY BIRTHDAY */}
        <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide sm:tracking-wider text-stroke-yellow uppercase select-none transition-all duration-500 leading-none px-2 max-w-full">
          {hero.titleOutlined}
        </h1>

        {/* Script Dev flourish */}
        <div className="relative -mt-2 sm:-mt-8 md:-mt-12 flex items-center justify-center">
          <span className="font-script text-6xl xs:text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] text-yellow-400 drop-shadow-[0_10px_35px_rgba(255,200,61,0.6)] transform -rotate-3 select-none hover:rotate-0 transition-transform duration-300 cursor-pointer"
            onClick={() => fireCelebrationConfetti()}
            title="Click for celebration fireworks!"
          >
            {hero.nameScript}
          </span>
        </div>

        {/* Celebrator Tagline */}
        <div className="mt-2 sm:mt-4 flex items-center gap-2 sm:gap-3 px-2">
          <div className="h-[1px] w-6 sm:w-16 bg-yellow-400/50" />
          <p className="font-display tracking-widest text-base sm:text-2xl md:text-3xl text-cream uppercase text-center">
            {person.fullName} Turns {person.turningAge}
          </p>
          <div className="h-[1px] w-6 sm:w-16 bg-yellow-400/50" />
        </div>

        <p className="mt-3 text-cream/80 text-sm sm:text-base max-w-2xl font-body px-4">
          {hero.subtitle}
        </p>

        {/* LIVE BIRTHDAY COUNTDOWN / CELEBRATION BOX */}
        <div className="mt-8 w-full max-w-xl px-4">
          {timeRemaining.isToday ? (
            <div className="glass-panel p-6 rounded-2xl border-2 border-yellow-400 shadow-glow-lg text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 text-yellow-400 font-display text-2xl sm:text-3xl uppercase tracking-wider">
                <PartyPopper className="w-8 h-8 text-yellow-400" />
                <span>It's your day, Dev!</span>
                <PartyPopper className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-cream text-sm sm:text-base mt-2 font-medium">
                HAPPY 19TH BIRTHDAY TO THE BROTHER, THE ATHLETE & THE CREATIVE STAR! 🎉
              </p>
              <button
                onClick={() => fireCelebrationConfetti()}
                className="mt-4 px-6 py-2.5 rounded-full bg-yellow-400 text-navy-950 font-bold text-sm tracking-wider uppercase hover:bg-amber-500 transition-colors shadow-glow-yellow"
              >
                Fire Another Confetti Cannon!
              </button>
            </div>
          ) : (
            <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-yellow-400/30 shadow-card-navy">
              <div className="flex items-center justify-between mb-4 border-b border-yellow-400/20 pb-2">
                <div className="flex items-center gap-2 text-yellow-300 text-xs sm:text-sm font-mono uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span>Countdown to 5 October (IST)</span>
                </div>
                <span className="text-[11px] font-mono text-cream/60">
                  Target: 00:00:00 IST
                </span>
              </div>

              {/* 4 Digit Boxes */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-navy-900/80 rounded-xl p-2 sm:p-3 border border-yellow-400/20">
                  <span className="font-display text-2xl sm:text-4xl text-yellow-400 block">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-cream/70 uppercase tracking-wider font-mono">
                    Days
                  </span>
                </div>

                <div className="bg-navy-900/80 rounded-xl p-2 sm:p-3 border border-yellow-400/20">
                  <span className="font-display text-2xl sm:text-4xl text-yellow-400 block">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-cream/70 uppercase tracking-wider font-mono">
                    Hours
                  </span>
                </div>

                <div className="bg-navy-900/80 rounded-xl p-2 sm:p-3 border border-yellow-400/20">
                  <span className="font-display text-2xl sm:text-4xl text-yellow-400 block">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-cream/70 uppercase tracking-wider font-mono">
                    Mins
                  </span>
                </div>

                <div className="bg-navy-900/80 rounded-xl p-2 sm:p-3 border border-yellow-400/20">
                  <span className="font-display text-2xl sm:text-4xl text-amber-500 block animate-pulse">
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-cream/70 uppercase tracking-wider font-mono">
                    Secs
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center mt-6">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center text-xs font-mono tracking-widest text-cream/70 hover:text-yellow-400 transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="mb-2 uppercase text-[11px] group-hover:tracking-wider transition-all">
            {hero.scrollCta}
          </span>
          <div className="w-8 h-8 rounded-full border border-yellow-400/40 flex items-center justify-center group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-colors animate-bounce">
            <ChevronDown className="w-4 h-4 text-yellow-400" />
          </div>
        </button>
      </div>
    </section>
  );
};
