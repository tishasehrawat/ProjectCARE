import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function AppHeader() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-calm shadow-soft">
            <Heart className="h-4 w-4 text-primary" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg">Project CARE</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("tagline")}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link to="/checkin" activeProps={{ className: "text-foreground font-medium" }}>{t("nav.checkin")}</Link>
          <Link to="/context" activeProps={{ className: "text-foreground font-medium" }}>{t("nav.pathways")}</Link>
          <Link to="/comfort" activeProps={{ className: "text-foreground font-medium" }}>{t("nav.comfort")}</Link>
          <Link to="/communicate" activeProps={{ className: "text-foreground font-medium" }}>{t("nav.ask")}</Link>
          <Link to="/notes" activeProps={{ className: "text-foreground font-medium" }}>{t("nav.notes")}</Link>
          <Link to="/journal" activeProps={{ className: "text-foreground font-medium" }}>{t("nav.journal")}</Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export function AppFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">{t("footer.note")}</p>
        <p className="mt-1 max-w-2xl">{t("footer.body")}</p>
        <p className="mt-4">Project CARE · Pilot concept · Designed with hospitals like Narayana Health in mind.</p>
      </div>
    </footer>
  );
}
