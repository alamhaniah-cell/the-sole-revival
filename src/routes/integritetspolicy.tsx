import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/integritetspolicy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy | Atelier Rare" },
      { name: "description", content: "Så behandlar Atelier Rare dina personuppgifter enligt GDPR." },
      { property: "og:title", content: "Integritetspolicy | Atelier Rare" },
      { property: "og:description", content: "Så behandlar vi dina personuppgifter." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">Integritet</p>
      <h1 className="mt-3 font-display text-4xl">Integritetspolicy</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Atelier Rare AB är personuppgiftsansvarig för de uppgifter du lämnar till oss. Vi samlar
          bara in det vi behöver för att genomföra ditt köp eller ditt restaureringsuppdrag.
        </p>
        <div>
          <h2 className="font-display text-xl text-foreground">Vad vi samlar in</h2>
          <p className="mt-2">
            Namn, e-post, telefonnummer, leveransadress, orderhistorik samt bilder och beskrivningar
            du skickar in om dina skor.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-foreground">Hur länge</h2>
          <p className="mt-2">
            Orderuppgifter sparas i sju år enligt bokföringslagen. Bilder på inskickade skor raderas
            12 månader efter avslutat uppdrag om du inte bett oss spara dem.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-foreground">Dina rättigheter</h2>
          <p className="mt-2">
            Du kan när som helst begära utdrag, rättelse eller radering av dina uppgifter genom att
            mejla hej@atelierrare.se.
          </p>
        </div>
      </div>
    </div>
  );
}
