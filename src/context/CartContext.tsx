import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; qty: number; addOns?: string[] };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  add: (p: Product, qty?: number, addOns?: string[]) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("rb_cart");
      const w = localStorage.getItem("rb_wish");
      if (c) setItems(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("rb_cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("rb_wish", JSON.stringify(wishlist)); }, [wishlist]);

  const value = useMemo<CartState>(() => ({
    items,
    wishlist,
    add: (p, qty = 1, addOns) =>
      setItems((prev) => {
        const ex = prev.find((i) => i.product.id === p.id);
        if (ex) return prev.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
        return [...prev, { product: p, qty, addOns }];
      }),
    remove: (id) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
    setQty: (id, qty) => setItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    clear: () => setItems([]),
    toggleWish: (id) => setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]),
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.product.price, 0),
  }), [items, wishlist]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
