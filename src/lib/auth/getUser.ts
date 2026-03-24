// lib/auth/getUser.ts
export interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
}

const STORAGE_KEY = "fairm_user";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    if (
      typeof parsed.id === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.role === "string"
    ) {
      // Resolve fullName from every common shape — Supabase, snake_case, camelCase, nested metadata
      const fullName =
        parsed.fullName ||
        parsed.full_name ||
        parsed.name ||
        parsed.displayName ||
        parsed.display_name ||
        parsed?.user_metadata?.full_name ||
        parsed?.user_metadata?.name ||
        [parsed.first_name, parsed.last_name].filter(Boolean).join(" ").trim() ||
        [parsed.firstName, parsed.lastName].filter(Boolean).join(" ").trim() ||
        "User";

      return {
        id: parsed.id,
        email: parsed.email,
        role: parsed.role,
        fullName,
        ...(parsed.avatarUrl || parsed.avatar_url
          ? { avatarUrl: parsed.avatarUrl || parsed.avatar_url }
          : {}),
      } as User;
    }

    return null;
  } catch {
    return null;
  }
}

export function storeUser(
  user: Partial<User> & { id: string; email: string; role: string }
) {
  if (typeof window === "undefined") return;

  const fullName =
    user.fullName ||
    (user as any).full_name ||
    (user as any).name ||
    (user as any).displayName ||
    [(user as any).first_name, (user as any).last_name]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    "User";

  const dataToStore = {
    ...user,
    fullName,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}