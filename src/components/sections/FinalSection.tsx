import React from 'react';
import { BIRTHDAY_DATA } from '../../data/content';
import { SafeImage } from '../ui/SafeImage';
import { fireCelebrationConfetti } from '../../lib/confetti';
import { RotateCcw, Heart, Sparkles, Send } from 'lucide-react';

export const FinalSection: React.FC = () => {
  const { finalNote, person } = BIRTHDAY_DATA;

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      fireCelebrationConfetti();
    }, 800);
  };

  return (
    <section
      id="final"
      className="relative min-h-screen py-24 bg-navy-950 bg-noise flex flex-col justify-between overflow-hidden"
    >
      {/* Full-bleed Final Photo with Dark Mask Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <SafeImage
          src="/images/final.jpg"
          alt="Dev and memories"
          className="w-full h-full object-cover filter grayscale contrast-125"
          fallbackTitle="Brothers Forever"
          fallbackSubtitle="Memories That Last"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 w-full my-auto">
        {/* Giant Text Mask Reveal Headline */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-cream uppercase leading-none drop-shadow-md">
            {finalNote.heading}
          </h2>
        </div>

        {/* Handwritten Style Letter Card from Soubhik */}
        <div className="rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-8 lg:p-12 border-2 border-yellow-400/40 shadow-glow-lg bg-navy-900/90 relative overflow-hidden">
          {/* Subtle stamp accent in corner */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 border border-yellow-400/30 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-mono text-[9px] sm:text-[10px] text-yellow-400/70 uppercase tracking-widest -rotate-6">
            STAMP: 05 OCT 2026
          </div>

          <div className="space-y-3.5 sm:space-y-4 text-cream/90 font-body text-sm sm:text-base lg:text-lg leading-relaxed">
            {finalNote.letterBody.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'font-script text-2xl sm:text-4xl text-yellow-400' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Funny Roast Sign-Off */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-yellow-400/30 bg-navy-950/60 -mx-5 sm:-mx-8 lg:-mx-12 -mb-5 sm:-mb-8 lg:-mb-12 p-4 sm:p-6 lg:p-8 rounded-b-2xl sm:rounded-b-3xl">
            <p className="font-body text-xs sm:text-base text-amber-500 font-semibold italic">
              "{finalNote.roastSignoff}"
            </p>

            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
              <span className="font-script text-2xl sm:text-3xl text-yellow-400">
                {finalNote.author}
              </span>

              <span className="font-mono text-[10px] sm:text-xs text-cream/60 tracking-wider uppercase">
                School Brother & Day 1 Partner
              </span>
            </div>
          </div>
        </div>

        {/* Replay Celebration CTA Button */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center px-2">
          <button
            onClick={handleReplay}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 text-navy-950 font-display text-xl sm:text-2xl tracking-wider uppercase shadow-glow-yellow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-white cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-rotate-180 transition-transform duration-700" />
            <span>Replay The Celebration</span>
          </button>
          <span className="text-[11px] sm:text-xs font-mono text-cream/60 mt-2 sm:mt-3 uppercase tracking-widest text-center">
            Scroll back to top & trigger celebration confetti
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 pt-8 border-t border-navy-800 text-center px-4">
        <p className="text-xs sm:text-sm text-cream/70 font-mono tracking-wide flex items-center justify-center gap-1.5 flex-wrap">
          <span>{finalNote.footerText}</span>
          <span>•</span>
          <span className="text-yellow-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 fill-yellow-400 text-yellow-400 inline" /> by Soubhik
          </span>
        </p>
        <p className="text-[11px] text-cream/40 font-mono mt-1">
          Reason for teasing: None. Still happening every single day.
        </p>
      </footer>
    </section>
  );
};
