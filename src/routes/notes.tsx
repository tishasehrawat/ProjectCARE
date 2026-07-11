import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Pin, PinOff, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Consultation notes · Project CARE" },
      { name: "description", content: "Keep private notes from your consultations — questions, instructions, medicine names, follow-up dates." },
    ],
  }),
  component: NotesPage,
});

type Note = { id: string; title: string; body: string; pinned: boolean; date: string };

const KEY = "care.notes";

function load(): Note[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => { setNotes(load()); }, []);

  const save = (next: Note[]) => {
    setNotes(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const add = () => {
    if (!title.trim() && !body.trim()) return;
    const n: Note = {
      id: crypto.randomUUID(),
      title: title.trim() || "Untitled note",
      body: body.trim(),
      pinned: false,
      date: new Date().toISOString(),
    };
    save([n, ...notes]);
    setTitle(""); setBody("");
  };

  const togglePin = (id: string) => save(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  const remove = (id: string) => save(notes.filter(n => n.id !== id));

  const ordered = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Consultation notes</p>
        <h1 className="mt-3 text-3xl md:text-4xl">Keep what you were told, in one place.</h1>
        <p className="mt-3 text-muted-foreground">
          Write down questions, doctor's instructions, medicine names, or follow-up dates. Notes stay privately on this device.
        </p>
        <DisclaimerBanner />

        <section className="mt-8 rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title — e.g. Dr. Rao consultation, Nov 12"
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ring"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What did the doctor say? What do you want to remember?"
            className="mt-3 min-h-28 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
          />
          <div className="mt-3 flex justify-end">
            <Button onClick={add} className="rounded-full"><Plus className="h-4 w-4" /> Save note</Button>
          </div>
        </section>

        <section className="mt-8 space-y-3">
          {ordered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              No notes yet. Your first note will appear here.
            </p>
          ) : ordered.map((n) => (
            <article key={n.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-medium">{n.title}</h3>
                  <p className="text-xs text-muted-foreground">{new Date(n.date).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => togglePin(n.id)} className="rounded-full p-2 hover:bg-accent" aria-label="Pin">
                    {n.pinned ? <PinOff className="h-4 w-4 text-primary" /> : <Pin className="h-4 w-4" />}
                  </button>
                  <button onClick={() => remove(n.id)} className="rounded-full p-2 hover:bg-destructive/10" aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
              {n.body && <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{n.body}</p>}
            </article>
          ))}
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
