import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ backgroundColor: "rgba(245,240,232,0.97)" }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 text-dj-charcoal"
          >
            <X className="h-7 w-7" strokeWidth={1.3} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous"
            className="absolute left-4 z-10 text-dj-charcoal md:left-8"
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1.3} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next"
            className="absolute right-4 z-10 text-dj-charcoal md:right-8"
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1.3} />
          </button>

          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-inter text-[12px] text-dj-warm"
            style={{ letterSpacing: "0.15em" }}
          >
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
