export interface User {
  id: string;
  email: string;
  role: string;
  fullName?: string;
}

const STORAGE_KEY = "fairm_user";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    // Validate structure
    if (
      typeof parsed.id === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.role === "string"
    ) {
      return parsed as User;
    }

    return null;
  } catch {
    return null;
  }
}

export function storeUser(user: User) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}