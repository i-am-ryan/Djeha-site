import { createContext, useContext, useEffect, useState } from "react";
import { loadAllSlots } from "@/lib/supabase";

// Global slot overrides context — loaded once on app start
type SlotsMap = Record<string, string>;

let globalSlots: SlotsMap = {};
let loaded = false;
const listeners = new Set<() => void>();

export async function initSlots() {
  if (loaded) return;
  globalSlots = await loadAllSlots();
  loaded = true;
  listeners.forEach((fn) => fn());
}

export function getSlot(slotKey: string, defaultSrc: string): string {
  return globalSlots[slotKey] ?? defaultSrc;
}

export function setSlotOverride(slotKey: string, url: string) {
  globalSlots = { ...globalSlots, [slotKey]: url };
  listeners.forEach((fn) => fn());
}

// React hook — subscribes to slot changes
export function useSlots(): SlotsMap {
  const [slots, setSlots] = useState<SlotsMap>(globalSlots);
  useEffect(() => {
    const update = () => setSlots({ ...globalSlots });
    listeners.add(update);
    if (!loaded) initSlots().then(update);
    else setSlots({ ...globalSlots });
    return () => { listeners.delete(update); };
  }, []);
  return slots;
}