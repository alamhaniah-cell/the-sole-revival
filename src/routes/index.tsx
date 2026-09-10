import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import restorationImg from "@/assets/restoration.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Rare — Rare shoes. Restored. Reimagined." },
      {
        name: "description",
        content:
          "Handplockade, svåråtkomliga märkesskor i mycket bra skick. Shoppa exklusiva sneakers, boots och vintage – eller skicka in dina egna skor för restaurering.",
      },
      { property: "og:title", content: "Atelier Rare — Rare shoes. Restored. Reimagined." },
      {
        property: "og:description",
        content: "Exklusiva skor, dokumenterat skick och professionell restaurering i Stockholm.",
      },
    ],
  }),
  component: Index,
});

const reviews = [
  {
    name: "Alex",
    stars: 5,
    text: "The condition was even better than expected. Amazing service.",
    meta: "Adidas Samba OG",
  },
  {
    name: "Nour",
    stars: 5,
    text: "Skickade in mina slitna vintage-löpare och fick tillbaka dem som nya. Bedömningen var ärlig och priset kändes rätt.",
    meta: "Restaurering",
  },
  {
    name: "Vilma",
    stars: 5,
    text: "Snabb frakt, otroligt fin förpackning och skorna såg exakt ut som på bilderna. Köper igen.",
    meta: "Prada Pump 90",
  },
  {
    name: "Theo",
    stars: 4,
    text: "Lät dem sälja mina Jordans vidare. Fick betalt inom en vecka, noll krångel.",
    meta: "Sälj vidare",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${n} av 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.2} />
      ))}
    </div>
  );
}

