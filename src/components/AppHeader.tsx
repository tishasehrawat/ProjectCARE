import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-calm shadow-soft">
            <Heart className="h-4 w-4 text-primary" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg">CARE</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Calm · Clarity · Comfort</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link to="/checkin" activeProps={{ className: "text-foreground font-medium" }}>Check-in</Link>
          <Link to="/comfort" activeProps={{ className: "text-foreground font-medium" }}>Comfort</Link>
          <Link to="/communicate" activeProps={{ className: "text-foreground font-medium" }}>Ask your doctor</Link>
        </nav>
      </div>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">A note on safety</p>
        <p className="mt-1 max-w-2xl">
          CARE is a supportive companion — it does not provide diagnosis or medical advice.
          If you feel unsafe or unable to cope, please contact hospital staff immediately.
        </p>
        <p className="mt-4">Project CARE · Pilot concept · Designed with hospitals like Narayana Health in mind.</p>
      </div>
    </footer>
  );
}
