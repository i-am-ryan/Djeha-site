import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/data";
import { ContactStrip } from "@/components/home/ContactStrip";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Djeha — The Person Behind The Lens | Djay Photography" },
      { name: "description", content: "Meet Djeha. Johannesburg-based photographer with eight years and 500+ events of experience. Grace, precision, warmth." },
      { property: "og:title", content: "About Djeha | Djay Photography" },
      { property: "og:description", content: "The story behind Djay Photography — grace, precision, and warmth from a Johannesburg artist." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Authenticity",
    body: "We capture real moments, not performances. The smile after the punchline. The held breath before the vow.",
    image: "/images/Weddings/IMG_3463.JPG",
  },
  {
    title: "Precision",
    body: "Every detail considered, every composition intentional. Nothing in the frame by accident.",
    image: "/images/Portraits/IMG_3523.JPG",
  },
  {
    title: "Warmth",
    body: "We make every subject feel comfortable and at ease. The best photographs come from genuine trust.",
    image: "/images/Graduation/IMG_3422.jpg",
  },
];

const STATS = [
  { n: "500+", l: "Events" },
  { n: "8+", l: "Years" },
  { n: "5★", l: "Rating" },
];

function AboutPage() {
  return (
    <>
      <section className="relative flex h-[80vh] min-h-[560px] items-center overflow-hidden">
        <div
          className="absolute inset-0 animate-[kenBurns_14s_ease-in-out_infinite_alternate] bg-cover bg-center"
style={{ backgroundImage: "url(/images/Djeha/IMG_3542.jpg)", backgroundPosition: "center 20%" }}        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 lg:px-10">
          <p className="font-inter text-[11px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>About</p>
          <h1 className="mt-4 max-w-3xl font-playfair text-[44px] leading-[1.05] text-white md:text-[72px]">
            The Person Behind The Lens
          </h1>
        </div>
      </section>

      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto grid max-w-[1300px] items-center gap-16 px-6 md:grid-cols-2 lg:px-10">
          <div>
            <h2 className="font-playfair text-[36px] text-dj-ink md:text-[48px]">My name is Djeha.</h2>
            <p className="mt-6 font-inter text-[15px] leading-[1.9] text-dj-mid">
              Based in Johannesburg, I've spent years honing my craft at weddings, graduations,
              corporate events, and intimate portrait sessions across South Africa. My approach
              is simple: I get to know you first, understand what matters most, and then quietly
              capture the real, unscripted moments that define your day.
            </p>
            <p className="mt-5 font-cormorant text-[22px] text-dj-warm">
              "The photograph isn't taken. It's recognised, and then preserved."
            </p>
          </div>
<div className="relative">
            <img
              src="/images/Djeha/IMG_3541.jpg"
              alt="Djeha portrait"
              loading="lazy"
              className="aspect-[3/4] w-full border border-dj-border object-cover object-top"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-6 -left-6 overflow-hidden border-4 border-dj-bg shadow-2xl md:-bottom-8 md:-left-8"
              style={{ width: "45%" }}
            >
              <img
                src="/images/Djeha/IMG_3542.jpg"
                alt="Djeha at work"
                loading="lazy"
                className="aspect-square w-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-dj-bg2 py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.25em" }}>Our Values</p>
            <h2 className="mt-4 font-playfair text-[36px] text-dj-ink md:text-[44px]">What We Believe</h2>
          </div>
<div className="grid gap-1 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
className="group relative h-[520px] overflow-hidden md:h-[420px]"              >
                <img
                  src={v.image}
                  alt={v.title}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-dj-warm/0 transition-colors duration-500 group-hover:bg-dj-warm/10" />
                <div className="absolute inset-0 ring-0 ring-inset ring-dj-warm transition-all duration-300 group-hover:ring-2" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="mb-3 h-px w-0 bg-dj-warm transition-all duration-500 group-hover:w-12" />
                  <h3 className="font-playfair text-[28px] text-white">{v.title}</h3>
                  <p className="mt-3 font-inter text-[13px] leading-[1.8] text-white/70">{v.body}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-dj-warm transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dj-bg py-24">
        <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-16 px-6">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-playfair text-[56px] text-dj-ink">{s.n}</div>
              <div className="mt-2 font-inter text-[11px] uppercase text-dj-warm" style={{ letterSpacing: "0.2em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey timeline */}
      <section className="bg-dj-dark py-24 md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
<div className="mb-16 overflow-hidden text-center">
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-inter text-[10px] uppercase text-dj-warm"
              style={{ letterSpacing: "0.25em" }}
            >
              Our Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-playfair text-[36px] text-dj-bg md:text-[48px]"
            >
              Eight Years In Frames
            </motion.h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-2 h-full w-px bg-white/15 md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="hidden flex-1 md:block" />
                  <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#E8E0D0] bg-dj-dark md:absolute md:left-1/2 md:-translate-x-1/2">
                    <t.icon className="h-3.5 w-3.5 text-[#E8E0D0]" strokeWidth={1.4} />
                  </div>
                  <div className={`flex-1 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <p className="font-cormorant text-[18px] text-[#E8E0D0]">{t.year}</p>
                    <h3 className="mt-1 font-playfair text-[24px] text-dj-bg">{t.title}</h3>
                    <p className="mt-2 max-w-md font-inter text-[14px] leading-[1.7] text-dj-warm">{t.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
