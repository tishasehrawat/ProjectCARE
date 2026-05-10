import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { CONTEXTS } from "@/lib/care-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/context")({
  head: () => ({
    meta: [
      { title: "Choose your situation · CARE" },
      { name: "description", content: "Tell us where you are in the hospital journey so we can guide you with the right pathway." },
    ],
  }),
  component: ContextPage,
});

function ContextPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Step 02 · Clarify uncertainty</p>
        <h1 className="mt-3 text-3xl md:text-4xl">Where are you right now?</h1>
        <p className="mt-3 text-muted-foreground">Pick the one that fits closest. We'll show you what usually happens next.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {Object.values(CONTEXTS).map((c) => (
            <Link
              key={c.key}
              to="/pathway/$context"
              params={{ context: c.key }}
              className="group rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="text-3xl">{c.emoji}</div>
              <h3 className="mt-4 text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.subtitle}</p>
              <div className="mt-5 flex items-center text-sm text-primary">
                See pathway <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
