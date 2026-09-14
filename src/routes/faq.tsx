import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Search, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions people ask · Project CARE" },
      { name: "description", content: "Honest answers to the questions patients and families most often ask while waiting in hospital." },
      { property: "og:title", content: "Questions people ask · Project CARE" },
      { property: "og:description", content: "Honest answers to common hospital worries about waiting, results, visits and bills." },
    ],
  }),
  component: FaqPage,
});

type Item = { cat: string; q: string; a: string };

const ITEMS: Item[] = [
  { cat: "Waiting", q: "Why is the doctor running so late?", a: "Consultations often overrun because someone ahead needed more time, or an emergency arrived. The same unhurried attention is being kept for you." },
  { cat: "Waiting", q: "Is it rude to ask how much longer?", a: "No. Front desks and nurses are asked this all day. A calm 'could you give me a rough idea of the wait?' is completely normal." },
  { cat: "Waiting", q: "No one has updated us in hours — is that bad?", a: "Usually quiet means the team is concentrating, not that something went wrong. Ask the coordinator when the next update window is." },
  { cat: "Results", q: "Does a delayed report mean bad news?", a: "Most delays are about batching, re-checks and specialist review. Care taken over a report is a sign of thoroughness, not a signal about the result." },
  { cat: "Results", q: "Can I read my report before the doctor?", a: "You are entitled to your reports. But numbers out of context can frighten unnecessarily — it is usually calmer to read them alongside your doctor." },
  { cat: "Results", q: "Should I search my results online?", a: "Search results describe the worst cases loudest. Write your questions down instead and bring them to the doctor who knows your full history." },
  { cat: "Surgery", q: "Will I feel anything during surgery?", a: "Anaesthesia is closely monitored throughout. Tell the anaesthetist about past reactions and any anxiety — they can adjust how you are prepared." },
  { cat: "Surgery", q: "Why is the surgery taking longer than expected?", a: "Extra time often means extra care — positioning, checking, and doing things carefully. Ask the coordinator for an estimated update time." },
  { cat: "ICU & visits", q: "Why are visiting hours so short?", a: "Rest, infection control and space around equipment all matter. Short, calm visits usually support recovery better than long ones." },
  { cat: "ICU & visits", q: "How will we be told if something changes?", a: "Most units call one named family contact. Keep that phone charged, nearby, and make sure the unit has the right number." },
  { cat: "Talking to staff", q: "I forget everything the doctor says. What helps?", a: "Write three questions before you go in, take notes or ask permission to record, and ask for key instructions in writing before you leave." },
  { cat: "Talking to staff", q: "Can I ask for a second opinion?", a: "Yes, and it is a routine request. Asking for one does not offend a good team or affect the care you receive." },
  { cat: "Money & paperwork", q: "Why is discharge taking so many hours?", a: "The doctor's summary, pharmacy, billing and insurance all have to sign off in sequence. It is a safety chain, not a delay tactic." },
  { cat: "Money & paperwork", q: "Can I get an estimate before treatment?", a: "Yes — ask the billing or insurance desk for a written estimate, and ask what could change it." },
  { cat: "Coping", q: "I feel guilty for being impatient.", a: "Waiting while someone you love is unwell is genuinely hard work. Impatience is not a failure of love — it is exhaustion asking for a break." },
  { cat: "Coping", q: "I can't stop imagining the worst.", a: "That is your mind trying to prepare you. Grounding and slow breathing tell your body it is safe right now; the comfort tools here take about two minutes." },
];

function FaqPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s ? ITEMS.filter((i) => (i.q + i.a + i.cat).toLowerCase().includes(s)) : ITEMS;
    const map = new Map<string, Item[]>();
    list.forEach((i) => map.set(i.cat, [...(map.get(i.cat) ?? []), i]));
    return [...map.entries()];
  }, [q]);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Clarify uncertainty</p>
        <h1 className="mt-3 text-4xl">Questions people ask</h1>
        <p className="mt-3 text-muted-foreground">
          The worries that come up most often in corridors and waiting rooms — answered plainly.
        </p>

        <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a worry…"
            aria-label="Search questions"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mt-8 space-y-8">
          {groups.map(([cat, items]) => (
            <section key={cat}>
              <h2 className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{cat}</h2>
              <div className="mt-3 space-y-2">
                {items.map((i) => {
                  const isOpen = open === i.q;
                  return (
                    <div key={i.q} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                      <button
                        onClick={() => setOpen(isOpen ? null : i.q)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-medium">{i.q}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && <p className="px-5 pb-5 text-sm text-muted-foreground">{i.a}</p>}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
          {groups.length === 0 && <p className="text-sm text-muted-foreground">No match — try a single word like “results” or “bill”.</p>}
        </div>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}
