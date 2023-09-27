import { create } from "zustand";

export interface CartState {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (indexItem) =>
    set((state) => {

      state.items.splice(indexItem, 1)
      console.log('indice removido', indexItem)

      return { items: state.items }
    }),
}));
