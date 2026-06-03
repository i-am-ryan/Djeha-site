import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] backdrop-blur-md transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(245,240,232,0.96)" : "rgba(245,240,232,0.85)",
          borderBottom: `1px solid ${scrolled ? "var(--dj-border2)" : "var(--dj-border)"}`,
        }}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-playfair text-[22px] text-dj-ink" style={{ letterSpacing: "0.15em" }}>
              {BRAND.name}
            </span>
            <span className="font-cormorant text-[13px] text-dj-warm">Photography</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative font-inter text-[11px] uppercase text-dj-warm transition-colors hover:text-dj-ink"
                style={{ letterSpacing: "0.1em" }}
                activeProps={{ style: { color: "var(--dj-ink)" } }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-dj-ink transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden border border-dj-border2 px-6 py-2.5 font-inter text-[11px] uppercase text-dj-charcoal transition-colors hover:border-dj-ink hover:bg-dj-charcoal/5 lg:inline-block"
            style={{ letterSpacing: "0.1em" }}
          >
            Book A Session
          </Link>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-dj-ink lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.2} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-dj-bg p-6 lg:hidden"
          >
            <div className="flex justify-end">
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-6 w-6 text-dj-ink" strokeWidth={1.2} />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    to={l.to}
                    className="font-playfair text-4xl text-dj-ink"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
