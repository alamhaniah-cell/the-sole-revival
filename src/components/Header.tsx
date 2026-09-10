import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { label: "Shop", to: "/shop", search: {} as Record<string, string> },
  { label: "Sneakers", to: "/shop", search: { kategori: "Sneakers" } },
  { label: "Boots", to: "/shop", search: { kategori: "Boots" } },
  { label: "Vintage", to: "/shop", search: { kategori: "Vintage" } },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" className="font-display text-xl tracking-[0.2em] uppercase md:text-2xl">
          Atelier<span className="text-accent">.</span>Rare
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={item.search}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/skicka-in-skor"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Send Your Shoes
          </Link>
          <Link
            to="/om-oss"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/kontakt"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/varukorg"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Varukorg"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            {count > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary lg:hidden"
            aria-label="Meny"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.4} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 font-display text-lg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/skicka-in-skor"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 font-display text-lg"
            >
              Send Your Shoes
            </Link>
            <Link
              to="/restaurering"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 font-display text-lg"
            >
              Restaurering
            </Link>
            <Link
              to="/om-oss"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 font-display text-lg"
            >
              About
            </Link>
            <Link to="/kontakt" onClick={() => setOpen(false)} className="py-3 font-display text-lg">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
