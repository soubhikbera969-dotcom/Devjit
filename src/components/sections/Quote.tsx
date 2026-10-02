import React, { useEffect, useRef } from 'react';
import { BIRTHDAY_DATA } from '../../data/content';
import { gsap, ScrollTrigger } from '../../lib/animations';
import { Quote as QuoteIcon } from 'lucide-react';

export const Quote: React.FC = () => {
  const { quote } = BIRTHDAY_DATA;
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Combine quote parts into words array for word-by-word scrub reveal
  const fullSentence = `${quote.linePrefix} ${quote.boldRoast} ${quote.heartfeltClimax}`;
  const words = fullSentence.split(' ');

  useEffect(() => {
    const el = textRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const wordSpans = el.querySelectorAll('.scrub-word');

    const ctx = gsap.context(() => {
      // Scroll scrubbed word-by-word reveal
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0.18,
          color: '#1E4A8C',
          scale: 0.96,
        },
        {
          opacity: 1,
          color: '#FFF8E7',
          scale: 1,
          stagger: 0.05,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.8,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quote"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 sm:px-12 py-24 bg-navy-950 bg-noise border-y border-navy-800 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-navy-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Quote Icon */}
      <div className="w-16 h-16 rounded-full bg-navy-900 border border-yellow-400/30 flex items-center justify-center text-yellow-400 mb-8 shadow-glow-yellow">
        <QuoteIcon className="w-8 h-8 opacity-80" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Word-by-word scroll-scrubbed text */}
        <div
          ref={textRef}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-snug tracking-wide uppercase select-none flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3"
        >
          {words.map((word, idx) => {
            const isHighlight =
              word.includes('Dev') ||
              word.includes('roast') ||
              word.includes('brother') ||
              word.includes('showed') ||
              word.includes('up');

            return (
              <span
                key={idx}
                className={`scrub-word transition-colors duration-200 inline-block ${
                  isHighlight ? 'font-bold' : ''
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Attribution line */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-yellow-400/40" />
          <p className="font-script text-2xl sm:text-4xl text-yellow-400">
            {quote.attribution}
          </p>
          <div className="h-[1px] w-12 bg-yellow-400/40" />
        </div>
      </div>
    </section>
  );
};
