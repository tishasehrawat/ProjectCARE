import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Check, Copy, Plus, X } from "lucide-react";

export const Route = createFileRoute("/communicate")({
  head: () => ({
    meta: [
      { title: "Ask your doctor · CARE" },
      { name: "description", content: "Build a respectful, clear list of questions to take into your next consultation." },
    ],
  }),
  component: Communicate,
});

const SUGGESTIONS = [
  "Could you explain that again in simpler words?",
  "What are the next steps from here?",
  "What symptoms should make me come back sooner?",
  "Are there side effects I should watch for?",
  "Can you write down the medication names and timings?",
  "What does this test result actually mean for me?",
  "What are my options, and what do you recommend?",
  "When should I expect to hear from you again?",
];

function Communicate() {
  const [picked, setPicked] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);

  const list = useMemo(() => picked.join("\n• "), [picked]);

  const toggle = (q: string) =>
    setPicked((p) => (p.includes(q) ? p.filter((x) => x !== q) : [...p, q]));

  const addCustom = () => {
    if (!custom.trim()) return;
    setPicked((p) => [...p, custom.trim()]);
    setCustom("");
  };

  const copy = async () => {
    await navigator.clipboard.writeText("• " + list);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Communication support</p>
        <h1 className="mt-3 text-3xl md:text-4xl">Walk in prepared. Walk out understood.</h1>
        <p className="mt-3 text-muted-foreground">
          Tap the questions you want to ask. Add your own. We'll give you a clean list to keep on your phone.
        </p>

        <section className="mt-10">
          <h2 className="text-lg">Suggested questions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((q) => {
              const on = picked.includes(q);
              return (
                <button
                  key={q}
                  onClick={() => toggle(q)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  {on && <Check className="mr-1 inline h-3.5 w-3.5" />}
                  {q}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
          <label className="text-sm font-medium">Add your own question</label>
          <div className="mt-3 flex gap-2">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              placeholder="e.g. Will I be able to travel next week?"
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ring"
            />
            <Button onClick={addCustom} className="rounded-full"><Plus className="h-4 w-4" /> Add</Button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-gradient-calm p-7 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Your list</h2>
            <Button onClick={copy} variant="outline" size="sm" className="rounded-full" disabled={!picked.length}>
              {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </Button>
          </div>
          {picked.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Tap any suggestion above to start your list.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {picked.map((q) => (
                <li key={q} className="flex items-start justify-between gap-3 rounded-xl bg-background/70 px-4 py-3 text-sm">
                  <span>• {q}</span>
                  <button onClick={() => toggle(q)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-6 text-xs text-muted-foreground">
          Tip: it is okay to read your questions out loud from your phone. Doctors appreciate clarity.
        </p>
      </main>
      <AppFooter />
    </div>
  );
}
