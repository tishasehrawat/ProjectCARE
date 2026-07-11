import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/comfort")({
  head: () => ({
    meta: [
      { title: "Comfort hub · Project CARE" },
      { name: "description", content: "Guided breathing library and grounding exercises for hospital stress." },
    ],
  }),
  component: Comfort,
});

type Phase = { label: string; seconds: number; scale: number };
type Pattern = { id: string; name: string; description: string; phases: Phase[] };

const PATTERNS: Pattern[] = [
  {
    id: "calm",
    name: "Calm breath (4·4·6·2)",
    description: "Longer exhale to soothe the nervous system.",
    phases: [
      { label: "Breathe in", seconds: 4, scale: 1.15 },
      { label: "Hold", seconds: 4, scale: 1.15 },
      { label: "Breathe out", seconds: 6, scale: 0.85 },
      { label: "Rest", seconds: 2, scale: 0.85 },
    ],
  },
  {
    id: "box",
    name: "Box breathing (4·4·4·4)",
    description: "Used by clinicians and athletes to steady focus.",
    phases: [
      { label: "Breathe in", seconds: 4, scale: 1.15 },
      { label: "Hold", seconds: 4, scale: 1.15 },
      { label: "Breathe out", seconds: 4, scale: 0.85 },
      { label: "Hold", seconds: 4, scale: 0.85 },
    ],
  },
  {
    id: "478",
    name: "4·7·8 breathing",
    description: "Helpful before sleep or when panic rises.",
    phases: [
      { label: "Breathe in", seconds: 4, scale: 1.15 },
      { label: "Hold", seconds: 7, scale: 1.15 },
      { label: "Breathe out", seconds: 8, scale: 0.85 },
    ],
  },
  {
    id: "paced",
    name: "Paced (5·5)",
    description: "Simple in-and-out rhythm. Good for beginners.",
    phases: [
      { label: "Breathe in", seconds: 5, scale: 1.15 },
      { label: "Breathe out", seconds: 5, scale: 0.85 },
    ],
  },
];

function Comfort() {
  const [patternId, setPatternId] = useState<string>("calm");
  const pattern = useMemo(() => PATTERNS.find(p => p.id === patternId)!, [patternId]);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(pattern.phases[0].seconds);
  const [cycles, setCycles] = useState(0);
  const cycleRef = useRef(cycles);
  cycleRef.current = cycles;

  useEffect(() => {
    setPhase(0);
    setCount(pattern.phases[0].seconds);
    setCycles(0);
    setRunning(false);
  }, [patternId, pattern]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setPhase((p) => {
          const next = (p + 1) % pattern.phases.length;
          if (next === 0) setCycles((x) => x + 1);
          return next;
        });
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, pattern]);

  useEffect(() => {
    setCount(pattern.phases[phase].seconds);
  }, [phase, pattern]);

  const reset = () => { setRunning(false); setPhase(0); setCount(pattern.phases[0].seconds); setCycles(0); };
  const current = pattern.phases[phase];

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Step 03 · Create comfort</p>
        <h1 className="mt-3 text-3xl md:text-4xl">A breath at a time.</h1>
        <p className="mt-3 text-muted-foreground">
          Choose a rhythm below. Follow the circle — inhale as it grows, exhale as it softens.
        </p>
        <DisclaimerBanner />

        {/* Pattern picker */}
        <div className="mt-8 flex flex-wrap gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPatternId(p.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                p.id === patternId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{pattern.description}</p>

        {/* Breathing */}
        <div className="mt-8 flex flex-col items-center gap-8 rounded-3xl bg-gradient-calm p-10 shadow-soft">
          <div className="relative flex h-72 w-72 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-background/50 transition-transform ease-in-out"
              style={{
                transform: `scale(${current.scale})`,
                transitionDuration: `${current.seconds}s`,
              }}
            />
            <div className="absolute inset-8 rounded-full border border-primary/20" />
            <div className="relative text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{running ? "in session" : "ready"}</div>
              <div className="mt-1 font-display text-3xl">{current.label}</div>
              <div className="mt-1 font-display text-5xl text-primary">{count}</div>
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

        {/* Grounding — 5·4·3·2·1 */}
        <section className="mt-10 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">5 · 4 · 3 · 2 · 1 sensory grounding</h2>
          <p className="mt-1 text-sm text-muted-foreground">Bring your attention back to this room, gently.</p>
          <ul className="mt-5 space-y-3 text-sm">
            <Ground n="5" label="things you can see" hint="A chair. A poster. A pair of hands." />
            <Ground n="4" label="things you can feel" hint="Your feet on the floor. The fabric of your clothes." />
            <Ground n="3" label="things you can hear" hint="A voice. A footstep. The hum of a machine." />
            <Ground n="2" label="things you can smell" hint="Or two scents you remember liking." />
            <Ground n="1" label="thing you are grateful for" hint="Even something small counts." />
          </ul>
        </section>

        {/* Body scan */}
        <section className="mt-8 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">Quick body scan</h2>
          <p className="mt-1 text-sm text-muted-foreground">One minute. Move your attention slowly from head to toe.</p>
          <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
            <li>Soften your forehead and jaw.</li>
            <li>Drop your shoulders away from your ears.</li>
            <li>Unclench your hands, let them rest in your lap.</li>
            <li>Feel your feet flat on the ground.</li>
            <li>Take one slow breath and notice what changed.</li>
          </ol>
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
