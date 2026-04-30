import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { Beaker, TestTube, Bug, Microscope, Droplets, Activity } from "lucide-react";

const depts = [
  { name: "HIV",          code: "HIV",  icon: Droplets,   branches: 24, head: "Dr. M. Phakathi", tests: 12, sla: "24h", iso: "ISO 15189 §5.5" },
  { name: "Chemistry",    code: "CHEM", icon: Beaker,     branches: 27, head: "Dr. R. Yemmy",    tests: 84, sla: "4h",  iso: "ISO 15189 §5.5" },
  { name: "Haematology",  code: "HAEM", icon: Activity,   branches: 25, head: "mrs ida thakam",  tests: 36, sla: "6h",  iso: "ISO 15189 §5.5" },
  { name: "Microbiology", code: "MICRO",icon: Bug,        branches: 18, head: "Dr. F. Ike",      tests: 28, sla: "48h", iso: "ISO 15189 §5.5" },
  { name: "Histology",    code: "HISTO",icon: Microscope, branches: 6,  head: "mr francis ike",  tests: 14, sla: "5d",  iso: "ISO 15189 §5.5" },
  { name: "Virology",     code: "VIRO", icon: TestTube,   branches: 10, head: "Dr. M. Phakathi", tests: 22, sla: "72h", iso: "ISO 15189 §5.5" },
];

export default function Departments() {
  return (
    <>
      <PageHeader kicker="Section 5C · Administration" title="Departments" breadcrumb={["Administration", "Departments"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg">Create Department</button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {depts.map((d) => {
          const Icon = d.icon;
          return (
            <Panel key={d.code}>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-red text-white flex items-center justify-center"><Icon className="h-6 w-6" /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-navy">{d.name}</h3>
                    <span className="pill-muted">{d.code}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Operates in <span className="font-semibold text-foreground">{d.branches}</span> branches</p>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div><dt className="text-muted-foreground">Head of Dept</dt><dd className="font-medium">{d.head}</dd></div>
                <div><dt className="text-muted-foreground">Tests</dt><dd className="font-medium">{d.tests}</dd></div>
                <div><dt className="text-muted-foreground">TAT SLA</dt><dd className="font-medium font-mono">{d.sla}</dd></div>
                <div><dt className="text-muted-foreground">ISO Ref</dt><dd className="font-mono text-[10px]">{d.iso}</dd></div>
              </dl>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <Pill tone="success">Active</Pill>
                <button className="text-xs text-target font-semibold">Configure →</button>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
