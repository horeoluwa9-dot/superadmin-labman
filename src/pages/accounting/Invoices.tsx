import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, fmtZAR } from "@/components/shared/Toolbar";
import { FileX2, FileText, Plus } from "lucide-react";

export default function Invoices() {
  const [tab, setTab] = useState("All");
  return (
    <>
      <PageHeader
        kicker="Section 4 · Accounting"
        title="Invoices"
        breadcrumb={["Accounting", "Invoices"]}
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 bg-target hover:bg-target-dark text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Generate Medical Aid Invoices
            </button>
            <button className="inline-flex items-center gap-1.5 bg-target hover:bg-target-dark text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm">
              <Plus className="h-3.5 w-3.5" /> Generate Cash Invoices
            </button>
          </div>
        }
      />
      <Panel>
        <Tabs items={["All", "Unpaid", "Paid", "Disputed", "Written Off"]} active={tab} onChange={setTab} counts={{ All: 0, Unpaid: 0, Paid: 0, Disputed: 0, "Written Off": 0 }} />
        <div className="text-center py-20 text-muted-foreground">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileX2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-navy">No invoices</h3>
          <p className="text-sm mt-1">Generate your first invoice using the buttons above.</p>
          <p className="text-xs mt-4 text-muted-foreground/70">All amounts in South African Rand (ZAR · {fmtZAR(0)}).</p>
        </div>
      </Panel>
    </>
  );
}
