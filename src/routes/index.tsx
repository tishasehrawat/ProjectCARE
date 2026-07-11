import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, HeartPulse, Map, Wind, MessageCircle, NotebookPen, BookHeart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project CARE — Calm, clarity & comfort in hospital moments" },
      { name: "description", content: "A gentle in-hospital companion that helps patients and families navigate fear, uncertainty, and waiting with structured support." },
      { property: "og:title", content: "Project CARE — Calm, clarity & comfort in hospital moments" },
      { property: "og:description", content: "Capture fear. Clarify uncertainty. Create comfort." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
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
              Project CARE is a calm companion for patients and families during waiting,
              diagnosis, surgery and the moments in between. Three steps: capture fear,
              clarify what happens next, create comfort.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 shadow-soft">
                <Link to="/checkin">{t("cta.begin")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/context">{t("cta.skip")}</Link>
              </Button>
            </div>
            <p className="mt-6 max-w-xl text-xs text-muted-foreground">{t("disclaimer.long")}</p>
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
          <StepCard icon={<HeartPulse className="h-5 w-5" />} step="01" title="Capture fear" text="A 30-second check-in to name what you are feeling, without judgement." tone="calm" />
          <StepCard icon={<Map className="h-5 w-5" />} step="02" title="Clarify uncertainty" text="Stage-by-stage maps of what typically happens next in your situation." tone="default" />
          <StepCard icon={<Wind className="h-5 w-5" />} step="03" title="Create comfort" text="Guided breathing library, grounding and gentle scripts to steady your moment." tone="warm" />
        </div>
      </section>

      {/* Quick contexts */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="mb-6 text-2xl md:text-3xl">Where are you right now?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ContextLink emoji="🗓️" title="Waiting for a consultation" to="/pathway/$context" params={{ context: "consultation" }} />
          <ContextLink emoji="🔬" title="Waiting for a diagnosis" to="/pathway/$context" params={{ context: "diagnosis" }} />
          <ContextLink emoji="🩸" title="Waiting for blood test results" to="/pathway/$context" params={{ context: "bloodtest" }} />
          <ContextLink emoji="🖥️" title="Waiting for imaging" to="/pathway/$context" params={{ context: "imaging" }} />
          <ContextLink emoji="🩺" title="Pre-operation waiting" to="/pathway/$context" params={{ context: "preop" }} />
          <ContextLink emoji="🤍" title="Family outside the OT" to="/pathway/$context" params={{ context: "ot" }} />
          <ContextLink emoji="💙" title="Family outside the ICU" to="/pathway/$context" params={{ context: "icu" }} />
          <ContextLink emoji="🚪" title="Going through discharge" to="/pathway/$context" params={{ context: "discharge" }} />
        </div>
      </section>

      {/* Tools row */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <ToolCard to="/communicate" icon={<MessageCircle className="h-5 w-5" />} title="Ask your doctor" text="Build clear, respectful questions by category." />
          <ToolCard to="/notes" icon={<NotebookPen className="h-5 w-5" />} title="Consultation notes" text="Keep instructions, medicine names, follow-up dates." />
          <ToolCard to="/journal" icon={<BookHeart className="h-5 w-5" />} title="Journal" text="Gentle prompts to name what you're feeling." />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <DisclaimerBanner variant="long" />
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

type CtxLinkProps =
  | { emoji: string; title: string; to: "/pathway/$context"; params: { context: string } };

function ContextLink({ emoji, title, to, params }: CtxLinkProps) {
  return (
    <Link
      to={to}
      params={params}
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

function ToolCard({ to, icon, title, text }: { to: string; icon: React.ReactNode; title: string; text: string }) {
  return (
    <Link to={to} className="group rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-calm text-primary">{icon}</div>
      <h3 className="mt-4 text-lg">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      <div className="mt-4 flex items-center text-sm text-primary">Open <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
    </Link>
  );
}
