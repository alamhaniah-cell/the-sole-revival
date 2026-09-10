import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <div className="font-display text-xl tracking-[0.2em] uppercase">
            Atelier<span className="text-accent">.</span>Rare
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Svåråtkomliga skor i mycket bra skick – utvalda, restaurerade och dokumenterade i
            Stockholm sedan 2018.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-background"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.4} />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-background"
            >
              <Music2 className="h-4 w-4" strokeWidth={1.4} />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-background"
            >
              <Youtube className="h-4 w-4" strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/shop" search={{}} className="hover:text-foreground">
                Alla skor
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                search={{ kategori: "New Arrivals" }}
                className="hover:text-foreground"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                search={{ kategori: "Limited Edition" }}
                className="hover:text-foreground"
              >
                Limited Edition
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ kategori: "Sale" }} className="hover:text-foreground">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Tjänster</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/skicka-in-skor" className="hover:text-foreground">
                Skicka in skor
              </Link>
            </li>
            <li>
              <Link to="/restaurering" className="hover:text-foreground">
                Restaurering
              </Link>
            </li>
            <li>
              <Link to="/om-oss" className="hover:text-foreground">
                Om oss
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Kundservice</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/kontakt" className="hover:text-foreground">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/kopvillkor" className="hover:text-foreground">
                Köpvillkor
              </Link>
            </li>
            <li>
              <Link to="/integritetspolicy" className="hover:text-foreground">
                Integritetspolicy
              </Link>
            </li>
            <li>
              <Link to="/returpolicy" className="hover:text-foreground">
                Returpolicy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground md:px-8">
        © {new Date().getFullYear()} Atelier Rare AB · Hornsgatan 42, Stockholm · Fri frakt över
        2 000 kr
      </div>
    </footer>
  );
}
