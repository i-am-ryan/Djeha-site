import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Camera } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dj-dark text-dj-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-playfair font-bold"
        style={{ fontSize: "min(28vw, 320px)", color: "rgba(245,240,232,0.03)", letterSpacing: "0.05em" }}
      >
        DJAY
      </div>

      <div className="relative mx-auto max-w-[1500px] border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-end gap-2">
              <span className="font-playfair text-xl text-dj-bg" style={{ letterSpacing: "0.15em" }}>
                {BRAND.name}
              </span>
              <span className="font-cormorant text-[13px] text-dj-warm">Photography</span>
            </div>
            <p className="mt-3 font-cormorant text-[15px] text-dj-warm">
              Capturing moments that last forever.
            </p>
            <div className="mt-6 flex gap-4 text-dj-warm">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-dj-bg">
                <Instagram className="h-[18px] w-[18px]" strokeWidth={1.4} />
              </a>
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-dj-bg">
                <Facebook className="h-[18px] w-[18px]" strokeWidth={1.4} />
              </a>
              <a href={BRAND.whatsapp} aria-label="Pixieset" className="transition-colors hover:text-dj-bg">
                <Camera className="h-[18px] w-[18px]" strokeWidth={1.4} />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-5 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.2em" }}>
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-inter text-[13px] text-dj-warm transition-colors hover:text-dj-bg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-inter text-[10px] uppercase text-dj-warm" style={{ letterSpacing: "0.2em" }}>
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a href={BRAND.phoneHref} className="font-inter text-[13px] text-dj-warm transition-colors hover:text-dj-bg">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="font-inter text-[13px] text-dj-warm transition-colors hover:text-dj-bg">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={BRAND.mapsHref} target="_blank" rel="noreferrer" className="font-inter text-[13px] text-dj-warm transition-colors hover:text-dj-bg">
                  {BRAND.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="font-inter text-[11px] text-dj-warm">© {new Date().getFullYear()} Djay Photography</p>
          <p className="font-cormorant text-[12px] text-dj-warm">Designed with grace, built with precision.</p>
        </div>
      </div>
    </footer>
  );
}
