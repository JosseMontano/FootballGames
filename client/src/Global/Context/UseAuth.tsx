// store.ts
import { create } from "zustand";
import { UserAuth } from "../../Interfaces/UserAuth";
import { persist } from "zustand/middleware";

type State = {
  isLogged: boolean;
  login: (user: UserAuth) => void;
  logout: () => void;
  user: UserAuth;
};

export const useAuth = create(
  persist<State>(
    (set) => ({
      isLogged: false,
      user: {} as UserAuth,
      login: (user: UserAuth) => set({ isLogged: true, user }),
      logout: () => set({ isLogged: false, user: {} as UserAuth }),
    }),
    {
      name: "auth-storage",
    }
  )
);
