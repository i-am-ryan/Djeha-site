import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { AdminPhotoSlot } from "@/components/gallery/AdminPhotoSlot";
import { useSlots } from "@/lib/useImageSlots";
import { ABOUT_PREVIEW_MAIN, ABOUT_PREVIEW_FLOAT1, ABOUT_PREVIEW_FLOAT2 } from "@/lib/imageSlots";

const STATS = [
  { n: "500+", l: "Events" },
  { n: "8+", l: "Years" },
  { n: "5★", l: "Rating" },
];

export function AboutPreview() {
  const slots = useSlots();

  const mainSrc = slots[ABOUT_PREVIEW_MAIN.slotKey] ?? ABOUT_PREVIEW_MAIN.defaultSrc;
  const float1Src = slots[ABOUT_PREVIEW_FLOAT1.slotKey] ?? ABOUT_PREVIEW_FLOAT1.defaultSrc;
  const float2Src = slots[ABOUT_PREVIEW_FLOAT2.slotKey] ?? ABOUT_PREVIEW_FLOAT2.defaultSrc;

  return (
    <section className="bg-dj-bg2 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1300px] items-center gap-16 px-6 md:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>
            About Djay Photography
          </p>
          <h2 className="mt-4 font-playfair text-[36px] leading-[1.15] text-dj-ink md:text-[48px]">
            Photography Is More Than A Craft
          </h2>
          <p className="mt-3 font-cormorant text-[24px] text-dj-warm">— It's a calling.</p>
          <p className="mt-6 max-w-md font-inter text-[15px] leading-[1.85] text-dj-mid">
            Based in Johannesburg, Djeha brings warmth, precision, and an artist's eye to every
            session. From grand weddings to intimate portraits, every image is crafted with
            intention and delivered with the care your memories deserve.
          </p>
          <div className="mt-10 flex gap-10">
            {STATS.map((s) => (
              <div key={s.l}>
                <div className="font-playfair text-[40px] text-dj-ink">{s.n}</div>
                <div className="mt-1 font-inter text-[11px] uppercase text-dj-warm" style={{ letterSpacing: "0.15em" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-10 inline-block border-b border-dj-border2 pb-1 font-inter text-[12px] uppercase text-dj-charcoal transition-colors hover:border-dj-ink"
            style={{ letterSpacing: "0.15em" }}
          >
            Our Full Story →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <AdminPhotoSlot
            slotKey={ABOUT_PREVIEW_MAIN.slotKey}
            src={mainSrc}
            className="ml-auto block aspect-[3/4] w-[80%] border border-dj-border overflow-hidden"
            imgClassName="w-full h-full object-cover object-top"
            alt="Portrait photography"
          />
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 -left-4 z-10 hidden sm:block">
            <AdminPhotoSlot
              slotKey={ABOUT_PREVIEW_FLOAT1.slotKey}
              src={float1Src}
              className="aspect-square w-[140px] border border-dj-border overflow-hidden"
              imgClassName="w-full h-full object-cover object-top"
              alt="Portrait photography"
            />
          </motion.div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity }}
            className="absolute -top-8 left-2 z-10 hidden sm:block">
            <AdminPhotoSlot
              slotKey={ABOUT_PREVIEW_FLOAT2.slotKey}
              src={float2Src}
              className="aspect-square w-[120px] border border-dj-border overflow-hidden"
              imgClassName="w-full h-full object-cover object-top"
              alt="Portrait photography"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}