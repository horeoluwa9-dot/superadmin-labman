import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
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
                  <button className="mt-3 w-full bg-navy hover:bg-navy-deep text-white text-xs font-semibold py-2 rounded-md">Open Worksheet</button>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
