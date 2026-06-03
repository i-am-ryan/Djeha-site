import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

const IMAGES = [
  "/images/Weddings/IMG_3453.JPG",
  "/images/Graduation/DJAY9788.jpg",
  "/images/Portraits/IMG_3511.JPG",
  "/images/Matric/IMG_3467.JPG",
  "/images/Corporate/IMG_3488.JPG",
  "/images/RealEstate/IMG_3533.JPG",
  "/images/Weddings/IMG_3458.JPG",
  "/images/Corporate/IMG_3492.JPG",
  "/images/Portraits/IMG_3521.JPG",
  "/images/Graduation/IMG_3419.jpg",
];

const CARD_W = 280;
const CARD_H = 380;
const GAP = 24;
const TOTAL = IMAGES.length;
const STRIP_W = (CARD_W + GAP) * TOTAL;

function GalleryStrip({ offsetY, speed }: { offsetY: number; speed: number }) {
  const xRef = useRef(0);
  const [x, setX] = useState(0);

  useAnimationFrame((_, delta) => {
    xRef.current -= (delta / 1000) * speed;
    if (xRef.current < -STRIP_W) xRef.current += STRIP_W;
    setX(xRef.current);
  });

  const doubled = [...IMAGES, ...IMAGES];

  return (
    <div
      className="absolute flex"
      style={{
        top: offsetY,
        left: 0,
        gap: GAP,
        transform: `translateX(${x}px)`,
        willChange: "transform",
      }}
    >
      {doubled.map((src, i) => (
        <div
          key={i}
          style={{ width: CARD_W, height: CARD_H, flexShrink: 0, overflow: "hidden" }}
        >
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.4) brightness(0.7)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function InfiniteGallery() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "1000px" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotateX(12deg) scale(1.15)",
          transformOrigin: "center top",
        }}
      >
        <GalleryStrip offsetY={0} speed={40} />
        <GalleryStrip offsetY={CARD_H + GAP} speed={28} />
        <GalleryStrip offsetY={(CARD_H + GAP) * 2} speed={36} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.4) 50%, rgba(26,23,20,0.75) 100%)",
        }}
      />
    </div>
  );
}