type Branding = {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const STORAGE_PREFIX = "elimu_branding_";

export async function fetchBranding(schoolId: string): Promise<Branding | null> {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + schoolId);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("fetchBranding error", e);
    return null;
  }
}

export async function saveBranding(schoolId: string, branding: Branding): Promise<Branding> {
  if (typeof window === "undefined") return branding;
  try {
    localStorage.setItem(STORAGE_PREFIX + schoolId, JSON.stringify(branding));
    return branding;
  } catch (e) {
    console.error("saveBranding error", e);
    return branding;
  }
}

export async function clearBranding(schoolId: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_PREFIX + schoolId);
  } catch (e) {
    console.error("clearBranding error", e);
  }
}

export type { Branding };
