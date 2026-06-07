import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Naledi & Sipho M.",
    event: "Wedding, 2023",
    rating: 5,
    quote:
      "Djeha captured our wedding day beyond our wildest dreams. Every smile, every tear, every dance move — preserved forever. We didn't just get photos, we got memories that will outlive us.",
    
  },
  {
    id: 2,
    name: "Marcus O.",
    event: "Corporate Event, 2024",
    rating: 5,
    quote:
      "The corporate event photos were stunning. Our client was blown away by the quality. Djeha is the only photographer we'll ever use for our events.",
    
  },
  {
    id: 3,
    name: "Zanele K.",
    event: "Graduation, 2023",
    rating: 5,
    quote:
      "My graduation portraits are absolutely breathtaking. Djeha has an incredible ability to make you feel at ease while creating art. Every frame is perfect.",
    
  },
  {
    id: 4,
    name: "Sandra P.",
    event: "Matric Dance, 2023",
    rating: 5,
    quote:
      "Every prom photo looked like it came straight from a magazine. My daughter cried happy tears when she saw them. Worth every cent.",
    
  },
  {
    id: 5,
    name: "David L.",
    event: "Real Estate, 2024",
    rating: 5,
    quote:
      "The real estate photos sold our property in 3 days. The quality was extraordinary — every room looked its absolute best. Truly world-class work.",
    
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-dj-warm" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [stack, setStack] = useState(TESTIMONIALS);
  const [exiting, setExiting] = useState(false);

  function handleNext() {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setStack((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setExiting(false);
    }, 400);
  }

  return (
    <section className="bg-dj-bg2 py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-20 text-center">
          <p
            className="font-inter text-[10px] uppercase text-dj-warm"
            style={{ letterSpacing: "0.25em" }}
          >
            Kind Words
          </p>
<h2 className="mt-4 font-playfair text-[36px] leading-tight text-dj-warm md:text-[52px]">
            What Our Clients Say
          </h2>
        </div>

        {/* Stack */}
        <div className="flex flex-col items-center">
          <div
            className="relative"
            style={{ width: 380, height: 460 }}
          >
            {stack.map((t, i) => {
              const isTop = i === 0;
              const offset = Math.min(i, 3);

              return (
                <motion.div
                  key={t.id}
                  animate={{
                    y: isTop && exiting ? -40 : offset * 10,
                    x: isTop && exiting ? 40 : offset * 6,
                    rotate: isTop && exiting ? 8 : offset * -2,
                    scale: 1 - offset * 0.04,
                    opacity: isTop && exiting ? 0 : offset > 3 ? 0 : 1,
                    zIndex: stack.length - i,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 border border-dj-border bg-dj-surface p-8"
                  style={{
                    transformOrigin: "bottom left",
                    boxShadow: isTop
                      ? "0 8px 40px rgba(26,23,20,0.12)"
                      : "0 2px 8px rgba(26,23,20,0.06)",
                  }}
                >
                  {/* Only render content on top 2 cards for performance */}
                  {i < 2 && (
                    <>
                      <Stars count={t.rating} />
                      <blockquote className="mt-6 font-cormorant italic text-[19px] leading-relaxed text-dj-charcoal">
                        "{t.quote}"
                      </blockquote>
                      <div className="mt-8 flex items-center gap-3 border-t border-dj-border pt-6">
                      
                        <div>
                          <p className="font-playfair text-[15px] text-dj-ink">{t.name}</p>
                          <p
                            className="mt-0.5 font-inter text-[10px] uppercase text-dj-warm"
                            style={{ letterSpacing: "0.12em" }}
                          >
                            {t.event}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={handleNext}
              disabled={exiting}
              className="group flex items-center gap-3 border border-dj-border px-8 py-3.5 font-inter text-[11px] uppercase text-dj-charcoal transition-colors hover:border-dj-ink hover:bg-dj-ink hover:text-dj-bg disabled:opacity-50"
              style={{ letterSpacing: "0.12em" }}
            >
              Next
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            {/* Counter */}
            <span
              className="font-inter text-[11px] text-dj-warm"
              style={{ letterSpacing: "0.1em" }}
            >
              {String(TESTIMONIALS.indexOf(stack[0]) + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}