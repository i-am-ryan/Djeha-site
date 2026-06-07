import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Eye, Clock, TrendingUp, Home } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { useAdmin } from "@/context/AdminContext";
import { useSlots } from "@/lib/useImageSlots";
import { getCategoryGallerySlots, CATEGORY_HEROES } from "@/lib/imageSlots";
import { CATEGORIES } from "@/lib/data";

const cat = CATEGORIES.find((c) => c.key === "real-estate")!;

const ASPECTS = ["aspect-[4/3]","aspect-[3/4]","aspect-square","aspect-[4/3]","aspect-[3/4]","aspect-[4/3]"];

const ACCORDION_DEFAULTS = [
  "/images/RealEstate/IMG_3533.JPG",
  "/images/RealEstate/IMG_3534.JPG",
  "/images/RealEstate/IMG_3535.JPG",
  "/images/RealEstate/IMG_3536.JPG",
  "/images/RealEstate/IMG_3537.JPG",
  "/images/RealEstate/IMG_3538.JPG",
];

const ACCORDION_LABELS = ["Interior","Exterior","Detail","Lifestyle","Landscape","Ambience"];

const VALUE_PROPS = [
  { icon: Eye,       title: "First Impressions",  body: "Online listings with professional photography receive 118% more views than those without. Your first impression is everything." },
  { icon: TrendingUp, title: "Sell Faster",        body: "Professionally photographed homes sell on average 32% faster and consistently closer to asking price." },
  { icon: Clock,     title: "Same-Week Delivery",  body: "Fully edited gallery delivered within 48 hours of the shoot. Ready for listing the next morning." },
  { icon: Home,      title: "Every Property",      body: "From studio apartments to luxury estates — we adapt our approach to every space and price point." },
];

