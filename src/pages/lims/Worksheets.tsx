import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { FlaskConical, Microscope, Beaker, TestTube, Droplets, Bug } from "lucide-react";

const dept = [
  { name: "HIV", icon: Droplets, branch: "Booysens", date: "30 Apr 2026", tech: "ms ntswaki maleke", count: 42, status: "In Progress" },
  { name: "Chemistry (CHEM)", icon: Beaker, branch: "Pretoria", date: "30 Apr 2026", tech: "Lab Tech 04", count: 87, status: "In Progress" },
  { name: "Haematology", icon: Droplets, branch: "Booysens", date: "30 Apr 2026", tech: "mrs ida thakam", count: 61, status: "Pending Review" },
  { name: "Microbiology", icon: Bug, branch: "Cape Town", date: "30 Apr 2026", tech: "Lab Tech 12", count: 23, status: "Awaiting Specimen" },
  { name: "Histology", icon: Microscope, branch: "Durban", date: "30 Apr 2026", tech: "mr francis ike", count: 11, status: "In Progress" },
  { name: "Virology", icon: TestTube, branch: "JHB HQ", date: "30 Apr 2026", tech: "Lab Tech 07", count: 18, status: "Pending Review" },
];

export default function Worksheets() {
  const drawer = useDrawer();
  const openWorksheet = (d: typeof dept[0]) => drawer.open({
    title: `${d.name} — Worksheet`,
    subtitle: `${d.branch} · ${d.date} · ${d.tech}`,
    meta: { Specimens: d.count, Status: d.status, Branch: d.branch, Technician: d.tech, "Last Sync": "Now" },
    body: (
      <div className="space-y-3">
        <div className="font-semibold text-navy">Specimens (sample)</div>
        <table className="w-full text-xs">
          <thead><tr className="border-b text-muted-foreground"><th className="text-left py-1">Lab #</th><th className="text-left">Test</th><th className="text-left">Status</th></tr></thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-1 font-mono">TPL-2026-04-30-{(140 + i).toString().padStart(4, "0")}</td>
                <td>{["FBC","HBA1C","HIV PCR","TSH","CRP","Lipogram"][i]}</td>
                <td><Pill tone={i < 3 ? "success" : i < 5 ? "warning" : "muted"}>{i < 3 ? "Resulted" : i < 5 ? "On analyzer" : "Pending"}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-[11px] text-muted-foreground bg-muted/50 p-2 rounded">QC: Levey-Jennings within 2σ · Last cal 06:00</div>
      </div>
    ),
    actions: [
      { label: "Open in Full Worksheet View", tone: "primary" },
      { label: "Print Worksheet" },
      { label: "Release Selected Results" },
      { label: "Add QC Run" },
    ],
  });

  return (
    <>
      <PageHeader kicker="Section 3C" title="Worksheets" breadcrumb={["Laboratory", "Worksheets"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dept.map((d) => {
          const Icon = d.icon;
          return (
            <Panel key={d.name + d.branch}>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-target/10 flex items-center justify-center text-target">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-navy">{d.name}</h3>
                    <Pill tone={d.status === "In Progress" ? "warning" : d.status === "Pending Review" ? "info" : "muted"}>{d.status}</Pill>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{d.branch} · {d.date}</div>
                  <div className="text-xs mt-2">Tech: <span className="font-medium">{d.tech}</span></div>
                  <div className="text-2xl font-bold text-navy mt-3">{d.count} <span className="text-xs font-normal text-muted-foreground">specimens</span></div>
                  <button onClick={() => openWorksheet(d)} className="mt-3 w-full bg-navy hover:bg-navy-deep text-white text-xs font-semibold py-2 rounded-md">Open Worksheet</button>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
