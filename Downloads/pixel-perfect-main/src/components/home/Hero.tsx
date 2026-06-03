import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { InfiniteGallery } from "./InfiniteGallery";

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden bg-dj-ink">
      <InfiniteGallery />

      {/* All content centered in one block */}
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-6 text-center">

        {/* "Grace." slides in from the LEFT */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[64px] leading-[0.9] text-white md:text-[88px] lg:text-[120px]"
          >
            Grace.
          </motion.h1>
        </div>

        {/* "Precision." slides in from the RIGHT */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.38, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair text-[64px] leading-[0.9] text-dj-warm md:text-[88px] lg:text-[120px]"
          >
            Precision.
          </motion.h1>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-24 origin-center bg-white/30"
        />

        {/* Subtitle slides in from the RIGHT */}
        <motion.p
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-cormorant text-[22px] text-white/70 md:text-[26px]"
        >
          Capturing the essence of your most important moments.
        </motion.p>

        {/* Buttons fade up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* View Portfolio — fills dark on hover */}
          <Link
            to="/weddings"
            className="group relative overflow-hidden bg-white px-8 py-3.5 font-inter text-[11px] uppercase text-dj-ink"
            style={{ letterSpacing: "0.12em" }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View Portfolio
            </span>
            <span className="absolute inset-0 translate-y-full bg-dj-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </Link>

          {/* Book A Session — fills white on hover */}
          <Link
            to="/contact"
            className="group relative overflow-hidden border border-white/50 px-8 py-3.5 font-inter text-[11px] uppercase text-white"
            style={{ letterSpacing: "0.12em" }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-dj-ink">
              Book A Session
            </span>
            <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom left */}
      <div
        className="absolute bottom-8 left-8 origin-bottom-left -rotate-90 font-inter text-[10px] uppercase text-white/30"
        style={{ letterSpacing: "0.2em" }}
      >
        © Djay Photography {new Date().getFullYear()}
      </div>

      {/* Scroll arrow */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.2} />
      </motion.div>

 
    </section>
  );
}