import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Maximize2, GraduationCap, BookOpen, Trophy, Camera } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { AdminImg } from "@/components/gallery/AdminImgOverlay";
import { useAdmin } from "@/context/AdminContext";
import { useSlots } from "@/lib/useImageSlots";
import { getCategoryGallerySlots, CATEGORY_HEROES } from "@/lib/imageSlots";
import { CATEGORIES } from "@/lib/data";
import { InteractivePhotoStack } from "@/components/ui/photo-stack";

const cat = CATEGORIES.find((c) => c.key === "graduations")!;

const MILESTONE_DEFAULTS = [
  { icon: BookOpen,      year: "First Year",     label: "The Journey Begins",   body: "Every cap thrown in the air started here — with courage, a fresh notebook, and a blank page.",       image: "/images/Graduation/IMG_3416.JPG" },
  { icon: Trophy,        year: "The Grind",       label: "Late Nights & Long Days", body: "The years between start and finish that no one photographs — but everyone feels.",                image: "/images/Graduation/IMG_3419.jpg" },
  { icon: GraduationCap, year: "Final Year",      label: "Almost There",         body: "Pressure, pride, and anticipation building toward a single unforgettable morning.",                  image: "/images/Graduation/DJAY9788.jpg" },
  { icon: Camera,        year: "Graduation Day",  label: "You Made It.",         body: "The handshake. The scroll. The photograph that hangs on walls for decades.",                          image: "/images/Graduation/DJAY9736.jpg" },
];

const ASPECTS = ["aspect-[3/4]","aspect-[4/3]","aspect-square","aspect-[3/4]","aspect-[4/5]","aspect-[4/3]","aspect-[3/4]","aspect-square","aspect-[4/5]"];

function GraduationsPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isAdmin } = useAdmin();
  const slots = useSlots();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heroSlot = CATEGORY_HEROES.find((s) => s.slotKey === "graduations-hero")!;
  const heroSrc = slots[heroSlot.slotKey] ?? heroSlot.defaultSrc;

  const gallerySlots = getCategoryGallerySlots("graduations", cat.gallery);
  const galleryImages = gallerySlots.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  const stackItems = (cat.stackPhotos ?? cat.gallery.slice(0, 5)).map((src, i) => ({
    src: slots[`graduations-stack-${i}`] ?? src,
    name: `Graduation ${i + 1}`,
    slotKey: `graduations-stack-${i}`,
  }));

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
      <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSrc})`, y: heroY }}
        />
        {isAdmin && (
          <>
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/40 bg-black/20">
              <span className="font-inter text-[10px] uppercase text-white" style={{ letterSpacing: "0.2em" }}>Click to replace hero</span>
            </div>
            <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
              onChange={async (e) => {
                const file = e.target.files?.[0]; if (!file) return;
                try {
                  const { uploadImage, saveSlot } = await import("@/lib/supabase");
                  const { setSlotOverride } = await import("@/lib/useImageSlots");
                  const url = await uploadImage(file, heroSlot.slotKey);
                  await saveSlot(heroSlot.slotKey, url);
                  setSlotOverride(heroSlot.slotKey, url);
                } catch { alert("Upload failed."); }
                e.target.value = "";
              }} />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-dj-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="font-playfair text-[52px] leading-[0.9] text-white md:text-[84px] lg:text-[108px]">
            Pride.<br /><span className="font-cormorant italic text-dj-warm">Achievement.</span><br />Memory.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8 max-w-md font-cormorant text-[19px] leading-relaxed text-white/75">{cat.description}</motion.p>
        </motion.div>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40">
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </section>

      {/* Interactive Photo Stack */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <p className="mb-4 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>The Collection</p>
              <h2 className="font-playfair text-[40px] leading-[1.05] text-dj-ink md:text-[54px]">Moments that <span className="font-cormorant italic text-dj-warm">last forever.</span></h2>
              <p className="mt-6 font-inter text-[14px] leading-[1.9] text-dj-mid">Every graduation session is as unique as the person in the frame. We capture the joy, the pride, the relief — and the quiet, in-between moments nobody else sees.</p>
              <p className="mt-4 font-inter text-[14px] leading-[1.9] text-dj-mid">Hover over the stack to explore a selection of our graduation work, then scroll down to see the full gallery.</p>
              <div className="mt-8 flex gap-8">
                {[{ n: "Full Gallery", label: "Below ↓" }, { n: "4 Weeks", label: "Delivery" }].map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair text-[28px] text-dj-ink">{s.n}</p>
                    <p className="mt-1 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.15em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
              <InteractivePhotoStack items={stackItems} title="Hover to explore" className="min-h-[420px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="bg-dj-bg2 py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>The Journey</p>
            <h2 className="mt-4 font-playfair text-[36px] text-dj-ink md:text-[48px]">Every step <span className="font-cormorant italic text-dj-warm">matters.</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-dj-border md:left-1/2" />
            <div className="space-y-12">
              {MILESTONE_DEFAULTS.map((m, i) => {
                const Icon = m.icon;
                const isRight = i % 2 === 0;
                const slotKey = `graduations-milestone-${i}`;
                return (
                  <div key={m.year} className={`relative flex items-start gap-8 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="relative z-20 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6">
                      <div className="flex h-8 w-8 items-center justify-center border border-dj-warm bg-dj-bg2">
                        <Icon className="h-3.5 w-3.5 text-dj-warm" strokeWidth={1.5} />
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: isRight ? -80 : 80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`group relative ml-6 h-72 w-full max-w-sm overflow-hidden md:ml-0 md:h-80 md:w-[44%] ${isRight ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}
                    >
                      <img
                        src={slots[slotKey] ?? m.image}
                        alt={m.label}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.07]"
                      />
                      {isAdmin && (
                        <>
                          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                            <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                          </div>
                          <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]; if (!file) return;
                              try {
                                const { uploadImage, saveSlot } = await import("@/lib/supabase");
                                const { setSlotOverride } = await import("@/lib/useImageSlots");
                                const url = await uploadImage(file, slotKey);
                                await saveSlot(slotKey, url);
                                setSlotOverride(slotKey, url);
                              } catch { alert("Upload failed."); }
                              e.target.value = "";
                            }} />
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />
                      <div className="absolute inset-0 ring-0 ring-inset ring-dj-warm transition-all duration-300 group-hover:ring-2 pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
                        <p className="mb-1 font-inter text-[10px] uppercase text-white/60" style={{ letterSpacing: "0.2em" }}>{m.year}</p>
                        <h3 className="font-playfair text-[26px] text-white">{m.label}</h3>
                        <p className="mt-2 font-inter text-[13px] leading-[1.7] text-white/75">{m.body}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-dj-warm transition-transform duration-500 group-hover:scale-x-100 pointer-events-none" />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-12 overflow-hidden">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center">
              <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>A Visual Story</p>
              <h2 className="mt-4 font-playfair text-[36px] text-dj-ink md:text-[48px]">The <span className="font-cormorant italic text-dj-warm">Gallery</span></h2>
            </motion.div>
          </div>
          <div className="columns-1 gap-1 sm:columns-2 lg:columns-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
                className="mb-1"
                onMouseEnter={() => !isAdmin && setPreview(src)}
                onMouseLeave={() => setPreview(null)}
              >
                <div className={`group relative w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}>
                  <img
                    src={src}
                    alt={`Graduation ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
                    onClick={() => !isAdmin && setOpen(i)}
                    style={{ cursor: isAdmin ? "default" : "pointer" }}
                  />
                  {isAdmin && (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                        <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
                      </div>
                      <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          try {
                            const { uploadImage, saveSlot } = await import("@/lib/supabase");
                            const { setSlotOverride } = await import("@/lib/useImageSlots");
                            const slotKey = gallerySlots[i].slotKey;
                            const url = await uploadImage(file, slotKey);
                            await saveSlot(slotKey, url);
                            setSlotOverride(slotKey, url);
                          } catch { alert("Upload failed."); }
                          e.target.value = "";
                        }} />
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dj-bg2 py-24 text-center overflow-hidden">
        <div className="mx-auto max-w-[700px] px-6">
          <h2 className="font-playfair text-[32px] text-dj-ink md:text-[44px]">Book Your Graduation Session</h2>
          <p className="mx-auto mt-4 max-w-sm font-inter text-[14px] text-dj-mid">Reach out early — graduation season fills up fast.</p>
          <div className="mt-10">
            <Link to="/contact" className="inline-block border border-dj-ink bg-dj-ink px-12 py-4 font-inter text-[11px] uppercase text-dj-bg transition-all duration-300 hover:bg-transparent hover:text-dj-ink" style={{ letterSpacing: "0.2em" }}>Get In Touch</Link>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="bg-dj-bg py-20 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <h2 className="mb-10 text-center font-playfair text-[28px] text-dj-ink md:text-[36px]">Explore More</h2>
          <div className="grid gap-1 md:grid-cols-3">
            {CATEGORIES.filter((c) => c.key !== "graduations").slice(0, 3).map((r, i) => {
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
                          <input type="file" accept="image/*" className="absolute inset-0 z-30 cursor-pointer opacity-0"
                            onClick={(e) => e.stopPropagation()}
                            onChange={async (e) => {
                              e.stopPropagation();
                              const file = e.target.files?.[0]; if (!file) return;
                              try {
                                const { uploadImage, saveSlot } = await import("@/lib/supabase");
                                const { setSlotOverride } = await import("@/lib/useImageSlots");
                                const slotKey = `${r.key}-thumb`;
                                const url = await uploadImage(file, slotKey);
                                await saveSlot(slotKey, url);
                                setSlotOverride(slotKey, url);
                              } catch { alert("Upload failed."); }
                              e.target.value = "";
                            }} />
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

export const Route = createFileRoute("/graduations")({
  head: () => ({ meta: [{ title: `Graduation Photography | Djay Photography` }, { name: "description", content: cat.description }, { property: "og:title", content: `Graduation Photography | Djay Photography` }, { property: "og:description", content: cat.description }, { property: "og:image", content: cat.hero }] }),
  component: GraduationsPage,
});