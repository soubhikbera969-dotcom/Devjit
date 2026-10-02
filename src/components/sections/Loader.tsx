import React, { useEffect, useState } from 'react';
import { GlossyBalloon } from '../ui/GlossyBalloon';
import { Sparkles } from 'lucide-react';

interface LoaderProps {
  onLoadingComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Wait a beat at 100, then trigger curtain wipe
        setTimeout(() => {
          setIsWiping(true);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete();
          }, 900);
        }, 400);
      } else {
        setProgress(current);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0A1A3A] flex flex-col items-center justify-center transition-transform duration-800 ease-in-out ${
        isWiping ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none" />

      {/* Center Stage */}
      <div className="relative flex flex-col items-center z-10">
        {/* Balloon rising with progress */}
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(-${progress * 0.9}px)`,
          }}
        >
          <GlossyBalloon color="yellow" size={80} label="19" />
        </div>

        {/* Counter Number */}
        <div className="mt-8 flex items-baseline gap-1">
          <span className="font-display text-7xl sm:text-9xl text-yellow-400 tracking-wider drop-shadow-md select-none">
            {progress}
          </span>
          <span className="font-display text-4xl sm:text-5xl text-yellow-300">
            %
          </span>
        </div>

        {/* Status text */}
        <div className="flex items-center gap-2 mt-4 text-cream/80 text-xs sm:text-sm font-mono tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          <span>
            {progress < 40 && 'Inflating Birthday Balloons...'}
            {progress >= 40 && progress < 80 && 'Brewing Brotherhood Roasts...'}
            {progress >= 80 && progress < 100 && 'Preparing Red Carpet For Dev...'}
            {progress === 100 && 'Ready For Devjit Rath!'}
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-48 sm:w-64 h-1.5 bg-navy-800 rounded-full mt-6 overflow-hidden border border-yellow-400/20">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-100 ease-out shadow-glow-yellow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
