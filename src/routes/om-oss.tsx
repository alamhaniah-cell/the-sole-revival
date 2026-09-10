import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/p7.jpg";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss — arkivet bakom Atelier Rare" },
      {
        name: "description",
        content:
          "Atelier Rare letar upp svåråtkomliga skor, restaurerar dem för hand och beskriver skicket ärligt. Läs om verkstaden i Stockholm.",
      },
      { property: "og:title", content: "Om oss | Atelier Rare" },
      { property: "og:description", content: "Sex personer, en verkstad och en besatthet av rare par." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">Om oss</p>
      <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
        Vi samlar på par som inte borde finnas kvar
      </h1>

      <img
        src={hero}
        alt="Sneakers på gatan i kvällsljus"
        loading="lazy"
        width={1000}
        height={1000}
        className="mt-10 aspect-[16/9] w-full object-cover"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Det började 2018 i en källare på Södermalm. Två vänner, en låda loppisfynd och en idé:
            skor som redan finns är alltid bättre än skor som ska tillverkas.
          </p>
          <p>
            Idag är vi sex personer. Tre i verkstaden med borstar, symaskin och pigment. Tre som
            letar par på auktioner, i garderober och hos samlare runt om i Europa.
          </p>
        </div>
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Vi fotograferar allt i dagsljus, utan retusch. Har en sko en repa så syns den på bilden
            och står i beskrivningen. Förtroende är hela affärsmodellen.
          </p>
          <p>
            Sedan starten har vi restaurerat över 4 000 par och gett ungefär 1 200 av dem en helt ny
            ägare.
          </p>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-8 border-y border-border py-10 md:grid-cols-4">
        {[
          ["4 000+", "Restaurerade par"],
          ["1 200+", "Sålda vidare"],
          ["6", "Personer i teamet"],
          ["2018", "Grundat i Stockholm"],
        ].map(([n, l]) => (
          <div key={l}>
            <dt className="font-display text-3xl">{n}</dt>
            <dd className="eyebrow mt-2">{l}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/shop"
          search={{}}
          className="inline-flex h-12 items-center bg-foreground px-7 text-sm text-background"
        >
          Utforska arkivet
        </Link>
        <Link
          to="/kontakt"
          className="inline-flex h-12 items-center border border-foreground px-7 text-sm transition-colors hover:bg-foreground hover:text-background"
        >
          Kontakta oss
        </Link>
      </div>
    </div>
  );
}
