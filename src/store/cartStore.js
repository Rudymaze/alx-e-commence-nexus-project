import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const existingItem = get().items.find(
          (i) => i.id === item.id && i.size === item.size
        );

        if (existingItem) {
          const updatedItems = get().items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );

          set({
            items: updatedItems,
            totalItems: get().totalItems + item.quantity,
            totalPrice: get().totalPrice + item.price * item.quantity,
          });
        } else {
          set({
            items: [...get().items, item],
            totalItems: get().totalItems + item.quantity,
            totalPrice: get().totalPrice + item.price * item.quantity,
          });
        }
      },

      removeItem: (itemId, size) => {
        const itemToRemove = get().items.find(
          (i) => i.id === itemId && i.size === size
        );

        if (itemToRemove) {
          set({
            items: get().items.filter(
              (i) => !(i.id === itemId && i.size === size)
            ),
            totalItems: get().totalItems - itemToRemove.quantity,
            totalPrice:
              get().totalPrice - itemToRemove.price * itemToRemove.quantity,
          });
        }
      },

      updateQuantity: (itemId, size, quantity) => {
        const item = get().items.find(
          (i) => i.id === itemId && i.size === size
        );

        if (item) {
          const quantityDiff = quantity - item.quantity;
          const updatedItems = get().items.map((i) =>
            i.id === itemId && i.size === size ? { ...i, quantity } : i
          );

          set({
            items: updatedItems,
            totalItems: get().totalItems + quantityDiff,
            totalPrice: get().totalPrice + item.price * quantityDiff,
          });
        }
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
