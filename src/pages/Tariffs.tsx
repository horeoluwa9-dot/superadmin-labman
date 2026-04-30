import { useMemo, useState } from "react";
import { PageHeader, Panel, Pill, fmtZAR, Pagination } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useFormDialog } from "@/components/shared/FormDialog";
import { RefreshCw, Search, Download, Upload, Filter, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

const SCHEDULES = ["Cash", "Schedule A", "Schedule B", "Schedule C"] as const;
type Schedule = typeof SCHEDULES[number];

type T = { code: string; name: string; category: string; cash: number; a: number; b: number; c: number; sync: "synced"|"pending"|"variance" };

// Tests transcribed from the Pricelist 2026 (Cash) screenshot
const ROWS: T[] = [
  // ENDOCRINOLOGY
  ["Thyroid tests (no antibodies)","ENDOCRINOLOGY",394],
  ["Thyroid functions with antibodies SA","ENDOCRINOLOGY",394],
  ["TSH","ENDOCRINOLOGY",150],
  ["Free T4","ENDOCRINOLOGY",180],
  ["Free T3","ENDOCRINOLOGY",180],
  ["Thyroid antibodies","ENDOCRINOLOGY",427],
  ["Infertility (female)","ENDOCRINOLOGY",998],
  ["Infertility (male)","ENDOCRINOLOGY",700],
  ["Menopause screen","ENDOCRINOLOGY",555],
  ["FSH","ENDOCRINOLOGY",185],
  ["Luteinizing hormone LH","ENDOCRINOLOGY",185],
  ["Oestradiol (E2)","ENDOCRINOLOGY",185],
  ["Progesterone","ENDOCRINOLOGY",185],
  ["Prolactin","ENDOCRINOLOGY",185],
  ["Testosterone total","ENDOCRINOLOGY",185],
  ["DHEAS","ENDOCRINOLOGY",185],
  ["Insulin","ENDOCRINOLOGY",185],
  ["Cortisol — serum","ENDOCRINOLOGY",208],
  ["Other hormones","ENDOCRINOLOGY",173],
  // TUMOUR MARKERS
  ["Alpha-foetoprotein (AFP) cancer marker","TUMOUR MARKERS",150],
  ["CEA Carcino embryonic antigen","TUMOUR MARKERS",330],
  ["Prostatic specific antigen (PSA)","TUMOUR MARKERS",180],
  ["CA 125 (Ovary)","TUMOUR MARKERS",342],
  ["HE 4 (OVARY)","TUMOUR MARKERS",342],
  ["CA 153 (Breast)","TUMOUR MARKERS",342],
  ["CA 199 (GIT)","TUMOUR MARKERS",330],
  // ALLERGY
  ["IgE","ALLERGY TESTS",185],
  ["Phadiotop","ALLERGY TESTS",550],
  ["RAST — 20 allergens","ALLERGY TESTS",1500],
  // BIOCHEMISTRY
  ["RAST BIRCH (WHITE)","BIOCHEMISTRY",173],
  ["U and E and Creatinine","BIOCHEMISTRY",180],
  ["U and E","BIOCHEMISTRY",176],
  ["Urea — serum","BIOCHEMISTRY",30],
  ["Creatinine — serum","BIOCHEMISTRY",30],
  ["Creatinine clearance","BIOCHEMISTRY",105],
  ["Potassium — serum","BIOCHEMISTRY",30],
  ["Sodium — serum","BIOCHEMISTRY",30],
  ["URIC ACID — URINE","BIOCHEMISTRY",80],
  ["Glucose Metabolism","BIOCHEMISTRY",0],
  ["Glucose — random or not specified","BIOCHEMISTRY",41],
  ["Glucose tolerance test 2 Point","BIOCHEMISTRY",87],
  ["Glucose tolerance test 3 Point","BIOCHEMISTRY",127],
  ["Glucose tolerance test 4 Point","BIOCHEMISTRY",127],
  ["Glucose tolerance test 5 Point","BIOCHEMISTRY",214],
  ["HbA1c","BIOCHEMISTRY",130],
  ["Microalbumin","BIOCHEMISTRY",150],
  ["Bilirubin neonatal","BIOCHEMISTRY",75],
  ["Lipid metabolism","BIOCHEMISTRY",0],
  ["Lipogram — fasting","BIOCHEMISTRY",150],
  ["Cholesterol total","BIOCHEMISTRY",50],
  ["Cholesterol HDL","BIOCHEMISTRY",50],
  ["Triglyceride","BIOCHEMISTRY",80],
  ["Liver functions","BIOCHEMISTRY",280],
  ["Bilirubin total & conjugated","BIOCHEMISTRY",90],
  ["ALT (SGPT)","BIOCHEMISTRY",50],
  ["AST","BIOCHEMISTRY",50],
  ["LDH","BIOCHEMISTRY",50],
  ["Gamma GT","BIOCHEMISTRY",50],
  ["Alkaline phosphatase","BIOCHEMISTRY",50],
  ["Protein — total — serum","BIOCHEMISTRY",50],
  ["Albumin","BIOCHEMISTRY",50],
  ["Amylase","BIOCHEMISTRY",50],
  ["Glucose (blood)","BIOCHEMISTRY",41],
  ["TB-GOLD QUANTIFERON","BIOCHEMISTRY",1142],
  ["Cholinesterase","BIOCHEMISTRY",150],
  // HIV / CARDIAC
  ["HIV serology","SEROLOGY",233],
  ["Cardiac enzymes profile","CARDIAC",944],
  ["Troponin T","CARDIAC",307],
  ["Creatine kinase","CARDIAC",82],
  ["CKMB","CARDIAC",173],
  ["Myoglobin","CARDIAC",185],
  // HAEMATOLOGY
  ["Iron studies profile","HAEMATOLOGY",388],
  ["Iron — serum","HAEMATOLOGY",110],
  ["Ferritin","HAEMATOLOGY",185],
  ["Folate — serum","HAEMATOLOGY",214],
  ["B12","HAEMATOLOGY",208],
  ["Immunoglobulins","HAEMATOLOGY",636],
  ["Total calcium, magnesium and phosphate","HAEMATOLOGY",185],
  ["Total Calcium and Albumin","HAEMATOLOGY",105],
  ["Magnesium — serum","HAEMATOLOGY",64],
  ["Magnesium — red cell","HAEMATOLOGY",87],
  ["Phosphate","HAEMATOLOGY",46],
  ["CRP Ultra sensitive","HAEMATOLOGY",100],
  ["Uric acid","HAEMATOLOGY",46],
  ["Full blood count only","HAEMATOLOGY",80],
  ["Full blood count and ESR","HAEMATOLOGY",120],
  ["Full blood count","HAEMATOLOGY",80],
  ["Haemoglobin only","HAEMATOLOGY",20],
  ["Platelet count","HAEMATOLOGY",36],
  ["ESR","HAEMATOLOGY",40],
  ["HCT (PCV)","HAEMATOLOGY",20],
  ["White cell count only","HAEMATOLOGY",28],
  ["White cell count & Differential","HAEMATOLOGY",122],
  ["Blood group ABO and Rh","HAEMATOLOGY",100],
  ["Malaria smears and antigen","HAEMATOLOGY",240],
  ["Haemoglobin electrophoresis (genotype)","HAEMATOLOGY",740],
  ["Coombs indirect","HAEMATOLOGY",60],
  // FAECAL CHEMISTRY
  ["Occult blood","FAECAL CHEMISTRY",145],
  ["Protein — fluid","FAECAL CHEMISTRY",46],
  ["Urea — urine","FAECAL CHEMISTRY",46],
  // URINE CHEMISTRY
  ["Drug of abuse profile","URINE CHEMISTRY",600],
  ["Cannabis — urine qualitative","URINE CHEMISTRY",75],
  ["Urine Amylase","URINE CHEMISTRY",75],
  ["Osmolarity — Urine","URINE CHEMISTRY",116],
  // COAGULATION
  ["PI (INR)","COAGULATION",90],
  ["PTT","COAGULATION",95],
  ["D-Dimer","COAGULATION",390],
  // MICROBIOLOGY
  ["MCS: Urine","MICROBIOLOGY",350],
  ["MCS: Fluid","MICROBIOLOGY",200],
  ["MCS: Sputum","MICROBIOLOGY",200],
  ["MCS: ENT specimen","MICROBIOLOGY",200],
  ["MCS: Fungal","MICROBIOLOGY",200],
  ["MCS: Faeces","MICROBIOLOGY",340],
  ["CSF Chem & MCS","MICROBIOLOGY",2673],
  ["MCS: Swab — pus","MICROBIOLOGY",200],
  ["Vaginal swab/fluid etc (MCS)","MICROBIOLOGY",250],
  ["MCS: Penile swab","MICROBIOLOGY",300],
  ["MCS: Swab — other","MICROBIOLOGY",208],
  ["Urine micro & chem (no culture)","MICROBIOLOGY",92],
  ["Stool — Micro and parasites only","MICROBIOLOGY",140],
  ["Sputum — gram stain only","MICROBIOLOGY",60],
  ["TB Ziehl Nielsen stain","MICROBIOLOGY",40],
  ["TB Culture standard","MICROBIOLOGY",40],
  ["Blood Culture","MICROBIOLOGY",400],
  // SEROLOGY
  ["STD profile with HIV","SEROLOGY",900],
  ["STD profile without HIV","SEROLOGY",780],
  ["Chlamydia serology IgG AND IgM","SEROLOGY",365],
  ["Gonorrhea serology","SEROLOGY",170],
  ["Herpes simplex Ab","SEROLOGY",358],
  ["TMX","SEROLOGY",440],
  ["Brucella serology — agglutination","SEROLOGY",185],
  ["Tick bite fever Ab (Weil felix)","SEROLOGY",127],
  ["Rickettsia (Weil Felix)","SEROLOGY",156],
  ["Chlamydia IgA antibodies","SEROLOGY",342],
  ["Chlamydia Antigen","SEROLOGY",243],
  ["Widal — salmonella agglutination","SEROLOGY",162],
  ["Tuberculosis — serology","SEROLOGY",208],
  ["Helicobacter pylori serology","SEROLOGY",120],
  ["H1N1 Swine Flu screening test","SEROLOGY",243],
  ["Hepatitis A, B & C","SEROLOGY",630],
  ["Hepatitis A","SEROLOGY",200],
  ["FUNG-AS","SEROLOGY",1380],
  ["UR-MANG","SEROLOGY",450],
  ["IGF1","SEROLOGY",445],
  ["RAST — Inhalants Outdoor","SEROLOGY",978],
  ["RAST — Moulds","SEROLOGY",857],
  ["Lipase — serum","SEROLOGY",64],
  ["Hepatitis B (surf antigen and core IgM)","SEROLOGY",325],
  ["Hepatitis B surface antigen only","SEROLOGY",200],
  ["Hepatitis B core IgM","SEROLOGY",200],
  ["Hepatitis B surface Antibody (immunity)","SEROLOGY",200],
  ["Hepatitis C IgG antibody","SEROLOGY",200],
  ["Paul Bunnell","SEROLOGY",133],
  ["Syphilis serology","SEROLOGY",160],
  ["Cytomegalovirus antibodies IgG and IgM","SEROLOGY",300],
  ["Toxoplasma (IgG and IgM)","SEROLOGY",300],
  // PREGNANCY
  ["Ante natal screen","PREGNANCY RELATED TESTS",950],
  ["Ante natal screen (no HIV)","PREGNANCY RELATED TESTS",850],
  ["BHCG — serum — qualitative","PREGNANCY RELATED TESTS",150],
  ["BHCG — serum — quantitative","PREGNANCY RELATED TESTS",120],
  ["BHCG — Urine — qualitative","PREGNANCY RELATED TESTS",120],
  ["Alpha-foetoprotein (AFP) in pregnancy","PREGNANCY RELATED TESTS",200],
  ["Rubella serology (IgG and IgM)","PREGNANCY RELATED TESTS",350],
  // ANDROLOGY
  ["Semen analysis","ANDROLOGY",600],
  ["Semen — post vasectomy count","ANDROLOGY",100],
  // HISTOLOGY
  ["Vaginal smear (PAP)","HISTOLOGY and CYTOLOGY",170],
  ["Pap smear — liquid preparation","HISTOLOGY and CYTOLOGY",240],
  ["Cytology — first unit","HISTOLOGY and CYTOLOGY",220],
  ["Histology specimen 1","HISTOLOGY and CYTOLOGY",600],
  // ARTHRITIS
  ["Arthritis profile","ARTHRITIS TESTS",650],
  ["ASOT","ARTHRITIS TESTS",130],
  ["DNA PATERNITY TEST (PER PERSON)","ARTHRITIS TESTS",2950],
  ["Rheumatoid factor (RF)","ARTHRITIS TESTS",100],
  ["Anti-nuclear antibodies (ANF)","ARTHRITIS TESTS",200],
  ["Anti-nuclear antibodies — (ANF)","ARTHRITIS TESTS",200],
  ["Auto immune profile","ARTHRITIS TESTS",1129],
  // MOLECULAR
  ["Human Papilloma Virus typing","MOLECULAR TESTS",1200],
  ["HPV Typing and liquid PAP","MOLECULAR TESTS",900],
  ["TB — PCR","MOLECULAR TESTS",1200],
  ["Gonorrhea PCR","MOLECULAR TESTS",1200],
  ["Chlamydia PCR","MOLECULAR TESTS",1200],
  ["Trichomonas PCR","MOLECULAR TESTS",1200],
  ["Covid-19 PCR","MOLECULAR TESTS",500],
  // HIV monitoring
  ["Covid-19 Serology IgG","HIV / MONITORING",150],
  ["Covid-19 Serology IgM","HIV / MONITORING",300],
  ["Free testosterone","HIV / MONITORING",145],
  ["MELATONIN DIRECT SALIVA","HIV / MONITORING",350],
  ["ELISA REGULATORY STATUS LAMOTRIGINE","HIV / MONITORING",250],
  ["HIV-SECOND TEST","HIV / MONITORING",139],
  ["CD4 (HELPER T CELLS)","HIV / MONITORING",150],
  ["Viral load — HIV","HIV / MONITORING",857],
  ["HIV PCR","HIV / MONITORING",850],
  ["Covid-19 antigen","HIV / MONITORING",300],
].map(([name, category, cash]) => {
  const c = Number(cash);
  return {
    code: String(name).split(" ")[0].toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "TST",
    name: String(name),
    category: String(category),
    cash: c,
    a: Math.round(c * 0.92),
    b: Math.round(c * 0.86),
    c: Math.round(c * 0.80),
    sync: c > 1000 ? "pending" : c > 500 ? "variance" : "synced",
  } as T;
});

const CATEGORIES = Array.from(new Set(ROWS.map(r => r.category)));

export default function Tariffs() {
  const drawer = useDrawer();
  const form = useFormDialog();
  const [tab, setTab] = useState<Schedule>("Cash");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");
  const [perPage, setPerPage] = useState(50);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() =>
    ROWS.filter(r =>
      (!search || `${r.code} ${r.name} ${r.category}`.toLowerCase().includes(search.toLowerCase())) &&
      (!cat || r.category === cat)
    ), [search, cat]);

  const priceKey: keyof T = tab === "Cash" ? "cash" : tab === "Schedule A" ? "a" : tab === "Schedule B" ? "b" : "c";
  const total = filtered.reduce((s, r) => s + (r[priceKey] as number), 0);

  return (
    <>
      <PageHeader
        kicker="Section 14 · Tariff Schedules"
        title={`Pricelist for 2026: ${tab === "Cash" ? "Cash" : tab}`}
        breadcrumb={["Tariff Schedules", tab]}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => toast.success("MedPrax sync queued · " + filtered.length + " tests")} className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />Sync MedPrax
            </button>
            <button onClick={() => toast.success("Pricelist exported (PDF)")} className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" />Export
            </button>
            <button onClick={() => toast.success("CSV uploaded · 0 errors")} className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5" />Import
            </button>
            <button onClick={() => form.open({ title: "Add Test to Pricelist", size: "lg", fields: [
              { name: "code", label: "Test Code", required: true },
              { name: "name", label: "Test Name", required: true, span: 2 },
              { name: "category", label: "Category", type: "select", options: CATEGORIES, required: true },
              { name: "cash", label: "Cash Price", type: "number", prefix: "R", required: true },
              { name: "a", label: "Schedule A", type: "number", prefix: "R" },
              { name: "b", label: "Schedule B", type: "number", prefix: "R" },
              { name: "c", label: "Schedule C", type: "number", prefix: "R" },
            ] })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />Add Test
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="rounded-xl border border-border bg-card p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Tests on List</div><div className="text-2xl font-bold text-navy mt-1">{ROWS.length}</div></div>
        <div className="rounded-xl border border-border bg-card p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Categories</div><div className="text-2xl font-bold text-navy mt-1">{CATEGORIES.length}</div></div>
        <div className="rounded-xl border border-border bg-card p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Avg Price ({tab})</div><div className="text-2xl font-bold text-target mt-1">{fmtZAR(Math.round(total / Math.max(filtered.length,1)))}</div></div>
        <div className="rounded-xl border border-border bg-card p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Last MedPrax Sync</div><div className="text-sm font-mono text-emerald-700 mt-1">Today 02:14</div></div>
      </div>

      <Panel>
        {/* Schedule tabs */}
        <div className="flex flex-wrap items-center gap-1 mb-3 border-b border-border">
          {SCHEDULES.map(s => (
            <button key={s} onClick={() => setTab(s)}
              className={`px-3 py-2 text-xs font-semibold border-b-2 -mb-px ${tab === s ? "border-target text-target" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {s === "Cash" ? "Cash Prices" : s}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-target"><Filter className="h-3 w-3"/>Filters</span>
          <select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }} className="border border-border rounded px-2 py-1 bg-white">
            <option value="">All categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search test or code…" className="pl-8 pr-3 py-1.5 border border-border rounded bg-white w-64" />
          </div>
          <span className="ml-auto text-muted-foreground">Showing {filtered.length} tests · Schedule total {fmtZAR(total)}</span>
        </div>

        {/* Grouped table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Code</th><th>Test Name</th><th>Category</th><th className="text-right">Price ({tab})</th><th>Effective</th><th>MedPrax</th><th></th></tr></thead>
            <tbody>
              {filtered.slice((page-1)*perPage, page*perPage).map((r, i) => (
                <tr key={i} className="cursor-pointer" onClick={() => drawer.open({
                  title: r.name, subtitle: `${r.code} · ${r.category}`,
                  meta: { Code: r.code, Category: r.category, Cash: fmtZAR(r.cash), "Schedule A": fmtZAR(r.a), "Schedule B": fmtZAR(r.b), "Schedule C": fmtZAR(r.c), "Effective from": "01 Jan 2026", "MedPrax sync": r.sync },
                  body: <p className="text-xs text-muted-foreground">Price changes &gt; 8% require Super Admin approval. All four schedules are revisioned on every save.</p>,
                  actions: [
                    { label: "Edit Pricing", tone: "primary", onClick: () => form.open({ title: `Edit ${r.name}`, size: "lg", fields: [
                      { name: "cash", label: "Cash Price", type: "number", prefix: "R", defaultValue: r.cash, required: true },
                      { name: "a", label: "Schedule A", type: "number", prefix: "R", defaultValue: r.a },
                      { name: "b", label: "Schedule B", type: "number", prefix: "R", defaultValue: r.b },
                      { name: "c", label: "Schedule C", type: "number", prefix: "R", defaultValue: r.c },
                      { name: "effective", label: "Effective Date", type: "date", required: true },
                      { name: "reason", label: "Reason for Change", type: "textarea", span: 2, required: true },
                    ] }) },
                    { label: "Sync to MedPrax" },
                    { label: "Price History" },
                  ],
                })}>
                  <td className="font-mono font-bold text-xs">{r.code}</td>
                  <td className="font-medium">{r.name}</td>
                  <td><Pill tone="muted">{r.category}</Pill></td>
                  <td className="text-right font-mono font-semibold">{fmtZAR(r[priceKey] as number)}</td>
                  <td className="font-mono text-xs">01 Jan 2026</td>
                  <td>{r.sync === "synced" ? <Pill tone="success">Synced</Pill> : r.sync === "pending" ? <Pill tone="warning">Pending</Pill> : <Pill tone="danger">Variance</Pill>}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3 w-3"/>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing {(page-1)*perPage+1} to {Math.min(page*perPage, filtered.length)} of {filtered.length} results</span>
            <div className="flex items-center gap-2">
              <span>Per page</span>
              <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">{[25,50,100,200].map(n=><option key={n}>{n}</option>)}</select>
              <Pagination total={filtered.length} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
