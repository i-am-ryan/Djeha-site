import React, { useState, useEffect, useRef, HTMLAttributes } from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export interface GalleryItem {
  label: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 580, autoRotateSpeed = 0.015, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Horizontal wheel scroll drives rotation
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        // Use deltaX for trackpad horizontal, fallback to deltaY for mouse wheel
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(delta) < 1) return;

        e.preventDefault();
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        setRotation((prev) => prev + delta * 0.15);

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 200);
      };

      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    // Auto-rotate when idle
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) setRotation((prev) => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            const opacity = Math.max(0.2, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url + i}
                className="absolute"
                style={{
                  width: "260px",
                  height: "360px",
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-130px",
                  marginTop: "-180px",
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div className="relative w-full h-full overflow-hidden shadow-2xl border border-dj-border">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos ?? "center" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p
                      className="font-inter text-[10px] uppercase text-white/70"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";
export { CircularGallery };