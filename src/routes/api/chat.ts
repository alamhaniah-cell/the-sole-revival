import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `Du är "Rare Assist", AI-assistent för Atelier Rare – en svensk e-handel som säljer svåråtkomliga, exklusiva märkesskor i mycket bra skick och som även restaurerar kunders egna skor.

Ton: vänlig, professionell, modern, kort och konkret. Svara på samma språk som kunden (oftast svenska).

Fakta du kan använda:
- Sortiment: sneakers, boots, loafers, heels, vintage, limited edition. Alla skor är kontrollerade och skickbedömda som Excellent / Very good / Good condition, med tydliga noteringar om repor och slitage.
- Frakt: 79 kr i Sverige, fri frakt över 2 000 kr, leverans 1–3 arbetsdagar. Fraktas spårbart.
- Retur: 14 dagars ångerrätt på ordinarie köp, skorna ska vara oanvända. Restaureringsuppdrag är personliga tjänster och omfattas inte.
- Skicka in skor: kunden fyller i formuläret på sidan "Skicka in dina skor", får en kostnadsfri bedömning och prisförslag inom 1–2 arbetsdagar, skickar in skorna, och väljer sedan att få tillbaka dem eller låta oss sälja dem vidare (vi tar 25 % provision).
- Restaureringstjänster: rengöring, restaurering, reparation, sulbyte, färgkorrigering, materialvård, återställning av vintage-skor. Priser: rengöring från 349 kr, färgkorrigering från 690 kr, sulbyte från 1 190 kr, full restaurering från 1 490 kr.
- Storlek: alla mått anges i EU-storlek; vid tveksamhet rekommendera att mäta innersulan och höra av sig.
- Kontakt: hej@atelierrare.se, 08-123 45 67, Hornsgatan 42, Stockholm. Öppet mån–fre 10–18, lör 11–16.

Om du inte vet något: hänvisa till kontaktsidan. Hitta aldrig på lagerstatus eller priser på enskilda skor.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as { messages?: Msg[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-14) : [];

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.8-flash",
            messages: [{ role: "system", content: SYSTEM }, ...messages],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          const message =
            res.status === 429
              ? "Det är många frågor just nu – testa igen om en liten stund."
              : res.status === 402
                ? "AI-assistenten är tillfälligt otillgänglig. Mejla oss gärna på hej@atelierrare.se."
                : "Något gick fel med assistenten just nu.";
          console.error("AI gateway error", res.status, text);
          return new Response(JSON.stringify({ error: message }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? "";
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
