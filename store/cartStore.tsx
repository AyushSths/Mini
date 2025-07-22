import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  brand: string;
  thumbnail: string;
  quantity: number;
};

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? {
                      ...p,
                      quantity: (p.quantity || 1) + (product.quantity || 1),
                    }
                  : p
              ),
            };
          }

          return { cart: [...state.cart, { ...product }] };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart", // key in localStorage
    }
  )
);
