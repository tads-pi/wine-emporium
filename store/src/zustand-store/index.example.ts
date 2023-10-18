import { create } from "zustand";
import { api } from "../lib/axios";
import { IUserLoginProps } from "./interface";


export interface AuthState {
  // user: IUserLoginProps | null;
  isLoading: boolean;

  login: (user: IUserLoginProps) => Promise<void>;
}

export const useStore = create<AuthState>((set, get) => {
  return {
    user: null,
    isLoading: false,

    login: async (user: IUserLoginProps) => {
      set({ isLoading: true })
      
      try {
        const response = await api.post('/v1/store/auth', user)
        set({
          // user: response.data,
          isLoading: false,
        })
        return response.data
      } catch (err) {
          set({
         // user: response.data,
         isLoading: false,
       })
      }
    },
  }
})
