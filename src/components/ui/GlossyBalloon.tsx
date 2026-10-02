import React, { useState } from 'react';
import { fireBalloonPopConfetti } from '../../lib/confetti';

interface GlossyBalloonProps {
  color?: 'yellow' | 'navy' | 'amber' | 'white';
  size?: number;
  className?: string;
  delay?: number;
  label?: string;
}

export const GlossyBalloon: React.FC<GlossyBalloonProps> = ({
  color = 'yellow',
  size = 70,
  className = '',
  delay = 0,
  label,
}) => {
  const [popped, setPopped] = useState(false);

  const colors = {
    yellow: {
      body: 'url(#yellowGradient)',
      highlight: '#FFF9D2',
      knot: '#D98200',
      string: 'rgba(255, 200, 61, 0.4)',
    },
    amber: {
      body: 'url(#amberGradient)',
      highlight: '#FFE599',
      knot: '#B36B00',
      string: 'rgba(245, 161, 0, 0.4)',
    },
    navy: {
      body: 'url(#navyGradient)',
      highlight: '#4D82D6',
      knot: '#0A1A3A',
      string: 'rgba(30, 74, 140, 0.4)',
    },
    white: {
      body: 'url(#whiteGradient)',
      highlight: '#FFFFFF',
      knot: '#DDD5C0',
      string: 'rgba(255, 248, 231, 0.4)',
    },
  };

  const currentTheme = colors[color];

  const handlePop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    setPopped(true);
    fireBalloonPopConfetti(x, y);

    // Optional audio chirp if browser allows
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext policy fallback
    }

    // Regrow balloon after 5 seconds so hero remains playful
    setTimeout(() => {
      setPopped(false);
    }, 5000);
  };

  if (popped) {
    return (
      <div 
        className={`inline-flex items-center justify-center transition-all duration-300 scale-0 opacity-0 pointer-events-none ${className}`}
        style={{ width: size, height: size * 1.5 }}
      />
    );
  }

  return (
    <div
      onClick={handlePop}
      className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 group relative select-none animate-float-slow ${className}`}
      style={{
        width: size,
        height: size * 1.5,
        animationDelay: `${delay}s`,
      }}
      title="Click to pop!"
      role="button"
      tabIndex={0}
      aria-label="Interactive balloon - click to pop"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePop(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <svg
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg filter transition-filter group-hover:brightness-110"
      >
        <defs>
          <radialGradient id="yellowGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="45%" stopColor="#FFC83D" />
            <stop offset="85%" stopColor="#E69500" />
            <stop offset="100%" stopColor="#A86300" />
          </radialGradient>

          <radialGradient id="amberGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#F5A100" />
            <stop offset="100%" stopColor="#9C5200" />
          </radialGradient>

          <radialGradient id="navyGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#3B73C4" />
            <stop offset="55%" stopColor="#1E4A8C" />
            <stop offset="100%" stopColor="#08142A" />
          </radialGradient>

          <radialGradient id="whiteGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFF8E7" />
            <stop offset="100%" stopColor="#D9CEB8" />
          </radialGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dangling Balloon String */}
        <path
          d="M 50 114 Q 45 128, 56 138 T 50 150"
          stroke={currentTheme.string}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Balloon Knot */}
        <polygon
          points="46,112 54,112 56,117 44,117"
          fill={currentTheme.knot}
        />

        {/* Balloon Egg Body */}
        <ellipse
          cx="50"
          cy="62"
          rx="44"
          ry="52"
          fill={currentTheme.body}
          className="transition-all"
        />

        {/* Glossy 3D Highlight specular reflection */}
        <ellipse
          cx="33"
          cy="42"
          rx="14"
          ry="24"
          transform="rotate(-25 33 42)"
          fill={currentTheme.highlight}
          opacity="0.65"
          filter="url(#softGlow)"
        />

        {/* Tiny secondary glossy dot */}
        <circle
          cx="44"
          cy="26"
          r="4"
          fill={currentTheme.highlight}
          opacity="0.8"
        />

        {/* Optional Label / Text on balloon */}
        {label && (
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fill="#0A1A3A"
            fontWeight="bold"
            fontSize="14"
            fontFamily="Bebas Neue, sans-serif"
            letterSpacing="1"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
};
