import { motion, useScroll, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

const ROW1 = [
  "/images/Weddings/IMG_3453.JPG",
  "/images/Weddings/IMG_3456.JPG",
  "/images/Weddings/IMG_3460.JPG",
  "/images/Weddings/IMG_3462.JPG",
  "/images/Weddings/IMG_3465.jpg",
  "/images/Weddings/IMG_3458.JPG",
];

const ROW2 = [
  "/images/Graduation/DJAY9788.jpg",
  "/images/Graduation/IMG_3419.jpg",
  "/images/Graduation/IMG_3416.JPG",
  "/images/Graduation/IMG_3422.jpg",
  "/images/Graduation/IMG_3420.jpg",
  "/images/Graduation/DJAY9736.jpg",
];

const ROW3 = [
  "/images/Portraits/IMG_3511.JPG",
  "/images/Portraits/IMG_3514.JPG",
  "/images/Portraits/IMG_3517.JPG",
  "/images/Matric/IMG_3467.JPG",
  "/images/Matric/IMG_3472.JPG",
  "/images/Corporate/IMG_3488.JPG",
];

function AutoRow({ images, speed, direction }: { images: string[]; speed: number; direction: 1 | -1 }) {
  const xRef = useRef(0);
  const [x, setX] = useState(0);
  const tileW = 263;
  const totalW = tileW * images.length;

  useAnimationFrame((_, delta) => {
    xRef.current += (delta / 1000) * speed * direction;
    if (xRef.current > 0) xRef.current -= totalW;
    if (xRef.current < -totalW) xRef.current += totalW;
    setX(xRef.current);
  });

  const doubled = [...images, ...images];

  return (
    <div className="flex gap-3 w-fit" style={{ transform: `translateX(${x}px)`, willChange: "transform" }}>
      {doubled.map((src, i) => (
        <Tile key={i} src={src} />
      ))}
    </div>
  );
}

function ParallaxRow({ images, startX, endX }: { images: string[]; startX: string; endX: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);

  return (
    <div ref={ref}>
      <motion.div style={{ x }} className="flex w-fit gap-3">
        {images.concat(images).map((src, i) => (
          <Tile key={i} src={src} />
        ))}
      </motion.div>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section className="overflow-hidden bg-dj-dark py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-[1500px] px-6 text-center lg:px-10">
        <p className="font-inter text-[10px] uppercase text-white/50" style={{ letterSpacing: "0.25em" }}>
          Featured Work
        </p>
        <h2 className="mt-4 font-playfair text-[36px] text-white md:text-[48px]">Our Work.</h2>
        <p className="mt-3 font-cormorant italic text-[20px] text-white/60">
          The portfolio speaks for itself.
        </p>
      </div>

      <div className="overflow-hidden">
        <AutoRow images={ROW1} speed={60} direction={-1} />
      </div>
      <div className="mt-3 overflow-hidden">
        <ParallaxRow images={ROW2} startX="-8%" endX="4%" />
      </div>
      <div className="mt-3 overflow-hidden">
        <AutoRow images={ROW3} speed={45} direction={1} />
      </div>
    </section>
  );
}

function Tile({ src }: { src: string }) {
  return (
    <div className="group h-[260px] w-[260px] flex-shrink-0 overflow-hidden md:h-[320px] md:w-[260px]">
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
        style={{ filter: "saturate(0.5) brightness(0.85)" }}
      />
    </div>
  );
}