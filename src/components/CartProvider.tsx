'use client';

/* Kiến trúc sẵn cho giỏ hàng — hiện chưa làm gì.
   Bọc ngoài cùng ở layout. Khi bật COMMERCE_ENABLED sẽ giữ state giỏ hàng ở đây. */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { COMMERCE_ENABLED, PRODUCTS } from '@/data/products';

type CartItem = { id: string; qty: number };

type CartValue = {
  enabled: boolean;
  items: CartItem[];
  add: (id: string, qty?: number) => boolean;
  count: () => number;
  total: () => number;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartValue>(() => ({
    enabled: COMMERCE_ENABLED,
    items,
    add(id, qty = 1) {
      if (!COMMERCE_ENABLED) return false;
      setItems((prev) => {
        const line = prev.find((i) => i.id === id);
        if (line) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { id, qty }];
      });
      return true;
    },
    count: () => items.reduce((s, i) => s + i.qty, 0),
    total: () => items.reduce((s, i) => s + (PRODUCTS.find((p) => p.id === i.id)?.price || 0) * i.qty, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
