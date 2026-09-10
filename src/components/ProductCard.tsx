import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useCart();
  const fav = favorites.includes(product.id);

  return (
    <div className="group relative">
      <Link
        to="/produkt/$id"
        params={{ id: product.id }}
        className="block overflow-hidden bg-sand"
        aria-label={`${product.brand} ${product.model}`}
      >
        <img
          src={product.images[0]}
          alt={`${product.brand} ${product.model}`}
          loading="lazy"
          width={1000}
          height={1000}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </Link>

      <button
        onClick={() => toggleFavorite(product.id)}
        aria-label="Spara favorit"
        className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
      >
        <Heart
          className={`h-4 w-4 ${fav ? "fill-accent text-accent" : "text-foreground"}`}
          strokeWidth={1.4}
        />
      </button>

      {product.tags.includes("limited") && (
        <span className="absolute top-3 left-3 bg-foreground px-2 py-1 text-[10px] tracking-[0.18em] text-background uppercase">
          Limited
        </span>
      )}
      {product.oldPrice && (
        <span className="absolute top-3 left-3 bg-accent px-2 py-1 text-[10px] tracking-[0.18em] text-accent-foreground uppercase">
          Sale
        </span>
      )}

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{product.brand}</p>
          <Link
            to="/produkt/$id"
            params={{ id: product.id }}
            className="mt-1 block font-display text-lg leading-tight hover:text-accent"
          >
            {product.model}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{product.condition}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          {product.oldPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
