import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/kopvillkor")({
  head: () => ({
    meta: [
      { title: "Köpvillkor | Atelier Rare" },
      { name: "description", content: "Villkor för beställning, betalning, leverans och garantier hos Atelier Rare." },
      { property: "og:title", content: "Köpvillkor | Atelier Rare" },
      { property: "og:description", content: "Beställning, betalning, leverans och garantier." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">Villkor</p>
      <h1 className="mt-3 font-display text-4xl">Köpvillkor</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Atelier Rare AB (org.nr 559xxx-xxxx), Hornsgatan 42, 118 21 Stockholm, säljer begagnade och
          restaurerade skor till konsument inom EU.
        </p>
        <div>
          <h2 className="font-display text-xl text-foreground">Beställning och priser</h2>
          <p className="mt-2">
            Alla priser anges i svenska kronor inklusive moms. Avtal ingås när du fått en
            orderbekräftelse via e-post. Eftersom varje par är unikt kan en artikel bara köpas i ett
            exemplar per storlek.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-foreground">Betalning</h2>
          <p className="mt-2">
            Vi erbjuder kortbetalning, Swish och faktura 30 dagar. Vid faktura sker sedvanlig
            kreditbedömning.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-foreground">Leverans</h2>
          <p className="mt-2">
            Frakt inom Sverige kostar 79 kr och är fri vid köp över 2 000 kr. Paket skickas spårbart
            inom 1–3 arbetsdagar.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-foreground">Skick och reklamation</h2>
          <p className="mt-2">
            Skorna är begagnade och beskrivs efter faktiskt skick. Normalt slitage som anges i
            produktbeskrivningen utgör inte fel. Reklamation enligt konsumentköplagen görs till
            hej@atelierrare.se.
          </p>
        </div>
      </div>
    </div>
  );
}
