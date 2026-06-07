import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { AdminPhotoSlot } from "@/components/gallery/AdminPhotoSlot";
import { useSlots } from "@/lib/useImageSlots";
import { INFINITE_ROW1, INFINITE_ROW2, INFINITE_ROW3 } from "@/lib/imageSlots";

const CARD_W = 280;
const CARD_H = 380;
const GAP = 24;

function GalleryStrip({ slots, resolvedSrcs, offsetY, speed }: {
  slots: { slotKey: string }[];
  resolvedSrcs: string[];
  offsetY: number;
  speed: number;
}) {
  const xRef = useRef(0);
  const [x, setX] = useState(0);
  const STRIP_W = (CARD_W + GAP) * slots.length;

  useAnimationFrame((_, delta) => {
    xRef.current -= (delta / 1000) * speed;
    if (xRef.current < -STRIP_W) xRef.current += STRIP_W;
    setX(xRef.current);
  });

  const doubled = [...slots.map((s, i) => ({ ...s, src: resolvedSrcs[i] })),
                   ...slots.map((s, i) => ({ ...s, src: resolvedSrcs[i] }))];

  return (
    <div
      className="absolute flex"
      style={{ top: offsetY, left: 0, gap: GAP, transform: `translateX(${x}px)`, willChange: "transform" }}
    >
      {doubled.map((item, i) => (
        <AdminPhotoSlot
          key={`${item.slotKey}-${i}`}
          slotKey={item.slotKey}
          src={item.src}
          style={{ width: CARD_W, height: CARD_H, flexShrink: 0 }}
          imgClassName="w-full h-full object-cover"
          imgStyle={{ objectPosition: "center 20%", filter: "saturate(0.9) brightness(1.0)" }}
          alt=""
        />
      ))}
    </div>
  );
}

export function InfiniteGallery() {
  const slots = useSlots();

  const row1Srcs = INFINITE_ROW1.map((s) => slots[s.slotKey] ?? s.defaultSrc);
  const row2Srcs = INFINITE_ROW2.map((s) => slots[s.slotKey] ?? s.defaultSrc);
  const row3Srcs = INFINITE_ROW3.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "1000px" }}>
      <div style={{ position: "absolute", inset: 0, top: "60px", transform: "rotateX(5deg) scale(1.05)", transformOrigin: "center top" }}>
        <GalleryStrip slots={INFINITE_ROW1} resolvedSrcs={row1Srcs} offsetY={0} speed={40} />
        <GalleryStrip slots={INFINITE_ROW2} resolvedSrcs={row2Srcs} offsetY={CARD_H + GAP} speed={28} />
        <GalleryStrip slots={INFINITE_ROW3} resolvedSrcs={row3Srcs} offsetY={(CARD_H + GAP) * 2} speed={36} />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(26,23,20,0.15) 0%, rgba(26,23,20,0.05) 50%, rgba(26,23,20,0.35) 100%)" }}
      />
    </div>
  );
}