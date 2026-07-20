import type User from "@/models/User";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { loginUser, logoutUser } from "@/services/authService";
const LOCAL_KEY = "app_state"

type AuthState = {
  accessToken: string |null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;

  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => Promise<void>;
  checkLogin: () => boolean;

  changeLocalLoginData:(
    accessToken:string,
    user:User,
    authStatus:boolean
  )=>void

  
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      changeLocalLoginData: (accessToken, user, authStatus) => {
        set({
          accessToken,
          user,
          authStatus,
        });
      },

      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const response = await loginUser(loginData);

          set({
            accessToken: response.accessToken,
            user: response.user,
            authStatus: true,
            authLoading: false,
          });

          return response;
        } catch (error) {
          set({ authLoading: false });
          throw error;
        }
      },

      logout: async (silent = false) => {
        set({ authLoading: true });

        try {
          if (!silent) {
            await logoutUser();
          }
        } catch (error) {
          console.error(error);
        } finally {
          set({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
        }
      },

      checkLogin: () => {
        return !!(get().accessToken && get().authStatus);
      },
    }),
    {
      name: LOCAL_KEY,
    }
  )
);

export default useAuth;