import { Globe } from "lucide-react";
import { useI18n, LANG_NAMES, type Lang } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <label className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-xs text-muted-foreground">
      <Globe className="h-3.5 w-3.5" />
      <span className="sr-only">{t("lang.label")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="cursor-pointer bg-transparent pr-1 outline-none"
        aria-label={t("lang.label")}
      >
        {(Object.keys(LANG_NAMES) as Lang[]).map((l) => (
          <option key={l} value={l}>{LANG_NAMES[l]}</option>
        ))}
      </select>
    </label>
  );
}
