import { useRef, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { uploadImage, saveSlot } from "@/lib/supabase";
import { setSlotOverride } from "@/lib/useImageSlots";
import { Upload } from "lucide-react";

type Props = {
  slotKey: string;
  src: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  alt?: string;
  onClick?: () => void;
  asBackground?: boolean;
  children?: React.ReactNode;
};

export function AdminPhotoSlot({
  slotKey,
  src,
  className,
  imgClassName,
  style,
  imgStyle,
  alt,
  onClick,
  asBackground,
  children,
}: Props) {
  const { isAdmin } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [localSrc, setLocalSrc] = useState(src);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, slotKey);
      await saveSlot(slotKey, url);
      setSlotOverride(slotKey, url);
      setLocalSrc(url);
    } catch (e) {
      alert("Upload failed. Make sure your Supabase bucket is set to public.");
    } finally {
      setUploading(false);
    }
  }

  // The hidden file input — sits on top of everything in admin mode
  const fileInput = isAdmin && (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="absolute inset-0 z-30 cursor-pointer opacity-0"
      onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) handleFile(f);
        // Reset so same file can be picked again
        e.target.value = "";
      }}
    />
  );

  const adminOverlay = isAdmin && (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center border-2 border-dashed border-white/70 bg-black/35">
      {uploading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <>
          <Upload className="h-6 w-6 text-white drop-shadow" strokeWidth={1.5} />
          <p
            className="mt-2 font-inter text-[10px] uppercase text-white drop-shadow"
            style={{ letterSpacing: "0.15em" }}
          >
            Click to replace
          </p>
        </>
      )}
    </div>
  );

  if (asBackground) {
    return (
      <div
        className={`${className ?? ""} relative`}
        style={{ ...style, backgroundImage: `url(${localSrc})` }}
      >
        {children}
        {fileInput}
        {adminOverlay}
      </div>
    );
  }

  return (
    <div
      className={`${className ?? ""} relative`}
      style={style}
      onClick={!isAdmin ? onClick : undefined}
    >
      <img
        src={localSrc}
        alt={alt ?? ""}
        loading="lazy"
        className={imgClassName}
        style={imgStyle}
      />
      {fileInput}
      {adminOverlay}
    </div>
  );
}