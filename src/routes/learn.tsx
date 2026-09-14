import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning centre · Project CARE" },
      { name: "description", content: "Short, calm guides on how hospitals work, how to talk to your care team, and how to support a family member through treatment." },
      { property: "og:title", content: "Learning centre · Project CARE" },
      { property: "og:description", content: "Short, calm guides on hospital life for patients and families." },
    ],
  }),
  component: LearnPage,
});

type Guide = { title: string; minutes: number; intro: string; points: string[] };

const GUIDES: Guide[] = [
  {
    title: "How a hospital day is actually structured",
    minutes: 3,
    intro: "Most of what feels like random delay is a fixed rhythm you can learn to read.",
    points: [
      "Early morning: blood samples and vitals are collected before rounds, so results are ready when doctors review.",
      "Mid-morning: doctors do rounds ward by ward. Plans change here, which is why updates cluster afterwards.",
      "Afternoon: scans, procedures and discharges are processed — the busiest window for pharmacy and billing.",
      "Evening: shift handover. Brief pauses in updates around shift change are normal, not neglect.",
      "Knowing the rhythm tells you when to ask. Just after rounds is usually the best time for a real answer.",
    ],
  },
  {
    title: "Getting the most out of ten minutes with a doctor",
    minutes: 3,
    intro: "Consultations are short. Preparation is what makes them feel complete.",
    points: [
      "Write your three most important questions before you go in, most important first.",
      "Open with the one thing worrying you most — don't save it for the end.",
      "Ask 'what would make you want to see me sooner?' It gives you a clear safety line to watch for.",
      "Repeat the plan back in your own words. Misunderstandings surface immediately this way.",
      "Ask for the key instructions in writing, or photograph the prescription before you leave the room.",
    ],
  },
  {
    title: "Supporting someone without burning out",
    minutes: 4,
    intro: "Caregivers often run on empty for weeks. A structure protects you both.",
    points: [
      "Choose one family contact for the hospital. Repeated, slightly different updates create panic.",
      "Take shifts. Two exhausted people at the bedside help less than one rested one.",
      "Eat and sleep on a schedule, not on how you feel — feelings will keep telling you there's no time.",
      "Let people help with specific tasks: food, laundry, a lift. Vague offers rarely turn into help.",
      "Your own fear is allowed room. Say it out loud somewhere, even into the journal in this app.",
    ],
  },
  {
    title: "Understanding tests and reports without spiralling",
    minutes: 3,
    intro: "A number out of context can frighten far more than the situation warrants.",
    points: [
      "Reference ranges vary by lab, age and sex. A flagged value is a prompt to look closer, not a diagnosis.",
      "One abnormal reading is often repeated before anything is concluded.",
      "Trends over time matter more to your doctor than any single result.",
      "Search engines surface the rarest, worst outcomes first. Write the question down instead.",
      "Ask: 'what does this result change about my treatment?' That's the part that actually affects you.",
    ],
  },
  {
    title: "Your rights as a patient or family member",
    minutes: 3,
    intro: "Asking is not being difficult. These are ordinary, expected requests.",
    points: [
      "You can ask for an explanation in a language you understand, and for it to be repeated.",
      "You can ask for a written cost estimate before planned treatment.",
      "You can request copies of your reports and your discharge summary.",
      "You can ask for a second opinion without affecting the care you receive.",
      "You can raise a concern with patient relations if the ward could not resolve it.",
    ],
  },
  {
    title: "Coming home: the first week after discharge",
    minutes: 3,
    intro: "Discharge is a handover, not an ending. The first week needs a plan.",
    points: [
      "Lay out medicines by time of day for the whole week on day one.",
      "Write down the warning signs that mean 'come back now' and stick them where everyone can see.",
      "Confirm the follow-up date, the doctor's name and what to bring.",
      "Expect tiredness. Recovery is rarely a straight line upward.",
      "Keep the discharge summary in one place and carry it to every appointment.",
    ],
  },
];

function LearnPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Clarify uncertainty</p>
        <h1 className="mt-3 text-4xl">Learning centre</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Short guides for the parts of hospital life nobody explains — written to be read standing in a corridor.
        </p>

        <div className="mt-10 space-y-5">
          {GUIDES.map((g) => (
            <article key={g.title} className="rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl">{g.title}</h2>
                <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{g.minutes} min read</span>
              </div>
              <p className="mt-2 text-muted-foreground">{g.intro}</p>
              <ul className="mt-4 space-y-2">
                {g.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild className="rounded-full px-6"><Link to="/glossary">Hospital glossary <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button asChild variant="outline" className="rounded-full px-6"><Link to="/faq">Questions people ask</Link></Button>
        </div>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}
