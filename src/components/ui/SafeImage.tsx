import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Devjit Rath',
  fallbackTitle = 'Devjit Rath',
  fallbackSubtitle = 'Moment Captured',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 animate-pulse" />
      )}

      {/* Main Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        />
      ) : (
        /* Stylish Navy & Yellow Gradient Placeholder */
        <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-6 flex flex-col items-center justify-center text-center border border-yellow-400/30 rounded-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

          <div className="w-12 h-12 rounded-full bg-yellow-400/15 border border-yellow-400/40 flex items-center justify-center text-yellow-400 mb-3 shadow-glow-yellow">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h4 className="font-display tracking-wider text-xl text-yellow-400 uppercase">
            {fallbackTitle}
          </h4>
          <p className="text-xs text-cream/70 mt-1 max-w-[200px]">
            {fallbackSubtitle}
          </p>
          <span className="mt-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-mono bg-navy-700 text-yellow-300 border border-yellow-400/20">
            Dev • 19 Years
          </span>
        </div>
      )}
    </div>
  );
};
