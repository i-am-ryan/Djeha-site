// Central registry of every image slot on the site.
// slotKey is the unique ID used to store/retrieve from Supabase.
// defaultSrc is the fallback from data.ts / hardcoded paths.

import { CATEGORIES } from "@/lib/data";

export type ImageSlot = {
  slotKey: string;
  defaultSrc: string;
};

// ── HOME HERO ──────────────────────────────────────────────
export const HOME_HERO: ImageSlot = {
  slotKey: "home-hero",
  defaultSrc: "", // InfiniteGallery has no single bg image — handled separately
};

// ── INFINITE GALLERY (Hero background strips) ──────────────
export const INFINITE_ROW1: ImageSlot[] = [
  { slotKey: "infinite-row1-0", defaultSrc: "/images/Weddings/IMG_3453.JPG" },
  { slotKey: "infinite-row1-1", defaultSrc: "/images/Graduation/DJAY9788.jpg" },
  { slotKey: "infinite-row1-2", defaultSrc: "/images/Portraits/IMG_3511.JPG" },
  { slotKey: "infinite-row1-3", defaultSrc: "/images/Matric/IMG_3467.JPG" },
  { slotKey: "infinite-row1-4", defaultSrc: "/images/Corporate/3S2A8802.jpg" },
  { slotKey: "infinite-row1-5", defaultSrc: "/images/Weddings/IMG_1897-Edit-2.jpg" },
  { slotKey: "infinite-row1-6", defaultSrc: "/images/Portraits/IMG_3516.JPG" },
];

export const INFINITE_ROW2: ImageSlot[] = [
  { slotKey: "infinite-row2-0", defaultSrc: "/images/Graduation/IMG_3419.jpg" },
  { slotKey: "infinite-row2-1", defaultSrc: "/images/Matric/IMG_3472.JPG" },
  { slotKey: "infinite-row2-2", defaultSrc: "/images/Corporate/DSC08565.jpg" },
  { slotKey: "infinite-row2-3", defaultSrc: "/images/Portraits/IMG_3521.JPG" },
  { slotKey: "infinite-row2-4", defaultSrc: "/images/Weddings/IMG_1627-Edit.jpg" },
  { slotKey: "infinite-row2-5", defaultSrc: "/images/Corporate/3S2A8772.jpg" },
  { slotKey: "infinite-row2-6", defaultSrc: "/images/Graduation/IMG_3422.jpg" },
  { slotKey: "infinite-row2-7", defaultSrc: "/images/Matric/IMG_3479.JPG" },
];

export const INFINITE_ROW3: ImageSlot[] = [
  { slotKey: "infinite-row3-0", defaultSrc: "/images/Corporate/IMG_3499.JPG" },
  { slotKey: "infinite-row3-1", defaultSrc: "/images/Portraits/IMG_3524.JPG" },
  { slotKey: "infinite-row3-2", defaultSrc: "/images/Weddings/2L4A9536-Edit.jpg" },
  { slotKey: "infinite-row3-3", defaultSrc: "/images/Graduation/DJAY9736.jpg" },
  { slotKey: "infinite-row3-4", defaultSrc: "/images/Matric/IMG_3483.JPG" },
  { slotKey: "infinite-row3-5", defaultSrc: "/images/Corporate/3S2A8802.jpg" },
  { slotKey: "infinite-row3-6", defaultSrc: "/images/Portraits/IMG_3527.JPG" },
  { slotKey: "infinite-row3-7", defaultSrc: "/images/Corporate/IMG_3503.JPG" },
];

// ── FEATURED WORK (Instagram section strips) ───────────────
export const FEATURED_ROW1: ImageSlot[] = [
  { slotKey: "featured-row1-0", defaultSrc: "/images/Weddings/2L4A9536-Edit.jpg" },
  { slotKey: "featured-row1-1", defaultSrc: "/images/Weddings/IMG_3453.JPG" },
  { slotKey: "featured-row1-2", defaultSrc: "/images/Weddings/IMG_1255-Edit.jpg" },
  { slotKey: "featured-row1-3", defaultSrc: "/images/Weddings/IMG_1627-Edit.jpg" },
  { slotKey: "featured-row1-4", defaultSrc: "/images/Weddings/IMG_3454.JPG" },
  { slotKey: "featured-row1-5", defaultSrc: "/images/Weddings/IMG_3459.JPG" },
  { slotKey: "featured-row1-6", defaultSrc: "/images/Weddings/IMG_3463.JPG" },
];

