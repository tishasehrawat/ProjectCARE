import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function DisclaimerBanner({ variant = "short" }: { variant?: "short" | "long" }) {
  const { t } = useI18n();
  return (
    <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>{variant === "long" ? t("disclaimer.long") : t("disclaimer.short")}</p>
    </div>
  );
}
