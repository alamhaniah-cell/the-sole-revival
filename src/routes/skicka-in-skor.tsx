import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import restorationImg from "@/assets/restoration.jpg";

export const Route = createFileRoute("/skicka-in-skor")({
  head: () => ({
    meta: [
      { title: "Skicka in dina skor — restaurering eller vidareförsäljning | Atelier Rare" },
      {
        name: "description",
        content:
          "Skicka in dina skor för kostnadsfri bedömning. Vi restaurerar dem och du väljer att få tillbaka dem eller låta oss sälja dem vidare.",
      },
      { property: "og:title", content: "Skicka in dina skor | Atelier Rare" },
      {
        property: "og:description",
        content: "Kostnadsfri bedömning innan något arbete påbörjas. Behåll eller sälj vidare.",
      },
    ],
  }),
  component: SendShoes,
});

const steps = [
  {
    n: "01",
    title: "Skicka in din förfrågan",
    text: "Fyll i formuläret med bilder på skorna. Det tar två minuter och kostar ingenting.",
  },
  {
    n: "02",
    title: "Vi bedömer och ger pris",
    text: "Inom 1–2 arbetsdagar får du en bedömning, ett fast pris och en fraktsedel.",
  },
  {
    n: "03",
    title: "Verkstaden gör jobbet",
    text: "Rengöring, sulbyte, färgkorrigering – vad just dina skor behöver. Du får bilder under tiden.",
  },
  {
    n: "04",
    title: "Du väljer vad som händer",
    text: "Få tillbaka dem hem till dörren, eller låt oss sälja dem vidare i arkivet (25 % provision).",
  },
];

const field =
  "h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-foreground";

function SendShoes() {
  const [choice, setChoice] = useState("tillbaka");

  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Send your shoes</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
            Dina skor förtjänar
            <br />
            <span className="text-accent italic">ett andra liv</span>
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Slitna favoriter, ärvda vintage-par eller sneakers som stått i garderoben i tio år. Vi
            bedömer dem kostnadsfritt och du bestämmer sedan om du vill ha tillbaka dem eller låta
            oss hitta en ny ägare.
          </p>
          <a
            href="#formular"
            className="mt-8 inline-flex h-12 items-center bg-foreground px-7 text-sm text-background transition-opacity hover:opacity-90"
          >
            Till formuläret
          </a>
        </div>
        <img
          src={restorationImg}
          alt="Sneaker som restaureras för hand"
          loading="lazy"
          width={1408}
          height={1008}
          className="w-full object-cover"
        />
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-4 md:px-8">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-display text-3xl text-accent">{s.n}</p>
              <h2 className="mt-3 font-display text-xl">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="formular" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow">Förfrågan</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Berätta om dina skor</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Du får alltid en bedömning och ett prisförslag innan något arbete eller någon försäljning
          påbörjas. Ingen bindning, inga dolda avgifter.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLFormElement).reset();
            toast.success("Tack! Vi återkommer med en bedömning inom 1–2 arbetsdagar.");
          }}
          className="mt-10 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input required placeholder="Namn" className={field} />
            <input required type="email" placeholder="E-post" className={field} />
            <input required placeholder="Telefonnummer" className={field} />
            <select required className={field} defaultValue="">
              <option value="" disabled>
                Skotyp
              </option>
              {["Sneakers", "Boots", "Loafers", "Heels", "Vintage", "Annat"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <input required placeholder="Märke" className={field} />
            <input required placeholder="Modell" className={field} />
            <input required placeholder="Storlek (EU)" className={field} />
            <select required className={field} defaultValue="">
              <option value="" disabled>
                Nuvarande skick
              </option>
              {["Som nytt", "Mycket bra", "Bra", "Slitet", "Behöver reparation"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <textarea
            required
            rows={5}
            placeholder="Vad vill du ha hjälp med? Beskriv skador, fläckar eller önskemål."
            className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-foreground"
          />

          <fieldset>
            <legend className="eyebrow mb-3">Vad vill du göra sedan?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: "tillbaka", label: "Få tillbaka skorna" },
                { id: "salj", label: "Låt er sälja dem vidare" },
              ].map((o) => (
                <label
                  key={o.id}
                  className={`flex cursor-pointer items-center gap-3 border p-4 text-sm transition-colors ${
                    choice === o.id ? "border-foreground" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="choice"
                    checked={choice === o.id}
                    onChange={() => setChoice(o.id)}
                    className="accent-[var(--accent)]"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="eyebrow" htmlFor="bilder">
              Ladda upp bilder på skorna
            </label>
            <input
              id="bilder"
              type="file"
              accept="image/*"
              multiple
              className="mt-3 block w-full border border-dashed border-border bg-background p-4 text-sm file:mr-4 file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:text-background"
            />
          </div>

          <button
            type="submit"
            className="h-13 w-full bg-accent py-4 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
          >
            Skicka förfrågan
          </button>
        </form>
      </section>
    </div>
  );
}