function Section({
  eyebrow,
  title,
  link,
  children,
}: {
  eyebrow: string;
  title: string;
  link?: { to: string; search?: Record<string, string>; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">{title}</h2>
        </div>
        {link && (
          <Link
            to={link.to}
            search={link.search ?? {}}
            className="group hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
          >
            {link.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Index() {
  const featured = products.filter((p) => p.tags.includes("featured")).slice(0, 4);
  const newest = [...products]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 4);
  const trending = products.filter((p) => p.tags.includes("trending")).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-10 pb-16 md:px-8 md:pt-16 lg:grid-cols-2 lg:gap-16">
          <div className="fade-up">
            <p className="eyebrow">Est. 2018 · Stockholm</p>
            <h1 className="display-xl mt-5">
              Rare shoes.
              <br />
              Restored.
              <br />
              <span className="text-accent italic">Reimagined.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Vi jagar rätt på par som knappt går att hitta, återställer dem för hand och beskriver
              varje repa ärligt. Har du egna skor som förtjänar ett andra liv? Skicka in dem – behåll
              dem eller låt oss sälja dem vidare.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                search={{}}
                className="inline-flex h-12 items-center justify-center bg-foreground px-7 text-sm tracking-wide text-background transition-opacity hover:opacity-90"
              >
                Shoppa skor
              </Link>
              <Link
                to="/skicka-in-skor"
                className="inline-flex h-12 items-center justify-center border border-foreground px-7 text-sm tracking-wide transition-colors hover:bg-foreground hover:text-background"
              >
                Skicka in dina skor
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.4} /> Äkthetskontroll på varje par
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4" strokeWidth={1.4} /> Fri frakt över 2 000 kr
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src={hero}
              alt="Exklusiva vintage-sneakers i studioljus"
              width={1600}
              height={1104}
              className="w-full object-cover"
            />
            <div className="absolute -bottom-5 left-5 hidden bg-background px-5 py-4 shadow-lg md:block">
              <p className="eyebrow">Denna vecka</p>
              <p className="mt-1 font-display text-lg">18 nya par i arkivet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kategorier */}
      <div className="border-y border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-5 py-5 text-xs tracking-[0.18em] uppercase md:px-8">
          {["Sneakers", "Boots", "Loafers", "Heels", "Vintage", "Limited Edition", "New Arrivals", "Sale"].map(
            (c) => (
              <Link
                key={c}
                to="/shop"
                search={{ kategori: c }}
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                {c}
              </Link>
            ),
          )}
        </div>
      </div>

      <Section
        eyebrow="Featured"
        title="Utvalda par"
        link={{ to: "/shop", label: "Se hela arkivet" }}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="New arrivals"
        title="Nyss inkommet"
        link={{ to: "/shop", search: { sort: "nyast" }, label: "Alla nyheter" }}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Trending"
        title="Mest bevakade"
        link={{ to: "/shop", label: "Shoppa allt" }}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Restaurering */}
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-2">
          <img
            src={restorationImg}
            alt="Hantverkare som restaurerar en sneaker på verkstadsbänk"
            loading="lazy"
            width={1408}
            height={1008}
            className="w-full object-cover"
          />
          <div>
            <p className="text-[11px] tracking-[0.22em] text-background/60 uppercase">
              The Atelier
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Vi ger dina skor ett andra liv
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-background/70">
              Rengöring, sulbyte, färgkorrigering och full restaurering av vintage-par. Du får alltid
              en kostnadsfri bedömning och ett fast pris innan vi rör en enda borste.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-background/80">
              {[
                "Rengöring",
                "Restaurering",
                "Reparation",
                "Sulbyte",
                "Färgkorrigering",
                "Materialvård",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.6} />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/skicka-in-skor"
                className="inline-flex h-12 items-center bg-accent px-7 text-sm text-accent-foreground transition-opacity hover:opacity-90"
              >
                Skicka in dina skor
              </Link>
              <Link
                to="/restaurering"
                className="inline-flex h-12 items-center border border-background/40 px-7 text-sm transition-colors hover:bg-background hover:text-foreground"
              >
                Se tjänster & priser
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <figure>
                <img
                  src={beforeImg}
                  alt="Sliten vit sneaker före restaurering"
                  loading="lazy"
                  width={900}
                  height={900}
                  className="w-full object-cover"
                />
                <figcaption className="mt-2 text-[11px] tracking-[0.2em] text-background/50 uppercase">
                  Before
                </figcaption>
              </figure>
              <figure>
                <img
                  src={afterImg}
                  alt="Samma sneaker efter restaurering"
                  loading="lazy"
                  width={900}
                  height={900}
                  className="w-full object-cover"
                />
                <figcaption className="mt-2 text-[11px] tracking-[0.2em] text-background/50 uppercase">
                  After
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Recensioner */}
      <Section eyebrow="Reviews" title="Vad kunderna säger">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure key={r.name} className="border border-border bg-card p-6 hover-lift">
              <Stars n={r.stars} />
              <blockquote className="mt-4 text-sm leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-5 text-xs text-muted-foreground">
                – {r.name} · {r.meta}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Om oss */}
      <section className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
        <div className="grid gap-10 border-y border-border py-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Om oss</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Ett arkiv, inte en webshop</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              Atelier Rare startade i en källarlokal på Södermalm med ett par borstar, en
              symaskin och en besatthet av skor som inte går att hitta. Idag är vi sex personer –
              tre i verkstaden, tre som letar par över hela Europa.
            </p>
            <p className="leading-relaxed">
              Varje par vi säljer har passerat verkstaden, blivit fotograferat i dagsljus och fått
              en ärlig skickbedömning. Ingen retusch, inga överraskningar.
            </p>
            <Link
              to="/om-oss"
              className="group inline-flex items-center gap-2 text-sm text-foreground"
            >
              Läs hela historien
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 bg-secondary/50 p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Hör av dig</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Frågor om ett specifikt par, en storlek eller ett restaureringsuppdrag? Vi svarar
              oftast samma dag.
            </p>
          </div>
          <div className="space-y-3 text-sm md:text-right">
            <p>hej@atelierrare.se</p>
            <p>08-123 45 67</p>
            <p className="text-muted-foreground">Hornsgatan 42, 118 21 Stockholm</p>
            <p className="text-muted-foreground">Mån–fre 10–18 · Lör 11–16</p>
            <Link
              to="/kontakt"
              className="mt-4 inline-flex h-11 items-center bg-foreground px-6 text-sm text-background transition-opacity hover:opacity-90"
            >
              Till kontaktsidan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
