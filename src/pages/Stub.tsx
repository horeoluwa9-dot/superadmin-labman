import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { ReactNode } from "react";

type Section = { title: string; items: { label: string; value?: ReactNode; tone?: "success" | "warning" | "danger" | "info" | "muted" | "gold"; onClick?: () => void }[] };

export default function Stub({ kicker, title, breadcrumb, sections, intro }: {
  kicker: string; title: string; breadcrumb: string[];
  sections?: Section[]; intro?: ReactNode;
}) {
  return (
    <>
      <PageHeader kicker={kicker} title={title} breadcrumb={breadcrumb} />
      {intro && <div className="mb-4 text-sm text-muted-foreground">{intro}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(sections || []).map((s, i) => (
          <Panel key={i} title={s.title}>
            <div className="space-y-1">
              {s.items.map((it, j) => (
                <div key={j} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
                  <span className="text-muted-foreground">{it.label}</span>
                  {it.tone
                    ? <Pill tone={it.tone}>{it.value}</Pill>
                    : <span className="font-medium font-mono text-xs">{it.value ?? "—"}</span>}
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}

export { fmtZAR };
