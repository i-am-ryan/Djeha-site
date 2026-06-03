import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { CATEGORIES } from "@/lib/data";

const cat = CATEGORIES.find((c) => c.key === "portraits")!;

const ASPECTS = [
  "aspect-[3/4]", "aspect-[4/3]", "aspect-square",
  "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]",
];

const PORTRAIT_TRAITS = [
  {
    n: "01",
    title: "Light",
    body: "Every portrait lives or dies by light. We sculpt it — window, golden hour, or studio — to reveal rather than expose.",
    image: "/images/Portraits/IMG_3522.JPG",
  },
  {
    n: "02",
    title: "Stillness",
    body: "The best portraits happen in the pause between poses. We wait for the moment you forget the camera is there.",
    image: "/images/Portraits/IMG_3525.JPG",
  },
  {
    n: "03",
    title: "Story",
    body: "A great portrait is never just a face. It carries your story, your season, your particular way of being in the world.",
    image: "/images/Portraits/IMG_3528.JPG",
  },
];

// Independent images for the accordion — change freely without affecting gallery
const ACCORDION_IMAGES = [
  "/images/Portraits/IMG_3511.JPG",
  "/images/Portraits/IMG_3514.JPG",
  "/images/Portraits/IMG_3517.JPG",
  "/images/Portraits/IMG_3521.JPG",
  "/images/Portraits/IMG_3524.JPG",
  "/images/Portraits/IMG_3527.JPG",
];

