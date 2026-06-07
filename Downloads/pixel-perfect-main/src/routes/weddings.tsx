import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { AdminPhotoSlot } from "@/components/gallery/AdminPhotoSlot";
import { useAdmin } from "@/context/AdminContext";
import { useSlots } from "@/lib/useImageSlots";
import { getCategoryGallerySlots, CATEGORY_HEROES } from "@/lib/imageSlots";
import { CATEGORIES } from "@/lib/data";
import { PhotoGallery } from "@/components/ui/photo-gallery";

const cat = CATEGORIES.find((c) => c.key === "weddings")!;

const ASPECTS = [
  "aspect-[3/4]", "aspect-[4/3]", "aspect-square",
  "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]",
];

const STEPS = [
  {
    n: "01",
    title: "Consult",
    body: "We start with a conversation to understand your vision, venue, and the moments that matter most.",
    images: [
      "/images/Weddings/IMG_3453.JPG",
      "/images/Weddings/IMG_3454.JPG",
      "/images/Weddings/IMG_3455.JPG",
    ],
    stats: ["Vision", "Planning", "Details"],
  },
  {
    n: "02",
    title: "Capture",
    body: "On the day, we work quietly and intentionally — present without intruding, ready for every moment.",
    images: [
      "/images/Weddings/IMG_3458.JPG",
      "/images/Weddings/IMG_3459.JPG",
      "/images/Weddings/IMG_3460.JPG",
    ],
    stats: ["Natural", "Candid", "Artistic"],
  },
  {
    n: "03",
    title: "Deliver",
    body: "Hand-edited galleries delivered through Pixieset within four weeks. Every frame considered.",
    images: [
      "/images/Weddings/IMG_3462.JPG",
      "/images/Weddings/IMG_3463.JPG",
      "/images/Weddings/IMG_3456.JPG",
    ],
    stats: ["Edited", "Pixieset", "4 Weeks"],
  },
];

function WeddingsPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isAdmin } = useAdmin();
  const slots = useSlots();

  const heroSlot = CATEGORY_HEROES.find((s) => s.slotKey === "weddings-hero")!;
  const heroSrc = slots[heroSlot.slotKey] ?? heroSlot.defaultSrc;

  const gallerySlots = getCategoryGallerySlots("weddings", cat.gallery);
  const galleryImages = gallerySlots.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  return (
    <>
      {/* Hover preview overlay — only when not in admin mode */}
      <AnimatePresence>
        {preview && !isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] max-w-[80vw] overflow-hidden border border-dj-border shadow-2xl"
            >
              <img src={preview} alt="" className="block max-h-[90vh] max-w-[80vw] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <AdminPhotoSlot
        slotKey={heroSlot.slotKey}
        src={heroSrc}
        asBackground
        className="relative flex h-screen min-h-[640px] items-center overflow-hidden animate-[kenBurns_14s_ease-in-out_infinite_alternate] bg-cover bg-center"
        style={{ backgroundPosition: "center 35%" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
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
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </AdminPhotoSlot>

      {/* Gallery */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>
              A Journey Through Visual Stories
            </p>
            <h3 className="mt-3 font-playfair text-[32px] text-dj-ink md:text-[48px]">
              The <span className="font-cormorant italic text-dj-warm">Moments</span>
            </h3>
          </div>

<PhotoGallery
            photos={(cat.stackPhotos ?? cat.gallery.slice(0, 5)).map((src) => ({ src }))}
            categoryKey="weddings"
            slotPrefix="stack"
          />

          <div className="columns-1 gap-1 sm:columns-2 lg:columns-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: (i % 6) * 0.07 }}
                className="mb-1"
                onMouseEnter={() => !isAdmin && setPreview(src)}
                onMouseLeave={() => setPreview(null)}
              >
                <AdminPhotoSlot
                  slotKey={gallerySlots[i].slotKey}
                  src={src}
                  className={`group relative block w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}
                  imgClassName="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04]"
                  alt={`Wedding ${i + 1}`}
                  onClick={() => !isAdmin && setOpen(i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>
              The Process
            </p>
            <h2 className="mt-4 font-playfair text-[36px] text-dj-ink md:text-[44px]">How It Works</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer border border-dj-border bg-dj-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-dj-warm hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.15em" }}>
                      Step {s.n}
                    </p>
                    <h3 className="mt-1 font-playfair text-[26px] text-dj-ink">{s.title}</h3>
                  </div>
                  <svg className="h-5 w-5 text-dj-warm transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
<div className="relative mb-5 h-28">
                  {s.images.map((src, idx) => {
                    const slotKey = `weddings-step${i}-${idx}`;
                    const resolvedSrc = slots[slotKey] ?? src;
                    return (
                      <div
                        key={idx}
                        className="absolute h-full w-[42%] overflow-hidden border-2 border-dj-bg shadow-md transition-all duration-300 ease-in-out group-hover:rotate-[var(--r)] group-hover:translate-x-[var(--tx)]"
                        style={{
                          transform: `translateX(${idx * 28}px)`,
                          // @ts-ignore
                          "--tx": `${idx * 72}px`,
                          "--r": `${idx * 4 - 4}deg`,
                          zIndex: s.images.length - idx,
                        }}
                      >
                        <img src={resolvedSrc} alt={`${s.title} ${idx + 1}`} className="h-full w-full object-cover" />
                        {isAdmin && (
                          <>
                            <div className="pointer-events-none absolute inset-0 border border-dashed border-white/60 bg-black/30 flex items-center justify-center">
                              <span className="font-inter text-[8px] uppercase text-white" style={{ letterSpacing: "0.1em" }}>Replace</span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 z-30 cursor-pointer opacity-0"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const { uploadImage, saveSlot } = await import("@/lib/supabase");
                                  const { setSlotOverride } = await import("@/lib/useImageSlots");
                                  const url = await uploadImage(file, slotKey);
                                  await saveSlot(slotKey, url);
                                  setSlotOverride(slotKey, url);
                                } catch {
                                  alert("Upload failed.");
                                }
                                e.target.value = "";
                              }}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {s.stats.map((stat) => (
                    <span key={stat} className="border border-dj-border px-3 py-1 font-inter text-[10px] uppercase text-dj-warm transition-colors duration-300 group-hover:border-dj-warm" style={{ letterSpacing: "0.12em" }}>
                      {stat}
                    </span>
                  ))}
                </div>
                <p className="font-inter text-[13px] leading-[1.8] text-dj-mid">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dj-dark py-20 text-center">
        <h2 className="font-playfair text-[28px] text-dj-bg md:text-[36px]">
          Book Your {cat.label} Session
        </h2>
        <Link
          to="/contact"
          className="mt-8 inline-block bg-dj-bg px-10 py-4 font-inter text-[12px] uppercase text-dj-dark transition-colors hover:bg-[#E8E0D0]"
          style={{ letterSpacing: "0.15em" }}
        >
          Get In Touch
        </Link>
      </section>

      {/* Explore More */}
      <section className="bg-dj-bg py-20 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-center font-playfair text-[28px] text-dj-ink md:text-[36px]"
          >
            Explore More
          </motion.h2>
          <div className="grid gap-1 md:grid-cols-3">
            {CATEGORIES.filter((c) => c.key !== "weddings")
              .slice(0, 3)
              .map((r, i) => {
                const directions = [{ x: -50, y: 0 }, { x: 0, y: 50 }, { x: 50, y: 0 }];
                const dir = directions[i % 3];
                return (
                  <motion.div
                    key={r.key}
                    initial={{ opacity: 0, x: dir.x, y: dir.y }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
  <Link to={r.slug} className="group relative block aspect-[4/5] overflow-hidden">
                      <div className="relative h-full w-full">
                        <img src={slots[`${r.key}-thumb`] ?? r.thumb} alt={r.label} loading="lazy" className="img-desaturate h-full w-full object-cover" />
                        {isAdmin && (
                          <>
                            <div className="pointer-events-none absolute inset-0 border border-dashed border-white/60 bg-black/30 flex items-center justify-center">
                              <span className="font-inter text-[10px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 z-30 cursor-pointer opacity-0"
                              onClick={(e) => e.stopPropagation()}
                              onChange={async (e) => {
                                e.stopPropagation();
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const { uploadImage, saveSlot } = await import("@/lib/supabase");
                                  const { setSlotOverride } = await import("@/lib/useImageSlots");
                                  const slotKey = `${r.key}-thumb`;
                                  const url = await uploadImage(file, slotKey);
                                  await saveSlot(slotKey, url);
                                  setSlotOverride(slotKey, url);
                                } catch {
                                  alert("Upload failed.");
                                }
                                e.target.value = "";
                              }}
                            />
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

      <Lightbox
        images={galleryImages}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)}
        onNext={() => setOpen((i) => i === null ? null : (i + 1) % galleryImages.length)}
      />
    </>
  );
}

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title: `Wedding Photography — ${cat.label} | Djay Photography` },
      { name: "description", content: cat.description },
      { property: "og:title", content: `Wedding Photography | Djay Photography` },
      { property: "og:description", content: cat.description },
      { property: "og:image", content: cat.hero },
    ],
  }),
  component: WeddingsPage,
});