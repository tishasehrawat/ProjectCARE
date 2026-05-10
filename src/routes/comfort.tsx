import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/comfort")({
  head: () => ({
    meta: [
      { title: "Create comfort · CARE" },
      { name: "description", content: "Guided breathing and grounding exercises for difficult hospital moments." },
    ],
  }),
  component: Comfort,
});

const PHASES = [
  { label: "Breathe in", seconds: 4, scale: 1.15 },
  { label: "Hold", seconds: 4, scale: 1.15 },
  { label: "Breathe out", seconds: 6, scale: 0.85 },
  { label: "Rest", seconds: 2, scale: 0.85 },
];

function Comfort() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(PHASES[0].seconds);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setPhase((p) => {
          const next = (p + 1) % PHASES.length;
          if (next === 0) setCycles((x) => x + 1);
          return next;
        });
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    setCount(PHASES[phase].seconds);
  }, [phase]);

  const reset = () => { setRunning(false); setPhase(0); setCount(PHASES[0].seconds); setCycles(0); };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Step 03 · Create comfort</p>
        <h1 className="mt-3 text-3xl md:text-4xl">A breath at a time.</h1>
        <p className="mt-3 text-muted-foreground">
          Follow the circle. Inhale as it grows, exhale as it softens. Two minutes can shift a lot.
        </p>

        <div className="mt-10 flex flex-col items-center gap-8 rounded-3xl bg-gradient-calm p-10 shadow-soft">
          <div className="relative flex h-72 w-72 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-background/50 transition-transform ease-in-out"
              style={{
                transform: `scale(${PHASES[phase].scale})`,
                transitionDuration: `${PHASES[phase].seconds}s`,
              }}
            />
            <div className="absolute inset-8 rounded-full border border-primary/20" />
            <div className="relative text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{running ? "in session" : "ready"}</div>
              <div className="mt-1 font-display text-3xl">{PHASES[phase].label}</div>
              <div className="mt-1 text-5xl font-display text-primary">{count}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setRunning((r) => !r)} size="lg" className="rounded-full px-8">
              {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> {cycles ? "Resume" : "Begin"}</>}
            </Button>
            <Button onClick={reset} size="lg" variant="outline" className="rounded-full">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Cycles completed: {cycles}</p>
        </div>

        {/* Grounding */}
        <section className="mt-10 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">5 · 4 · 3 · 2 · 1 grounding</h2>
          <p className="mt-1 text-sm text-muted-foreground">Bring your attention back to this room, gently.</p>
          <ul className="mt-5 space-y-3 text-sm">
            <Ground n="5" label="things you can see" hint="A chair. A poster. A pair of hands." />
            <Ground n="4" label="things you can feel" hint="Your feet on the floor. The fabric of your clothes." />
            <Ground n="3" label="things you can hear" hint="A voice. A footstep. The hum of a machine." />
            <Ground n="2" label="things you can smell" hint="Or two scents you remember liking." />
            <Ground n="1" label="thing you are grateful for" hint="Even something small counts." />
          </ul>
        </section>

        {/* Reassurance */}
        <section className="mt-8 rounded-3xl bg-gradient-warm p-7 shadow-soft">
          <h2 className="text-xl">Words to hold onto</h2>
          <p className="mt-3 font-display text-lg leading-relaxed">
            "It is okay to not be okay right now. The team is doing their work, and your job
            is simply to breathe and wait. You are not alone in this corridor."
          </p>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

function Ground({ n, label, hint }: { n: string; label: string; hint: string }) {
  return (
    <li className="flex gap-4">
      <span className="font-display text-2xl text-primary">{n}</span>
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-muted-foreground">{hint}</div>
      </div>
    </li>
  );
}
