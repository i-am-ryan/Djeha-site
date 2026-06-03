import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Maximize2, Eye, Clock, TrendingUp, Home } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { CATEGORIES } from "@/lib/data";
import { PropertyShowcase, type PropertyItem } from "@/components/ui/property-showcase";

const cat = CATEGORIES.find((c) => c.key === "real-estate")!;

const ASPECTS = [
  "aspect-[4/3]", "aspect-[3/4]", "aspect-square",
  "aspect-[4/3]", "aspect-[3/4]", "aspect-[4/3]",
];

// Showcase panels — independent, change freely
const SHOWCASE_ITEMS: PropertyItem[] = [
  {
    src: "/images/RealEstate/IMG_3533.JPG",
    label: "Living Spaces",
    detail: "Interior Photography",
    stat: "Sold in 3 Days",
  },
  {
    src: "/images/RealEstate/IMG_3536.JPG",
    label: "Exteriors",
    detail: "Architectural Photography",
    stat: "15% Above Asking",
  },
  {
    src: "/images/RealEstate/IMG_3535.JPG",
    label: "Kitchens",
    detail: "Detail Photography",
    stat: "2× More Enquiries",
  },
  {
    src: "/images/RealEstate/IMG_3534.JPG",
    label: "Bedrooms",
    detail: "Lifestyle Photography",
    stat: "Faster Viewings",
  },
  {
    src: "/images/RealEstate/IMG_3537.JPG",
    label: "Outdoor Areas",
    detail: "Landscape Photography",
    stat: "Premium Appeal",
  },
];

const VALUE_PROPS = [
  {
    icon: Eye,
    title: "First Impressions",
    body: "Online listings with professional photography receive 118% more views than those without. Your first impression is everything.",
  },
  {
    icon: TrendingUp,
    title: "Sell Faster",
    body: "Professionally photographed homes sell on average 32% faster and consistently closer to asking price.",
  },
  {
    icon: Clock,
    title: "Same-Week Delivery",
    body: "Fully edited gallery delivered within 48 hours of the shoot. Ready for listing the next morning.",
  },
  {
    icon: Home,
    title: "Every Property",
    body: "From studio apartments to luxury estates — we adapt our approach to every space and price point.",
  },
];

function RealEstatePage() {
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
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}
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
            Real
            <br />
            <span className="font-cormorant italic text-dj-warm">Estate.</span>
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

      {/* ── PROPERTY SHOWCASE ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p
              className="font-inter text-[10px] uppercase text-dj-warm"
              style={{ letterSpacing: "0.35em" }}
            >
              A Selection of Work
            </p>
            <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[52px]">
              Spaces at their{" "}
              <span className="font-cormorant italic text-dj-warm">absolute finest.</span>
            </h2>
            <p className="mt-3 font-inter text-[13px] text-dj-mid">
              Hover each panel to explore.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <PropertyShowcase items={SHOWCASE_ITEMS} />
          </motion.div>
        </div>
      </section>



      {/* ── SPLIT: feature + stats ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* image stack */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.gallery[0]}
                  alt="Real estate feature"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* offset second image */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="absolute -bottom-6 -right-6 w-[45%] overflow-hidden border-4 border-dj-bg shadow-2xl md:-bottom-8 md:-right-8"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.gallery[2]}
                    alt="Real estate detail"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="md:pl-8 md:pt-6"
            >
              <p
                className="mb-4 font-inter text-[10px] uppercase text-dj-warm"
                style={{ letterSpacing: "0.3em" }}
              >
                The Difference
              </p>
              <h2 className="font-playfair text-[38px] leading-[1.05] text-dj-ink md:text-[50px]">
                Great photography{" "}
                <span className="font-cormorant italic text-dj-warm">is the listing.</span>
              </h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">
                Buyers make their shortlist before ever visiting a property. The moment your listing appears on screen, the photography is doing the selling.
              </p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">
                We shoot every property with wide-angle precision, optimal natural light staging, and post-production that brings out the best in every room — without misrepresenting the space.
              </p>

              {/* stat row */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-dj-border pt-8">
                {[
                  { n: "3 Days", label: "Avg. Sale Time" },
                  { n: "118%", label: "More Views" },
                  { n: "48hr", label: "Delivery" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair text-[24px] text-dj-ink">{s.n}</p>
                    <p
                      className="mt-1 font-inter text-[10px] uppercase text-dj-warm"
                      style={{ letterSpacing: "0.12em" }}
                    >
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
              <p
                className="font-inter text-[10px] uppercase text-dj-warm"
                style={{ letterSpacing: "0.3em" }}
              >
                The Work
              </p>
              <h2 className="mt-3 font-playfair text-[40px] text-dj-ink md:text-[52px]">
                The{" "}
                <span className="font-cormorant italic text-dj-warm">Gallery</span>
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
                  alt={`Real Estate ${i + 1}`}
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
            List Smarter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[32px] text-dj-bg md:text-[44px]"
          >
            Book Your Property Shoot
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-bg/50"
          >
            Available for residential and commercial properties across Johannesburg. Same-week shoots available.
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
            {CATEGORIES.filter((c) => c.key !== "real-estate")
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
                    <Link
                      to={r.slug}
                      className="group relative block aspect-[4/5] overflow-hidden"
                    >
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
        onPrev={() =>
          setOpen((i) =>
            i === null ? null : (i - 1 + cat.gallery.length) % cat.gallery.length
          )
        }
        onNext={() =>
          setOpen((i) =>
            i === null ? null : (i + 1) % cat.gallery.length
          )
        }
      />
    </>
  );
}

export const Route = createFileRoute("/real-estate")({
  head: () => ({
    meta: [
      { title: `Real Estate Photography | Djay Photography` },
      { name: "description", content: cat.description },
      { property: "og:title", content: `Real Estate Photography | Djay Photography` },
      { property: "og:description", content: cat.description },
      { property: "og:image", content: cat.hero },
    ],
  }),
  component: RealEstatePage,
});