import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  title, breadcrumb, actions, kicker,
}: { title: string; breadcrumb?: string[]; actions?: ReactNode; kicker?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker && <div className="text-[11px] font-semibold tracking-widest text-target uppercase mb-1">{kicker}</div>}
        <h1 className="text-2xl font-bold text-navy tracking-tight">{title}</h1>
        {breadcrumb && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <ChevronRight className="h-3 w-3 mx-1" />}
                <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>{b}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
