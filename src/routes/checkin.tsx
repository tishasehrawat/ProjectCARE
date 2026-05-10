import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FEAR_PROMPTS } from "@/lib/care-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/checkin")({
  head: () => ({
    meta: [
      { title: "Fear check-in · CARE" },
      { name: "description", content: "A 30 second emotional check-in to name what you are feeling before we offer support." },
    ],
  }),
  component: CheckIn,
});

function CheckIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState<number[]>([5, 5, 5]);
  const [worry, setWorry] = useState("");

  const overwhelm = values[0];
  const tone = overwhelm >= 7 ? "warm" : overwhelm >= 4 ? "calm" : "muted";

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Step 01 · Capture fear</p>
        <h1 className="mt-3 text-3xl md:text-4xl">A short, gentle check-in.</h1>
        <p className="mt-3 text-muted-foreground">
          Nothing here is shared with anyone. Move the sliders honestly — there is no right answer.
        </p>

        <div className="mt-10 space-y-6">
          {FEAR_PROMPTS.map((prompt, i) => (
            <div key={prompt} className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <label className="text-base font-medium">{prompt}</label>
              <div className="mt-5">
                <Slider
                  value={[values[i]]}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={(v) => {
                    const next = [...values];
                    next[i] = v[0];
                    setValues(next);
                  }}
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{i === 0 ? "Calm" : i === 1 ? "Lost" : "Alone"}</span>
                  <span className="font-medium text-foreground">{values[i]}</span>
                  <span>{i === 0 ? "Overwhelmed" : i === 1 ? "Clear" : "Supported"}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
            <label className="text-base font-medium" htmlFor="worry">
              In one line — what are you most worried about?
            </label>
            <textarea
              id="worry"
              value={worry}
              onChange={(e) => setWorry(e.target.value)}
              placeholder="It's okay to leave this blank."
              className="mt-3 min-h-24 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
            />
          </div>
        </div>

        <div className={`mt-8 rounded-2xl p-6 ${tone === "warm" ? "bg-gradient-warm" : "bg-gradient-calm"}`}>
          <p className="font-display text-xl">
            {overwhelm >= 7
              ? "Thank you for telling us. Let's slow your breathing first."
              : overwhelm >= 4
                ? "Got it. Some clarity might help right now."
                : "You sound steady. We'll keep things calm and brief."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {overwhelm >= 7 ? (
              <Button asChild size="lg" className="rounded-full">
                <a href="/comfort">Start a breathing exercise <ArrowRight className="h-4 w-4" /></a>
              </Button>
            ) : (
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => navigate({ to: "/context" })}
              >
                Choose your situation <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="/comfort">Just calm me first</a>
            </Button>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
