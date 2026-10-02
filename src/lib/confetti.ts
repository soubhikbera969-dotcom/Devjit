import confetti from 'canvas-confetti';

export const fireCelebrationConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FFC83D', '#FFD966', '#FFFFFF', '#1E4A8C'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#FFC83D', '#F5A100', '#0A1A3A'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FFC83D', '#FFF8E7', '#FFD966'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#F5A100', '#FFC83D'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#FFC83D', '#14305F', '#FFF8E7'],
  });
};

export const fireBalloonPopConfetti = (xPercent: number, yPercent: number) => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: xPercent, y: yPercent },
    colors: ['#FFC83D', '#FFD966', '#F5A100', '#FFF8E7', '#1E4A8C'],
    zIndex: 9999,
    disableForReducedMotion: true,
  });
};

export const fireEasterEggConfetti = () => {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFC83D', '#FFD966', '#1E4A8C', '#FFF8E7'],
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#F5A100', '#FFC83D', '#14305F', '#FFFFFF'],
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
