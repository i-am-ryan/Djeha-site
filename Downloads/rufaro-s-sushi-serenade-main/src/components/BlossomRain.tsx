import { useMemo } from "react";

export function BlossomRain({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        duration: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
        sway: 4 + Math.random() * 6,
        opacity: 0.5 + Math.random() * 0.4,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-fall"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            className="animate-sway"
            style={{ animationDuration: `${p.sway}s` }}
          >
            <Petal size={p.size} opacity={p.opacity} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Petal({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ opacity }}
    >
      <path
        d="M12 2 C14 7, 18 9, 22 10 C18 12, 14 14, 12 22 C10 14, 6 12, 2 10 C6 9, 10 7, 12 2 Z"
        fill="oklch(0.85 0.08 10)"
        stroke="oklch(0.7 0.12 15)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
