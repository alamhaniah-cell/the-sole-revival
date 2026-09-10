import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Music2, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Atelier Rare i Stockholm" },
      {
        name: "description",
        content:
          "Mejla, ring eller besök vår butik och verkstad på Hornsgatan 42 i Stockholm. Vi svarar oftast samma dag.",
      },
      { property: "og:title", content: "Kontakt | Atelier Rare" },
      { property: "og:description", content: "hej@atelierrare.se · 08-123 45 67 · Hornsgatan 42, Stockholm." },
    ],
  }),
  component: Contact,
});

const field =
  "h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-foreground";

function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <p className="eyebrow">Kontakt</p>
      <h1 className="mt-3 font-display text-4xl md:text-6xl">Säg hej</h1>

      <div className="mt-12 grid gap-14 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6 text-sm">
          <p className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-accent" strokeWidth={1.5} /> hej@atelierrare.se
          </p>
          <p className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-accent" strokeWidth={1.5} /> 08-123 45 67
          </p>
          <p className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />
            <span>
              Hornsgatan 42
              <br />
              118 21 Stockholm
              <br />
              <span className="text-muted-foreground">Mån–fre 10–18 · Lör 11–16</span>
            </span>
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center border border-border hover:border-foreground"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.4} />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              className="inline-flex h-10 w-10 items-center justify-center border border-border hover:border-foreground"
            >
              <Music2 className="h-4 w-4" strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLFormElement).reset();
            toast.success("Tack för ditt meddelande! Vi hör av oss inom kort.");
          }}
          className="space-y-5"
        >
          <input required placeholder="Namn" className={field} />
          <input required type="email" placeholder="E-post" className={field} />
          <input required placeholder="Ämne" className={field} />
          <textarea
            required
            rows={6}
            placeholder="Meddelande"
            className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-foreground"
          />
          <button
            type="submit"
            className="h-12 w-full bg-foreground text-sm tracking-wide text-background transition-opacity hover:opacity-90"
          >
            Skicka
          </button>
        </form>
      </div>
    </div>
  );
}
