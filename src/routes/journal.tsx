import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal · Project CARE" },
      { name: "description", content: "Gentle prompts to help you name what you're feeling during a hospital stay." },
    ],
  }),
  component: JournalPage,
});

const PROMPTS = [
  "What worries you the most right now?",
  "What would help you feel more prepared?",
  "What question would you like answered today?",
  "Who is one person you can lean on?",
  "What small thing brought you comfort today?",
];

const MOODS = ["😰 Anxious", "😔 Sad", "😐 Numb", "🙂 Steady", "🌱 Hopeful"];

type Entry = { id: string; prompt: string; body: string; mood: string; date: string };
const KEY = "care.journal";

function load(): Entry[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(MOODS[3]);

  useEffect(() => { setEntries(load()); }, []);

  const save = (next: Entry[]) => {
    setEntries(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const add = () => {
    if (!body.trim()) return;
    save([{ id: crypto.randomUUID(), prompt, body: body.trim(), mood, date: new Date().toISOString() }, ...entries]);
    setBody("");
  };

  const remove = (id: string) => save(entries.filter(e => e.id !== id));

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Journal</p>
        <h1 className="mt-3 text-3xl md:text-4xl">Write it out. Even a sentence helps.</h1>
        <p className="mt-3 text-muted-foreground">Private to this device. No one else sees this.</p>
        <DisclaimerBanner />

        <section className="mt-8 rounded-3xl bg-gradient-calm p-6 shadow-soft">
          <label className="text-sm font-medium">Choose a prompt</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  prompt === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"
                }`}
              >{p}</button>
            ))}
          </div>

          <label className="mt-5 block text-sm font-medium">How are you feeling?</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  mood === m ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"
                }`}
              >{m}</button>
            ))}
          </div>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write freely…"
            className="mt-4 min-h-32 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
          />
          <div className="mt-3 flex justify-end">
            <Button onClick={add} className="rounded-full">Save entry</Button>
          </div>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg">Your timeline</h2>
          {entries.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              Entries will appear here.
            </p>
          ) : entries.map((e) => (
            <article key={e.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleString()} · {e.mood}</p>
                  <p className="mt-1 text-sm font-medium text-primary">{e.prompt}</p>
                </div>
                <button onClick={() => remove(e.id)} className="rounded-full p-2 hover:bg-destructive/10" aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{e.body}</p>
            </article>
          ))}
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
