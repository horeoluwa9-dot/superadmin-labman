import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { toast } from "sonner";

type D = { id: string; code: string; name: string; speciality: string; practice: string; area: string; rep: string; adrc: number; status: "Active"|"Lead"|"Lost" };
const ROWS: D[] = [
  { id: "DR-1041", code: "MP-44120", name: "Dr. M. Pillay",  speciality: "GP",           practice: "Pillay Family Medical",   area: "Booysens",   rep: "Carmen Angelica", adrc: 18, status: "Active" },
  { id: "DR-1042", code: "JS-22871", name: "Dr. J. Singh",   speciality: "Endocrinology",practice: "Singh Endocrine Clinic",  area: "Durban",     rep: "Ike Igbo MBA",    adrc: 9,  status: "Active" },
  { id: "DR-1043", code: "TN-77321", name: "Dr. T. Nkosi",   speciality: "Paediatrics",  practice: "Nkosi Paediatrics",       area: "Polokwane",  rep: "Patrick Magupya", adrc: 14, status: "Active" },
  { id: "DR-1044", code: "AB-33240", name: "Dr. A. Botha",   speciality: "GP",           practice: "Botha & Partners",        area: "Cape Town",  rep: "Carmen Angelica", adrc: 11, status: "Lead" },
  { id: "DR-1045", code: "VK-91142", name: "Dr. V. Kambule", speciality: "OB-GYN",       practice: "Westridge Womens",        area: "JHB North",  rep: "Makoane N.",      adrc: 6,  status: "Active" },
  { id: "DR-1046", code: "OO-66421", name: "Dr. O. Okonkwo", speciality: "Internal Med", practice: "Okonkwo Medical Centre",  area: "Lagos VI",   rep: "mr francis ike",  adrc: 22, status: "Active" },
  { id: "DR-1047", code: "RM-12091", name: "Dr. R. Moyo",    speciality: "GP",           practice: "Moyo Family Practice",    area: "Harare",     rep: "P. Moyo",         adrc: 7,  status: "Lost" },
];
const cols: Column<D>[] = [
  { header: "Code", cell: r => r.code, mono: true },
  { header: "Doctor", cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Speciality", cell: r => <span className="pill-info text-[10px]">{r.speciality}</span> },
  { header: "Practice", cell: r => r.practice },
  { header: "Area", cell: r => r.area },
  { header: "Assigned Rep", cell: r => r.rep },
  { header: "ADRC", cell: r => <span className="font-mono">{r.adrc}/day</span> },
  { header: "Status", cell: r => <Pill tone={r.status==="Active"?"success":r.status==="Lead"?"warning":"danger"}>{r.status}</Pill> },
];
import { NEW_DOCTOR_FIELDS, NEW_NEWSLETTER_FIELDS } from "@/lib/forms";
import { useDrawer } from "@/components/shared/DetailDrawer";

export default function Doctors() {
  const form = useFormDialog();
  const drawer = useDrawer();
  return <EntityList kicker="Section 5F · Administration" title="Doctor Registry" breadcrumb={["Administration","Doctors"]}
    primaryLabel="New Doctor" formFields={NEW_DOCTOR_FIELDS} formSize="xl" rows={ROWS} columns={cols}
    kpis={[
      { label: "Active Doctors", value: ROWS.filter(r=>r.status==="Active").length, accent: "navy" },
      { label: "Total ADRC/day", value: ROWS.reduce((s,r)=>s+r.adrc,0), accent: "gold" },
      { label: "Open Leads", value: ROWS.filter(r=>r.status==="Lead").length, accent: "warn" },
      { label: "Churned (90d)", value: 4, accent: "red" },
    ]}
    getDrawer={r => ({
      title: r.name,
      subtitle: `${r.code} · ${r.speciality}`,
      meta: { Practice: r.practice, Area: r.area, "Assigned Rep": r.rep, "ADRC/day": r.adrc, Status: r.status },
      body: <div className="text-xs text-muted-foreground"><p>Recent activity:</p><ul className="mt-2 space-y-1"><li>• Last requisition: 2 days ago</li><li>• Active MOA: TPL-Standard 2026 (current)</li><li>• Past MOA: 2024-2025 (archived)</li></ul></div>,
      actions: [
        { label: "Open Doctor Profile", tone: "primary", onClick: () => toast.success(`Opening ${r.name} profile`) },
        { label: "View / Create MOA", onClick: () => drawer.open({
            title: `MOA — ${r.name}`,
            meta: { Doctor: r.name, "Current MOA": "TPL-Standard 2026", "Past MOA": "2024-2025 (archived)", "Discount %": "12%", "Effective": "01/01/2026" },
            actions: [
              { label: "Create New MOA", tone: "primary", onClick: () => form.open({ title: `Create MOA for ${r.name}`, fields: [
                { name: "name", label: "MOA Name", required: true },
                { name: "discount", label: "Discount %", type: "number", required: true },
                { name: "effective", label: "Effective from", type: "date", required: true },
                { name: "expires", label: "Expires", type: "date", required: true },
                { name: "tests", label: "Covered tests", type: "multiselect", options: ["FBC","U&E","HBA1C","TSH","Lipogram","HIV PCR"], span: 2 },
                { name: "terms", label: "Terms & conditions", type: "textarea", span: 2, required: true },
              ], size: "lg" }) },
              { label: "View Past MOAs", onClick: () => toast.success("3 archived MOAs displayed") },
              { label: "Print MOA PDF", onClick: () => window.print() },
            ],
          }) },
        { label: "Send Newsletter", onClick: () => form.open({ title: `Send Newsletter — ${r.name}`, fields: NEW_NEWSLETTER_FIELDS, size: "xl", submitLabel: "Send" }) },
      ],
    })}
  />;
}
