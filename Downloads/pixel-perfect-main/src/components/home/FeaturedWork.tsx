import { motion, useScroll, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { AdminPhotoSlot } from "@/components/gallery/AdminPhotoSlot";
import { useSlots } from "@/lib/useImageSlots";
import { FEATURED_ROW1, FEATURED_ROW2, FEATURED_ROW3 } from "@/lib/imageSlots";

function AutoRow({ slots, srcs, speed, direction }: {
  slots: { slotKey: string }[];
  srcs: string[];
  speed: number;
  direction: 1 | -1;
}) {
  const xRef = useRef(0);
  const [x, setX] = useState(0);
  const tileW = 263;
  const totalW = tileW * slots.length;

  useAnimationFrame((_, delta) => {
    xRef.current += (delta / 1000) * speed * direction;
    if (xRef.current > 0) xRef.current -= totalW;
    if (xRef.current < -totalW) xRef.current += totalW;
    setX(xRef.current);
  });

  const doubled = [...slots.map((s, i) => ({ ...s, src: srcs[i] })),
                   ...slots.map((s, i) => ({ ...s, src: srcs[i] }))];

  return (
    <div className="flex gap-3 w-fit" style={{ transform: `translateX(${x}px)`, willChange: "transform" }}>
      {doubled.map((item, i) => (
        <AdminPhotoSlot
          key={`${item.slotKey}-${i}`}
          slotKey={item.slotKey}
          src={item.src}
          className="group h-[260px] w-[260px] flex-shrink-0 overflow-hidden md:h-[320px] md:w-[260px]"
          imgClassName="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
          imgStyle={{ filter: "saturate(0.5) brightness(0.85)" }}
          alt=""
        />
      ))}
    </div>
  );
}

function ParallaxRow({ slots, srcs, startX, endX }: {
  slots: { slotKey: string }[];
  srcs: string[];
  startX: string;
  endX: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);

  return (
    <div ref={ref}>
      <motion.div style={{ x }} className="flex w-fit gap-3">
        {slots.concat(slots).map((slot, i) => (
          <AdminPhotoSlot
            key={`${slot.slotKey}-${i}`}
            slotKey={slot.slotKey}
            src={srcs[i % srcs.length]}
            className="group h-[260px] w-[260px] flex-shrink-0 overflow-hidden md:h-[320px] md:w-[260px]"
            imgClassName="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
            imgStyle={{ filter: "saturate(0.5) brightness(0.85)" }}
            alt=""
          />
        ))}
      </motion.div>
    </div>
  );
}

export function FeaturedWork() {
  const slots = useSlots();

  const row1Srcs = FEATURED_ROW1.map((s) => slots[s.slotKey] ?? s.defaultSrc);
  const row2Srcs = FEATURED_ROW2.map((s) => slots[s.slotKey] ?? s.defaultSrc);
  const row3Srcs = FEATURED_ROW3.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  return (
    <section className="overflow-hidden bg-dj-dark py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-[1500px] px-6 text-center lg:px-10">
        <p className="font-inter text-[10px] uppercase text-white/50" style={{ letterSpacing: "0.25em" }}>
          Follow Along
        </p>
        <h2 className="mt-4 font-playfair text-[36px] text-white md:text-[48px]">On Instagram.</h2>
        <p className="mt-3 font-cormorant italic text-[20px] text-white/60">
          Behind the lens, between the sessions — follow the journey.
        </p>
        <motion.a
          href="https://www.instagram.com/_djeha_?igsh=cG96NjVzbDMzYWlt"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group mt-8 inline-flex items-center gap-3 border border-white/20 px-8 py-3.5 font-inter text-[11px] uppercase text-white/70 transition-all duration-300 hover:border-white/60 hover:text-white"
          style={{ letterSpacing: "0.2em" }}
        >
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          @_djeha_
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.a>
      </div>

      <div className="overflow-hidden">
        <AutoRow slots={FEATURED_ROW1} srcs={row1Srcs} speed={60} direction={-1} />
      </div>
      <div className="mt-3 overflow-hidden">
        <ParallaxRow slots={FEATURED_ROW2} srcs={row2Srcs} startX="-8%" endX="4%" />
      </div>
      <div className="mt-3 overflow-hidden">
        <AutoRow slots={FEATURED_ROW3} srcs={row3Srcs} speed={45} direction={1} />
      </div>
    </section>
  );
}