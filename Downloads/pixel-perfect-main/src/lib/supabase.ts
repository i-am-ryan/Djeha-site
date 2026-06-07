import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zakkloovhdciziwhuohh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpha2tsb292aGRjaXppd2h1b2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTA5MDAsImV4cCI6MjA5NjE2NjkwMH0.5br77pPEy2E7c1_7cfHbHKvsettoaWE8645G1tV8_5E";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload a file to storage and return its public URL
export async function uploadImage(file: File, slotKey: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${slotKey}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("gallery").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("gallery").getPublicUrl(path);
  return data.publicUrl;
}

// Save a slot override to the database
export async function saveSlot(slotKey: string, url: string): Promise<void> {
  const { error } = await supabase
    .from("gallery_images")
    .upsert(
      { category: slotKey, slot: 0, url, updated_at: new Date().toISOString() },
      { onConflict: "category,slot" }
    );
  if (error) throw error;
}

// Load all slot overrides from the database — returns a map of slotKey -> url
export async function loadAllSlots(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("category, slot, url");
  if (error || !data) return {};
  const map: Record<string, string> = {};
  data.forEach((row) => {
    // For gallery arrays, key is like "weddings-gallery-0" stored as category="weddings-gallery-0", slot=0
    // For single images, key is stored as category=slotKey, slot=0
    map[row.category] = row.url;
  });
  return map;
}