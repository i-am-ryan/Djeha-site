import { useEffect, useRef, useState } from "react";

export function RunawayButton() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const dodge = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const maxX = window.innerWidth - r.width - 24;
    const maxY = window.innerHeight - r.height - 24;
    const x = Math.max(12, Math.random() * maxX);
    const y = Math.max(80, Math.random() * maxY);
    setPos({ x, y });
  };

  const fixedStyle = pos
    ? {
        position: "fixed" as const,
        left: pos.x,
        top: pos.y,
        transition: "left 0.25s ease, top 0.25s ease",
        zIndex: 50,
      }
    : undefined;

  return (
    <button
      ref={btnRef}
      onMouseEnter={dodge}
      onFocus={dodge}
      onTouchStart={(e) => { e.preventDefault(); dodge(); }}
      onClick={dodge}
      style={fixedStyle}
      className="rounded-full border-2 border-foreground/30 bg-card px-8 py-5 font-serif text-xl text-foreground shadow-lg hover:border-foreground/60"
    >
      ❌ Maybe ask me again?
    </button>
  );
}
