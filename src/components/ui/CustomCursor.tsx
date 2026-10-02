import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
  color: string;
}

const COLORS = [
  "#FFC83D", // Gold (Brand primary)
  "#FF0080", // Vibrant Pink
  "#7928CA", // Royal Purple
  "#0070F3", // Blue
  "#00DFD8", // Cyan
  "#F5A100", // Amber
  "#FFD700", // Golden Yellow
];

export const LiquidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, moved: false, isTouch: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moved = true;
      mouseRef.current.isTouch = false;
    };

    // Touch events for phones and tablets
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
        mouseRef.current.lastX = touch.clientX;
        mouseRef.current.lastY = touch.clientY;
        mouseRef.current.moved = true;
        mouseRef.current.isTouch = true;

        // Emit initial droplet burst on tap
        for (let i = 0; i < 4; i++) {
          addPoint(touch.clientX, touch.clientY, 1.2);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
        mouseRef.current.moved = true;
        mouseRef.current.isTouch = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const addPoint = (x: number, y: number, speedMultiplier = 1) => {
      if (pointsRef.current.length > 120) return; // Prevent overcrowding & keep 60fps on mobile

      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.8 + 0.2) * speedMultiplier;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      pointsRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        radius: Math.random() * 18 + 10, // Radius between 10 and 28
        color,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new points if mouse/finger moved
      if (mouseRef.current.moved) {
        const dist = Math.hypot(
          mouseRef.current.x - mouseRef.current.lastX,
          mouseRef.current.y - mouseRef.current.lastY
        );

        if (dist > 0) {
          const steps = Math.min(dist, 16);
          for (let i = 0; i < steps; i += 2) {
            const t = i / steps;
            const x =
              mouseRef.current.lastX +
              (mouseRef.current.x - mouseRef.current.lastX) * t;
            const y =
              mouseRef.current.lastY +
              (mouseRef.current.y - mouseRef.current.lastY) * t;

            if (Math.random() > 0.4) {
              addPoint(x, y, mouseRef.current.isTouch ? 1.4 : 1);
            }
          }
        }

        mouseRef.current.lastX = mouseRef.current.x;
        mouseRef.current.lastY = mouseRef.current.y;
        mouseRef.current.moved = false;
      } else {
        mouseRef.current.lastX = mouseRef.current.x;
        mouseRef.current.lastY = mouseRef.current.y;
      }

      // Update and draw liquid droplets
      for (let i = pointsRef.current.length - 1; i >= 0; i--) {
        const p = pointsRef.current[i];

        p.life -= 0.015; // Smooth decay rate
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= 0.985; // Organic shrinkage

        if (p.life <= 0 || p.radius < 0.5) {
          pointsRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* SVG Filter for Gooey Liquid Fluid Merging */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="liquid-cursor-filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ filter: "url(#liquid-cursor-filter)" }}
      />
    </div>
  );
};

// Also export as CustomCursor for seamless integration
export const CustomCursor = LiquidCursor;
