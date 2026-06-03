import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "left" | "right";

function getRandomRotation(min: number, max: number, direction: Direction) {
  const val = Math.random() * (max - min) + min;
  return direction === "left" ? -val : val;
}

function Photo({
  src,
  alt,
  direction,
  width,
  height,
}: {
  src: string;
  alt: string;
  direction: Direction;
  width: number;
  height: number;
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation(getRandomRotation(1, 4, direction));
  }, [direction]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 9999 }}
      whileHover={{ scale: 1.08, rotateZ: direction === "left" ? -2 : 2, zIndex: 9999 }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{ width, height, touchAction: "none", userSelect: "none" }}
      className="relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      draggable={false}
    >
      <div className="relative h-full w-full overflow-hidden shadow-lg" style={{ borderRadius: 16 }}>
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

interface PhotoItem {
  src: string;
  alt?: string;
}

export function PhotoGallery({
  photos,
  animationDelay = 0.3,
}: {
  photos: PhotoItem[];
  animationDelay?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), animationDelay * 1000 + 400);
    return () => clearTimeout(t);
  }, [animationDelay]);

  // Build positions for up to 5 photos
  const positions = [
    { x: "-320px", y: "15px",  zIndex: 50, direction: "left"  as Direction },
    { x: "-160px", y: "32px",  zIndex: 40, direction: "left"  as Direction },
    { x: "0px",    y: "8px",   zIndex: 30, direction: "right" as Direction },
    { x: "160px",  y: "22px",  zIndex: 20, direction: "right" as Direction },
    { x: "320px",  y: "44px",  zIndex: 10, direction: "left"  as Direction },
  ];

  const items = photos.slice(0, 5).map((p, i) => ({
    ...p,
    ...positions[i],
    order: i,
  }));

  return (
    <div className="relative mb-8 h-[350px] w-full items-center justify-center lg:flex">
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: animationDelay }}
      >
        <div className="relative flex w-full justify-center">
          <div className="relative h-[220px] w-[220px]">
            {[...items].reverse().map((photo) => (
              <motion.div
                key={photo.src}
                className="absolute left-0 top-0"
                style={{ zIndex: photo.zIndex }}
                initial={{ x: 0, y: 0 }}
                animate={isLoaded ? { x: photo.x, y: photo.y } : { x: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 12,
                  delay: photo.order * 0.15,
                }}
              >
                <Photo
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  direction={photo.direction}
                  width={220}
                  height={220}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}