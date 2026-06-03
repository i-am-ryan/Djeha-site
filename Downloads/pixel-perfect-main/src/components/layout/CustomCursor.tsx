import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="h-1.5 w-1.5 rounded-full bg-dj-charcoal"
        />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.55 : 1,
            backgroundColor: hovering ? "rgba(44,40,37,0.06)" : "rgba(44,40,37,0)",
          }}
          transition={{ duration: 0.25 }}
          className="h-9 w-9 rounded-full border border-dj-charcoal/50"
        />
      </motion.div>
    </>
  );
}