export const FEATURED_ROW2: ImageSlot[] = [
  { slotKey: "featured-row2-0", defaultSrc: "/images/Graduation/DJAY9788.jpg" },
  { slotKey: "featured-row2-1", defaultSrc: "/images/Graduation/IMG_3419.jpg" },
  { slotKey: "featured-row2-2", defaultSrc: "/images/Graduation/IMG_3416.JPG" },
  { slotKey: "featured-row2-3", defaultSrc: "/images/Graduation/IMG_3422.jpg" },
  { slotKey: "featured-row2-4", defaultSrc: "/images/Graduation/IMG_3420.jpg" },
  { slotKey: "featured-row2-5", defaultSrc: "/images/Graduation/DJAY9736.jpg" },
];

export const FEATURED_ROW3: ImageSlot[] = [
  { slotKey: "featured-row3-0", defaultSrc: "/images/Portraits/IMG_3511.JPG" },
  { slotKey: "featured-row3-1", defaultSrc: "/images/Portraits/IMG_3514.JPG" },
  { slotKey: "featured-row3-2", defaultSrc: "/images/Portraits/IMG_3517.JPG" },
  { slotKey: "featured-row3-3", defaultSrc: "/images/Matric/IMG_3467.JPG" },
  { slotKey: "featured-row3-4", defaultSrc: "/images/Matric/IMG_3472.JPG" },
];

// ── ABOUT PREVIEW (homepage section) ──────────────────────
export const ABOUT_PREVIEW_MAIN: ImageSlot = {
  slotKey: "about-preview-main",
  defaultSrc: "/images/Portraits/IMG_8914-Edit.jpg",
};
export const ABOUT_PREVIEW_FLOAT1: ImageSlot = {
  slotKey: "about-preview-float1",
  defaultSrc: "/images/Portraits/IMG_3516.JPG",
};
export const ABOUT_PREVIEW_FLOAT2: ImageSlot = {
  slotKey: "about-preview-float2",
  defaultSrc: "/images/Portraits/IMG_3515.JPG",
};

// ── ABOUT PAGE ─────────────────────────────────────────────
export const ABOUT_HERO: ImageSlot = {
  slotKey: "about-hero",
  defaultSrc: "/images/Djeha/IMG_3542.jpg",
};
export const ABOUT_PORTRAIT_MAIN: ImageSlot = {
  slotKey: "about-portrait-main",
  defaultSrc: "/images/Djeha/IMG_3541.jpg",
};
export const ABOUT_PORTRAIT_INSET: ImageSlot = {
  slotKey: "about-portrait-inset",
  defaultSrc: "/images/Djeha/IMG_3542.jpg",
};
export const ABOUT_VALUES: ImageSlot[] = [
  { slotKey: "about-value-0", defaultSrc: "/images/Weddings/IMG_3463.JPG" },
  { slotKey: "about-value-1", defaultSrc: "/images/Portraits/IMG_3523.JPG" },
  { slotKey: "about-value-2", defaultSrc: "/images/Graduation/IMG_3422.jpg" },
];

// ── CATEGORIES (thumb images on home grid) ─────────────────
export const CATEGORY_THUMBS: ImageSlot[] = CATEGORIES.map((c) => ({
  slotKey: `${c.key}-thumb`,
  defaultSrc: c.thumb,
}));

// ── CATEGORY HEROES ────────────────────────────────────────
export const CATEGORY_HEROES: ImageSlot[] = CATEGORIES.map((c) => ({
  slotKey: `${c.key}-hero`,
  defaultSrc: c.hero,
}));

// ── CATEGORY GALLERIES ─────────────────────────────────────
export function getCategoryGallerySlots(categoryKey: string, images: string[]): ImageSlot[] {
  return images.map((src, i) => ({
    slotKey: `${categoryKey}-gallery-${i}`,
    defaultSrc: src,
  }));
}

// ── CATEGORY STACK PHOTOS ──────────────────────────────────
export function getCategoryStackSlots(categoryKey: string, images: string[]): ImageSlot[] {
  return images.map((src, i) => ({
    slotKey: `${categoryKey}-stack-${i}`,
    defaultSrc: src,
  }));
}