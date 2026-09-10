import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — frakt, skick, retur och restaurering | Atelier Rare" },
      {
        name: "description",
        content:
          "Vanliga frågor om skickbedömning, storlekar, frakt, returer och hur du skickar in dina skor för restaurering.",
      },
      { property: "og:title", content: "FAQ | Atelier Rare" },
      { property: "og:description", content: "Svar på de vanligaste frågorna om köp och restaurering." },
    ],
  }),
  component: Faq,
});

const items = [
  {
    q: "Hur bedömer ni skicket på skorna?",
    a: "Varje par går igenom vår verkstad och bedöms som Excellent, Very good eller Good condition. Vi listar alltid repor, fläckar och slitage i produktbeskrivningen och fotograferar dem.",
  },
  {
    q: "Är skorna äkta?",
    a: "Ja. Alla par äkthetskontrolleras manuellt av vårt team innan de läggs ut. Hittar vi minsta tveksamhet säljs paret inte.",
  },
  {
    q: "Vad kostar frakten?",
    a: "79 kr inom Sverige, fritt över 2 000 kr. Leverans sker spårbart inom 1–3 arbetsdagar.",
  },
  {
    q: "Kan jag returnera?",
    a: "Du har 14 dagars ångerrätt på ordinarie köp så länge skorna är oanvända. Restaureringsuppdrag är personliga tjänster och omfattas inte av ångerrätten.",
  },
  {
    q: "Hur skickar jag in mina egna skor?",
    a: "Fyll i formuläret på sidan Skicka in dina skor med bilder. Du får en kostnadsfri bedömning inom 1–2 arbetsdagar och en fraktsedel om du vill gå vidare.",
  },
  {
    q: "Vad tjänar ni om ni säljer mina skor vidare?",
    a: "Vi tar 25 % i provision på slutpriset. Restaureringskostnaden dras av först, och du godkänner alltid priset innan paret läggs ut.",
  },
  {
    q: "Hur vet jag vilken storlek jag ska välja?",
    a: "Alla storlekar anges i EU-mått. Är du osäker – mät innersulan på ett par som passar och hör av dig, så jämför vi mot skorna i arkivet.",
  },
];

function Faq() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">FAQ</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Vanliga frågor</h1>
      <Accordion type="single" collapsible className="mt-10">
        {items.map((i) => (
          <AccordionItem key={i.q} value={i.q}>
            <AccordionTrigger className="text-left font-display text-lg">{i.q}</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {i.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
