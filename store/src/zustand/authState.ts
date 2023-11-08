import { create } from 'zustand';

interface AuthStore {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  signedIn: false,
  signin: (accessToken: string) => set({ signedIn: Boolean(accessToken) }),
  signout: () => set({ signedIn: false }),
}));

export default useAuthStore;
