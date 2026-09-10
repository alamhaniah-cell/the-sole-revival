import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartLine = { id: string; size: number; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (id: string, size: number, qty?: number) => void;
  remove: (id: string, size: number) => void;
  setQty: (id: string, size: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  detailed: { line: CartLine; product: Product }[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "atelier-cart";
const FAV_KEY = "atelier-favs";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
      const f = localStorage.getItem(FAV_KEY);
      if (f) setFavorites(JSON.parse(f));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<CartCtx>(() => {
    const detailed = lines
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { line, product } : null;
      })
      .filter(Boolean) as { line: CartLine; product: Product }[];

    const subtotal = detailed.reduce((sum, d) => sum + d.product.price * d.line.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 79;

    return {
      lines,
      detailed,
      subtotal,
      shipping,
      total: subtotal + shipping,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add: (id, size, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id && l.size === size);
          return found
            ? prev.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { id, size, qty }];
        }),
      remove: (id, size) =>
        setLines((prev) => prev.filter((l) => !(l.id === id && l.size === size))),
      setQty: (id, size, qty) =>
        setLines((prev) =>
          prev
            .map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.max(1, qty) } : l))
            .filter((l) => l.qty > 0),
        ),
      clear: () => setLines([]),
      favorites,
      toggleFavorite: (id) =>
        setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
    };
  }, [lines, favorites]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
