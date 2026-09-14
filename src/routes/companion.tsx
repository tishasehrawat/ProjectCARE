import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/companion")({
  head: () => ({
    meta: [
      { title: "Waiting room companion · Project CARE" },
      { name: "description", content: "A gentle timer, small things to do while waiting, and a daily care score that tracks how you are looking after yourself." },
      { property: "og:title", content: "Waiting room companion · Project CARE" },
      { property: "og:description", content: "Something to do with the waiting — gently." },
    ],
  }),
  component: CompanionPage,
});

const NUDGES = [
  "Unclench your jaw. Let your shoulders drop an inch.",
  "Name five things you can see from where you sit.",
  "Take one sip of water.",
  "Send one short message to someone who would want to know you're okay.",
  "Stand up and walk to the end of the corridor and back.",
  "Write down the one question you most want answered today.",
  "Breathe out for longer than you breathe in, three times.",
  "Notice the temperature of the air on your hands.",
  "Put your phone face down for two minutes.",
  "Eat something small if you are allowed to.",
  "Think of one person who would sit here with you if they could.",
  "Let your eyes rest on something far away for thirty seconds.",
];

const CARE_ACTS = [
  { id: "water", label: "Drank some water" },
  { id: "food", label: "Ate something" },
  { id: "breath", label: "Did a breathing exercise" },
  { id: "move", label: "Stood up and moved" },
  { id: "rest", label: "Sat down and rested" },
  { id: "ask", label: "Asked the team a question" },
  { id: "tell", label: "Told someone how I'm feeling" },
  { id: "note", label: "Wrote something down" },
];

const today = () => new Date().toISOString().slice(0, 10);
const KEY = "care.dailyacts";

function loadActs(): Record<string, string[]> {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "{}"); } catch { return {}; }
}

function CompanionPage() {
  // Gentle timer
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const clock = useMemo(() => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
  }, [seconds]);

  // Nudges
  const [nudge, setNudge] = useState(0);

  // Daily care acts
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const all = loadActs();
    setDone(all[today()] ?? []);
  }, []);
  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((d) => d !== id) : [...done, id];
    setDone(next);
    const all = loadActs();
    all[today()] = next;
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* ignore */ }
  };
  const score = Math.round((done.length / CARE_ACTS.length) * 100);

  const streak = useMemo(() => {
    const all = loadActs();
    let n = 0;
    const d = new Date();
    for (;;) {
      const key = d.toISOString().slice(0, 10);
      if ((all[key] ?? []).length > 0) { n += 1; d.setDate(d.getDate() - 1); } else break;
    }
    return n;
  }, [done]);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Create comfort</p>
        <h1 className="mt-3 text-4xl">Waiting room companion</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          You can't make the wait shorter. You can make it kinder. Start a quiet timer, take a small nudge, and tick off the things you did for yourself today.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-border/60 bg-gradient-calm p-7 shadow-soft">
            <h2 className="text-xl">Quiet timer</h2>
            <p className="mt-1 text-sm text-muted-foreground">Some people feel steadier knowing how long they've actually been waiting.</p>
            <div className="mt-6 font-display text-5xl tabular-nums">{clock}</div>
            <div className="mt-6 flex gap-2">
              <Button onClick={() => setRunning((r) => !r)} className="rounded-full px-5">
                {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
              </Button>
              <Button variant="outline" onClick={() => { setRunning(false); setSeconds(0); }} className="rounded-full px-5">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">The timer resets if you close this page — it's meant for right now, not for records.</p>
          </section>

          <section className="rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
            <h2 className="text-xl">One small thing</h2>
            <p className="mt-1 text-sm text-muted-foreground">A nudge you can do from your chair.</p>
            <p className="mt-6 min-h-20 text-lg leading-relaxed">{NUDGES[nudge]}</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full px-5"
              onClick={() => setNudge((n) => (n + 1 + Math.floor(Math.random() * (NUDGES.length - 1))) % NUDGES.length)}
            >
              <Sparkles className="h-4 w-4" /> Another one
            </Button>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl">Today's care score</h2>
              <p className="mt-1 text-sm text-muted-foreground">Not a test. Just a reminder that you count too.</p>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl text-primary">{score}%</div>
              {streak > 1 && <div className="text-xs text-muted-foreground">{streak} days in a row</div>}
            </div>
          </div>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${score}%` }} />
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {CARE_ACTS.map((a) => {
              const on = done.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  aria-pressed={on}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${on ? "border-primary/50 bg-primary/10" : "border-border/60 bg-background hover:bg-accent/40"}`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                    {on && <Check className="h-3 w-3" />}
                  </span>
                  {a.label}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Saved privately on this device only.</p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full px-6"><Link to="/comfort">Open comfort tools</Link></Button>
          <Button asChild variant="outline" className="rounded-full px-6"><Link to="/journal">Write in the journal</Link></Button>
        </div>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}
