import { createFileRoute, Link } from "@tanstack/react-router";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import detail from "@/assets/p8.jpg";

export const Route = createFileRoute("/restaurering")({
  head: () => ({
    meta: [
      { title: "Restaurering — rengöring, sulbyte och färgkorrigering | Atelier Rare" },
      {
        name: "description",
        content:
          "Vi rengör, reparerar, sulbyter och återställer vintage-skor för hand. Se tjänster, priser och före/efter-resultat.",
      },
      { property: "og:title", content: "Restaurering | Atelier Rare" },
      {
        property: "og:description",
        content: "Rengöring, sulbyte, färgkorrigering och materialvård utfört för hand i Stockholm.",
      },
    ],
  }),
  component: Restoration,
});

const services = [
  { title: "Rengöring", price: "Från 349 kr", text: "Djuprengöring av läder, mocka, mesh och textil. Sulor blekta och kanter uppfriskade." },
  { title: "Restaurering", price: "Från 1 490 kr", text: "Full genomgång där skon återställs så nära originalskick som materialet tillåter." },
  { title: "Reparation", price: "Från 590 kr", text: "Sömmar, hålslitage, lossnade delar och trasiga öljetter lagas för hand." },
  { title: "Sulbyte", price: "Från 1 190 kr", text: "Ny gummi- eller lädersula, mellansula förstärks och limmas om." },
  { title: "Färgkorrigering", price: "Från 690 kr", text: "Blekta partier och missfärgningar färgas om med pigment matchade mot originalet." },
  { title: "Materialvård", price: "Från 249 kr", text: "Näring, impregnering och skydd för läder, mocka och exotiska material." },
  { title: "Vintage-återställning", price: "Offert", text: "Smulande mellansulor, torrsprucket läder och arkivpar från 70- och 80-talet." },
];

function Restoration() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">The workshop</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
        Hantverk, inte snabbfix
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
        Varje par går igenom samma process som skorna vi säljer: bedömning, dokumentation, arbete och
        slutkontroll. Du får alltid ett fast pris innan vi börjar.
      </p>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="border border-border p-6 hover-lift">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-xl">{s.title}</h2>
              <span className="text-xs text-accent">{s.price}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="border-b border-border pb-6 font-display text-3xl">Före & efter</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <figure>
            <img src={beforeImg} alt="Sliten sneaker före" loading="lazy" width={900} height={900} className="w-full object-cover" />
            <figcaption className="eyebrow mt-3">Before · Leather low</figcaption>
          </figure>
          <figure>
            <img src={afterImg} alt="Samma sneaker efter restaurering" loading="lazy" width={900} height={900} className="w-full object-cover" />
            <figcaption className="eyebrow mt-3">After · 6 timmars arbete</figcaption>
          </figure>
          <figure>
            <img src={detail} alt="Detaljbild på lädersöm" loading="lazy" width={1000} height={1000} className="w-full object-cover" />
            <figcaption className="eyebrow mt-3">Detalj · Omsydd söm</figcaption>
          </figure>
        </div>
      </section>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 bg-foreground p-10 text-background">
        <p className="max-w-md font-display text-2xl">
          Har du ett par som förtjänar verkstaden?
        </p>
        <Link
          to="/skicka-in-skor"
          className="inline-flex h-12 items-center bg-accent px-7 text-sm text-accent-foreground"
        >
          Skicka in dina skor
        </Link>
      </div>
    </div>
  );
}
