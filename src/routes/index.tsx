import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartPulse, Map, Wind, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CARE — Calm, clarity & comfort in hospital moments" },
      { name: "description", content: "A gentle in-hospital companion that helps patients and families navigate fear, uncertainty, and waiting with structured support." },
      { property: "og:title", content: "CARE — Calm, clarity & comfort in hospital moments" },
      { property: "og:description", content: "Capture fear. Clarify uncertainty. Create comfort." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <AppHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-calm opacity-60 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-warm opacity-50 blur-3xl" />
        <div className="relative mx-auto grid max-w-5xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              In-hospital support · Pilot concept
            </span>
            <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">
              When the hospital feels heavy, <span className="italic text-primary">breathe with us.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              CARE is a calm companion for patients and families during waiting,
              diagnosis, surgery and the moments in between. Three steps:
              capture fear, clarify what happens next, create comfort.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 shadow-soft">
                <Link to="/checkin">Begin a check-in <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/context">Skip to what I need</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Not a medical tool. Not a diagnosis. A gentle hand to hold while you wait.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-72 w-72 rounded-full bg-gradient-calm shadow-glow">
              <div className="absolute inset-6 rounded-full bg-background/70 backdrop-blur-sm" />
              <div className="absolute inset-12 rounded-full bg-gradient-calm animate-breathe" />
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">breathe</div>
                  <div className="font-display text-2xl text-foreground">in · hold · out</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">The CARE framework</p>
          <h2 className="mt-3 text-3xl md:text-4xl">A simple path through a difficult moment.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <StepCard
            icon={<HeartPulse className="h-5 w-5" />}
            step="01"
            title="Capture fear"
            text="A 30-second check-in to name what you are feeling, without judgement."
            tone="calm"
          />
          <StepCard
            icon={<Map className="h-5 w-5" />}
            step="02"
            title="Clarify uncertainty"
            text="Stage-by-stage maps of what typically happens next in your situation."
            tone="default"
          />
          <StepCard
            icon={<Wind className="h-5 w-5" />}
            step="03"
            title="Create comfort"
            text="Guided breathing, grounding and gentle scripts to steady your moment."
            tone="warm"
          />
        </div>
      </section>

      {/* Quick contexts */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="mb-6 text-2xl md:text-3xl">Where are you right now?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ContextLink emoji="🔬" title="Waiting for diagnosis" to="/pathway/diagnosis" />
          <ContextLink emoji="🩺" title="Pre-operation waiting" to="/pathway/preop" />
          <ContextLink emoji="💬" title="After a consultation" to="/pathway/postconsult" />
          <ContextLink emoji="🤍" title="Family outside OT or ICU" to="/pathway/ot-icu" />
        </div>
      </section>

      {/* Communicate */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-3xl bg-gradient-warm p-8 shadow-soft md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <MessageCircle className="h-6 w-6 text-warm-foreground" />
              <h3 className="mt-3 text-2xl">Not sure how to ask your doctor?</h3>
              <p className="mt-2 text-warm-foreground/80">
                We help you build respectful, clear questions so you leave the room feeling heard.
              </p>
            </div>
            <Button asChild size="lg" variant="default" className="rounded-full">
              <Link to="/communicate">Build my questions <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}

function StepCard({ icon, step, title, text, tone }: { icon: React.ReactNode; step: string; title: string; text: string; tone: "default" | "calm" | "warm" }) {
  const bg = tone === "calm" ? "bg-gradient-calm" : tone === "warm" ? "bg-gradient-warm" : "bg-card";
  return (
    <div className={`${bg} rounded-3xl border border-border/60 p-7 shadow-soft transition-transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between text-muted-foreground">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-primary">{icon}</div>
        <span className="font-display text-sm">{step}</span>
      </div>
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function ContextLink({ emoji, title, to }: { emoji: string; title: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <span className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <span className="font-medium">{title}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
