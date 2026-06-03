import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { type LucideIcon, ChevronDown, Maximize2, Award, Users, Building2, TrendingUp } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { CATEGORIES } from "@/lib/data";
import {
  ContainerScroll,
  ContainerSticky,
  ContainerStagger,
  ContainerAnimated,
  GalleryContainer,
  GalleryCol,
} from "@/components/ui/animated-gallery";

const cat = CATEGORIES.find((c) => c.key === "corporate")!;

const ASPECTS = [
  "aspect-[3/4]", "aspect-[4/3]", "aspect-square",
  "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]",
];

// Three columns of images for the animated scroll gallery — independent of main gallery
const COL_1 = [
  "/images/Corporate/IMG_3488.JPG",
  "/images/Corporate/IMG_3491.JPG",
  "/images/Corporate/IMG_3494.JPG",
];
const COL_2 = [
  "/images/Corporate/IMG_3504.JPG",
  "/images/Corporate/IMG_3500.JPG",
  "/images/Corporate/IMG_3503.JPG",
];
const COL_3 = [
  "/images/Corporate/IMG_3490.JPG",
  "/images/Corporate/IMG_3493.JPG",
  "/images/Corporate/IMG_3496.JPG",
];

const SERVICES: { icon: LucideIcon; title: string; body: string; image: string }[] = [  {
    icon: Building2,
    title: "Annual Galas",
    body: "Black-tie events, award ceremonies, and company celebrations captured with the polish they deserve.",
    image: "/images/Corporate/IMG_3497.JPG",
  },
  {
    icon: TrendingUp,
    title: "Product Launches",
    body: "First impressions matter. We photograph launches, reveals, and brand activations with precision.",
    image: "/images/Corporate/IMG_3501.JPG",
  },
  {
    icon: Users,
    title: "Conferences",
    body: "Keynotes, panels, networking — full coverage of your conference from setup to final handshake.",
    image: "/images/Corporate/IMG_3502.JPG",
  },
  {
    icon: Award,
    title: "Headshots",
    body: "Executive and team headshots that project authority and approachability in equal measure.",
    image: "/images/Corporate/IMG_3505.JPG",
  },
];
const CLIENTS = [
  { name: "Finance", count: "34+" },
  { name: "Tech", count: "28+" },
  { name: "Healthcare", count: "19+" },
  { name: "Legal", count: "15+" },
  { name: "Retail", count: "22+" },
];

function CorporatePage() {
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
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative flex h-screen min-h-[640px] items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cat.hero})`, y: heroY }}
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)" }}
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
            Corpo
            <span className="font-cormorant italic text-dj-warm">rate.</span>
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

      {/* ── ANIMATED SCROLL GALLERY — tilted 3-col grid unfolds on scroll ── */}
      <div className="relative bg-dj-bg">
        {/* staggered headline above the scroll section */}
        <ContainerStagger className="relative z-10 px-6 pb-0 pt-24 text-center md:pt-32">
          <ContainerAnimated>
            <p
              className="font-inter text-[10px] uppercase text-dj-warm"
              style={{ letterSpacing: "0.35em" }}
            >
              Our Work
            </p>
          </ContainerAnimated>
          <ContainerAnimated>
            <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[52px]">
              Imagery that{" "}
              <span className="font-cormorant italic text-dj-warm">commands respect.</span>
            </h2>
          </ContainerAnimated>
          <ContainerAnimated>
            <p className="mx-auto mt-4 max-w-sm font-inter text-[13px] text-dj-mid">
              Scroll to reveal a selection of our corporate portfolio.
            </p>
          </ContainerAnimated>
        </ContainerStagger>

        <ContainerScroll className="h-[350vh]">
          <ContainerSticky className="h-svh">
            <GalleryContainer className="gap-2 p-6">
              <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                {COL_1.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Corporate ${i + 1}`}
                    className="block h-auto w-full object-cover shadow-md"
                    style={{ aspectRatio: "4/3" }}
                  />
                ))}
              </GalleryCol>
              <GalleryCol className="mt-[-40%]" yRange={["15%", "5%"]}>
                {COL_2.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Corporate ${i + 4}`}
                    className="block h-auto w-full object-cover shadow-md"
                    style={{ aspectRatio: "4/3" }}
                  />
                ))}
              </GalleryCol>
              <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                {COL_3.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Corporate ${i + 7}`}
                    className="block h-auto w-full object-cover shadow-md"
                    style={{ aspectRatio: "4/3" }}
                  />
                ))}
              </GalleryCol>
            </GalleryContainer>
          </ContainerSticky>
        </ContainerScroll>
      </div>

      {/* ── SERVICES: 4 cards ── */}
      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
              What We Offer
            </p>
            <h2 className="font-playfair text-[36px] text-dj-ink md:text-[48px]">
              Every occasion.{" "}
              <span className="font-cormorant italic text-dj-warm">Covered.</span>
            </h2>
          </motion.div>

<div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-80 overflow-hidden"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  <div className="absolute inset-0 bg-dj-warm/0 transition-colors duration-500 group-hover:bg-dj-warm/10" />
                  <div className="absolute inset-0 ring-0 ring-inset ring-dj-warm transition-all duration-300 group-hover:ring-2" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center border border-white/30 transition-colors duration-300 group-hover:border-dj-warm">
                      <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="mb-3 h-px w-0 bg-dj-warm transition-all duration-500 group-hover:w-10" />
                    <h3 className="font-playfair text-[22px] text-white">{s.title}</h3>
                    <p className="mt-2 font-inter text-[12px] leading-[1.8] text-white/70">{s.body}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-dj-warm transition-transform duration-500 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ── SPLIT: feature + text ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <img
                src={cat.gallery[1]}
                alt="Corporate feature"
                className="h-full w-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute -bottom-4 -right-4 border border-dj-border bg-dj-surface px-6 py-5 shadow-xl md:-bottom-6 md:-right-8"
              >
                <p className="font-playfair text-[32px] text-dj-ink">120+</p>
                <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.15em" }}>
                  Corporate Events
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
                Why Djay
              </p>
              <h2 className="font-playfair text-[38px] leading-[1.05] text-dj-ink md:text-[50px]">
                Professional imagery{" "}
                <span className="font-cormorant italic text-dj-warm">builds trust.</span>
              </h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">
                Your brand is only as strong as the images that represent it. Blurry phone photos from a colleague don't communicate authority — they undermine it.
              </p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">
                We work invisibly, adapting to your schedule and venue without disrupting proceedings. You'll forget we're there until you see the results.
              </p>
<div className="mt-10 flex gap-8">
                {[
                  { n: "120+", label: "Events Shot" },
                  { n: "48hr", label: "Turnaround" },
                  { n: "100%", label: "Professional" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-playfair text-[26px] text-dj-ink">{stat.n}</p>
                    <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.12em" }}>
                      {stat.label}
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
                  alt={`Corporate ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04]"
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
            Let's Work Together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[32px] text-dj-bg md:text-[44px]"
          >
            Book Your Corporate Session
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-bg/50"
          >
            We work with businesses of all sizes. Reach out to discuss your upcoming event or ongoing photography needs.
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

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: `Corporate Event Photography | Djay Photography` },
      { name: "description", content: cat.description },
      { property: "og:title", content: `Corporate Event Photography | Djay Photography` },
      { property: "og:description", content: cat.description },
      { property: "og:image", content: cat.hero },
    ],
  }),
  component: CorporatePage,
});