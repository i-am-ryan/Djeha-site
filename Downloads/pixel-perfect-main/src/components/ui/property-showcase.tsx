import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PropertyItem {
  src: string;
  label: string;
  stat: string;
  detail: string;
}

export function PropertyShowcase({ items }: { items: PropertyItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[520px] w-full gap-[3px] md:h-[620px]">
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <motion.div
            key={item.src}
            animate={{ flexGrow: isActive ? 5 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setActive(i)}
            className="relative min-w-0 cursor-pointer overflow-hidden"
            style={{ flexGrow: 1 }}
          >
            {/* image */}
            <img
              src={item.src}
              alt={item.label}
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-700"
              style={{ transform: isActive ? "scale(1.04)" : "scale(1.0)" }}
            />

            {/* dark overlay when inactive */}
            <motion.div
              animate={{ opacity: isActive ? 0 : 0.45 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-dj-ink"
            />

            {/* collapsed: vertical label */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p
                    className="font-inter text-[9px] uppercase tracking-[0.2em] text-white/60"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* expanded: bottom info panel */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 pb-8 pt-20"
                >
                  <p
                    className="font-inter text-[9px] uppercase text-white/50"
                    style={{ letterSpacing: "0.25em" }}
                  >
                    {item.detail}
                  </p>
                  <h3 className="mt-1 font-playfair text-[22px] text-white">
                    {item.label}
                  </h3>
                  <div className="mt-3 inline-block border border-dj-warm/60 px-3 py-1">
                    <p
                      className="font-inter text-[10px] uppercase text-dj-warm"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      {item.stat}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* warm bottom bar on active */}
            <motion.div
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-dj-warm"
            />
          </motion.div>
        );
      })}
    </div>
  );
}