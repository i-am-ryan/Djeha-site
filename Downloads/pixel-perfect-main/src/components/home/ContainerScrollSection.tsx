import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IMAGES = [
  "/images/OurWork/SIM_4806.jpg",
  "/images/OurWork/SIM_4419.jpg",
  "/images/OurWork/DJAY0432-Edit.jpg",
   "/images/OurWork/0T6A0152-Edit.jpg",
  "/images/OurWork/_DSC0215.jpg",
  "/images/OurWork/DSC05679.jpg",
  "/images/OurWork/DSC00823.jpg",
  "/images/OurWork/IMG_8938-Edit.jpg",
  "/images/OurWork/SIM_4449.jpg",
  "/images/OurWork/9V1A0173.jpg",
  "/images/OurWork/20230905-DSC09253-2.jpg",
  "/images/OurWork/9V1A2210.jpg",
  
];

const TYPEWRITER_PAIRS = [
  { line1: "The Portfolio",    line2: "Speaks For Itself." },
  { line1: "Our Finest Work",  line2: "Tells Every Story." },
  { line1: "Every Occasion",   line2: "Captures The Soul." },
  { line1: "Timeless Moments", line2: "Lives In Every Frame." },
];

function SyncedHeading() {
  const [pairIndex, setPairIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">("typing");

  const pair = TYPEWRITER_PAIRS[pairIndex];
  const maxLen = Math.max(pair.line1.length, pair.line2.length);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIndex < maxLen) {
        timeout = setTimeout(() => setCharIndex((p) => p + 1), 55);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), 2200);
      }
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((p) => p - 1), 28);
      } else {
        setPairIndex((p) => (p + 1) % TYPEWRITER_PAIRS.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex, maxLen]);

  const cursor = (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="ml-0.5 inline-block"
    >
      |
    </motion.span>
  );

  return (
    <>
      <h2 className="mt-4 font-playfair text-[36px] leading-tight text-dj-ink md:text-[60px]">
        {pair.line1.slice(0, charIndex)}{cursor}
      </h2>
      <p className="mt-2 font-cormorant italic text-[28px] text-dj-warm md:text-[48px]">
        {pair.line2.slice(0, charIndex)}{cursor}
      </p>
    </>
  );
}

export function ContainerScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);

  return (
    <section ref={ref} className="bg-dj-bg2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-10">
        <p
          className="font-inter text-[10px] uppercase text-dj-warm"
          style={{ letterSpacing: "0.25em" }}
        >
          Our Work
        </p>

        <SyncedHeading />

        <motion.div
          style={{ rotateX: rotate, scale, transformPerspective: 1200 }}
          className="mx-auto mt-14 max-w-[1100px] border border-dj-border2 bg-dj-bg3 p-3 shadow-2xl"
        >
       <div className="grid grid-cols-3 gap-[2px]">
            {IMAGES.map((src, i) => (
       <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
className="aspect-square w-full object-cover"  />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}