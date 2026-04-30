import { PageHeader, Panel, fmtZAR } from "@/components/shared/Toolbar";

const cols: { name: string; tone: string; leads: { name: string; value: number; rep: string; days: number }[] }[] = [
  { name: "New",          tone: "bg-slate-100 text-slate-700",   leads: [{ name: "Dr. K. Mokoena", value: 24000, rep: "Patrick M.", days: 2 }, { name: "Sandton Clinic", value: 56000, rep: "Carmen A.", days: 1 }] },
  { name: "Contacted",    tone: "bg-blue-100 text-blue-800",     leads: [{ name: "Dr. T. Naidoo", value: 18000, rep: "Makoane N.", days: 4 }] },
  { name: "Meeting",      tone: "bg-purple-100 text-purple-800", leads: [{ name: "Tygerberg Group", value: 142000, rep: "Carmen A.", days: 6 }] },
  { name: "Negotiation",  tone: "bg-amber-100 text-amber-800",   leads: [{ name: "Polokwane Med", value: 78000, rep: "Patrick M.", days: 9 }] },
  { name: "Converted",    tone: "bg-emerald-100 text-emerald-800", leads: [{ name: "Maponya Practice", value: 64000, rep: "Ike Igbo", days: 12 }] },
  { name: "Lost",         tone: "bg-red-100 text-red-800",       leads: [] },
];

export default function Pipeline() {
  return (
    <>
      <PageHeader kicker="Section 6C · Sales" title="Lead Pipeline" breadcrumb={["Sales", "Pipeline"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg">Add Lead</button>} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cols.map((c) => (
          <div key={c.name} className="bg-muted/40 rounded-lg p-2 min-h-[300px]">
            <div className={`pill ${c.tone} mb-2`}>{c.name} · {c.leads.length}</div>
            <div className="space-y-2">
              {c.leads.map((l) => (
                <div key={l.name} className="bg-white rounded-md border border-border p-2.5 cursor-grab hover:shadow-card transition-shadow">
                  <div className="font-semibold text-xs text-navy">{l.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{l.rep}</div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-target">{fmtZAR(l.value)}</span>
                    <span className="text-[10px] text-muted-foreground">{l.days}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
