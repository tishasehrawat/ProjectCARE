import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Users, Save } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Find help in the hospital · Project CARE" },
      { name: "description", content: "Who to reach for what, where to find key hospital desks, and what to do if something feels urgent or unsafe." },
      { property: "og:title", content: "Find help in the hospital · Project CARE" },
      { property: "og:description", content: "Who to ask for what, and what to do when something feels urgent." },
    ],
  }),
  component: HelpPage,
});

const KEY = "care.contacts";
type Contacts = { ward: string; nurseDesk: string; coordinator: string; familyContact: string; notes: string };
const EMPTY: Contacts = { ward: "", nurseDesk: "", coordinator: "", familyContact: "", notes: "" };

const DESKS = [
  { icon: "🛎️", name: "Help desk / reception", what: "Directions, appointment slips, general queries, lost items." },
  { icon: "🧾", name: "Billing & insurance (TPA)", what: "Estimates, cashless approvals, final bill, payment options." },
  { icon: "🧪", name: "Sample collection & lab counter", what: "Blood draws, report collection times, how reports are shared." },
  { icon: "🖥️", name: "Radiology reception", what: "Scan scheduling, preparation instructions, report timing." },
  { icon: "💊", name: "Pharmacy", what: "Dispensing medicines, clarifying names and timings, substitutes." },
  { icon: "🧑‍⚕️", name: "Nursing station of your ward", what: "Day-to-day care, medicine timings, when the doctor is expected." },
  { icon: "🤝", name: "Patient relations / grievance", what: "Concerns about care or communication that the ward could not resolve." },
  { icon: "🍲", name: "Canteen & rest areas", what: "Food, water, a place to sit down when the waiting gets long." },
];

const ASK_WHO = [
  { need: "When will the doctor come?", who: "Nursing station of your ward" },
  { need: "When will my report be ready?", who: "Lab or radiology counter" },
  { need: "What will this cost?", who: "Billing / insurance desk" },
  { need: "How do I take this medicine?", who: "Ward nurse, then pharmacy" },
  { need: "Can we see the patient?", who: "Unit coordinator or nursing station" },
  { need: "We were not told anything for hours", who: "Unit coordinator, then patient relations" },
];

function HelpPage() {
  const [c, setC] = useState<Contacts>(EMPTY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setC({ ...EMPTY, ...JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (label: string, key: keyof Contacts, placeholder: string) => (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        value={c[key]}
        onChange={(e) => setC({ ...c, [key]: e.target.value })}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
      />
    </label>
  );

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Support</p>
        <h1 className="mt-3 text-4xl">Find help in the hospital</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          When you don't know who to ask, the wait feels longer. Here is who handles what — and a place to keep your own numbers.
        </p>

        <section className="mt-10 rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <h2 className="text-xl">If something feels urgent</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· Sudden chest pain, breathlessness, heavy bleeding, fainting, confusion or a seizure — call a nurse or press the call bell <strong className="text-foreground">immediately</strong>. Do not wait to be seen in turn.</li>
                <li>· If you cannot find staff, go to the nearest nursing station or shout for help in the corridor. Hospital teams expect this.</li>
                <li>· If you or someone with you is thinking of self-harm, tell a staff member right now and stay with someone. In India you can also call the Tele-MANAS helpline on <strong className="text-foreground">14416</strong> (24×7, free).</li>
                <li>· Outside a hospital, emergency services in India: <strong className="text-foreground">112</strong>; ambulance <strong className="text-foreground">108</strong>.</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">This app cannot call anyone for you and cannot assess how serious a symptom is. Always reach a human on site first.</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl">Who to ask for what</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
            {ASK_WHO.map((r, i) => (
              <div key={r.need} className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${i ? "border-t border-border/60" : ""}`}>
                <span className="text-sm">{r.need}</span>
                <span className="text-sm font-medium text-primary">{r.who}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl"><MapPin className="h-5 w-5 text-primary" /> Desks you may need</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {DESKS.map((d) => (
              <div key={d.name} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                <div className="text-2xl">{d.icon}</div>
                <h3 className="mt-2 text-lg">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.what}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Exact floors and room numbers differ by hospital — ask at reception and note them below.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-border/60 bg-gradient-calm p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-2xl"><Users className="h-5 w-5 text-primary" /> Our details</h2>
          <p className="mt-1 text-sm text-muted-foreground">Saved only on this device, so the whole family can read from one phone.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {field("Ward / room", "ward", "e.g. 4B, bed 12")}
            {field("Nursing station number", "nurseDesk", "e.g. ext. 4102")}
            {field("Coordinator / named contact", "coordinator", "Name and number")}
            {field("Our family contact person", "familyContact", "Who the hospital should call")}
          </div>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Notes (visiting hours, update times, directions)</span>
            <textarea
              value={c.notes}
              onChange={(e) => setC({ ...c, notes: e.target.value })}
              rows={3}
              placeholder="ICU updates at 11am and 6pm. Lift B to 4th floor."
              className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
            />
          </label>
          <Button onClick={save} className="mt-4 rounded-full px-6">
            <Save className="h-4 w-4" /> {saved ? "Saved" : "Save details"}
          </Button>
        </section>

        <section className="mt-12 rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-2xl"><Phone className="h-5 w-5 text-primary" /> Asking for an update, calmly</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>“I know the team is busy. Could you tell me roughly when we might hear something?”</p>
            <p>“Who is the right person for us to check with, and when is the next update window?”</p>
            <p>“We have been waiting a while and we're worried. Could someone let us know if the plan has changed?”</p>
          </div>
        </section>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}
