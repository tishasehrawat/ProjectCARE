import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Comfort & accessibility settings · Project CARE" },
      { name: "description", content: "Make the app easier to read: larger text, calmer motion, higher contrast — and clear everything stored on this device." },
      { property: "og:title", content: "Comfort & accessibility settings · Project CARE" },
      { property: "og:description", content: "Larger text, calmer motion, higher contrast, and full control of your saved data." },
    ],
  }),
  component: SettingsPage,
});

const STORE_KEYS = ["care.notes", "care.journal", "care.contacts", "care.dailyacts", "care.checkin"];

function SettingsPage() {
  const [textSize, setTextSize] = useState(100);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("care.a11y");
      if (raw) {
        const v = JSON.parse(raw);
        setTextSize(v.textSize ?? 100);
        setReduceMotion(!!v.reduceMotion);
        setHighContrast(!!v.highContrast);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${textSize}%`;
    root.classList.toggle("care-reduce-motion", reduceMotion);
    root.classList.toggle("care-high-contrast", highContrast);
    try { localStorage.setItem("care.a11y", JSON.stringify({ textSize, reduceMotion, highContrast })); } catch { /* ignore */ }
  }, [textSize, reduceMotion, highContrast]);

  const clearAll = () => {
    STORE_KEYS.forEach((k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } });
    setCleared(true);
    setTimeout(() => setCleared(false), 2500);
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Make it yours</p>
        <h1 className="mt-3 text-4xl">Comfort & accessibility</h1>
        <p className="mt-3 text-muted-foreground">
          Hospital light is harsh and hands shake. Adjust anything that makes reading easier — it saves on this device.
        </p>

        <section className="mt-10 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">Text size</h2>
          <p className="mt-1 text-sm text-muted-foreground">Currently {textSize}% of normal.</p>
          <input
            type="range"
            min={90}
            max={150}
            step={5}
            value={textSize}
            onChange={(e) => setTextSize(Number(e.target.value))}
            aria-label="Text size"
            className="mt-5 w-full accent-primary"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Smaller</span><span>Larger</span></div>
          <Button variant="outline" className="mt-4 rounded-full px-5" onClick={() => setTextSize(100)}>Reset size</Button>
        </section>

        <section className="mt-6 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">Display</h2>
          <Toggle
            label="Calmer motion"
            hint="Stops the breathing circle and background shapes from animating."
            on={reduceMotion}
            set={setReduceMotion}
          />
          <Toggle
            label="Higher contrast"
            hint="Darkens text and strengthens borders for bright corridors and tired eyes."
            on={highContrast}
            set={setHighContrast}
          />
        </section>

        <section className="mt-6 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">Language</h2>
          <p className="mt-1 text-sm text-muted-foreground">English, हिन्दी and ಕನ್ನಡ are available across the app.</p>
          <div className="mt-4"><LanguageSwitcher /></div>
        </section>

        <section className="mt-6 rounded-3xl border border-border/60 bg-card p-7 shadow-soft">
          <h2 className="text-xl">Your data</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you write — notes, journal entries, contacts, daily ticks — stays in this browser. Nothing is uploaded, and nobody else can see it. Clearing is permanent.
          </p>
          <Button variant="destructive" className="mt-4 rounded-full px-5" onClick={clearAll}>
            <Trash2 className="h-4 w-4" /> {cleared ? "Cleared" : "Clear everything saved here"}
          </Button>
        </section>

        <DisclaimerBanner variant="long" />
      </main>
      <AppFooter />
    </div>
  );
}

function Toggle({ label, hint, on, set }: { label: string; hint: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <button
      onClick={() => set(!on)}
      aria-pressed={on}
      className="mt-4 flex w-full items-start justify-between gap-4 rounded-2xl border border-border/60 bg-background px-5 py-4 text-left transition-colors hover:bg-accent/40"
    >
      <span>
        <span className="block font-medium">{label}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{hint}</span>
      </span>
      <span className={`mt-1 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`h-5 w-5 rounded-full bg-background shadow transition-transform ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}
