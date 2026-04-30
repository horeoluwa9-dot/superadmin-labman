import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";

const branches = ["Booysens","Pretoria","Durban","Cape Town","JHB HQ","Welkom","Polokwane"];
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
function cell(i: number, j: number) {
  const v = (Math.sin(i*1.7+j*1.1)+1)/2; // 0..1
  const intensity = Math.round(v*100);
  const bg = v>0.7 ? `rgba(192,57,43,${0.4+v*0.5})` : v>0.4 ? `rgba(212,160,23,${0.3+v*0.4})` : `rgba(16,185,129,${0.2+v*0.3})`;
  return { v: intensity, bg };
}

export default function QA() {
  return (
    <>
      <PageHeader kicker="Section 12 · QA & ISO" title="QA Command Centre" breadcrumb={["Quality Assurance", "Dashboard"]} />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
        <KpiCard label="Re-run Rate"        value="6.8%"  delta="+0.3pp" deltaTone="down" accent="warn" />
        <KpiCard label="Manual Entry Rate"  value="11.4%" delta="−1.2pp" deltaTone="up"   accent="success" />
        <KpiCard label="Avg TAT vs Target"  value="−18m"  sub="under target" accent="success" />
        <KpiCard label="SLA Breach Count"   value="3"     sub="this week"    accent="warn" />
        <KpiCard label="Compliance Score"   value="96.4%" delta="+0.8pp" deltaTone="up" accent="navy" />
      </div>

      <Panel title="Manual Entry Heatmap" subtitle="Branches × Days of week (% manual entries)" className="mb-5">
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead><tr><th></th>{days.map(d => <th key={d} className="px-2 py-1 text-center font-medium text-muted-foreground">{d}</th>)}</tr></thead>
            <tbody>
              {branches.map((b, i) => (
                <tr key={b}>
                  <td className="pr-3 py-1 text-right text-muted-foreground whitespace-nowrap">{b}</td>
                  {days.map((_, j) => {
                    const c = cell(i, j);
                    return <td key={j} className="p-1"><div style={{ background: c.bg }} className="h-9 rounded-md flex items-center justify-center text-[11px] font-bold text-white">{c.v}%</div></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel title="Re-Run Hotspot Analysis">
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Cobas 6000 · Booysens</span><Pill tone="warning">12.4%</Pill></li>
            <li className="flex justify-between"><span>Sysmex XN · Pretoria</span><Pill tone="danger">18.1%</Pill></li>
            <li className="flex justify-between"><span>Architect · Cape Town</span><Pill tone="success">3.2%</Pill></li>
          </ul>
        </Panel>
        <Panel title="Top Audit Flags (24h)">
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Manual entry · HBA1C × 7</span><Pill tone="warning">Welkom</Pill></li>
            <li className="flex justify-between"><span>Re-run × 3 · Potassium</span><Pill tone="warning">Booysens</Pill></li>
            <li className="flex justify-between"><span>Critical not contacted &gt; 1h</span><Pill tone="danger">Cape Town</Pill></li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
