import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill, Tabs, DataToolbar, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { usePrintPreview } from "@/components/shared/PrintPreview";
import { KpiCard } from "@/components/shared/KpiCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { BRANCHES } from "@/lib/nav";
import { Printer } from "lucide-react";

type MOA = {
  id: string;
  rep: string;
  area: string;
  doctor: string;
  tel: string;
  address: string;
  contact: string;
  labUsed: string;
  adrc: string;
  notes: string;
  branch: string;
  status: "Current" | "Past" | "Draft" | "Expired";
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  commission: number;
  monthlyValue: number;
  start: string;
  end: string;
  signedBy: string;
};

// Sourced from MAW-054 (Mao sheet) — representatives, areas, prospect doctors
const MOAS: MOA[] = [
  // Stephen Sono — Mabopane
  { id: "MOA-2026-001", rep: "Stephen Sono", area: "Mabopane", doctor: "Dr Maloka PS", tel: "012 725 8209", address: "1014 Mangope Rd, Mabopane Unit U, Mabopane, 0190", contact: "Receptionist", labUsed: "Lancet", adrc: "3", notes: "Walk-in anytime.", branch: "Pretoria", status: "Current", tier: "Gold", commission: 12, monthlyValue: 84000, start: "2026-01-01", end: "2026-12-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-002", rep: "Stephen Sono", area: "Mabopane", doctor: "Dr Mampane K J", tel: "012 707 9266", address: "18-20 Block R, Klipgat, Mabopane, 0190", contact: "Receptionist", labUsed: "Pathare", adrc: "2", notes: "Walk-in anyday after 12:00.", branch: "Pretoria", status: "Draft", tier: "Silver", commission: 8, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-003", rep: "Stephen Sono", area: "Mabopane", doctor: "Dr Poane M M", tel: "012 701 4736", address: "Ika Complex, 2731 Block B, Mabopane, 0190", contact: "Receptionist", labUsed: "Undisclosed", adrc: "—", notes: "Monday to Friday after 13:00.", branch: "Pretoria", status: "Draft", tier: "Bronze", commission: 5, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-004", rep: "Stephen Sono", area: "Mabopane", doctor: "Dr N.D.V Ntuli", tel: "012 702 8226", address: "Suite No. 122, Central House, 17 Central House Road, Mabopane, Pretoria, 0190", contact: "Receptionist", labUsed: "Lancet", adrc: "4", notes: "Walk-in anytime.", branch: "Pretoria", status: "Current", tier: "Gold", commission: 12, monthlyValue: 67000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-005", rep: "Stephen Sono", area: "Mabopane", doctor: "Dr G.R.P Padi", tel: "081 513 8124", address: "2945, Mabopane Unit B, Mabopane, 0190", contact: "Receptionist", labUsed: "Ampath", adrc: "3", notes: "Walk-in anyday after 13:00.", branch: "Pretoria", status: "Current", tier: "Silver", commission: 8, monthlyValue: 38000, start: "2026-03-01", end: "2027-02-28", signedBy: "Mr. Richard" },
  { id: "MOA-2026-006", rep: "Stephen Sono", area: "Mabopane", doctor: "Dr MP Nsenda", tel: "012 702 1129", address: "Shop 10 Mabopane Sunplaza, Lucas Mangope Rd, Mabopane Unit M, 0190", contact: "Receptionist", labUsed: "Lancet", adrc: "5", notes: "Walk-in anytime.", branch: "Pretoria", status: "Current", tier: "Gold", commission: 12, monthlyValue: 92000, start: "2026-01-15", end: "2027-01-14", signedBy: "Mr. Richard" },

  // Prinze Kweku — Empangeni
  { id: "MOA-2026-007", rep: "Prinze Kweku", area: "Empangeni", doctor: "Dr MS Manzi", tel: "035 787 3942", address: "3 1st Street, Kuleka, Empangeni, 3880", contact: "Receptionist", labUsed: "Lancet", adrc: "3", notes: "Walk-in anytime.", branch: "Durban", status: "Current", tier: "Silver", commission: 8, monthlyValue: 42000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-008", rep: "Prinze Kweku", area: "Empangeni", doctor: "Dr NPO Zondo", tel: "035 772 3238", address: "11 Rex Henderson Rd, Fairview, Empangeni, 3880", contact: "Receptionist", labUsed: "Lancet & Path24", adrc: "3", notes: "Walk-in anytime.", branch: "Durban", status: "Current", tier: "Gold", commission: 12, monthlyValue: 71000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-009", rep: "Prinze Kweku", area: "Empangeni", doctor: "Dr L Ndwandwe", tel: "035 772 5791", address: "18 Commercial Street, Empangeni Central, 3880", contact: "Receptionist", labUsed: "Lancet", adrc: "3", notes: "Walk-in anytime.", branch: "Durban", status: "Draft", tier: "Silver", commission: 8, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-010", rep: "Prinze Kweku", area: "Empangeni", doctor: "Dr SJ Kunene", tel: "035 772 4848", address: "Carrington Place, Cnr Addison & Ukula Street, Empangeni, 3880", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "2", notes: "Walk-in anytime.", branch: "Durban", status: "Current", tier: "Silver", commission: 8, monthlyValue: 35000, start: "2026-03-01", end: "2027-02-28", signedBy: "Mr. Richard" },
  { id: "MOA-2026-011", rep: "Prinze Kweku", area: "Empangeni", doctor: "Dr LE Moola", tel: "035 772 4455", address: "23 Union Street, Empangeni Central, 3880", contact: "Receptionist", labUsed: "Lancet", adrc: "4", notes: "Walk-in anytime.", branch: "Durban", status: "Current", tier: "Gold", commission: 12, monthlyValue: 88000, start: "2026-01-01", end: "2026-12-31", signedBy: "Mr. Richard" },

  // Siya Mchunu — Dannhauser / Newcastle
  { id: "MOA-2026-012", rep: "Siya Mchunu", area: "Dannhauser", doctor: "Dr R.S. Khumalo", tel: "034 621 2874", address: "23 Main Street, Dannhauser, 3080", contact: "Receptionist", labUsed: "—", adrc: "—", notes: "Walk in, no appointments.", branch: "Durban", status: "Draft", tier: "Bronze", commission: 5, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-013", rep: "Siya Mchunu", area: "Newcastle", doctor: "Dr S Khoza", tel: "078 499 9007", address: "Emabongweni car wash, 1565 Hassim stand, Newcastle, 2940", contact: "Receptionist", labUsed: "Lancet", adrc: "3", notes: "Walk in.", branch: "Durban", status: "Current", tier: "Silver", commission: 8, monthlyValue: 28000, start: "2026-02-15", end: "2027-02-14", signedBy: "Mr. Richard" },
  { id: "MOA-2026-014", rep: "Siya Mchunu", area: "Newcastle", doctor: "Dr MG Ngubane", tel: "034 312 4460", address: "10 York Rd, Newcastle Central, 2940", contact: "Lindiwe", labUsed: "Ampath", adrc: "6", notes: "Walk in on Wednesdays & Fridays.", branch: "Durban", status: "Current", tier: "Platinum", commission: 15, monthlyValue: 138000, start: "2026-01-01", end: "2027-12-31", signedBy: "Prof" },
  { id: "MOA-2026-015", rep: "Siya Mchunu", area: "Newcastle", doctor: "Dr E Y Vahed", tel: "034 312 8247", address: "20 Allen St, Newcastle CBD, 2940", contact: "Reception", labUsed: "Ampath", adrc: "3", notes: "Next week Thursday.", branch: "Durban", status: "Draft", tier: "Silver", commission: 8, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-016", rep: "Siya Mchunu", area: "Newcastle", doctor: "Dr K Xulu Surgery", tel: "034 940 0455", address: "Allen St, Newcastle CBD, 2940", contact: "Reception", labUsed: "Ampath & Pathcare", adrc: "5", notes: "Walk in on Wednesdays at 12.", branch: "Durban", status: "Current", tier: "Gold", commission: 12, monthlyValue: 76000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },

  // Kelebogile Mokgatle — Mogwase
  { id: "MOA-2026-017", rep: "Kelebogile Mokgatle", area: "Mogwase", doctor: "Patel Ahmed E & Partner", tel: "—", address: "Suite O26 Mogwase Shopping Complex, 1401 Tlhantlhagane Street, Mogwase, Rustenburg, 0314", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "—", notes: "Anytime, but only if patient volume is low.", branch: "JHB HQ", status: "Draft", tier: "Silver", commission: 8, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-018", rep: "Kelebogile Mokgatle", area: "Mogwase", doctor: "Kamogelo Medical Centre", tel: "—", address: "1837/1838 Unit 5 North, Cnr Cycad, President Ave, Mogwase, 0314", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "—", notes: "Walk in.", branch: "JHB HQ", status: "Draft", tier: "Silver", commission: 8, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-019", rep: "Kelebogile Mokgatle", area: "Mogwase", doctor: "Ramarumo Ernest R", tel: "014 555 6108", address: "Room 24 Mogwase Forum, 1401 Tlhantlhagane Street, Mogwase, 0314", contact: "Receptionist", labUsed: "Lancet", adrc: "—", notes: "Anytime before 11.", branch: "JHB HQ", status: "Current", tier: "Silver", commission: 8, monthlyValue: 31000, start: "2026-03-01", end: "2027-02-28", signedBy: "Mr. Richard" },
  { id: "MOA-2026-020", rep: "Kelebogile Mokgatle", area: "Phokeng", doctor: "Dr T T Selemale", tel: "014 555 5321", address: "Shop 46, Sun City Road, Phokeng Mall, Thusong Medical Centre, R565, Phokeng", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "—", notes: "Anytime.", branch: "JHB HQ", status: "Current", tier: "Gold", commission: 12, monthlyValue: 64000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-021", rep: "Kelebogile Mokgatle", area: "Phokeng", doctor: "Dr Kabongo", tel: "014 566 4966", address: "Cnr R565 & Sun City Road, Phokeng, 0335", contact: "Receptionist", labUsed: "Lancet", adrc: "—", notes: "Dismissive on phone — rep should visit practice.", branch: "JHB HQ", status: "Draft", tier: "Bronze", commission: 5, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-022", rep: "Kelebogile Mokgatle", area: "Rustenburg", doctor: "Dr Kenny Legothlo", tel: "014 061 0053", address: "148 Klopper St, Rustenburg, 4244", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "—", notes: "Doctor sees reps Thursdays and Fridays.", branch: "JHB HQ", status: "Current", tier: "Silver", commission: 8, monthlyValue: 41000, start: "2026-03-01", end: "2027-02-28", signedBy: "Mr. Richard" },
  { id: "MOA-2026-023", rep: "Kelebogile Mokgatle", area: "Sun City", doctor: "KA Hlamalani Medical Practice", tel: "014 552 1110", address: "Shop 5 Sun Village Shopping Centre, Sun City", contact: "Lina", labUsed: "Lancet & Ampath", adrc: "—", notes: "Rep can come anytime except Monday.", branch: "JHB HQ", status: "Current", tier: "Gold", commission: 12, monthlyValue: 58000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },

  // Frank Nworgu — Kimberley
  { id: "MOA-2026-024", rep: "Frank Nworgu", area: "Kimberley", doctor: "Dr Shabana Kauchali Taleb", tel: "087 527 0612", address: "108 Long St, Hadison Park, Kimberley, 8301", contact: "Receptionist", labUsed: "Lancet", adrc: "7", notes: "11 December at 14:00.", branch: "Bloemfontein", status: "Current", tier: "Gold", commission: 12, monthlyValue: 79000, start: "2026-01-01", end: "2026-12-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-025", rep: "Frank Nworgu", area: "Kimberley", doctor: "Dr M Kanda", tel: "061 583 5469", address: "86 Phakamile Mabija Rd, Kimberley, 8301", contact: "Rosen", labUsed: "Lancet", adrc: "8", notes: "12 December at 11:30.", branch: "Bloemfontein", status: "Current", tier: "Platinum", commission: 15, monthlyValue: 124000, start: "2026-01-15", end: "2027-01-14", signedBy: "Prof" },
  { id: "MOA-2026-026", rep: "Frank Nworgu", area: "Kimberley", doctor: "Essop Mohamed R", tel: "083 371 6799", address: "16 Stockroos St, Square Hill Park, Kimberley, 8301", contact: "Receptionist", labUsed: "Lancet", adrc: "6-10", notes: "WhatsApp for email + price list.", branch: "Bloemfontein", status: "Draft", tier: "Gold", commission: 12, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-027", rep: "Frank Nworgu", area: "Kimberley", doctor: "Dr BSD Bavasah", tel: "053 871 1124", address: "5 Earl St, Homestead, Kimberley, 8301", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "7", notes: "Walk-in anytime.", branch: "Bloemfontein", status: "Current", tier: "Gold", commission: 12, monthlyValue: 81000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-028", rep: "Frank Nworgu", area: "Kimberley", doctor: "Dr JJ Mokoena", tel: "053 871 1100", address: "161 Maputle St, Vergenoeg, Kimberley, 8345", contact: "Receptionist", labUsed: "Lancet", adrc: "6", notes: "Call before walk-in.", branch: "Bloemfontein", status: "Current", tier: "Silver", commission: 8, monthlyValue: 47000, start: "2026-03-01", end: "2027-02-28", signedBy: "Mr. Richard" },
  { id: "MOA-2026-029", rep: "Frank Nworgu", area: "Kimberley", doctor: "Dr K Motlhabane", tel: "053 832 5522", address: "12 Edmeades St, Labram, Kimberley, 8301", contact: "Tshegofatso", labUsed: "Ampath & Lancet", adrc: "5", notes: "Rep can walk-in anytime.", branch: "Bloemfontein", status: "Current", tier: "Silver", commission: 8, monthlyValue: 36000, start: "2026-02-15", end: "2027-02-14", signedBy: "Mr. Richard" },
  { id: "MOA-2026-030", rep: "Frank Nworgu", area: "Kimberley", doctor: "Dr L. King", tel: "053 831 3000", address: "36 Bultfontein St, Kimberley, 8301", contact: "Receptionist", labUsed: "Lancet", adrc: "6", notes: "Tuesday at 08:30.", branch: "Bloemfontein", status: "Draft", tier: "Gold", commission: 12, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },

  // Lesego Taukobong — Rustenburg
  { id: "MOA-2026-031", rep: "Lesego Taukobong", area: "Rustenburg", doctor: "Dr M.D. Madiope", tel: "014 592 3731", address: "Shop 4, Midway Mall, 116 Leyds St, Rustenburg, 0300", contact: "Receptionist", labUsed: "Lancet & Ampath", adrc: "3-5", notes: "Doctor used Target — sent one specimen. Rep can come anytime.", branch: "JHB HQ", status: "Current", tier: "Gold", commission: 12, monthlyValue: 72000, start: "2026-01-01", end: "2026-12-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-032", rep: "Lesego Taukobong", area: "Rustenburg", doctor: "Dr Fatima Saloojee", tel: "014 594 0643", address: "126 Klopper St, Rustenburg, 0300", contact: "Receptionist", labUsed: "Lancet", adrc: "3", notes: "Doctor sees reps on Thursdays.", branch: "JHB HQ", status: "Current", tier: "Silver", commission: 8, monthlyValue: 39000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },
  { id: "MOA-2026-033", rep: "Lesego Taukobong", area: "Rustenburg", doctor: "Dr G.B Kamuzinzi", tel: "082 784 2852", address: "146 Klopper Street, Rustenburg", contact: "Receptionist", labUsed: "Ampath", adrc: "5", notes: "Walk-in.", branch: "JHB HQ", status: "Current", tier: "Silver", commission: 8, monthlyValue: 44000, start: "2026-02-15", end: "2027-02-14", signedBy: "Mr. Richard" },
  { id: "MOA-2026-034", rep: "Lesego Taukobong", area: "Rustenburg", doctor: "Dr T.M. Mokone", tel: "014 592 0839", address: "54 Zand St, Rustenburg, 0300", contact: "Receptionist", labUsed: "Undisclosed", adrc: "—", notes: "Doctor sees reps on Fridays when not busy.", branch: "JHB HQ", status: "Draft", tier: "Bronze", commission: 5, monthlyValue: 0, start: "2026-05-01", end: "2027-04-30", signedBy: "—" },
  { id: "MOA-2026-035", rep: "Lesego Taukobong", area: "Rustenburg", doctor: "Dr F.P.D Monamodi & Associates", tel: "014 594 2109", address: "Clicks Centre, 5 Nelson Mandela St, CBD, Rustenburg", contact: "Receptionist", labUsed: "Lancet / Ampath / Pathcare", adrc: "1-3", notes: "Doctor sees reps anytime — slotted with patients.", branch: "JHB HQ", status: "Current", tier: "Platinum", commission: 15, monthlyValue: 156000, start: "2026-01-01", end: "2027-12-31", signedBy: "Prof" },
  { id: "MOA-2026-036", rep: "Lesego Taukobong", area: "Rustenburg", doctor: "Dr AP Pitsoe", tel: "014 597 1064", address: "7 Fatima Bhayat St, Rustenburg", contact: "Receptionist", labUsed: "Ampath main lab", adrc: "3", notes: "Doctor sees reps on appointment.", branch: "JHB HQ", status: "Current", tier: "Gold", commission: 12, monthlyValue: 68000, start: "2026-02-01", end: "2027-01-31", signedBy: "Mr. Richard" },

  // Past / Expired examples retained
  { id: "MOA-2025-217", rep: "Carmen Angelica", area: "Cape Town", doctor: "Dr A. Botha", tel: "021 555 1100", address: "12 Bree St, Cape Town", contact: "Receptionist", labUsed: "Lancet", adrc: "4", notes: "Renewed previously — strong volumes.", branch: "Cape Town", status: "Past", tier: "Gold", commission: 10, monthlyValue: 67000, start: "2025-01-01", end: "2025-12-31", signedBy: "Mr. Richard" },
  { id: "MOA-2024-088", rep: "P. Moyo", area: "Harare", doctor: "Dr R. Moyo", tel: "+263 24 555 0123", address: "Moyo Family Practice, Harare", contact: "Receptionist", labUsed: "—", adrc: "—", notes: "Lapsed — pending renewal.", branch: "Harare", status: "Expired", tier: "Bronze", commission: 5, monthlyValue: 12000, start: "2024-05-01", end: "2025-04-30", signedBy: "Mr. Richard" },
];

const TABS = ["All", "Current", "Past", "Draft", "Expired"];
const REPS = Array.from(new Set(MOAS.map(m => m.rep)));
const AREAS = Array.from(new Set(MOAS.map(m => m.area)));

const NEW_MOA_FIELDS = [
  { name: "rep",       label: "Sales Representative", type: "select" as const, options: REPS, required: true, group: "Parties" },
  { name: "area",      label: "Area / Town",          required: true, group: "Parties" },
  { name: "doctor",    label: "Doctor / Practice",    required: true, group: "Parties" },
  { name: "tel",       label: "Doctor Tel", required: true, group: "Parties" },
  { name: "address",   label: "Practice Address", span: 2 as const, required: true, group: "Parties" },
  { name: "contact",   label: "Person Contacted", group: "Parties" },
  { name: "labUsed",   label: "Lab Currently Used", group: "Parties" },
  { name: "adrc",      label: "ADRC (Avg Daily Req Count)", group: "Parties" },
  { name: "branch",    label: "Servicing Branch", type: "select" as const, options: BRANCHES, required: true, group: "Commercial" },
  { name: "tier",      label: "MOA Tier", type: "select" as const, options: ["Bronze","Silver","Gold","Platinum"], required: true, group: "Commercial" },
  { name: "commission",label: "Commission %", type: "number" as const, required: true, group: "Commercial" },
  { name: "monthlyTarget", label: "Monthly Volume Target", type: "number" as const, prefix: "R", required: true, group: "Commercial" },
  { name: "discount",  label: "Tariff Discount %", type: "number" as const, group: "Commercial" },
  { name: "start",     label: "Start Date", type: "date" as const, required: true, group: "Term" },
  { name: "end",       label: "End Date", type: "date" as const, required: true, group: "Term" },
  { name: "renewal",   label: "Auto-Renew?", type: "checkbox" as const, group: "Term" },
  { name: "noticePeriod", label: "Notice Period (days)", type: "number" as const, defaultValue: "30", group: "Term" },
  { name: "delivery",  label: "Result Delivery", type: "multiselect" as const, options: ["Doctor Portal","Email PDF","WhatsApp","Print + Courier","Direct LIS"], span: 2 as const, group: "Service" },
  { name: "tat",       label: "TAT Commitment (hours)", type: "number" as const, group: "Service" },
  { name: "exclusivity", label: "Exclusive to Target?", type: "checkbox" as const, group: "Service" },
  { name: "billingTerms", label: "Billing Terms", type: "select" as const, options: ["Net 7","Net 14","Net 30","Net 60"], group: "Service" },
  { name: "signedBy",  label: "Signed by (Internal)", type: "select" as const, options: ["Mr. Richard","Prof","CEO Office"], required: true, group: "Signatures" },
  { name: "doctorSignature", label: "Doctor Signed Document", type: "file" as const, span: 2 as const, hint: "Upload signed PDF/scan", group: "Signatures" },
  { name: "notes",     label: "Special Conditions / Notes", type: "textarea" as const, span: 2 as const, group: "Signatures" },
];

export default function MOA() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const printer = usePrintPreview();
  const [tab, setTab] = useState("All");
  const [fBranch, setFBranch] = useState("");
  const [fTier, setFTier] = useState("");
  const [fRep, setFRep] = useState("");
  const [fArea, setFArea] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => MOAS.filter(m => {
    if (tab !== "All" && m.status !== tab) return false;
    if (fBranch && m.branch !== fBranch) return false;
    if (fTier && m.tier !== fTier) return false;
    if (fRep && m.rep !== fRep) return false;
    if (fArea && m.area !== fArea) return false;
    if (search && !`${m.doctor} ${m.area} ${m.rep} ${m.id}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [tab, fBranch, fTier, fRep, fArea, search]);

  const counts = MOAS.reduce((a, m) => ({ ...a, All: (a.All || 0) + 1, [m.status]: (a[m.status] || 0) + 1 }), {} as any);
  const tierTone = (t: string) => t === "Platinum" ? "bg-slate-800 text-white" : t === "Gold" ? "bg-gradient-gold text-navy" : t === "Silver" ? "bg-slate-200 text-slate-800" : "bg-amber-100 text-amber-900";

  const printOne = (m: MOA) => printer.open({
    title: `Memorandum of Agreement · ${m.id}`,
    subtitle: `${m.doctor} · ${m.area}`,
    filename: `MOA_${m.id}_${m.doctor.replace(/[^A-Za-z0-9]+/g,"_")}`,
    body: (
      <div>
        <h1>MEMORANDUM OF AGREEMENT</h1>
        <p className="muted">Reference: <strong>{m.id}</strong> · Status: <strong>{m.status}</strong> · Generated: {new Date().toLocaleString("en-ZA")}</p>
        <h3 style={{ marginTop: 16, color: "#0c1f3f" }}>Parties</h3>
        <table>
          <tbody>
            <tr><th style={{ width: 180 }}>Doctor / Practice</th><td>{m.doctor}</td></tr>
            <tr><th>Area</th><td>{m.area}</td></tr>
            <tr><th>Tel</th><td>{m.tel}</td></tr>
            <tr><th>Address</th><td>{m.address}</td></tr>
            <tr><th>Person Contacted</th><td>{m.contact}</td></tr>
            <tr><th>Lab Currently Used</th><td>{m.labUsed}</td></tr>
            <tr><th>ADRC</th><td>{m.adrc}</td></tr>
            <tr><th>Sales Representative</th><td>{m.rep}</td></tr>
            <tr><th>Servicing Branch</th><td>{m.branch}</td></tr>
          </tbody>
        </table>
        <h3 style={{ marginTop: 16, color: "#0c1f3f" }}>Commercial Terms</h3>
        <table>
          <tbody>
            <tr><th style={{ width: 180 }}>Tier</th><td>{m.tier}</td></tr>
            <tr><th>Commission</th><td>{m.commission}%</td></tr>
            <tr><th>Estimated Monthly Value</th><td>{fmtZAR(m.monthlyValue)}</td></tr>
            <tr><th>Term</th><td>{m.start} → {m.end}</td></tr>
            <tr><th>Billing</th><td>Net 30 from statement date</td></tr>
            <tr><th>TAT Commitment</th><td>6h routine · 2h STAT</td></tr>
          </tbody>
        </table>
        <h3 style={{ marginTop: 16, color: "#0c1f3f" }}>Notes</h3>
        <p>{m.notes}</p>
        <h3 style={{ marginTop: 16, color: "#0c1f3f" }}>Signatures</h3>
        <table>
          <tbody>
            <tr><th style={{ width: 180 }}>Internal Signatory</th><td>{m.signedBy}</td></tr>
            <tr><th>Doctor Signature</th><td style={{ height: 60 }}></td></tr>
            <tr><th>Date</th><td></td></tr>
          </tbody>
        </table>
        <p className="muted" style={{ marginTop: 24 }}>Termination: 30 day written notice. All revisions versioned in the ISO Evidence Vault.</p>
      </div>
    ),
  });

  const openDetails = (m: MOA) => drawer.open({
    title: `${m.id} · ${m.doctor}`,
    subtitle: `${m.rep} · ${m.area} · ${m.tier} tier`,
    meta: {
      Doctor: m.doctor,
      "Doctor Tel": m.tel,
      Address: m.address,
      "Person Contacted": m.contact,
      "Lab Used": m.labUsed,
      ADRC: m.adrc,
      Representative: m.rep,
      Area: m.area,
      Branch: m.branch,
      Tier: m.tier,
      "Commission %": m.commission + "%",
      "Monthly Value": fmtZAR(m.monthlyValue),
      "Term Start": m.start,
      "Term End": m.end,
      "Signed By": m.signedBy,
      Status: m.status,
    },
    body: (
      <div className="space-y-2">
        <div className="rounded-md bg-muted/50 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Notes</div>
          <div className="text-sm mt-1">{m.notes}</div>
        </div>
        <ul className="text-xs space-y-1 mt-2">
          <li>• Service: Pathology testing, doctor portal access, dedicated rep</li>
          <li>• TAT: 6 hour commitment for routine, 2 hour for STAT</li>
          <li>• Billing: Net 30 from statement date</li>
          <li>• Termination: 30 day written notice</li>
        </ul>
      </div>
    ),
    actions: [
      { label: "Print / Preview MOA", tone: "primary", onClick: () => printOne(m) },
      { label: "Amend MOA" },
      { label: "Renew" },
      { label: m.status === "Current" ? "Terminate" : "Re-activate", tone: m.status === "Current" ? "danger" : "primary" },
      { label: "Download Signed PDF" },
    ],
  });

  return (
    <>
      <PageHeader
        kicker="Section 5 · Administration"
        title="Memorandum of Agreement (MOA)"
        breadcrumb={["Administration", "MOA"]}
        actions={<Pill tone="info">{counts.Current || 0} active agreements</Pill>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Active MOAs"    value={counts.Current || 0} accent="success" />
        <KpiCard label="Past MOAs"      value={counts.Past || 0}    accent="navy" />
        <KpiCard label="Drafts Pending" value={counts.Draft || 0}   accent="warn" />
        <KpiCard label="Monthly Value"  value={fmtZAR(MOAS.filter(m=>m.status==="Current").reduce((s,m)=>s+m.monthlyValue,0))} accent="gold" />
      </div>
      <Panel>
        <Tabs items={TABS} active={tab} onChange={setTab} counts={counts} />
        <FilterBar
          filters={[
            { name: "rep",    label: "Reps",     options: REPS,    value: fRep,    onChange: setFRep },
            { name: "area",   label: "Areas",    options: AREAS,   value: fArea,   onChange: setFArea },
            { name: "branch", label: "Branches", options: BRANCHES,value: fBranch, onChange: setFBranch },
            { name: "tier",   label: "Tiers",    options: ["Bronze","Silver","Gold","Platinum"], value: fTier, onChange: setFTier },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFBranch(""); setFTier(""); setFRep(""); setFArea(""); setSearch(""); }}
        />
        <DataToolbar primaryLabel="Create MOA" search={false}
          onPrimary={() => form.open({
            title: "Create New MOA",
            subtitle: "Memorandum of Agreement between Target Pathology and a referring doctor / practice.",
            fields: NEW_MOA_FIELDS, size: "xl",
            submitLabel: "Generate MOA & Send for Signature",
            successMessage: "MOA drafted and routed for signature",
          })}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>MOA #</th><th>Representative</th><th>Area</th><th>Doctor</th><th>Tel</th>
                <th>Lab Used</th><th>ADRC</th><th>Tier</th><th>Monthly Value</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="cursor-pointer" onClick={() => openDetails(m)}>
                  <td className="font-mono text-xs">{m.id}</td>
                  <td className="text-xs font-medium">{m.rep}</td>
                  <td className="text-xs">{m.area}</td>
                  <td className="font-medium">{m.doctor}</td>
                  <td className="font-mono text-xs">{m.tel}</td>
                  <td className="text-xs">{m.labUsed}</td>
                  <td className="font-mono text-xs text-center">{m.adrc}</td>
                  <td><span className={`pill ${tierTone(m.tier)} text-[10px]`}>{m.tier}</span></td>
                  <td className="text-right font-mono text-xs">{fmtZAR(m.monthlyValue)}</td>
                  <td><Pill tone={m.status === "Current" ? "success" : m.status === "Past" ? "muted" : m.status === "Draft" ? "warning" : "danger"}>{m.status}</Pill></td>
                  <td onClick={e => { e.stopPropagation(); printOne(m); }}>
                    <button className="inline-flex items-center gap-1 text-[11px] text-target hover:text-target-dark font-semibold">
                      <Printer className="h-3 w-3" /> Print
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={11} className="text-center py-8 text-muted-foreground text-xs">No MOAs match your filters.</td></tr>}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
      <Panel className="mt-4" title="MOA Templates" subtitle="Pre-defined commercial structures">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { tier: "Bronze",   c: "5%",  v: "Up to R 25k/mo", perks: "Standard delivery" },
            { tier: "Silver",   c: "8%",  v: "R 25k–60k/mo",   perks: "Doctor portal + Email" },
            { tier: "Gold",     c: "12%", v: "R 60k–120k/mo",  perks: "Dedicated rep + WhatsApp" },
            { tier: "Platinum", c: "15%", v: "R 120k+/mo",     perks: "Direct LIS · 2hr STAT TAT" },
          ].map(t => (
            <div key={t.tier} className="rounded-lg border border-border p-3 hover:shadow-card transition-shadow">
              <div className={`pill ${tierTone(t.tier)} text-[10px] mb-2`}>{t.tier}</div>
              <div className="text-xs text-muted-foreground">Commission</div>
              <div className="text-2xl font-bold text-navy">{t.c}</div>
              <div className="text-[11px] text-muted-foreground mt-2">{t.v}</div>
              <div className="text-[11px] mt-1">{t.perks}</div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
