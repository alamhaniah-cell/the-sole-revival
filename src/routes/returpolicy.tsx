import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returpolicy")({
  head: () => ({
    meta: [
      { title: "Returpolicy | Atelier Rare" },
      { name: "description", content: "14 dagars ångerrätt, så här returnerar du ett par till Atelier Rare." },
      { property: "og:title", content: "Returpolicy | Atelier Rare" },
      { property: "og:description", content: "14 dagars ångerrätt och enkel returprocess." },
    ],
  }),
  component: Returns,
});

function Returns() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">Retur</p>
      <h1 className="mt-3 font-display text-4xl">Returpolicy</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Du har 14 dagars ångerrätt från det att du tagit emot paketet. Skorna ska vara oanvända,
          i samma skick som vid leverans och skickas tillbaka i originalförpackningen.
        </p>
        <div>
          <h2 className="font-display text-xl text-foreground">Så gör du</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>Mejla hej@atelierrare.se med ditt ordernummer.</li>
            <li>Du får en returfraktsedel inom en arbetsdag.</li>
            <li>Packa skorna och lämna in paketet inom 14 dagar.</li>
            <li>Återbetalning sker inom 5 arbetsdagar efter mottagen retur.</li>
          </ol>
        </div>
        <div>
          <h2 className="font-display text-xl text-foreground">Undantag</h2>
          <p className="mt-2">
            Restaureringsuppdrag och specialanpassningar av dina egna skor är personliga tjänster
            och omfattas inte av ångerrätten. Returfrakten kostar 79 kr och dras av vid
            återbetalning.
          </p>
        </div>
      </div>
    </div>
  );
}
