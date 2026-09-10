import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/varukorg")({
  head: () => ({
    meta: [
      { title: "Varukorg | Atelier Rare" },
      { name: "description", content: "Se dina valda par, ändra antal och gå vidare till checkout." },
      { property: "og:title", content: "Varukorg | Atelier Rare" },
      { property: "og:description", content: "Dina valda par hos Atelier Rare." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, shipping, total } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <p className="eyebrow">Varukorg</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Din väska</h1>

      {detailed.length === 0 ? (
        <div className="mt-12 border border-border p-12 text-center">
          <p className="text-muted-foreground">Din varukorg är tom.</p>
          <Link
            to="/shop"
            search={{}}
            className="mt-6 inline-flex h-12 items-center bg-foreground px-7 text-sm text-background"
          >
            Utforska arkivet
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-border border-y border-border">
            {detailed.map(({ line, product }) => (
              <li key={`${line.id}-${line.size}`} className="flex gap-5 py-6">
                <Link to="/produkt/$id" params={{ id: product.id }} className="shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.model}
                    loading="lazy"
                    width={1000}
                    height={1000}
                    className="h-28 w-28 bg-sand object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="eyebrow">{product.brand}</p>
                    <Link
                      to="/produkt/$id"
                      params={{ id: product.id }}
                      className="font-display text-lg hover:text-accent"
                    >
                      {product.model}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      EU {line.size} · {product.condition}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQty(line.id, line.size, line.qty - 1)}
                        aria-label="Minska"
                        className="p-2 hover:bg-secondary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.id, line.size, line.qty + 1)}
                        aria-label="Öka"
                        className="p-2 hover:bg-secondary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(line.id, line.size)}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Ta bort
                    </button>
                  </div>
                </div>
                <p className="text-sm">{formatPrice(product.price * line.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-xl">Sammanfattning</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delsumma</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Frakt</dt>
                <dd>{shipping === 0 ? "Fri" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Totalt</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              className="mt-6 inline-flex h-12 w-full items-center justify-center bg-foreground text-sm text-background transition-opacity hover:opacity-90"
            >
              Gå till checkout
            </Link>
            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              Fri frakt över 2 000 kr. 14 dagars ångerrätt. Alla par kontrolleras innan de packas.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
