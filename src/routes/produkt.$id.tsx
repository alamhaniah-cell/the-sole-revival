import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/produkt/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produkten hittades inte | Atelier Rare" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.brand} ${product.model} | Atelier Rare`;
    const description = `${product.condition}. ${product.description}`.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, favorites, toggleFavorite } = useCart();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const similar = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const fav = favorites.includes(product.id);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <nav className="text-xs text-muted-foreground">
        <Link to="/shop" search={{}} className="hover:text-foreground">
          Shop
        </Link>{" "}
        / <span>{product.category}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div
            className="overflow-hidden bg-sand"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setOrigin(
                `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
              );
            }}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.images[active]}
              alt={`${product.brand} ${product.model}`}
              width={1000}
              height={1000}
              style={{ transformOrigin: origin }}
              className={`aspect-square w-full object-cover transition-transform duration-500 ${
                zoom ? "scale-[1.8]" : "scale-100"
              }`}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Hovra över bilden för att zooma</p>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-20 w-20 overflow-hidden border ${
                  i === active ? "border-foreground" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Vy ${i + 1}`}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">{product.model}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-2xl">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
            )}
          </div>

          <div className="mt-6 border border-border bg-secondary/40 p-4">
            <p className="text-sm font-medium">{product.condition}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {product.conditionNotes}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="eyebrow">Storlek (EU)</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-11 w-14 border text-sm transition-colors ${
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            {product.stock > 0
              ? `I lager · ${product.stock} ${product.stock === 1 ? "par" : "par"} kvar`
              : "Slutsåld"}
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                if (!size) return toast.error("Välj storlek först");
                add(product.id, size);
                toast.success(`${product.model} (EU ${size}) lades i varukorgen`);
              }}
              disabled={product.stock === 0}
              className="h-13 flex-1 bg-foreground py-4 text-sm tracking-wide text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Lägg i varukorg
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              aria-label="Spara favorit"
              className="inline-flex h-13 w-14 items-center justify-center border border-border transition-colors hover:border-foreground"
            >
              <Heart
                className={`h-5 w-5 ${fav ? "fill-accent text-accent" : ""}`}
                strokeWidth={1.4}
              />
            </button>
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed">
            <p>{product.description}</p>
            <div>
              <h2 className="eyebrow">Utförd restaurering</h2>
              <p className="mt-2 text-muted-foreground">{product.restoration}</p>
            </div>
          </div>

          <ul className="mt-8 space-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.4} /> Äkthetskontrollerad i vår
              verkstad
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4" strokeWidth={1.4} /> Fri spårbar frakt över 2 000 kr
            </li>
            <li className="flex items-center gap-2">
              <Undo2 className="h-4 w-4" strokeWidth={1.4} /> 14 dagars ångerrätt
            </li>
          </ul>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-24">
          <h2 className="border-b border-border pb-6 font-display text-3xl">Liknande par</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