function RealEstatePage() {
  const [open, setOpen] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const { isAdmin } = useAdmin();
  const slots = useSlots();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heroSlot = CATEGORY_HEROES.find((s) => s.slotKey === "real-estate-hero")!;
  const heroSrc = slots[heroSlot.slotKey] ?? heroSlot.defaultSrc;

  const gallerySlots = getCategoryGallerySlots("real-estate", cat.gallery);
  const galleryImages = gallerySlots.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  const accordionImages = ACCORDION_DEFAULTS.map((src, i) => slots[`realestate-accordion-${i}`] ?? src);
  const splitMainSrc = slots[`realestate-split-main`] ?? cat.gallery[0];
  const splitInsetSrc = slots[`realestate-split-inset`] ?? cat.gallery[2];

  async function handleUpload(file: File, slotKey: string) {
    try {
      const { uploadImage, saveSlot } = await import("@/lib/supabase");
      const { setSlotOverride } = await import("@/lib/useImageSlots");
      const url = await uploadImage(file, slotKey);
      await saveSlot(slotKey, url);
      setSlotOverride(slotKey, url);
    } catch {
      alert("Upload failed.");
    }
  }

  return (
    <>
      <AnimatePresence>
        {preview && !isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="relative max-h-[90vh] max-w-[80vw] overflow-hidden border border-dj-border shadow-2xl">
              <img src={preview} alt="" className="block max-h-[90vh] max-w-[80vw] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative flex h-screen min-h-[640px] items-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroSrc})`, y: heroY }} animate={{ scale: [1, 1.08] }} transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }} />
        {isAdmin && (
          <>
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/40 bg-black/20">
              <span className="font-inter text-[10px] uppercase text-white" style={{ letterSpacing: "0.2em" }}>Click to replace hero</span>
            </div>
            <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
              onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, heroSlot.slotKey); e.target.value = ""; }} />
          </>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-playfair text-[52px] leading-[0.92] text-white md:text-[84px] lg:text-[108px]">
            Real<br /><span className="font-cormorant italic text-dj-warm">Estate.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.9 }} className="mt-6 max-w-lg font-cormorant text-[20px] text-white/75">{cat.description}</motion.p>
        </motion.div>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40">
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </section>

      {/* Accordion Gallery */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10 text-center">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>A Selection of Work</p>
            <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[48px]">Spaces through <span className="font-cormorant italic text-dj-warm">our lens.</span></h2>
            <p className="mx-auto mt-3 max-w-sm font-inter text-[13px] text-dj-mid">
              {isAdmin ? "Click any panel to replace its image." : "Hover over each frame to expand it."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex h-[520px] w-full items-stretch md:h-[620px]" style={{ gap: "-1px" }}>
              {accordionImages.map((src, i) => {
                const isHovered = hovered === i;
                const isAny = hovered !== null;
                const slotKey = `realestate-accordion-${i}`;
                return (
                  <motion.div
                    key={i}
                    onMouseEnter={() => !isAdmin && setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{ flexGrow: isHovered ? 4.5 : isAny ? 0.5 : 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden"
                    style={{ flexGrow: 1, flexShrink: 1, flexBasis: "8%", minWidth: 0, marginRight: i < accordionImages.length - 1 ? "-2px" : 0, zIndex: isHovered ? 10 : accordionImages.length - i }}
                  >
                    <img src={src} alt={`Real Estate ${i + 1}`} draggable={false} className="h-full w-full object-cover object-center transition-transform duration-700" style={{ transform: isHovered ? "scale(1.06)" : "scale(1.0)" }} />
                    {isAdmin && (
                      <>
                        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                          <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                        </div>
                        <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                          onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, slotKey); e.target.value = ""; }} />
                      </>
                    )}
                    <motion.div animate={{ opacity: isAny && !isHovered ? 0.55 : 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 bg-dj-ink pointer-events-none" />
                    <motion.div animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-6 pt-16 pointer-events-none">
                      <p className="font-inter text-[9px] uppercase text-white/60" style={{ letterSpacing: "0.25em" }}>Property {String(i + 1).padStart(2, "0")}</p>
                      <p className="mt-1 font-playfair text-[18px] text-white">{ACCORDION_LABELS[i] ?? `Property ${i + 1}`}</p>
                    </motion.div>
                    <motion.div animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-dj-warm pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
            <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>Why It Matters</p>
            <h2 className="font-playfair text-[36px] text-dj-ink md:text-[48px]">Photography that <span className="font-cormorant italic text-dj-warm">sells properties.</span></h2>
          </motion.div>
          <div className="divide-y divide-dj-border">
            {VALUE_PROPS.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="group relative flex items-start gap-8 py-10 transition-all duration-300 hover:pl-4 md:items-center md:gap-16">
                  <p className="flex-shrink-0 font-playfair text-[64px] leading-none text-dj-ink opacity-[0.08] transition-all duration-500 group-hover:opacity-[0.15] md:text-[88px]">{String(i + 1).padStart(2, "0")}</p>
                  <div className="flex-shrink-0 md:w-64">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center border border-dj-border transition-colors duration-300 group-hover:border-dj-warm">
                      <Icon className="h-4 w-4 text-dj-warm" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-playfair text-[24px] text-dj-ink">{v.title}</h3>
                  </div>
                  <p className="flex-1 font-inter text-[14px] leading-[1.9] text-dj-mid">{v.body}</p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-dj-warm transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split */}
      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={splitMainSrc} alt="Real estate feature" className="h-full w-full object-cover" />
                {isAdmin && (
                  <>
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                      <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                    </div>
                    <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                      onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, "realestate-split-main"); e.target.value = ""; }} />
                  </>
                )}
              </div>
              <motion.div initial={{ opacity: 0, x: 20, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }} className="absolute -bottom-6 -right-6 w-[45%] overflow-hidden border-4 border-dj-bg2 shadow-2xl md:-bottom-8 md:-right-8">
                <div className="relative aspect-square overflow-hidden">
                  <img src={splitInsetSrc} alt="Real estate detail" className="h-full w-full object-cover" />
                  {isAdmin && (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                        <span className="font-inter text-[8px] uppercase text-white" style={{ letterSpacing: "0.1em" }}>Replace</span>
                      </div>
                      <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                        onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, "realestate-split-inset"); e.target.value = ""; }} />
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="md:pl-8 md:pt-6">
              <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>The Difference</p>
              <h2 className="font-playfair text-[38px] leading-[1.05] text-dj-ink md:text-[50px]">Great photography <span className="font-cormorant italic text-dj-warm">is the listing.</span></h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">Buyers make their shortlist before ever visiting a property. The moment your listing appears on screen, the photography is doing the selling.</p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">We shoot every property with wide-angle precision, optimal natural light staging, and post-production that brings out the best in every room — without misrepresenting the space.</p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-dj-border pt-8">
                {[{ n: "3 Days", label: "Avg. Sale Time" }, { n: "118%", label: "More Views" }, { n: "48hr", label: "Delivery" }].map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair text-[24px] text-dj-ink">{s.n}</p>
                    <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.12em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-14 overflow-hidden">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>The Work</p>
              <h2 className="mt-3 font-playfair text-[40px] text-dj-ink md:text-[52px]">The <span className="font-cormorant italic text-dj-warm">Gallery</span></h2>
            </motion.div>
          </div>
          <div className="columns-1 gap-1 sm:columns-2 lg:columns-3">
            {galleryImages.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.65, delay: (i % 6) * 0.07 }} className="mb-1" onMouseEnter={() => !isAdmin && setPreview(src)} onMouseLeave={() => setPreview(null)}>
                <div className={`group relative w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}>
                  <img src={src} alt={`Real Estate ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04]" onClick={() => !isAdmin && setOpen(i)} style={{ cursor: isAdmin ? "default" : "pointer" }} />
                  {isAdmin && (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                        <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                      </div>
                      <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                        onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, gallerySlots[i].slotKey); e.target.value = ""; }} />
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dj-dark overflow-hidden py-28 text-center">
        <div className="mx-auto max-w-[640px] px-6">
          <motion.h2 initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="font-playfair text-[32px] text-dj-bg md:text-[44px]">Book Your Property Shoot</motion.h2>
          <motion.p initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-bg/50">Available for residential and commercial properties across Johannesburg. Same-week shoots available.</motion.p>
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="mt-10">
            <Link to="/contact" className="inline-block bg-dj-bg px-12 py-4 font-inter text-[11px] uppercase text-dj-dark transition-colors duration-300 hover:bg-[#E8E0D0]" style={{ letterSpacing: "0.2em" }}>Get In Touch</Link>
          </motion.div>
        </div>
      </section>

      {/* Explore More */}
      <section className="bg-dj-bg py-20 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <h2 className="mb-10 text-center font-playfair text-[28px] text-dj-ink md:text-[36px]">Explore More</h2>
          <div className="grid gap-1 md:grid-cols-3">
            {CATEGORIES.filter((c) => c.key !== "real-estate").slice(0, 3).map((r, i) => {
              const dirs = [{ x: -50, y: 0 }, { x: 0, y: 50 }, { x: 50, y: 0 }];
              return (
                <motion.div key={r.key} initial={{ opacity: 0, x: dirs[i].x, y: dirs[i].y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={r.slug} className="group relative block aspect-[4/5] overflow-hidden">
                    <div className="relative h-full w-full">
                      <img src={slots[`${r.key}-thumb`] ?? r.thumb} alt={r.label} loading="lazy" className="img-desaturate h-full w-full object-cover" />
                      {isAdmin && (
                        <>
                          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                            <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                          </div>
                          <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0" onClick={(e) => e.stopPropagation()}
                            onChange={async (e) => { e.stopPropagation(); const f = e.target.files?.[0]; if (f) await handleUpload(f, `${r.key}-thumb`); e.target.value = ""; }} />
                        </>
                      )}
                    </div>
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

      <Lightbox images={galleryImages} index={open} onClose={() => setOpen(null)} onPrev={() => setOpen((i) => i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)} onNext={() => setOpen((i) => i === null ? null : (i + 1) % galleryImages.length)} />
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