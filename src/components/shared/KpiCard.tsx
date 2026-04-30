import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function KpiCard({
  label, value, delta, deltaTone = "up", sub, icon, accent,
}: {
  label: string; value: ReactNode; delta?: string;
  deltaTone?: "up" | "down" | "neutral"; sub?: ReactNode;
  icon?: ReactNode; accent?: "red" | "gold" | "navy" | "success" | "warn";
}) {
  const accentBar = {
    red:     "bg-target",
    gold:    "bg-gold",
    navy:    "bg-navy",
    success: "bg-emerald-500",
    warn:    "bg-amber-500",
  }[accent ?? "navy"];

  return (
    <div className="kpi-card relative overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentBar}`} />
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        {icon && <div className="text-muted-foreground/60">{icon}</div>}
      </div>
      <div className="mt-2 text-2xl font-bold text-navy tracking-tight">{value}</div>
      <div className="mt-1.5 flex items-center gap-2 text-xs">
        {delta && (
          <span className={`inline-flex items-center gap-0.5 font-semibold ${
            deltaTone === "up" ? "text-emerald-600" : deltaTone === "down" ? "text-red-600" : "text-muted-foreground"
          }`}>
            {deltaTone === "up" ? <TrendingUp className="h-3 w-3" /> : deltaTone === "down" ? <TrendingDown className="h-3 w-3" /> : null}
            {delta}
          </span>
        )}
        {sub && <span className="text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}
