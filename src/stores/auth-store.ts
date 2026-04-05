/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import type { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

const MOCK_USER: User = {
  id: "usr_1",
  email: "dr.harper@smiledental.com",
  name: "Dr. Harper",
  role: "admin",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  initialize: () => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("instockUser") : null;
    if (stored) {
      set({ user: JSON.parse(stored), isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  login: async (_email: string, _password: string) => {
    // Supabase: const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    await new Promise((r) => setTimeout(r, 500));
    localStorage.setItem("instockUser", JSON.stringify(MOCK_USER));
    set({ user: MOCK_USER });
  },

  loginWithMagicLink: async (_email: string) => {
    // Supabase: const { error } = await supabase.auth.signInWithOtp({ email })
    await new Promise((r) => setTimeout(r, 500));
    localStorage.setItem("instockUser", JSON.stringify(MOCK_USER));
    set({ user: MOCK_USER });
  },

  logout: () => {
    // Supabase: await supabase.auth.signOut()
    localStorage.removeItem("instockUser");
    set({ user: null });
  },
}));

// Initialize on load
if (typeof window !== "undefined") {
  useAuthStore.getState().initialize();
}
