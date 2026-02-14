const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenStorage = {
  get: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  set: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  setRefresh: (token: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
