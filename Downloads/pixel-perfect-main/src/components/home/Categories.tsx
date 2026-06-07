import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/data";

const CLIP: Record<string, string | undefined> = {};
const RADIUS: Record<string, string | undefined> = {};

const ROTATING_PHRASES = [
  "Every Occasion, Perfectly Captured.",
  "Every Moment, Told With Grace.",
  "Every Detail, Frozen in Time.",
  "Every Memory, Preserved Forever.",
  "Every Frame, Worthy of the Wall.",
  "Every Story, Felt — Not Just Seen.",
];

export function Categories() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 2500);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <section className="bg-dj-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>
            Our Specialties
          </p>
<h2 className="mt-4 font-playfair text-[36px] leading-tight text-dj-ink md:text-[52px]">
   <span className="relative block overflow-hidden" style={{ height: "1.3em" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 right-0 font-cormorant italic text-dj-warm"
                >
                  {ROTATING_PHRASES[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
            >
              <Link to={c.slug} className="group relative block aspect-[3/4]">

                {/* Image + clip + dark gradient */}
                <div
                  className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{
                    clipPath: CLIP[c.key],
                    borderRadius: RADIUS[c.key],
                  }}
                >
              <img
                    src={c.thumb}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{ filter: "saturate(0.9) brightness(1.0)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

{/* Text — outside clip, always visible */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${
                    ["weddings", "graduations", "portraits"].includes(c.key) ? "pl-12" : "pl-6"
                  }`}
                >
<h3 className="font-playfair text-[26px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{c.label}</h3>                <p className="mt-1 font-cormorant text-[15px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ color: "#8B6F4E" }}>{c.tagline}</p>
<p className="mt-1 font-cormorant text-[15px] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{c.tagline}</p>
                  <p
                    className="mt-3 font-inter text-[11px] uppercase text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    Explore
                    <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}