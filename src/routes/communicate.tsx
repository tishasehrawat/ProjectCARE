import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Plus, X } from "lucide-react";

export const Route = createFileRoute("/communicate")({
  head: () => ({
    meta: [
      { title: "Ask your doctor · Project CARE" },
      { name: "description", content: "Build a respectful, clear list of questions to take into your next consultation." },
    ],
  }),
  component: Communicate,
});

const CATEGORIES: { key: string; label: string; questions: string[] }[] = [
  {
    key: "next-steps",
    label: "Next steps",
    questions: [
      "Could you please explain what the next steps will be after today's consultation?",
      "When should I expect to hear from you again?",
      "What decisions do I need to make in the next few days?",
    ],
  },
  {
    key: "tests",
    label: "Tests & reports",
    questions: [
      "When will the report be ready and who will explain it to me?",
      "Do I need to prepare (fasting, timings) for this test?",
      "Which values in the report matter most for me?",
    ],
  },
  {
    key: "medication",
    label: "Medication",
    questions: [
      "Could you write down the medicine names and timings for me?",
      "What side effects should I watch for?",
      "Can this medicine be taken with my existing prescriptions?",
    ],
  },
  {
    key: "surgery",
    label: "Surgery preparation",
    questions: [
      "How long is the surgery expected to take?",
      "What does recovery look like in the first 24 hours?",
      "What can my family do while they wait?",
    ],
  },
  {
    key: "recovery",
    label: "Recovery & lifestyle",
    questions: [
      "What activities should I avoid while recovering?",
      "When can I return to work or normal routine?",
      "What signs should make me come back sooner?",
    ],
  },
  {
    key: "hospital-stay",
    label: "Hospital stay",
    questions: [
      "How long will I need to stay in the hospital?",
      "Can a family member stay with me overnight?",
      "What should I bring with me for admission?",
    ],
  },
  {
    key: "discharge",
    label: "Discharge & follow-up",
    questions: [
      "Can you write down the discharge instructions for me?",
      "When is my follow-up, and with whom?",
      "Who do I call if something feels wrong at home?",
    ],
  },
  {
    key: "understanding",
    label: "Understanding",
    questions: [
      "Could you explain that again in simpler words?",
      "Is there something I can read or watch to understand better?",
      "Can I record this part of the conversation for my family?",
    ],
  },
];

function Communicate() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].key);
  const [picked, setPicked] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);

  const active = CATEGORIES.find(c => c.key === activeCat)!;
  const list = useMemo(() => picked.map(q => `• ${q}`).join("\n"), [picked]);

  const toggle = (q: string) =>
    setPicked((p) => (p.includes(q) ? p.filter((x) => x !== q) : [...p, q]));

  const addCustom = () => {
    if (!custom.trim()) return;
    setPicked((p) => [...p, custom.trim()]);
    setCustom("");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(list);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Smart question builder</p>
        <h1 className="mt-3 text-3xl md:text-4xl">Walk in prepared. Walk out understood.</h1>
        <p className="mt-3 text-muted-foreground">
          Pick a category, choose the questions that fit, and add your own. We'll give you a clean list to keep on your phone.
        </p>
        <DisclaimerBanner />

        {/* Category chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                activeCat === c.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Suggestions for the active category */}
        <section className="mt-6">
          <h2 className="text-lg">Suggested questions · {active.label}</h2>
          <div className="mt-4 grid gap-2">
            {active.questions.map((q) => {
              const on = picked.includes(q);
              return (
                <button
                  key={q}
                  onClick={() => toggle(q)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left text-sm transition-colors ${
                    on ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                    {on && <Check className="h-3 w-3" />}
                  </span>
                  <span>{q}</span>
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
            <h2 className="text-xl">Your list ({picked.length})</h2>
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
                  <button onClick={() => toggle(q)} className="text-muted-foreground hover:text-foreground" aria-label="Remove">
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
