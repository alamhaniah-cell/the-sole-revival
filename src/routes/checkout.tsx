import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Atelier Rare" },
      { name: "description", content: "Slutför ditt köp tryggt hos Atelier Rare." },
      { property: "og:title", content: "Checkout | Atelier Rare" },
      { property: "og:description", content: "Trygg och enkel kassa hos Atelier Rare." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const field =
  "h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-foreground";

function Checkout() {
  const { detailed, subtotal, shipping, total, clear } = useCart();
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState("kort");

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <p className="eyebrow">Tack!</p>
        <h1 className="mt-3 font-display text-4xl">Din order är bekräftad</h1>
        <p className="mt-4 text-muted-foreground">
          Vi har mejlat en orderbekräftelse. Paketet packas i vår verkstad och skickas inom 1–2
          arbetsdagar med spårbar frakt.
        </p>
        <Link
          to="/shop"
          search={{}}
          className="mt-8 inline-flex h-12 items-center bg-foreground px-7 text-sm text-background"
        >
          Fortsätt handla
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Slutför köp</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (detailed.length === 0) return toast.error("Din varukorg är tom");
            clear();
            setDone(true);
          }}
          className="space-y-8"
        >
          <fieldset className="space-y-4">
            <legend className="eyebrow mb-3">Kontakt</legend>
            <input required placeholder="E-post" type="email" className={field} />
            <input required placeholder="Telefonnummer" className={field} />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="eyebrow mb-3">Leverans</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Förnamn" className={field} />
              <input required placeholder="Efternamn" className={field} />
            </div>
            <input required placeholder="Adress" className={field} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Postnummer" className={field} />
              <input required placeholder="Ort" className={field} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-3">Betalning</legend>
            <div className="space-y-2">
              {[
                { id: "kort", label: "Kort — Visa, Mastercard, Amex" },
                { id: "swish", label: "Swish" },
                { id: "faktura", label: "Faktura 30 dagar" },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-3 border p-4 text-sm transition-colors ${
                    method === m.id ? "border-foreground" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="accent-[var(--accent)]"
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="inline-flex h-13 w-full items-center justify-center gap-2 bg-foreground py-4 text-sm tracking-wide text-background transition-opacity hover:opacity-90"
          >
            <Lock className="h-4 w-4" strokeWidth={1.5} />
            Betala {formatPrice(total)}
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            Krypterad betalning. Detta är en demobutik – ingen riktig betalning genomförs.
          </p>
        </form>

        <aside className="h-fit border border-border bg-secondary/40 p-6">
          <h2 className="font-display text-xl">Din order</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {detailed.map(({ line, product }) => (
              <li key={`${line.id}-${line.size}`} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {product.brand} {product.model} · EU {line.size} × {line.qty}
                </span>
                <span>{formatPrice(product.price * line.qty)}</span>
              </li>
            ))}
            {detailed.length === 0 && <li className="text-muted-foreground">Varukorgen är tom.</li>}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
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
        </aside>
      </div>
    </div>
  );
}
