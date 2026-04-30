import { PageHeader, Panel, Pill, DataToolbar, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { NEW_TEST_FIELDS } from "@/lib/forms";

const tests = [
  { code: "HBA1C",   name: "Glycated Haemoglobin (HbA1c)", dept: "CHEM",  spec: "EDTA", cont: "Lavender",  tat: 4,  base: 280, aid: 245, mp: "PRX-CHE-204", machine: "Cobas 6000",  flag: "" },
  { code: "FBC",     name: "Full Blood Count",              dept: "HAEM",  spec: "EDTA", cont: "Lavender",  tat: 2,  base: 145, aid: 132, mp: "PRX-HAE-102", machine: "Sysmex XN",   flag: "" },
  { code: "HIV-RNA", name: "HIV PCR Viral Load",            dept: "VIRO",  spec: "Plasma", cont: "Plasma",  tat: 24, base: 1450, aid: 1280, mp: "PRX-VIR-014", machine: "COBAS 4800", flag: "Notifiable" },
  { code: "TBC",     name: "TB Culture (MTB/RIF Xpert)",    dept: "MICRO", spec: "Sputum", cont: "Sterile", tat: 48, base: 720,  aid: 645,  mp: "PRX-MIC-009", machine: "GeneXpert",  flag: "Notifiable" },
  { code: "PSA",     name: "Prostate-Specific Antigen",     dept: "CHEM",  spec: "Serum",  cont: "Gold-top", tat: 4,  base: 320,  aid: 295,  mp: "PRX-CHE-088", machine: "Architect", flag: "High-Value" },
];

export default function Tests() {
  const form = useFormDialog();
  return (
    <>
      <PageHeader kicker="Section 5G · Administration" title="Tests · Master List" breadcrumb={["Administration", "Tests"]} />
      <Panel>
        <DataToolbar primaryLabel="Create Test" onPrimary={() => form.open({ title: "Create Test", fields: NEW_TEST_FIELDS, size: "xl" })} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th><th>Test Name</th><th>Dept</th><th>Specimen</th><th>Container</th>
                <th className="text-right">TAT (h)</th><th className="text-right">Base (ZAR)</th>
                <th className="text-right">Aid (ZAR)</th><th>MedPrax</th><th>Analyzer</th><th>Flags</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (
                <tr key={t.code}>
                  <td className="font-mono text-xs font-bold">{t.code}</td>
                  <td className="font-medium text-xs">{t.name}</td>
                  <td><span className="pill-muted">{t.dept}</span></td>
                  <td className="text-xs">{t.spec}</td>
                  <td className="text-xs">{t.cont}</td>
                  <td className="text-right font-mono text-xs">{t.tat}</td>
                  <td className="text-right font-mono text-xs">{fmtZAR(t.base)}</td>
                  <td className="text-right font-mono text-xs">{fmtZAR(t.aid)}</td>
                  <td className="font-mono text-[10px]">{t.mp}</td>
                  <td className="text-xs">{t.machine}</td>
                  <td>{t.flag === "Notifiable" ? <Pill tone="danger">Notifiable</Pill> : t.flag === "High-Value" ? <span className="pill-gold">High-Value</span> : "—"}</td>
                  <td><Pill tone="success">Active</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={284} />
        </div>
      </Panel>
    </>
  );
}
