import React, { useRef, useEffect } from 'react';
import { BIRTHDAY_DATA, PhotoNote } from '../../data/content';
import { SafeImage } from '../ui/SafeImage';
import { gsap, ScrollTrigger } from '../../lib/animations';
import { Sparkles, MapPin, Calendar, Heart, Camera } from 'lucide-react';

export const Milestones: React.FC = () => {
  const { photoNotes } = BIRTHDAY_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop || !trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 140;

      // Pin the section and scroll the track horizontally
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: () => -totalScrollWidth,
        ease: 'none',
      });

      // Animate yellow progress line
      if (progressLineRef.current) {
        pinTimeline.to(
          progressLineRef.current,
          {
            scaleX: 1,
            ease: 'none',
          },
          0
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="milestones"
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-0 bg-navy-950 bg-noise flex flex-col justify-center overflow-hidden border-b border-navy-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Progress Bar Line (nameless) */}
      <div className="px-6 sm:px-12 lg:px-20 mb-8 max-w-5xl hidden lg:block">
        <div className="w-full h-1 bg-navy-800/80 rounded-full overflow-hidden border border-yellow-400/10">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 origin-left scale-x-0 transition-transform shadow-glow-yellow"
          />
        </div>
      </div>

      {/* Cards Track (Horizontal Pinned on Desktop, Smooth Snap Swipe on Mobile/Tablet) */}
      <div
        ref={trackRef}
        className="flex flex-row gap-5 sm:gap-8 lg:gap-10 px-4 sm:px-12 lg:px-20 w-full lg:w-max items-stretch lg:items-center overflow-x-auto snap-x snap-mandatory lg:snap-none no-scrollbar pb-8 lg:pb-0 touch-pan-x"
      >
        {photoNotes.map((note, index) => {
          const rotation = note.rotateDeg || (index % 2 === 0 ? -1.5 : 1.5);

          return (
            <div
              key={note.id}
              className="w-[84vw] max-w-[340px] sm:w-[360px] lg:w-[380px] shrink-0 snap-center rounded-3xl glass-panel p-4 sm:p-5 border-2 border-yellow-400/30 hover:border-yellow-400 shadow-card-navy transition-all duration-300 hover:shadow-glow-yellow hover:-translate-y-2 flex flex-col justify-between group relative select-none"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {/* Decorative Washi Tape / Pin on Top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-sm shadow-sm z-20 backdrop-blur-md border border-white/20 -rotate-1"
                style={{
                  backgroundColor: note.tapeColor || 'rgba(255, 200, 61, 0.4)',
                }}
              />

              <div>
                {/* 3:4 Aspect Ratio Photo Frame */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-navy-950 border border-yellow-400/20 shadow-md group-hover:scale-[1.01] transition-transform duration-500">
                  <SafeImage
                    src={note.image}
                    alt={note.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackTitle={note.title}
                    fallbackSubtitle={note.dateStamp}
                  />

                  {/* Gradient bottom overlay on photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom location pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-[11px] font-mono text-cream/90 border border-white/10">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{note.location}</span>
                  </div>
                </div>

                {/* Card Title & Date */}
                <div className="mt-5 flex items-center justify-between border-b border-yellow-400/15 pb-3">
                  <h3 className="font-display tracking-wider text-2xl sm:text-3xl text-cream uppercase">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-mono uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{note.dateStamp}</span>
                  </div>
                </div>

                {/* The Sweet Note in Warm Handwriting / Script Accent */}
                <div className="mt-4 p-4 rounded-2xl bg-navy-900/90 border-l-3 border-yellow-400">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Heart className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider font-bold">
                      Sweet Note from Soubhik:
                    </span>
                  </div>
                  <p className="font-script text-2xl sm:text-3xl text-yellow-300/95 leading-snug">
                    "{note.sweetNote}"
                  </p>
                </div>
              </div>

              {/* The Roast Postscript */}
              <div className="mt-4 pt-3 border-t border-navy-800/80">
                <p className="text-xs font-mono text-amber-400/90 italic leading-relaxed">
                  {note.roastPS}
                </p>
              </div>
            </div>
          );
        })}

        {/* End of Memory Line Teaser Card */}
        <div className="w-full sm:w-[320px] lg:w-[360px] flex-shrink-0 p-8 rounded-3xl border border-dashed border-yellow-400/40 bg-navy-900/40 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 mb-4">
            <Sparkles className="w-7 h-7 animate-spin" />
          </div>
          <h4 className="font-display text-2xl text-yellow-400 uppercase tracking-wider">
            MORE MEMORIES LOADING...
          </h4>
          <p className="text-xs text-cream/70 mt-2 font-body">
            19 years of legendary stories in the bag. The next chapters are going to be even bigger.
          </p>
        </div>
      </div>
    </section>
  );
};
