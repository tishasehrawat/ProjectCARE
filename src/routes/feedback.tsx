import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share your experience · Project CARE" },
      { name: "description", content: "Put your hospital experience into clear, respectful words you can hand to the feedback desk or keep for yourself." },
      { property: "og:title", content: "Share your experience · Project CARE" },
      { property: "og:description", content: "Turn how the visit felt into words the hospital can act on." },
    ],
  }),
  component: FeedbackPage,
});

const AREAS = ["Waiting time", "Communication from staff", "Comfort of the waiting area", "Clarity of instructions", "Billing and paperwork", "Kindness of the team", "Cleanliness", "Discharge process"];
const RATINGS = ["Difficult", "Mixed", "Fine", "Good", "Excellent"];

function FeedbackPage() {
  const [area, setArea] = useState<string[]>([]);
  const [rating, setRating] = useState(2);
  const [what, setWhat] = useState("");
  const [better, setBetter] = useState("");
  const [copied, setCopied] = useState(false);

  const summary = [
    `Overall experience: ${RATINGS[rating]}`,
    area.length ? `Areas this is about: ${area.join(", ")}` : "",
    what.trim() ? `What happened: ${what.trim()}` : "",
    better.trim() ? `What would have helped: ${better.trim()}` : "",
    "Shared respectfully, with thanks to the team for their care.",
  ].filter(Boolean).join("\n\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Your voice</p>
        <h1 className="mt-3 text-4xl">Share your experience</h1>
        <p className="mt-3 text-muted-foreground">
          Feedback is easier to act on when it is specific and calm. Build it here, then copy it to the hospital's feedback form, email or suggestion box.
        </p>

        <section className="mt-10 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">How did the visit feel overall?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {RATINGS.map((r, i) => (
              <button
                key={r}
                onClick={() => setRating(i)}
                aria-pressed={rating === i}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${rating === i ? "border-primary bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:bg-accent/40"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <h2 className="mt-8 text-xl">What is this about?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {AREAS.map((a) => {
              const on = area.includes(a);
              return (
                <button
                  key={a}
                  onClick={() => setArea(on ? area.filter((x) => x !== a) : [...area, a])}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-primary bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:bg-accent/40"}`}
                >
                  {a}
                </button>
              );
            })}
          </div>

          <label className="mt-8 block">
            <span className="text-sm font-medium">What happened?</span>
            <textarea
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              rows={4}
              placeholder="We waited four hours without knowing whether the scan had been done."
              className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none focus:border-primary/50"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium">What would have helped?</span>
            <textarea
              value={better}
              onChange={(e) => setBetter(e.target.value)}
              rows={3}
              placeholder="A short update every hour would have made the wait much easier."
              className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none focus:border-primary/50"
            />
          </label>
        </section>

        <section className="mt-8 rounded-3xl border border-border/60 bg-gradient-calm p-7 shadow-soft">
          <h2 className="text-xl">Your message</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-background/70 p-5 text-sm text-muted-foreground">{summary}</pre>
          <Button onClick={copy} className="mt-4 rounded-full px-6">
            {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy message</>}
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Nothing is sent from this app. Nothing you type here leaves your device — copying it is entirely your choice.
          </p>
        </section>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}
