import { useAdmin } from "@/context/AdminContext";
import { useSlots } from "@/lib/useImageSlots";

type Props = {
  slotKey: string;
  defaultSrc: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  alt?: string;
};

export function AdminImg({ slotKey, defaultSrc, className, imgClassName, style, imgStyle, alt }: Props) {
  const { isAdmin } = useAdmin();
  const slots = useSlots();
  const src = slots[slotKey] ?? defaultSrc;

  return (
    <div className={`relative ${className ?? ""}`} style={style}>
      <img src={src} alt={alt ?? ""} className={`${imgClassName ?? ""}`} style={imgStyle} loading="lazy" />
      {isAdmin && (
        <>
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/60 bg-black/30">
            <span className="font-inter text-[9px] uppercase text-white" style={{ letterSpacing: "0.15em" }}>Replace</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 z-30 cursor-pointer opacity-0"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const { uploadImage, saveSlot } = await import("@/lib/supabase");
                const { setSlotOverride } = await import("@/lib/useImageSlots");
                const url = await uploadImage(file, slotKey);
                await saveSlot(slotKey, url);
                setSlotOverride(slotKey, url);
              } catch {
                alert("Upload failed.");
              }
              e.target.value = "";
            }}
          />
        </>
      )}
    </div>
  );
}

export function AdminBgHero({
  slotKey,
  defaultSrc,
  className,
  style,
  children,
}: {
  slotKey: string;
  defaultSrc: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const { isAdmin } = useAdmin();
  const slots = useSlots();
  const src = slots[slotKey] ?? defaultSrc;

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ ...style, backgroundImage: `url(${src})` }}
    >
      {children}
      {isAdmin && (
        <>
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center border border-dashed border-white/40 bg-black/20">
            <span className="font-inter text-[10px] uppercase text-white drop-shadow" style={{ letterSpacing: "0.2em" }}>Click to replace</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 z-30 cursor-pointer opacity-0"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const { uploadImage, saveSlot } = await import("@/lib/supabase");
                const { setSlotOverride } = await import("@/lib/useImageSlots");
                const url = await uploadImage(file, slotKey);
                await saveSlot(slotKey, url);
                setSlotOverride(slotKey, url);
              } catch {
                alert("Upload failed.");
              }
              e.target.value = "";
            }}
          />
        </>
      )}
    </div>
  );
}