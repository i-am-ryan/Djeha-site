import * as React from "react";
import {
  HTMLMotionProps,
  MotionValue,
  Variants,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue>({
  scrollYProgress: {} as MotionValue<number>,
});

function useContainerScrollContext() {
  return React.useContext(ContainerScrollContext);
}

// ─── Animation config ────────────────────────────────────────────────────────

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const blurVariants: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

// ─── Components ──────────────────────────────────────────────────────────────

export function ContainerScroll({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center top",
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
}
ContainerScroll.displayName = "ContainerScroll";

export function ContainerSticky({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sticky left-0 top-0 min-h-[30rem] w-full overflow-hidden",
        className
      )}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center top",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    />
  );
}
ContainerSticky.displayName = "ContainerSticky";

export function GalleryContainer({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">) {
  const { scrollYProgress } = useContainerScrollContext();
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [75, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.9], [1.2, 1]);

  return (
    <motion.div
      className={cn("relative grid size-full grid-cols-3 gap-2", className)}
      style={{
        rotateX,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
GalleryContainer.displayName = "GalleryContainer";

export function GalleryCol({
  className,
  style,
  yRange = ["0%", "-10%"],
  ...props
}: HTMLMotionProps<"div"> & { yRange?: string[] }) {
  const { scrollYProgress } = useContainerScrollContext();
  const y = useTransform(scrollYProgress, [0.5, 1], yRange);

  return (
    <motion.div
      className={cn("relative flex w-full flex-col gap-2", className)}
      style={{ y, ...style }}
      {...props}
    />
  );
}
GalleryCol.displayName = "GalleryCol";

export function ContainerStagger({
  className,
  viewport,
  transition,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, ...viewport }}
      transition={{
        staggerChildren: 0.15,
        ...transition,
      }}
      {...props}
    />
  );
}
ContainerStagger.displayName = "ContainerStagger";

export function ContainerAnimated({
  className,
  transition,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(className)}
      variants={blurVariants}
      transition={transition ?? SPRING_CONFIG}
      {...props}
    />
  );
}
ContainerAnimated.displayName = "ContainerAnimated";