import { Phone, Mail, MapPin } from "lucide-react";
import { BRAND } from "@/lib/data";

const ITEMS = [
  { icon: Phone, label: "Call", value: BRAND.phone, href: BRAND.phoneHref },
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: MapPin, label: "Studio", value: "Wynberg, Johannesburg", href: BRAND.mapsHref },
];

export function ContactStrip() {
  return (
    <section className="border-y border-dj-border bg-dj-bg2">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 md:grid-cols-3">
        {ITEMS.map((it, i) => (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className={`group flex flex-col items-center px-6 py-12 text-center transition-colors hover:bg-dj-charcoal/[0.03] ${
              i > 0 ? "md:border-l md:border-dj-border" : ""
            } ${i > 0 ? "border-t border-dj-border md:border-t-0" : ""}`}
          >
            <it.icon
              className="h-5 w-5 text-dj-warm transition-colors group-hover:text-dj-charcoal"
              strokeWidth={1.3}
            />
            <p
              className="mt-4 font-inter text-[10px] uppercase text-dj-warm"
              style={{ letterSpacing: "0.2em" }}
            >
              {it.label}
            </p>
            <p className="mt-2 font-playfair text-[18px] text-dj-ink">{it.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
