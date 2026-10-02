import React, { useEffect, useState } from 'react';
import { fireEasterEggConfetti } from '../../lib/confetti';
import { Sparkles } from 'lucide-react';

export const EasterEgg: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Check single key 'B' or 'b'
      if (e.key.toLowerCase() === 'b') {
        triggerEgg('Birthday Blast Unlocked!');
        return;
      }

      // Track buffer for 'dev'
      const newBuffer = (typedBuffer + e.key.toLowerCase()).slice(-3);
      setTypedBuffer(newBuffer);

      if (newBuffer === 'dev') {
        triggerEgg('Secret Dev Cheat Code Activated! 🎉');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedBuffer]);

  const triggerEgg = (msg: string) => {
    fireEasterEggConfetti();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  if (!showToast) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-bounce">
      <div className="px-6 py-3 rounded-full bg-yellow-400 text-navy-950 font-bold text-sm tracking-wide shadow-glow-yellow border-2 border-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 animate-spin" />
        <span>SECRET UNLOCKED: CELEBRATING DEV! 🎊</span>
      </div>
    </div>
  );
};