function AccordionGallery({ images }: { images: string[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex h-[520px] w-full items-stretch md:h-[620px]"
      // negative margin so cards overlap each other
      style={{ gap: "-1px" }}
    >
      {images.map((src, i) => {
        const isHovered = hovered === i;
        const isAny = hovered !== null;

        return (
          <motion.div
            key={src}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={{
              flexGrow: isHovered ? 4.5 : isAny ? 0.5 : 1,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
            // start narrow so cards feel stacked/overlapping
            style={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: "8%",
              minWidth: 0,
              // slight negative margin creates the overlapping feel
              marginRight: i < images.length - 1 ? "-2px" : 0,
              zIndex: isHovered ? 10 : images.length - i,
            }}
          >
            <img
              src={src}
              alt={`Portrait ${i + 1}`}
              draggable={false}
              className="h-full w-full object-cover object-center transition-transform duration-700"
              style={{
                transform: isHovered ? "scale(1.06)" : "scale(1.0)",
              }}
            />

            {/* dark tint on non-hovered */}
            <motion.div
              animate={{ opacity: isAny && !isHovered ? 0.55 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-dj-ink"
            />

            {/* bottom label — slides up on hover */}
            <motion.div
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-6 pt-16"
            >
              <p
                className="font-inter text-[9px] uppercase text-white/60"
                style={{ letterSpacing: "0.25em" }}
              >
                Portrait {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-playfair text-[18px] text-white">
                {["Essence", "Stillness", "Presence", "Depth", "Soul", "Grace"][i]}
              </p>
            </motion.div>

            {/* thin warm line at bottom on hover */}
            <motion.div
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-dj-warm"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function PortraitsPage() {
  const [open, setOpen] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      {/* ── HERO: Ken Burns zoom + parallax ── */}
      <section ref={heroRef} className="relative flex h-screen min-h-[640px] items-center overflow-hidden">
        {/* Ken Burns layer */}
        <motion.div
className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage: `url(${cat.hero})`,
            y: heroY,
          }}
          // Ken Burns: slow zoom in
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
   <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10"
        >
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-playfair text-[48px] leading-[0.95] text-white md:text-[72px] lg:text-[88px]"
          >
            {cat.label.slice(0, -3)}
            <span className="font-cormorant italic text-dj-warm">
              {cat.label.slice(-3)}.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-6 max-w-xl font-cormorant text-[20px] text-white/80"
          >
            {cat.description}
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </section>

      {/* ── ACCORDION GALLERY ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <p
              className="font-inter text-[10px] uppercase text-dj-warm"
              style={{ letterSpacing: "0.3em" }}
            >
              A Selection of Work
            </p>
            <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[48px]">
              Seen through{" "}
              <span className="font-cormorant italic text-dj-warm">our lens.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-inter text-[13px] text-dj-mid">
              Hover over each frame to expand it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AccordionGallery images={ACCORDION_IMAGES} />
          </motion.div>
        </div>
      </section>

      {/* ── PHILOSOPHY: 3 traits with richer hover ── */}
      <section className="bg-dj-bg2 py-24 md:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 max-w-xl"
          >
            <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
              Our Philosophy
            </p>
            <h2 className="font-playfair text-[40px] leading-[1.05] text-dj-ink md:text-[52px]">
              What makes a portrait{" "}
              <span className="font-cormorant italic text-dj-warm">unforgettable.</span>
            </h2>
          </motion.div>

<div className="grid gap-1 md:grid-cols-3">
            {PORTRAIT_TRAITS.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-[420px] overflow-hidden"
              >
                {/* background image */}
                <img
                  src={t.image}
                  alt={t.title}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                />

                {/* permanent dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* warm tint on hover */}
                <div className="absolute inset-0 bg-dj-warm/0 transition-colors duration-500 group-hover:bg-dj-warm/10" />

                {/* warm border ring on hover */}
                <div className="absolute inset-0 ring-0 ring-inset ring-dj-warm transition-all duration-300 group-hover:ring-2" />

                {/* content pinned to bottom */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  {/* large number watermark */}
                  <p className="font-playfair text-[72px] leading-none text-white opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.15]">
                    {t.n}
                  </p>

                  {/* warm underline */}
                  <div className="mb-3 h-px w-0 bg-dj-warm transition-all duration-500 group-hover:w-12" />

                  <h3 className="font-playfair text-[26px] text-white">{t.title}</h3>
                  <p className="mt-3 font-inter text-[13px] leading-[1.8] text-white/70">{t.body}</p>
                </div>

                {/* bottom warm bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-dj-warm transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT: feature image + text ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={cat.gallery[1]}
                alt="Portrait feature"
                className="h-full w-full object-cover object-top"
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute -right-4 bottom-12 border border-dj-border bg-dj-surface px-6 py-5 shadow-xl md:-right-10"
              >
                <p className="font-playfair text-[32px] text-dj-ink">500+</p>
                <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.15em" }}>
                  Portraits Delivered
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="md:pl-8"
            >
              <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
                The Experience
              </p>
              <h2 className="font-playfair text-[38px] leading-[1.05] text-dj-ink md:text-[50px]">
                You deserve to see{" "}
                <span className="font-cormorant italic text-dj-warm">yourself clearly.</span>
              </h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">
                Most people have never had a great photograph of themselves. Not because they aren't photogenic — but because they've never had someone take the time to really look at them.
              </p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">
                We spend the first part of every session just talking. By the time the camera comes up, you've forgotten it's there. That's when we make the real photographs.
              </p>
              <div className="mt-10 flex gap-10">
                {[
                  { n: "2hr", label: "Avg. Session Length" },
                  { n: "4wk", label: "Delivery Window" },
                  { n: "100%", label: "Private Gallery" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair text-[26px] text-dj-ink">{s.n}</p>
                    <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.12em" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY: masonry ── */}
      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-14 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
                The Work
              </p>
              <h2 className="mt-3 font-playfair text-[40px] text-dj-ink md:text-[52px]">
                The <span className="font-cormorant italic text-dj-warm">Gallery</span>
              </h2>
            </motion.div>
          </div>

          <div className="columns-1 gap-1 sm:columns-2 lg:columns-3">
            {cat.gallery.map((src, i) => (
              <motion.button
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: (i % 6) * 0.07 }}
                onClick={() => setOpen(i)}
                className={`group relative mb-1 block w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}
              >
                <img
                  src={src}
                  alt={`Portrait ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-dj-ink/0 transition-all duration-300 group-hover:bg-dj-ink/10" />
                <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4 text-white" strokeWidth={1.4} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-dj-dark py-28 text-center overflow-hidden">
        <div className="mx-auto max-w-[640px] px-6">
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-inter text-[10px] uppercase text-dj-warm"
            style={{ letterSpacing: "0.3em" }}
          >
            Let's Create Together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[32px] text-dj-bg md:text-[44px]"
          >
            Book Your Portrait Session
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-bg/50"
          >
            Slots are limited. We take on a small number of portrait clients each month to ensure every session gets our full attention.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              to="/contact"
              className="inline-block bg-dj-bg px-12 py-4 font-inter text-[11px] uppercase text-dj-dark transition-colors duration-300 hover:bg-[#E8E0D0]"
              style={{ letterSpacing: "0.2em" }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section className="bg-dj-bg py-20 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center font-playfair text-[28px] text-dj-ink md:text-[36px]"
          >
            Explore More
          </motion.h2>
          <div className="grid gap-1 md:grid-cols-3">
            {CATEGORIES.filter((c) => c.key !== "portraits")
              .slice(0, 3)
              .map((r, i) => {
                const dirs = [{ x: -50, y: 0 }, { x: 0, y: 50 }, { x: 50, y: 0 }];
                const d = dirs[i % 3];
                return (
                  <motion.div
                    key={r.key}
                    initial={{ opacity: 0, x: d.x, y: d.y }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={r.slug} className="group relative block aspect-[4/5] overflow-hidden">
                      <img
                        src={r.thumb}
                        alt={r.label}
                        loading="lazy"
                        className="img-desaturate h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dj-bg/90 to-transparent p-5">
                        <p className="font-playfair text-[22px] text-dj-ink">{r.label}</p>
                        <p className="mt-1 font-cormorant text-[14px] text-dj-mid">{r.tagline}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      <Lightbox
        images={cat.gallery}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => (i === null ? null : (i - 1 + cat.gallery.length) % cat.gallery.length))}
        onNext={() => setOpen((i) => (i === null ? null : (i + 1) % cat.gallery.length))}
      />
    </>
  );
}

export const Route = createFileRoute("/portraits")({
  head: () => ({
    meta: [
      { title: `Portrait Photography | Djay Photography` },
      { name: "description", content: cat.description },
      { property: "og:title", content: `Portrait Photography | Djay Photography` },
      { property: "og:description", content: cat.description },
      { property: "og:image", content: cat.hero },
    ],
  }),
  component: PortraitsPage,
});