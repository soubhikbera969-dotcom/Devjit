import React, { useState, useRef, useEffect } from 'react';
import { SafeImage } from '../ui/SafeImage';
import { LightboxModal } from '../ui/LightboxModal';
import { Maximize2, Sparkles } from 'lucide-react';

interface FloatingPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  depthZ: number; // translateZ in px
  initRotate: number;
  initRotateX?: number;
  initRotateY?: number;
  floatAnimation: string;
  aspect: string;
  colSpan?: string;
}

// All available photos floating in 3D
const FLOATING_PHOTOS: FloatingPhoto[] = [
  { id: 'f1', src: '/images/hero.jpg', alt: 'Devjit Rath', caption: 'The Birthday King in his element', depthZ: 30, initRotate: -3, initRotateY: -6, floatAnimation: 'animate-float3d-1', aspect: 'aspect-[3/4]' },
  { id: 'f2', src: '/images/gallery-1.jpg', alt: 'Classroom Laughs', caption: 'Where the mischief started', depthZ: -20, initRotate: 4, initRotateX: 5, floatAnimation: 'animate-float3d-2', aspect: 'aspect-[4/5]' },
  { id: 'f3', src: '/images/about.jpg', alt: 'Pure Focus', caption: 'Calm, collected & unbothered', depthZ: 40, initRotate: -2, initRotateY: 8, floatAnimation: 'animate-float3d-3', aspect: 'aspect-[3/4]' },
  { id: 'f4', src: '/images/note-2.jpg', alt: 'Match Adrenaline', caption: 'Cricket turf legends', depthZ: -10, initRotate: 3, initRotateX: -4, floatAnimation: 'animate-float3d-1', aspect: 'aspect-[3/4]' },
  { id: 'f5', src: '/images/gallery-2.jpg', alt: 'Midnight Drives', caption: 'Late chai & spontaneous road trips', depthZ: 25, initRotate: -4, initRotateY: -8, floatAnimation: 'animate-float3d-2', aspect: 'aspect-[4/5]' },
  { id: 'f6', src: '/images/note-1.jpg', alt: 'Brothers for Life', caption: 'The friend who never flinched', depthZ: 35, initRotate: 2, initRotateX: 6, floatAnimation: 'animate-float3d-3', aspect: 'aspect-[3/4]' },
  { id: 'f7', src: '/images/gallery-3.jpg', alt: 'Squad Adventures', caption: 'Unfiltered laughter and memories', depthZ: -15, initRotate: -3, initRotateY: 5, floatAnimation: 'animate-float3d-1', aspect: 'aspect-[4/5]' },
  { id: 'f8', src: '/images/note-3.jpg', alt: 'The Iron Grind', caption: 'Chasing creative stardom & gym gains', depthZ: 20, initRotate: 4, initRotateX: -5, floatAnimation: 'animate-float3d-2', aspect: 'aspect-[3/4]' },
  { id: 'f9', src: '/images/gallery-4.jpg', alt: 'Aesthetic Chill', caption: 'Chronically roasted, deeply irreplaceable', depthZ: -25, initRotate: -2, initRotateY: -6, floatAnimation: 'animate-float3d-3', aspect: 'aspect-[3/4]' },
  { id: 'f10', src: '/images/gallery-5.jpg', alt: 'Sunset Stories', caption: 'Conversations that meant everything', depthZ: 30, initRotate: 3, initRotateX: 4, floatAnimation: 'animate-float3d-1', aspect: 'aspect-[4/5]' },
  { id: 'f11', src: '/images/gallery-6.jpg', alt: 'Good Times', caption: 'Endless banter & zero regrets', depthZ: -10, initRotate: -4, initRotateY: 7, floatAnimation: 'animate-float3d-2', aspect: 'aspect-[3/4]' },
  { id: 'f12', src: '/images/gallery-7.jpg', alt: 'Always Standing Solid', caption: 'Day 1 brotherhood', depthZ: 35, initRotate: 2, initRotateX: -4, floatAnimation: 'animate-float3d-3', aspect: 'aspect-[4/5]' },
];

export const MomentsGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle interactive 3D mouse parallax across the whole floating space
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16; // -8 to 8 deg
    const y = (clientY / innerHeight - 0.5) * -16;
    setMouseOffset({ x, y });
  };

  const marqueeText = 'DEVJIT RATH • 19 YEARS • CELEBRATING DEV • LEGENDARY MEMORIES • ';

  return (
    <section
      id="gallery"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-20 bg-[#071329] bg-noise overflow-hidden border-b border-navy-800"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-navy-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Background Floating Marquee Tape */}
      <div className="w-full overflow-hidden bg-yellow-400/10 py-3 mb-10 transform -rotate-1 select-none border-y border-yellow-400/20 pointer-events-none">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] w-max">
          <span className="font-display tracking-widest text-lg sm:text-xl text-yellow-300/80 uppercase px-4 font-bold">
            {marqueeText.repeat(3)}
          </span>
          <span className="font-display tracking-widest text-lg sm:text-xl text-yellow-300/80 uppercase px-4 font-bold">
            {marqueeText.repeat(3)}
          </span>
        </div>
      </div>

      {/* 3D Floating Image Universe Container (No Section Name!) */}
      <div
        ref={containerRef}
        className="max-w-[1440px] mx-auto px-4 sm:px-8 perspective-1000"
        style={{
          perspective: '1200px',
        }}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)`,
          }}
        >
          {FLOATING_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`group relative cursor-pointer rounded-2xl glass-panel p-2 sm:p-3 border border-yellow-400/25 hover:border-yellow-400 shadow-card-navy hover:shadow-glow-yellow transition-all duration-500 select-none ${photo.floatAnimation}`}
              style={{
                transform: `translateZ(${photo.depthZ}px) rotate(${photo.initRotate}deg)`,
                animationDelay: `${(index % 4) * 0.7}s`,
              }}
              title="Click to view full photo"
            >
              {/* Photo Frame */}
              <div className={`relative ${photo.aspect} rounded-xl overflow-hidden bg-navy-950`}>
                <SafeImage
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fallbackTitle={photo.alt}
                  fallbackSubtitle={photo.caption}
                />

                {/* Shimmer / Hover Overlay */}
                <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-navy-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Subtle depth lighting badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                </div>
              </div>

              {/* Caption Tag */}
              <div className="p-2 sm:p-2.5">
                <h4 className="font-display tracking-wide text-sm sm:text-base text-yellow-400 uppercase truncate">
                  {photo.alt}
                </h4>
                <p className="text-[11px] text-cream/70 line-clamp-1 font-body mt-0.5">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Cinema Lightbox Modal */}
      <LightboxModal
        items={FLOATING_PHOTOS}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null ? (prev + 1) % FLOATING_PHOTOS.length : 0
          )
        }
        onPrev={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null ? (prev - 1 + FLOATING_PHOTOS.length) % FLOATING_PHOTOS.length : 0
          )
        }
      />
    </section>
  );
};
