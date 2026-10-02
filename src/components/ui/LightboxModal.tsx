import React, { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxModalProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const isOpen = currentIndex !== null;
  const currentItem = currentIndex !== null ? items[currentIndex] : null;
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      onNext(); // swipe left
    } else if (diff < -50) {
      onPrev(); // swipe right
    }
    setTouchStart(null);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn touch-pan-y"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy-850/90 border border-yellow-400/40 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-navy-950 active:scale-95 transition-all shadow-lg"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-850/90 border border-yellow-400/40 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-navy-950 active:scale-95 transition-all shadow-lg"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-850/90 border border-yellow-400/40 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-navy-950 active:scale-95 transition-all shadow-lg"
        aria-label="Next photo"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Center Image Container */}
      <div
        className="max-w-4xl w-full max-h-[88vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-400/40 shadow-glow-lg max-h-[68vh] sm:max-h-[72vh] flex items-center justify-center bg-navy-950">
          <SafeImage
            src={currentItem.src}
            alt={currentItem.alt}
            className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain"
            containerClassName="max-h-[68vh] sm:max-h-[72vh]"
            fallbackTitle={currentItem.alt}
            fallbackSubtitle={currentItem.caption}
          />
        </div>

        {/* Caption bar */}
        <div className="mt-3 sm:mt-4 text-center max-w-xl px-4">
          <p className="font-display tracking-wide text-xl sm:text-2xl text-yellow-400 uppercase">
            {currentItem.alt}
          </p>
          {currentItem.caption && (
            <p className="text-xs sm:text-sm text-cream/90 mt-0.5 font-body line-clamp-2">
              {currentItem.caption}
            </p>
          )}
          <div className="mt-1.5 text-[10px] sm:text-xs font-mono text-yellow-300/70">
            {currentIndex + 1} of {items.length} • Swipe or use Arrow Keys
          </div>
        </div>
      </div>
    </div>
  );
};
