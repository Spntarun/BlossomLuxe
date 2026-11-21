import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  couponCode: string;
  appliedDiscount: number; // percentage or fixed
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getTotalDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      couponCode: '',
      appliedDiscount: 0,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addItem: (newItem) => {
        const { items } = get();
        const existing = items.find((item) => item.id === newItem.id);
        const qtyToAdd = newItem.quantity || 1;
        if (existing) {
          set({
            items: items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + qtyToAdd }
                : item
            ),
            isCartOpen: true,
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: qtyToAdd }],
            isCartOpen: true,
          });
        }
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      updateQuantity: (id, delta) => {
        const { items } = get();
        set({
          items: items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null),
        });
      },
      clearCart: () => set({ items: [], couponCode: '', appliedDiscount: 0 }),
      applyCoupon: (code: string) => {
        const cleaned = code.trim().toUpperCase();
        if (cleaned === 'BLOSSOM10') {
          set({ couponCode: 'BLOSSOM10', appliedDiscount: 10 });
          return { success: true, message: 'Coupon applied! 10% off your order.' };
        } else if (cleaned === 'LUXE20') {
          set({ couponCode: 'LUXE20', appliedDiscount: 20 });
          return { success: true, message: 'VIP Code applied! 20% off your order.' };
        } else {
          return { success: false, message: 'Invalid coupon code. Try BLOSSOM10' };
        }
      },
      removeCoupon: () => set({ couponCode: '', appliedDiscount: 0 }),
      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
      getTotalDiscount: () => {
        const subtotal = get().getSubtotal();
        const discountRate = get().appliedDiscount;
        return Math.round((subtotal * discountRate) / 100);
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getTotalDiscount();
        // Shipping is free above ₹1999, else ₹99
        const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;
        return Math.max(0, subtotal - discount + shipping);
      },
      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'blossom_luxe_cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

interface WishlistStore {
  items: Product[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      toggleWishlist: (product: Product) => {
        const { items } = get();
        const exists = items.some((item) => item.id === product.id);
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },
      removeFromWishlist: (productId: string) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
    }),
    {
      name: 'blossom_luxe_wishlist',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

