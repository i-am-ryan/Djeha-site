import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { AdminPhotoSlot } from "@/components/gallery/AdminPhotoSlot";
import { CATEGORIES, type Category } from "@/lib/data";
import { useSlots } from "@/lib/useImageSlots";
import { getCategoryGallerySlots, CATEGORY_HEROES } from "@/lib/imageSlots";

const ASPECTS = ["aspect-[3/4]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]"];

const STEPS = [
  { n: "01", title: "Consult", body: "We start with a conversation to understand your vision, venue, and the moments that matter most." },
  { n: "02", title: "Capture", body: "On the day, we work quietly and intentionally — present without intruding, ready for every moment." },
  { n: "03", title: "Deliver", body: "Hand-edited galleries delivered through Pixieset within four weeks. Every frame considered." },
];

export function CategoryPage({ category }: { category: Category }) {
  const [open, setOpen] = useState<number | null>(null);
  const slots = useSlots();
  const related = CATEGORIES.filter((c) => c.key !== category.key).slice(0, 3);

  const heroSlot = CATEGORY_HEROES.find((s) => s.slotKey === `${category.key}-hero`)!;
  const heroSrc = slots[heroSlot.slotKey] ?? heroSlot.defaultSrc;

  const gallerySlots = getCategoryGallerySlots(category.key, category.gallery);
  const galleryImages = gallerySlots.map((s) => slots[s.slotKey] ?? s.defaultSrc);

  return (
    <>
      {/* Hero */}
      <AdminPhotoSlot
        slotKey={heroSlot.slotKey}
        src={heroSrc}
        asBackground
        className="relative flex h-screen min-h-[640px] items-center overflow-hidden animate-[kenBurns_14s_ease-in-out_infinite_alternate] bg-cover bg-center"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.25) 0%, rgba(245,240,232,0.15) 60%, rgba(245,240,232,0.85) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <p className="font-inter text-[11px] text-dj-warm" style={{ letterSpacing: "0.1em" }}>
            <Link to="/" className="hover:text-dj-ink">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-dj-charcoal">{category.label}</span>
          </p>
          <p className="mt-10 font-inter text-[11px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>Portfolio</p>
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mt-4 font-playfair text-[48px] leading-[0.95] text-dj-ink md:text-[72px] lg:text-[88px]">
            {category.label}.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.9 }} className="mt-6 max-w-xl font-cormorant text-[20px] text-dj-mid">
            {category.description}
          </motion.p>
        </div>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-dj-warm">
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </AdminPhotoSlot>

      {/* Gallery grid */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="columns-1 gap-1 sm:columns-2 lg:columns-3">
            {galleryImages.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: (i % 6) * 0.05 }} className="mb-1">
                <AdminPhotoSlot
                  slotKey={gallerySlots[i].slotKey}
                  src={src}
                  className={`group relative block w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}
                  imgClassName="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                  alt={`${category.label} ${i + 1}`}
                  onClick={() => setOpen(i)}
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
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>The Process</p>
            <h2 className="mt-4 font-playfair text-[36px] text-dj-ink md:text-[44px]">How It Works</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }} className="relative">
                <div className="font-playfair text-[72px] leading-none text-dj-ink opacity-10">{s.n}</div>
                <h3 className="mt-2 font-playfair text-[24px] text-dj-ink">{s.title}</h3>
                <p className="mt-3 font-inter text-[14px] leading-[1.7] text-dj-mid">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dj-dark py-20 text-center">
        <h2 className="font-playfair text-[28px] text-dj-bg md:text-[36px]">Book Your {category.label} Session</h2>
        <Link to="/contact" className="mt-8 inline-block bg-dj-bg px-10 py-4 font-inter text-[12px] uppercase text-dj-dark transition-colors hover:bg-[#E8E0D0]" style={{ letterSpacing: "0.15em" }}>
          Get In Touch
        </Link>
      </section>

      {/* Related */}
      <section className="bg-dj-bg py-24">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <h2 className="text-center font-playfair text-[28px] text-dj-ink md:text-[36px]">Explore More</h2>
          <div className="mt-12 grid gap-1 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.key} to={r.slug} className="group relative block aspect-[4/5] overflow-hidden">
                <img src={r.thumb} alt={r.label} loading="lazy" className="img-desaturate h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dj-bg/90 to-transparent p-5">
                  <p className="font-playfair text-[22px] text-dj-ink">{r.label}</p>
                  <p className="mt-1 font-cormorant text-[14px] text-dj-mid">{r.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={galleryImages}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length))}
        onNext={() => setOpen((i) => (i === null ? null : (i + 1) % galleryImages.length))}
      />
    </>
  );
}