import * as React from "react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

export interface PhotoStackItem {
  src: string;
  name: string;
  slotKey?: string;
}

export interface InteractivePhotoStackProps {
  items: PhotoStackItem[];
  title?: React.ReactNode;
  className?: string;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateNonOverlappingTransforms = (items: PhotoStackItem[]): string[] => {
  const positions: { x: number; y: number; r: number }[] = [];
  const displayed = items.slice(0, 5);
  const cardW = 25;
  const cardH = 45;
  const maxRetries = 100;

  displayed.forEach(() => {
    let newPos = { x: 0, y: 0, r: 0 };
    let collision = false;
    let retries = 0;
    do {
      collision = false;
      newPos = { x: random(-45, 45), y: random(-25, 25), r: random(-25, 25) };
      for (const pos of positions) {
        if (Math.abs(newPos.x - pos.x) < cardW && Math.abs(newPos.y - pos.y) < cardH) {
          collision = true;
          break;
        }
      }
      retries++;
    } while (collision && retries < maxRetries);
    positions.push(newPos);
  });

  return positions.map(
    (pos) => `translate(${pos.x}vw, ${pos.y}vh) rotate(${pos.r}deg)`
  );
};

function InteractivePhotoStack({
  items,
  title,
  className,
  ...props
}: InteractivePhotoStackProps) {
  const { isAdmin } = useAdmin();
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [isGroupHovered, setIsGroupHovered] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
  const [spreadTransforms, setSpreadTransforms] = React.useState<string[]>([]);
  const [srcs, setSrcs] = React.useState<string[]>(items.map((i) => i.src));

  const displayed = items.slice(0, 5);
  const baseRotations = ["rotate-2", "-rotate-2", "rotate-4", "-rotate-4", "rotate-6"];

const handleMouseEnter = () => {
    setSpreadTransforms(generateNonOverlappingTransforms(items));
    setIsGroupHovered(true);
  };

const handleCardClick = (index: number) => {
    if (isAdmin) return;
    if (isGroupHovered) {
      setClickedIndex(index);
      setTimeout(() => {
        setIsGroupHovered(false);
        setTopCardIndex(index);
        setClickedIndex(null);
      }, 700);
    } else {
      setTopCardIndex(index);
    }
  };

  async function handleUpload(file: File, index: number, slotKey: string) {
    try {
      const { uploadImage, saveSlot } = await import("@/lib/supabase");
      const { setSlotOverride } = await import("@/lib/useImageSlots");
      const url = await uploadImage(file, slotKey);
      await saveSlot(slotKey, url);
      setSlotOverride(slotKey, url);
      setSrcs((prev) => prev.map((s, i) => (i === index ? url : s)));
    } catch {
      alert("Upload failed.");
    }
  }

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-12", className)}
      {...props}
    >
      <div
        className="relative h-96 w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          if (!clickedIndex) setIsGroupHovered(false);
        }}
      >
        <div className="relative left-1/2 top-1/2 h-80 w-64 -translate-x-1/2 -translate-y-1/2">
          {displayed.map((item, index) => {
            const isTopCard = index === topCardIndex;
            const numItems = displayed.length;
            let stackPos = index - topCardIndex;
            if (stackPos < 0) stackPos += numItems;
            const isClicked = index === clickedIndex;
            const transform = isGroupHovered
              ? (spreadTransforms[index] ?? "")
              : `translateY(${stackPos * 0.5}rem) scale(${1 - stackPos * 0.05})`;

            const slotKey = item.slotKey ?? `stack-${index}`;

            return (
              <div
                key={`${item.name}-${index}`}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "absolute inset-0 h-80 w-64 cursor-pointer overflow-hidden border border-dj-border bg-dj-surface p-1.5 shadow-xl transition-all duration-500 ease-in-out",
                  !isGroupHovered && !isTopCard && baseRotations[stackPos],
                  isGroupHovered && !isClicked && "hover:scale-110"
                )}
                style={{
                  transform,
                  zIndex: isClicked ? 200 : isGroupHovered ? 100 : isTopCard ? numItems : numItems - stackPos,
                }}
              >
                <img
                  src={srcs[index] ?? item.src}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                {isAdmin && (
                  <>
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
                      <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>
                        Replace
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-30 cursor-pointer opacity-0"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(file, index, slotKey);
                        e.target.value = "";
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {title && (
        <p className="text-center font-inter text-[12px] uppercase text-dj-warm" style={{ letterSpacing: "0.2em" }}>
          {isAdmin ? "Click any card to replace" : title}
        </p>
      )}
    </div>
  );
}

InteractivePhotoStack.displayName = "InteractivePhotoStack";

export { InteractivePhotoStack };