import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  BRANDS,
  CATEGORIES,
  COLORS,
  CONDITIONS,
  SIZES,
  formatPrice,
  products,
  type Condition,
} from "@/lib/products";

type Search = { kategori?: string; sort?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    kategori: typeof search.kategori === "string" ? search.kategori : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — Exklusiva och svåråtkomliga skor | Atelier Rare" },
      {
        name: "description",
        content:
          "Bläddra i arkivet: sneakers, boots, loafers, heels, vintage och limited edition. Filtrera på märke, storlek, pris, skick och färg.",
      },
      { property: "og:title", content: "Shop — Atelier Rare" },
      {
        property: "og:description",
        content: "Handplockade par i dokumenterat skick. Filtrera på märke, storlek, pris och färg.",
      },
    ],
  }),
  component: Shop,
});

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Shop() {
  const { kategori, sort: sortParam } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [brand, setBrand] = useState<string[]>([]);
  const [size, setSize] = useState<number[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [condition, setCondition] = useState<Condition[]>([]);
  const [maxPrice, setMaxPrice] = useState(6000);
  const sort = sortParam ?? "nyast";

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((a) => a !== v) : [...arr, v]);

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (kategori) {
        if (kategori === "New Arrivals" && !p.tags.includes("new")) return false;
        if (kategori === "Sale" && !p.oldPrice) return false;
        if (
          kategori !== "New Arrivals" &&
          kategori !== "Sale" &&
          p.category !== kategori &&
          !(kategori === "Limited Edition" && p.tags.includes("limited"))
        )
          return false;
      }
      if (brand.length && !brand.includes(p.brand)) return false;
      if (size.length && !p.sizes.some((s) => size.includes(s))) return false;
      if (color.length && !color.includes(p.color)) return false;
      if (condition.length && !condition.includes(p.condition)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      if (sort === "lagt") return a.price - b.price;
      if (sort === "hogt") return b.price - a.price;
      return b.addedAt.localeCompare(a.addedAt);
    });
    return out;
  }, [kategori, brand, size, color, condition, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <p className="eyebrow">Arkivet</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">{kategori ?? "Alla skor"}</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        <Chip active={!kategori} onClick={() => navigate({ search: { sort: sortParam } })}>
          Alla
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            active={kategori === c}
            onClick={() => navigate({ search: { kategori: c, sort: sortParam } })}
          >
            {c}
          </Chip>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div>
            <h2 className="eyebrow">Sortering</h2>
            <select
              value={sort}
              onChange={(e) => navigate({ search: { kategori, sort: e.target.value } })}
              className="mt-3 h-10 w-full border border-border bg-background px-3 text-sm"
            >
              <option value="nyast">Nyast</option>
              <option value="lagt">Pris: lågt till högt</option>
              <option value="hogt">Pris: högt till lågt</option>
            </select>
          </div>

          <div>
            <h2 className="eyebrow">Märke</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <Chip key={b} active={brand.includes(b)} onClick={() => toggle(brand, b, setBrand)}>
                  {b}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow">Storlek (EU)</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <Chip key={s} active={size.includes(s)} onClick={() => toggle(size, s, setSize)}>
                  {s}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow">Färg</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <Chip key={c} active={color.includes(c)} onClick={() => toggle(color, c, setColor)}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow">Skick</h2>
            <div className="mt-3 flex flex-col items-start gap-2">
              {CONDITIONS.map((c) => (
                <Chip
                  key={c}
                  active={condition.includes(c)}
                  onClick={() => toggle(condition, c, setCondition)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow">Maxpris</h2>
            <input
              type="range"
              min={1000}
              max={6000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-4 w-full accent-[var(--accent)]"
            />
            <p className="mt-2 text-sm text-muted-foreground">Upp till {formatPrice(maxPrice)}</p>
          </div>
        </aside>

        <div>
          <p className="mb-6 text-sm text-muted-foreground">{list.length} par</p>
          {list.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              Inga par matchar filtren just nu. Justera filtren eller hör av dig så bevakar vi åt dig.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
