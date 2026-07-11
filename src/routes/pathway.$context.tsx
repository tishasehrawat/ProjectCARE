import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { CONTEXTS, type ContextKey } from "@/lib/care-data";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Wind, MessageCircle, Clock, HelpCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pathway/$context")({
  head: ({ params }) => {
    const c = CONTEXTS[params.context as ContextKey];
    return {
      meta: [
        { title: `${c?.title ?? "Pathway"} · Project CARE` },
        { name: "description", content: c?.subtitle ?? "What happens next in this hospital moment." },
      ],
    };
  },
  component: PathwayPage,
  notFoundComponent: () => (
    <div className="p-12 text-center">
      Pathway not found. <Link to="/context" className="text-primary underline">Choose a situation</Link>
    </div>
  ),
});

function PathwayPage() {
  const { context } = Route.useParams();
  const c = CONTEXTS[context as ContextKey];
  if (!c) throw notFound();

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/context" className="text-sm text-muted-foreground hover:text-foreground">← All situations</Link>
        <div className="mt-4 flex items-start gap-4">
          <div className="text-4xl">{c.emoji}</div>
          <div>
            <h1 className="text-3xl md:text-4xl">{c.title}</h1>
            <p className="mt-2 text-muted-foreground">{c.subtitle}</p>
          </div>
        </div>
        <DisclaimerBanner />

        {/* Stages */}
        <section className="mt-10">
          <h2 className="text-xl">What usually happens next</h2>
          <ol className="mt-6 space-y-4">
            {c.stages.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-calm font-display text-sm text-primary">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-medium">{s.title}</h3>
                      {s.estimate && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                          <Clock className="h-3 w-3" /> {s.estimate}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{s.happens}</p>

                    {s.whyWait && s.whyWait.length > 0 && (
                      <div className="mt-3 rounded-xl bg-muted/40 p-3">
                        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          <HelpCircle className="h-3.5 w-3.5" /> Why it may take time
                        </p>
                        <ul className="mt-1.5 space-y-1 text-sm">
                          {s.whyWait.map((w) => (
                            <li key={w} className="flex gap-2"><span className="text-primary">·</span>{w}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {s.youCanDo && s.youCanDo.length > 0 && (
                      <div className="mt-3 rounded-xl bg-calm/40 p-3">
                        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                          <CheckCircle2 className="h-3.5 w-3.5" /> What you can do
                        </p>
                        <ul className="mt-1.5 space-y-1 text-sm">
                          {s.youCanDo.map((y) => (
                            <li key={y} className="flex gap-2"><span className="text-primary">✓</span>{y}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            These are typical patterns. Your hospital and team may vary — that's normal.
          </p>
        </section>

        {/* FAQs */}
        <section className="mt-12">
          <h2 className="text-xl">Common worries</h2>
          <Accordion type="single" collapsible className="mt-4">
            {c.faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="mb-3 rounded-2xl border border-border/60 bg-card px-5 shadow-soft">
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Questions */}
        <section className="mt-12 rounded-3xl bg-gradient-calm p-8 shadow-soft">
          <h2 className="text-xl">Questions you can ask staff</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {c.questions.map((q) => (
              <li key={q} className="flex gap-2"><span className="text-primary">›</span>{q}</li>
            ))}
          </ul>
          <Button asChild variant="outline" size="sm" className="mt-5 rounded-full">
            <Link to="/communicate">Build more questions <MessageCircle className="h-4 w-4" /></Link>
          </Button>
        </section>

        {/* Next actions */}
        <section className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/comfort">Take a comfort break <Wind className="h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/context">Try another situation <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
