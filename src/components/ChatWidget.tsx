import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hey! 👋 Letar du efter ett rare par eller undrar du vad vi kan göra med dina gamla skor? Jag hjälper gärna till.";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply || data.error || "Jag kunde inte svara just nu – testa igen om en stund.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Anslutningen bröts. Försök igen om en stund." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed right-4 bottom-4 z-[60] flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-display text-base leading-none">Rare Assist</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Svarar direkt · AI-assistent</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Stäng chatt"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary"
            >
              <X className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] bg-primary px-3 py-2 text-primary-foreground"
                      : "max-w-[92%] leading-relaxed whitespace-pre-wrap"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <p className="animate-pulse text-muted-foreground">Skriver…</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Fråga om skick, storlek, frakt…"
              className="h-10 flex-1 bg-secondary px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Skicka"
              className="inline-flex h-10 w-10 items-center justify-center bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Öppna chatt"
          className="fixed right-4 bottom-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-xl transition-transform duration-300 hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={1.4} />
        </button>
      )}
    </>
  );
}
