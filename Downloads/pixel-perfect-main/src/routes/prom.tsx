import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Sparkles, Clock, Camera, Star } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { useAdmin } from "@/context/AdminContext";
import { useSlots } from "@/lib/useImageSlots";
import { getCategoryGallerySlots, CATEGORY_HEROES } from "@/lib/imageSlots";
import { CATEGORIES } from "@/lib/data";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

const cat = CATEGORIES.find((c) => c.key === "prom")!;

const ASPECTS = ["aspect-[3/4]","aspect-[4/3]","aspect-square","aspect-[3/4]","aspect-[4/5]","aspect-[4/3]"];

const CIRCULAR_DEFAULTS = [
  { label: "The Moment",  url: "/images/Matric/IMG_3475.JPG", text: "Matric dance arrival",  pos: "center top" },
  { label: "The Dress",   url: "/images/Matric/IMG_3481.JPG", text: "Matric dance dress",    pos: "center" },
  { label: "The Couple",  url: "/images/Matric/IMG_3483.JPG", text: "Matric dance couple",   pos: "center" },
  { label: "The Glamour", url: "/images/Matric/IMG_3478.JPG", text: "Glamour portrait",      pos: "center top" },
  { label: "The Night",   url: "/images/Matric/IMG_3472.JPG", text: "Night event",           pos: "center" },
  { label: "The Memory",  url: "/images/Matric/IMG_3482.JPG", text: "Matric memory",         pos: "center" },
  { label: "The Details", url: "/images/Matric/IMG_3474.JPG", text: "Matric detail",         pos: "center" },
  { label: "The Moment",  url: "/images/Matric/IMG_3479.JPG", text: "A moment",              pos: "center" },
];

const HIGHLIGHT_DEFAULTS = [
  { icon: Sparkles, title: "Pre-dance Shoot", body: "We arrive early to capture the excitement of getting ready — the details, the nerves, the first looks.", image: "/images/Matric/IMG_3484.JPG" },
  { icon: Camera,   title: "On the Night",    body: "Unobtrusive and ready. Every grand entrance, group photo, and candid moment preserved without interruption.", image: "/images/Matric/IMG_3485.JPG" },
  { icon: Clock,    title: "48hr Preview",    body: "A sneak peek gallery delivered within 48 hours so you can relive the magic while it's still fresh.", image: "/images/Matric/IMG_3482.JPG" },
  { icon: Star,     title: "Full Gallery",    body: "Your complete edited gallery delivered via Pixieset within three weeks. Print-ready, full resolution.", image: "/images/Matric/IMG_3471.JPG" },
];

const SPLIT_DEFAULTS = [
  "/images/Matric/IMG_3467.JPG",
  "/images/Matric/IMG_3468.JPG",
  "/images/Matric/IMG_3469.JPG",
  "/images/Matric/IMG_3471.JPG",
];

function PromPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isAdmin } = useAdmin();
  const slots = useSlots();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heroSlot = CATEGORY_HEROES.find((s) => s.slotKey === "prom-hero")!;
  const heroSrc = slots[heroSlot.slotKey] ?? heroSlot.defaultSrc;

  const gallerySlots = getCategoryGallerySlots("prom", cat.gallery);
  const galleryImages = gallerySlots.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  // Circular gallery items with slot overrides
  const circularItems: GalleryItem[] = CIRCULAR_DEFAULTS.map((item, i) => ({
    label: item.label,
    photo: {
      url: slots[`prom-circular-${i}`] ?? item.url,
      text: item.text,
      pos: item.pos,
    },
  }));

  // Highlight card images with slot overrides
  const highlightImages = HIGHLIGHT_DEFAULTS.map((h, i) => slots[`prom-highlight-${i}`] ?? h.image);

  // Split grid images with slot overrides
  const splitImages = SPLIT_DEFAULTS.map((src, i) => slots[`prom-split-${i}`] ?? src);

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
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSrc})`, y: heroY }}
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        {isAdmin && (
          <>
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/40 bg-black/20">
              <span className="font-inter text-[10px] uppercase text-white" style={{ letterSpacing: "0.2em" }}>Click to replace hero</span>
            </div>
            <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
              onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, heroSlot.slotKey); e.target.value = ""; }} />
          </>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)" }} />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-playfair text-[52px] leading-[0.92] text-white md:text-[84px] lg:text-[108px]">
            Matric<br /><span className="font-cormorant italic text-dj-warm">Dance.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.9 }} className="mt-6 max-w-lg font-cormorant text-[20px] text-white/75">{cat.description}</motion.p>
        </motion.div>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40">
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </section>

      {/* Circular Gallery */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10 text-center">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.35em" }}>A Night to Remember</p>
            <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[48px]">Scroll to <span className="font-cormorant italic text-dj-warm">explore.</span></h2>
            <p className="mx-auto mt-2 max-w-xs font-inter text-[12px] text-dj-mid">
              {isAdmin ? "In admin mode — replace circular gallery images below." : "Use your scroll wheel or trackpad to rotate the gallery."}
            </p>
          </motion.div>

          {/* Admin replaceable circular images grid */}
          {isAdmin ? (
            <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
              {CIRCULAR_DEFAULTS.map((item, i) => {
                const slotKey = `prom-circular-${i}`;
                return (
                  <div key={i} className="relative aspect-square overflow-hidden">
                    <img src={slots[slotKey] ?? item.url} alt={item.label} className="h-full w-full object-cover object-top" />
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                      <span className="font-inter text-[8px] uppercase text-white" style={{ letterSpacing: "0.1em" }}>Replace</span>
                    </div>
                    <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                      onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, slotKey); e.target.value = ""; }} />
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-[480px] w-full overflow-hidden md:h-[560px]">
              <CircularGallery items={circularItems} radius={500} autoRotateSpeed={0.012} className="h-full w-full" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 text-center">
            <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>What We Cover</p>
            <h2 className="font-playfair text-[36px] text-dj-ink md:text-[48px]">Every part of <span className="font-cormorant italic text-dj-warm">your evening.</span></h2>
          </motion.div>
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHT_DEFAULTS.map((h, i) => {
              const Icon = h.icon;
              const slotKey = `prom-highlight-${i}`;
              return (
                <motion.div key={h.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="group relative h-80 overflow-hidden">
                  <img src={highlightImages[i]} alt={h.title} className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]" />
                  {isAdmin && (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                        <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                      </div>
                      <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                        onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, slotKey); e.target.value = ""; }} />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />
                  <div className="absolute inset-0 bg-dj-warm/0 transition-colors duration-500 group-hover:bg-dj-warm/10 pointer-events-none" />
                  <div className="absolute inset-0 ring-0 ring-inset ring-dj-warm transition-all duration-300 group-hover:ring-2 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center border border-white/30 transition-colors duration-300 group-hover:border-dj-warm">
                      <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="mb-3 h-px w-0 bg-dj-warm transition-all duration-500 group-hover:w-10" />
                    <h3 className="font-playfair text-[22px] text-white">{h.title}</h3>
                    <p className="mt-2 font-inter text-[12px] leading-[1.8] text-white/70">{h.body}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-dj-warm transition-transform duration-500 group-hover:scale-x-100 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-2 gap-2">
              {SPLIT_DEFAULTS.map((_, i) => (
                <div key={i} className={`relative overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}>
                  <img src={splitImages[i]} alt={`Matric dance ${i + 1}`} className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.04]" />
                  {isAdmin && (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                        <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                      </div>
                      <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                        onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUpload(f, `prom-split-${i}`); e.target.value = ""; }} />
                    </>
                  )}
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="md:pl-8">
              <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>The Experience</p>
              <h2 className="font-playfair text-[38px] leading-[1.05] text-dj-ink md:text-[50px]">One night. <span className="font-cormorant italic text-dj-warm">Countless memories.</span></h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">Matric dance only happens once. The gown, the suit, the first glimpse of your date — these moments pass in seconds and last a lifetime. We make sure they're captured.</p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">We work in two phases: a styled pre-dance shoot at a location of your choice, then unobtrusive coverage throughout the evening itself.</p>
              <div className="mt-10 flex gap-8">
                {[{ n: "2", label: "Phase Coverage" }, { n: "48hr", label: "Preview Gallery" }, { n: "3wk", label: "Full Delivery" }].map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair text-[28px] text-dj-ink">{s.n}</p>
                    <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.12em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-dj-bg2 py-24 md:py-32">
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
                  <img src={src} alt={`Matric Dance ${i + 1}`} loading="lazy" className="h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.04]" onClick={() => !isAdmin && setOpen(i)} style={{ cursor: isAdmin ? "default" : "pointer" }} />
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
          <motion.h2 initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="font-playfair text-[32px] text-dj-bg md:text-[44px]">Book Your Matric Dance Session</motion.h2>
          <motion.p initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-bg/50">Matric dance season books out months in advance. Don't wait until it's too late.</motion.p>
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
            {CATEGORIES.filter((c) => c.key !== "prom").slice(0, 3).map((r, i) => {
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