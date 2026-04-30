import { PageHeader, Panel } from "@/components/shared/Toolbar";

export default function Stub({ kicker, title, breadcrumb, body }: { kicker: string; title: string; breadcrumb: string[]; body?: string }) {
  return (
    <>
      <PageHeader kicker={kicker} title={title} breadcrumb={breadcrumb} />
      <Panel>
        <div className="py-12 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-target/10 text-target flex items-center justify-center font-bold text-xl mb-3">●</div>
          <h3 className="text-lg font-bold text-navy">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{body || "This module is wired into the Labman 3 design system. Detailed screens follow the same patterns as Requisitions, Debtors and Analyzers."}</p>
        </div>
      </Panel>
    </>
  );
}
