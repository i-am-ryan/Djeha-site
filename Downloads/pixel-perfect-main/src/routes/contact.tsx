import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import { BRAND } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book A Session | Djay Photography" },
      { name: "description", content: "Book your wedding, graduation, portrait, prom, corporate or real estate shoot. Based in Wynberg, Johannesburg." },
      { property: "og:title", content: "Contact Djay Photography" },
      { property: "og:description", content: "Let's create something beautiful together. Based in Wynberg, Johannesburg." },
    ],
  }),
  component: ContactPage,
});

const INFO = [
  { icon: Phone, label: "Phone", value: BRAND.phone, href: BRAND.phoneHref },
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: MapPin, label: "Studio", value: BRAND.address, href: BRAND.mapsHref },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9am–6pm · Sat 10am–4pm" },
];

const EVENT_TYPES = [
  "Wedding",
  "Graduation",
  "Portrait",
  "Prom / Matric Dance",
  "Corporate Event",
  "Real Estate",
  "Other",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex h-[60vh] min-h-[480px] items-center overflow-hidden">
<div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/Portraits/IMG_3526.JPG)",
            backgroundPosition: "center 30%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-inter text-[10px] uppercase text-dj-warm"
            style={{ letterSpacing: "0.35em" }}
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-playfair text-[48px] leading-[0.95] text-white md:text-[72px] lg:text-[88px]"
          >
            Let's Create
            <br />
            <span className="font-cormorant italic text-dj-warm">Together.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-5 font-cormorant text-[20px] text-white/70"
          >
            A conversation is where every great photograph begins.
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-dj-bg py-24 md:py-32">
        <div className="mx-auto grid max-w-[1300px] gap-16 px-6 lg:grid-cols-[1.4fr_1fr] lg:px-10">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-dj-warm bg-dj-surface p-12 text-center"
              >
                <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
                  Message Received
                </p>
                <h2 className="mt-4 font-playfair text-[36px] text-dj-ink">Thank you.</h2>
                <p className="mt-4 font-cormorant text-[20px] text-dj-mid">
                  We'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-10">
                  <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
                    Book A Session
                  </p>
                  <h2 className="mt-3 font-playfair text-[36px] text-dj-ink md:text-[44px]">
                    Tell us about{" "}
                    <span className="font-cormorant italic text-dj-warm">your vision.</span>
                  </h2>
                </div>

                <form onSubmit={onSubmit} className="grid gap-5">
                  <Field label="Full Name" name="name" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Email" name="email" type="email" />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label>Event Type</Label>
                      <select
                        name="eventType"
                        className="mt-2 w-full border border-dj-border bg-dj-bg2 px-4 py-3.5 font-inter text-[14px] text-dj-ink focus:border-dj-charcoal focus:outline-none"
                      >
                        {EVENT_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <Field label="Event Date" name="date" type="date" />
                  </div>
                  <div>
                    <Label>Message</Label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your event, vision, or any questions you have..."
                      className="mt-2 w-full resize-none border border-dj-border bg-dj-bg2 px-4 py-3.5 font-inter text-[14px] text-dj-ink placeholder:text-dj-mid/50 focus:border-dj-charcoal focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full border border-dj-ink bg-dj-ink py-4 font-inter text-[11px] uppercase text-dj-bg transition-all duration-300 hover:bg-transparent hover:text-dj-ink"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    Send Enquiry
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="mb-8">
              <p className="font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.3em" }}>
                Find Us
              </p>
              <h2 className="mt-3 font-playfair text-[32px] text-dj-ink md:text-[40px]">
                Based in{" "}
                <span className="font-cormorant italic text-dj-warm">Johannesburg.</span>
              </h2>
              <p className="mt-3 font-inter text-[13px] leading-[1.8] text-dj-mid">
                Available for shoots across Johannesburg and surrounding areas. Travel available on request.
              </p>
            </div>

            {INFO.map((it, i) => {
              const Wrap: any = it.href ? "a" : "div";
              return (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Wrap
                    {...(it.href
                      ? {
                          href: it.href,
                          target: it.href.startsWith("http") ? "_blank" : undefined,
                          rel: "noreferrer",
                        }
                      : {})}
                    className="group flex items-start gap-4 border border-dj-border bg-dj-surface p-5 transition-all duration-300 hover:border-dj-warm hover:bg-dj-bg2"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-dj-border transition-colors duration-300 group-hover:border-dj-warm">
                      <it.icon className="h-4 w-4 text-dj-warm" strokeWidth={1.4} />
                    </div>
                    <div>
                      <p
                        className="font-inter text-[9px] uppercase text-dj-warm"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {it.label}
                      </p>
                      <p className="mt-1 font-playfair text-[16px] text-dj-ink">{it.value}</p>
                    </div>
                  </Wrap>
                </motion.div>
              );
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 flex w-full items-center justify-center gap-3 border border-dj-warm bg-dj-warm/10 py-4 font-inter text-[11px] uppercase text-dj-ink transition-all duration-300 hover:bg-dj-warm hover:text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="border-t border-dj-border">
        <iframe
          title="Studio location"
          src="https://maps.google.com/maps?q=6+Carey+Street+Wynberg+Johannesburg&output=embed"
          width="100%"
          height="420"
          loading="lazy"
          className="block w-full"
          style={{ border: 0, filter: "grayscale(80%) sepia(15%) contrast(0.95)" }}
        />
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="font-inter text-[10px] uppercase text-dj-warm"
      style={{ letterSpacing: "0.2em" }}
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        className="mt-2 w-full border border-dj-border bg-dj-bg2 px-4 py-3.5 font-inter text-[14px] text-dj-ink focus:border-dj-charcoal focus:outline-none"
      />
    </div>
  );
}