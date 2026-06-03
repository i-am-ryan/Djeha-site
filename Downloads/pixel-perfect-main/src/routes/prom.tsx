import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Maximize2, Sparkles, Clock, Camera, Star } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { CATEGORIES } from "@/lib/data";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

const cat = CATEGORIES.find((c) => c.key === "prom")!;

const ASPECTS = [
  "aspect-[3/4]", "aspect-[4/3]", "aspect-square",
  "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]",
];

const CIRCULAR_ITEMS: GalleryItem[] = [
  { label: "The Moment",  photo: { url: "/images/Matric/IMG_3475.JPG", text: "Matric dance arrival", pos: "center top" } },
  { label: "The Dress",    photo: { url: "/images/Matric/IMG_3481.JPG", text: "Matric dance dress", pos: "center" } },
  { label: "The Couple",   photo: { url: "/images/Matric/IMG_3483.JPG", text: "Matric dance couple", pos: "center" } },
  { label: "The Glamour",  photo: { url: "/images/Matric/IMG_3478.JPG", text: "Glamour portrait", pos: "center top" } },
  { label: "The Night",    photo: { url: "/images/Matric/IMG_3472.JPG", text: "Night event", pos: "center" } },
  { label: "The Memory",   photo: { url: "/images/Matric/IMG_3482.JPG", text: "Matric memory", pos: "center" } },
  { label: "The Details",  photo: { url: "/images/Matric/IMG_3474.JPG", text: "Matric detail", pos: "center" } },
  { label: "The Moment",   photo: { url: "/images/Matric/IMG_3479.JPG", text: "A moment", pos: "center" } },
];

const HIGHLIGHTS = [
  { icon: Sparkles, title: "Pre-dance Shoot",  body: "We arrive early to capture the excitement of getting ready — the details, the nerves, the first looks.", image: "/images/Matric/IMG_3484.JPG" },
  { icon: Camera,   title: "On the Night",      body: "Unobtrusive and ready. Every grand entrance, group photo, and candid moment preserved without interruption.", image: "/images/Matric/IMG_3485.JPG" },
  { icon: Clock,    title: "48hr Preview",      body: "A sneak peek gallery delivered within 48 hours so you can relive the magic while it's still fresh.", image: "/images/Matric/IMG_3482.JPG" },
  { icon: Star,     title: "Full Gallery",      body: "Your complete edited gallery delivered via Pixieset within three weeks. Print-ready, full resolution.", image: "/images/Matric/IMG_3471.JPG" },
];

function PromPage() {
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
      {/* ── HERO: Ken Burns + parallax ── */}
      <section ref={heroRef} className="relative flex h-screen min-h-[640px] items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cat.hero})`, y: heroY }}
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)" }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-5 font-inter text-[10px] uppercase text-dj-warm"
            style={{ letterSpacing: "0.35em" }}
          >
           
          </motion.p>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[52px] leading-[0.92] text-white md:text-[84px] lg:text-[108px]"
          >
            Matric
            <br />
            <span className="font-cormorant italic text-dj-warm">Dance.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mt-6 max-w-lg font-cormorant text-[20px] text-white/75"
          >
            {cat.description}
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </section>

      {/* ── CIRCULAR GALLERY: cream bg, horizontal scroll drives rotation ── */}
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
              style={{ letterSpacing: "0.35em" }}
            >
              A Night to Remember
            </p>
            <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[48px]">
              Scroll to{" "}
              <span className="font-cormorant italic text-dj-warm">explore.</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xs font-inter text-[12px] text-dj-mid">
              Use your scroll wheel or trackpad to rotate the gallery.
            </p>
          </motion.div>

          {/* fixed height container — wheel events captured here */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[480px] w-full overflow-hidden md:h-[560px]"
          >
            <CircularGallery
              items={CIRCULAR_ITEMS}
              radius={500}
              autoRotateSpeed={0.012}
              className="h-full w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ── HIGHLIGHTS: 4 cards ── */}
      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
              What We Cover
            </p>
            <h2 className="font-playfair text-[36px] text-dj-ink md:text-[48px]">
              Every part of{" "}
              <span className="font-cormorant italic text-dj-warm">your evening.</span>
            </h2>
          </motion.div>

<div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-80 overflow-hidden"
                >
                  {/* background image */}
                  <img
                    src={h.image}
                    alt={h.title}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                  />

                  {/* permanent dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                  {/* warm overlay tint on hover */}
                  <div className="absolute inset-0 bg-dj-warm/0 transition-colors duration-500 group-hover:bg-dj-warm/10" />

                  {/* warm border on hover */}
                  <div className="absolute inset-0 ring-0 ring-inset ring-dj-warm transition-all duration-300 group-hover:ring-2" />

                  {/* content pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center border border-white/30 transition-colors duration-300 group-hover:border-dj-warm">
                      <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    {/* warm underline expands */}
                    <div className="mb-3 h-px w-0 bg-dj-warm transition-all duration-500 group-hover:w-10" />
                    <h3 className="font-playfair text-[22px] text-white">{h.title}</h3>
                    <p className="mt-2 font-inter text-[12px] leading-[1.8] text-white/70">{h.body}</p>
                  </div>

                  {/* bottom warm bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-dj-warm transition-transform duration-500 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPLIT: image mosaic + text ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-2"
            >
              {cat.gallery.slice(0, 4).map((src, i) => (
                <div
                  key={src}
                  className={`overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                >
                  <img
                    src={src}
                    alt={`Matric dance ${i + 1}`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.04]"
                  />
                </div>
              ))}
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
                One night.{" "}
                <span className="font-cormorant italic text-dj-warm">Countless memories.</span>
              </h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">
                Matric dance only happens once. The gown, the suit, the first glimpse of your date — these moments pass in seconds and last a lifetime. We make sure they're captured.
              </p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">
                We work in two phases: a styled pre-dance shoot at a location of your choice, then unobtrusive coverage throughout the evening itself.
              </p>
              <div className="mt-10 flex gap-8">
                {[
                  { n: "2", label: "Phase Coverage" },
                  { n: "48hr", label: "Preview Gallery" },
                  { n: "3wk", label: "Full Delivery" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair text-[28px] text-dj-ink">{s.n}</p>
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
                  alt={`Matric Dance ${i + 1}`}
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
      <section className="bg-dj-dark overflow-hidden py-28 text-center">
        <div className="mx-auto max-w-[640px] px-6">
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-inter text-[10px] uppercase text-dj-warm"
            style={{ letterSpacing: "0.3em" }}
          >
            Book Early
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[32px] text-dj-bg md:text-[44px]"
          >
            Book Your Matric Dance Session
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-bg/50"
          >
            Matric dance season books out months in advance. Don't wait until it's too late.
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
            {CATEGORIES.filter((c) => c.key !== "prom")
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
                      <img src={r.thumb} alt={r.label} loading="lazy" className="img-desaturate h-full w-full object-cover" />
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

export const Route = createFileRoute("/prom")({
  head: () => ({
    meta: [
      { title: `Prom & Matric Dance Photography | Djay Photography` },
      { name: "description", content: cat.description },
      { property: "og:title", content: `Prom & Matric Dance Photography | Djay Photography` },
      { property: "og:description", content: cat.description },
      { property: "og:image", content: cat.hero },
    ],
  }),
  component: PromPage,
});