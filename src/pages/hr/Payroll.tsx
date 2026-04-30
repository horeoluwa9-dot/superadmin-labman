import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Banknote, Download, FileText, Play } from "lucide-react";

const RUNS = [
  { month: "April 2026",   gross: 1842500, net: 1421300, staff: 35, status: "Draft" as const },
  { month: "March 2026",   gross: 1798200, net: 1389100, staff: 35, status: "Paid"  as const },
  { month: "February 2026",gross: 1772400, net: 1370900, staff: 34, status: "Paid"  as const },
  { month: "January 2026", gross: 1764800, net: 1364800, staff: 34, status: "Paid"  as const },
];

const PAYSLIPS = [
  { staff: "William Nettmann", role: "Developer",  branch: "Booysens",   gross: 65000, comm:    0, ded: 14820, net: 50180 },
  { staff: "mr francis ike",   role: "Path/Admin", branch: "Lagos",      gross: 92000, comm:    0, ded: 22480, net: 69520 },
  { staff: "Patrick Magupya",  role: "Manager",    branch: "Head Office",gross: 48500, comm: 6200, ded: 12420, net: 42280 },
  { staff: "CARMEN ANGELICA",  role: "Rep",        branch: "Cape Town",  gross: 22000, comm:18900, ded:  9210, net: 31690 },
  { staff: "J. Pieters",       role: "Driver",     branch: "Booysens",   gross: 14500, comm:    0, ded:  2890, net: 11610 },
  { staff: "Sister A. Naidoo", role: "Phlebot.",   branch: "Booysens",   gross: 18200, comm:    0, ded:  3480, net: 14720 },
];

export default function Payroll() {
  const drawer = useDrawer();
  const current = RUNS[0];
  return (
    <>
      <PageHeader kicker="Section 7D · HR" title="Payroll" breadcrumb={["HR & Staff", "Payroll"]}
        actions={<>
          <button onClick={() => drawer.open({
            title: `Run Payroll — ${current.month}`,
            subtitle: "All hours, commission & expenses imported automatically",
            meta: { Staff: current.staff, "Gross (ZAR)": fmtZAR(current.gross), "Net (ZAR)": fmtZAR(current.net), Status: current.status },
            body: <p className="text-muted-foreground">Confirms generation of payslips, EFT batch file, and SARS export. Locked once submitted.</p>,
            actions: [{ label: "Process & Lock", tone: "primary" }, { label: "Recalculate" }, { label: "Cancel" }],
          })} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5"><Play className="h-3.5 w-3.5" /> Process April</button>
          <button className="border border-border text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5 ml-2"><Download className="h-3.5 w-3.5" /> EFT Batch</button>
        </>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Gross Payroll · April" value={fmtZAR(current.gross)} accent="navy" icon={<Banknote className="h-4 w-4" />} delta="+2.4% vs Mar" />
        <KpiCard label="Net Payroll · April"  value={fmtZAR(current.net)}   accent="success" sub="After deductions" />
        <KpiCard label="Commission Pool"      value={fmtZAR(82400)}         accent="gold" sub="14 reps eligible" />
        <KpiCard label="Headcount"            value={current.staff}         accent="red" sub="0 new · 0 exits" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Payroll Runs" className="lg:col-span-1">
          {RUNS.map(r => (
            <button key={r.month} onClick={() => drawer.open({
              title: `Payroll — ${r.month}`,
              meta: { Gross: fmtZAR(r.gross), Net: fmtZAR(r.net), Headcount: r.staff, Status: r.status },
              actions: [{ label: "Download Payslips ZIP", tone: "primary" }, { label: "Re-export EFT" }],
            })} className="w-full flex items-center justify-between py-2.5 border-b border-border last:border-0 hover:bg-muted/40 px-2 -mx-2 rounded">
              <div className="text-left">
                <div className="text-sm font-semibold text-navy">{r.month}</div>
                <div className="text-[11px] text-muted-foreground">{r.staff} staff · {fmtZAR(r.net)} net</div>
              </div>
              <Pill tone={r.status === "Paid" ? "success" : "warning"}>{r.status}</Pill>
            </button>
          ))}
        </Panel>
        <Panel title="Payslips — April 2026" className="lg:col-span-2">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="data-table">
              <thead><tr><th>Staff</th><th>Role</th><th>Branch</th><th>Gross</th><th>Comm</th><th>Deduct</th><th>Net Pay</th><th></th></tr></thead>
              <tbody>{PAYSLIPS.map(p => (
                <tr key={p.staff}>
                  <td className="font-medium">{p.staff}</td>
                  <td className="text-xs text-muted-foreground">{p.role}</td>
                  <td>{p.branch}</td>
                  <td className="font-mono text-xs">{fmtZAR(p.gross)}</td>
                  <td className="font-mono text-xs text-emerald-700">{p.comm ? fmtZAR(p.comm) : "—"}</td>
                  <td className="font-mono text-xs text-red-700">-{fmtZAR(p.ded)}</td>
                  <td className="font-mono font-semibold text-navy">{fmtZAR(p.net)}</td>
                  <td><button onClick={() => drawer.open({
                    title: `Payslip — ${p.staff}`,
                    subtitle: "April 2026",
                    meta: { Role: p.role, Branch: p.branch, Gross: fmtZAR(p.gross), Commission: fmtZAR(p.comm), Deductions: fmtZAR(p.ded), "Net Pay": fmtZAR(p.net) },
                    actions: [{ label: "Download PDF", tone: "primary" }, { label: "Email to Staff" }],
                  })} className="p-1 hover:bg-muted rounded"><FileText className="h-3.5 w-3.5" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
