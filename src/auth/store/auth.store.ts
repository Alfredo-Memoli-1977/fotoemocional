import type { User } from "@/interfaces/user.interface";
import { loginActions } from "../actions/login.actions";
import type { AuthRequest } from "../interfaces/auth.interfaces";
import { create } from "zustand";
import { registerActions } from "../actions/register.actions";
import { checkAuth } from "../actions/check-auth.actions";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";
// type Role = "admin" | "noAdmin";
type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  //Getters
  isAdmin: () => boolean;

  //Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: ({
    name,
    lastname,
    email,
    password,
  }: AuthRequest) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  isAdmin: () => {
    return get().user?.isAdmin || false;
  },

  //Actions
  login: async (email, password) => {
    try {
      const data = await loginActions(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },

  register: async ({ name, lastname, email, password }) => {
    try {
      const data = await registerActions({ name, lastname, email, password });
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const user = await checkAuth();

      set({ user: user, authStatus: "authenticated" });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
    }
    return false;
  },
}));
