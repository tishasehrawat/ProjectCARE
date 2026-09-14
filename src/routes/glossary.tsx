import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Search } from "lucide-react";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Hospital glossary · Project CARE" },
      { name: "description", content: "Plain-language meanings for common hospital words — from NPO and vitals to biopsy, ICU and discharge summary." },
      { property: "og:title", content: "Hospital glossary · Project CARE" },
      { property: "og:description", content: "Plain-language meanings for common hospital words." },
    ],
  }),
  component: GlossaryPage,
});

type Term = { term: string; short: string; plain: string; group: string };

const TERMS: Term[] = [
  { term: "Vitals", short: "Body's basic readings", plain: "Temperature, pulse, breathing rate, blood pressure and oxygen level. Staff check these often to see how you are doing.", group: "Everyday" },
  { term: "NPO / Nil by mouth", short: "No food or drink", plain: "You are asked not to eat or drink, usually before surgery or certain tests, so your stomach is empty and safe.", group: "Before procedures" },
  { term: "IV line", short: "Tube into a vein", plain: "A thin tube placed in a vein to give fluids or medicine without repeated injections.", group: "Everyday" },
  { term: "Consent form", short: "Your permission", plain: "A form explaining a procedure, its benefits and risks. Signing means the team explained it and you agreed. You can ask questions before signing.", group: "Before procedures" },
  { term: "Anaesthesia", short: "Medicine for no pain", plain: "Medicine that keeps you pain-free — either numbing one area or keeping you asleep for the whole procedure.", group: "Surgery" },
  { term: "Pre-op", short: "Before surgery", plain: "The checks and preparation done before an operation: tests, fasting, consent and meeting the anaesthetist.", group: "Surgery" },
  { term: "Post-op", short: "After surgery", plain: "The recovery period after an operation, including pain control, wound care and gradual return to eating and walking.", group: "Surgery" },
  { term: "Recovery room / PACU", short: "Waking-up room", plain: "A monitored room where you wake after surgery until your breathing, pulse and pain are stable.", group: "Surgery" },
  { term: "ICU", short: "Intensive care", plain: "A unit for patients who need close, round-the-clock monitoring with specialised equipment and staff.", group: "Wards" },
  { term: "HDU", short: "Step-down care", plain: "A unit with more monitoring than a general ward but less than the ICU. Often a good sign of progress.", group: "Wards" },
  { term: "Rounds", short: "Doctor's daily visit", plain: "Set times when doctors review each patient and update the plan. Family updates usually follow rounds.", group: "Wards" },
  { term: "Biopsy", short: "Tissue sample", plain: "A small piece of tissue taken and examined under a microscope to understand what is happening.", group: "Tests" },
  { term: "CT scan", short: "Detailed X-ray", plain: "A scan that takes many X-ray slices to build a detailed picture of the inside of the body.", group: "Tests" },
  { term: "MRI", short: "Magnet-based scan", plain: "A scan using magnets and radio waves. It is loud and takes longer, but uses no radiation.", group: "Tests" },
  { term: "Contrast", short: "Dye for clearer images", plain: "A liquid given by drink or injection that makes certain areas show up clearly on a scan.", group: "Tests" },
  { term: "CBC", short: "Complete blood count", plain: "A common blood test that counts red cells, white cells and platelets to check for infection, anaemia and more.", group: "Tests" },
  { term: "Fasting sample", short: "Blood taken empty-stomach", plain: "A blood test after not eating for some hours, so values like sugar and cholesterol are reliable.", group: "Tests" },
  { term: "Prognosis", short: "Likely course ahead", plain: "The doctor's expectation of how the condition may progress. It is an estimate, not a certainty.", group: "Conversations" },
  { term: "Second opinion", short: "Another doctor's view", plain: "Asking a different specialist to review your case. It is a normal, accepted request.", group: "Conversations" },
  { term: "Discharge summary", short: "Your stay in writing", plain: "A document listing your diagnosis, treatment, medicines and follow-up plan. Keep it safe and carry it to every visit.", group: "Going home" },
  { term: "Follow-up", short: "Next planned visit", plain: "A scheduled review to check healing and adjust treatment. Confirm the date and doctor before leaving.", group: "Going home" },
  { term: "TPA / Cashless", short: "Insurance processing", plain: "The team that coordinates with your insurer so the hospital bills them directly. Approvals can add waiting time.", group: "Billing" },
  { term: "Estimate", short: "Expected cost", plain: "An approximate cost of your treatment given in advance. The final bill can differ if the plan changes.", group: "Billing" },
];

export function GlossaryPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return TERMS;
    return TERMS.filter((t) => (t.term + t.short + t.plain + t.group).toLowerCase().includes(s));
  }, [q]);

  const groups = useMemo(() => {
    const map = new Map<string, Term[]>();
    filtered.forEach((t) => map.set(t.group, [...(map.get(t.group) ?? []), t]));
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Clarify uncertainty</p>
        <h1 className="mt-3 text-4xl">Hospital glossary</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Hospital words can sound heavier than they are. Here is what the common ones actually mean, in everyday language.
        </p>

        <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a word you heard…"
            aria-label="Search glossary"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {groups.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            No match. Try a shorter word, or ask your nurse to write the term down so you can search it.
          </p>
        )}

        <div className="mt-8 space-y-10">
          {groups.map(([group, terms]) => (
            <section key={group}>
              <h2 className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{group}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {terms.map((t) => (
                  <div key={t.term} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                    <h3 className="text-lg">{t.term}</h3>
                    <p className="text-xs uppercase tracking-wide text-primary">{t.short}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{t.plain}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}
