import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-dj-dark py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, width: "20rem" }}
          whileInView={{ opacity: 1, width: "32rem" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-1/2 top-0 h-[20rem] -translate-x-1/2"
          style={{
            background:
              "conic-gradient(from 70deg at 50% 0%, transparent 0deg, rgba(232,224,208,0.45) 40deg, rgba(232,224,208,0.7) 90deg, rgba(232,224,208,0.45) 140deg, transparent 180deg)",
            filter: "blur(28px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute left-1/2 top-0 h-px w-[32rem] -translate-x-1/2 bg-[#E8E0D0]"
          style={{ boxShadow: "0 0 60px 20px rgba(232,224,208,0.45)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="bg-gradient-to-b from-[#F5F0E8] to-[#C8BFB0] bg-clip-text font-playfair text-[36px] text-transparent md:text-[56px]"
        >
          Ready to Create<br />Something Beautiful?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mx-auto mt-6 max-w-xl font-cormorant text-[20px] text-dj-warm"
        >
          Every great event deserves to be remembered. Let's capture yours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="bg-dj-bg px-10 py-4 font-inter text-[12px] uppercase text-dj-dark transition-colors hover:bg-[#E8E0D0]"
            style={{ letterSpacing: "0.15em" }}
          >
            Book A Session
          </Link>
          <Link
            to="/weddings"
            className="border border-white/35 px-10 py-4 font-inter text-[12px] uppercase text-[#E8E0D0] transition-colors hover:border-white/70 hover:bg-white/5"
            style={{ letterSpacing: "0.15em" }}
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
