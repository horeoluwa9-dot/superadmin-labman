import { useState } from "react";
import { PageHeader, Panel, Pill, Pagination } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useFormDialog } from "@/components/shared/FormDialog";
import { Mail, Plus, Send, Bold, Italic, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Table as TableIcon, Minus, Underline, Undo2, Redo2 } from "lucide-react";
import { toast } from "sonner";

const ISSUES = [
  { id: "NL-2026-04", subject: "April 2026 Newsletter — TB Awareness Month", from: "newsletter@targetlabs.co.za", sent: 2841, opened: 1742, clicked: 412, status: "Sent" as const, date: "15/04/2026" },
  { id: "NL-2026-03", subject: "March 2026 — New Tariff Updates",            from: "newsletter@targetlabs.co.za", sent: 2790, opened: 1611, clicked: 348, status: "Sent" as const, date: "15/03/2026" },
  { id: "NL-2026-05", subject: "May 2026 — Hep B Diagnostic Pathways",       from: "newsletter@targetlabs.co.za", sent:    0, opened:    0, clicked:   0, status: "Draft" as const, date: "—" },
  { id: "NL-2026-X1", subject: "Special Edition — MedPrax Integration Live", from: "newsletter@targetlabs.co.za", sent:    0, opened:    0, clicked:   0, status: "Scheduled" as const, date: "07/05/2026" },
];

function Composer({ initial }: { initial?: typeof ISSUES[number] }) {
  const [subject, setSubject] = useState(initial?.subject || "");
  const [from,    setFrom]    = useState(initial?.from || "newsletter@targetlabs.co.za");
  const [name,    setName]    = useState("Target Pathology Laboratory");
  const [html,    setHtml]    = useState("");

  const exec = (cmd: string, val?: string) => { document.execCommand(cmd, false, val); };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="text-xs font-semibold">Subject<span className="text-target">*</span>
          <input value={subject} onChange={e=>setSubject(e.target.value)} className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-semibold">From email<span className="text-target">*</span>
          <input value={from} onChange={e=>setFrom(e.target.value)} className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-semibold">From name<span className="text-target">*</span>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm" />
        </label>
      </div>

      <div>
        <div className="text-xs font-semibold mb-1">Html<span className="text-target">*</span></div>
        <div className="border border-border rounded-t-md bg-muted/40 px-2 py-1 flex flex-wrap items-center gap-1 text-muted-foreground">
          <button type="button" onClick={()=>exec("undo")} className="p-1 hover:bg-white rounded"><Undo2 className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("redo")} className="p-1 hover:bg-white rounded"><Redo2 className="h-3.5 w-3.5"/></button>
          <select onChange={e=>exec("formatBlock", e.target.value)} defaultValue="p" className="border border-border rounded text-xs px-1 py-0.5 bg-white">
            <option value="p">Paragraph</option><option value="h1">H1</option><option value="h2">H2</option><option value="h3">H3</option>
          </select>
          <span className="w-px bg-border self-stretch mx-1"/>
          <button type="button" onClick={()=>exec("bold")}      className="p-1 hover:bg-white rounded"><Bold className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("italic")}    className="p-1 hover:bg-white rounded"><Italic className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("underline")} className="p-1 hover:bg-white rounded"><Underline className="h-3.5 w-3.5"/></button>
          <span className="w-px bg-border self-stretch mx-1"/>
          <button type="button" onClick={()=>exec("justifyLeft")}    className="p-1 hover:bg-white rounded"><AlignLeft className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("justifyCenter")}  className="p-1 hover:bg-white rounded"><AlignCenter className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("justifyRight")}   className="p-1 hover:bg-white rounded"><AlignRight className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("justifyFull")}    className="p-1 hover:bg-white rounded"><AlignJustify className="h-3.5 w-3.5"/></button>
          <span className="w-px bg-border self-stretch mx-1"/>
          <button type="button" onClick={()=>exec("insertOrderedList")}   className="p-1 hover:bg-white rounded"><ListOrdered className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("insertUnorderedList")} className="p-1 hover:bg-white rounded"><List className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("formatBlock","blockquote")} className="p-1 hover:bg-white rounded"><Quote className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("insertHorizontalRule")} className="p-1 hover:bg-white rounded"><Minus className="h-3.5 w-3.5"/></button>
          <button type="button" onClick={()=>exec("insertHTML","<table border=1 cellpadding=4><tr><td>r1</td><td>r1</td></tr><tr><td>r2</td><td>r2</td></tr></table>")} className="p-1 hover:bg-white rounded"><TableIcon className="h-3.5 w-3.5"/></button>
          <span className="w-px bg-border self-stretch mx-1"/>
          <span className="text-[10px]">A▾</span>
        </div>
        <div
          contentEditable
          onInput={e => setHtml((e.target as HTMLDivElement).innerHTML)}
          className="min-h-[280px] border border-t-0 border-border rounded-b-md bg-white p-3 text-sm focus:outline-none"
          suppressContentEditableWarning
        >{initial ? `<p>Edit existing newsletter content here…</p>` : ""}</div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button onClick={() => toast.success("Newsletter created", { description: subject || "Draft saved" })} className="bg-target text-white text-xs font-semibold px-4 py-2 rounded-md">Create</button>
        <button onClick={() => toast.success("Saved · ready for next entry")} className="border border-border bg-white text-xs font-semibold px-4 py-2 rounded-md">Create &amp; create another</button>
        <button className="border border-border bg-white text-xs font-semibold px-4 py-2 rounded-md">Send Test</button>
        <button className="ml-auto text-xs text-muted-foreground hover:text-foreground">Cancel</button>
      </div>
    </div>
  );
}

export default function Newsletters() {
  const drawer = useDrawer();
  const [composing, setComposing] = useState(false);
  const [perPage, setPerPage] = useState(10);

  if (composing) {
    return (
      <>
        <PageHeader kicker="Section 15C · Utilities" title="Create Newsletter" breadcrumb={["Utilities","Newsletters","Create"]}
          actions={<button onClick={()=>setComposing(false)} className="text-xs text-muted-foreground">← Back to list</button>} />
        <Panel><Composer /></Panel>
      </>
    );
  }

  return (
    <>
      <PageHeader kicker="Section 15C · Utilities" title="Newsletters" breadcrumb={["Utilities","Newsletters","List"]}
        actions={
          <button onClick={() => setComposing(true)} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5"/>New newsletter
          </button>
        } />
      <Panel>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Issue</th><th>Subject</th><th>From</th><th>Date</th><th>Sent</th><th>Opened</th><th>Clicked</th><th>Status</th><th></th></tr></thead>
            <tbody>{ISSUES.map(i => (
              <tr key={i.id} className="cursor-pointer" onClick={() => drawer.open({
                title: i.subject, subtitle: i.id,
                meta: { From: i.from, Sent: i.sent, Opened: i.opened, Clicked: i.clicked, "Open Rate": i.sent? Math.round(i.opened/i.sent*100)+"%" : "—", Status: i.status, Date: i.date },
                actions: i.status === "Draft"
                  ? [{ label: "Edit / Compose", tone: "primary", onClick: () => setComposing(true) }, { label: "Send Now" }, { label: "Schedule" }, { label: "Send Test" }]
                  : [{ label: "Open Report" }, { label: "Resend to Bounces" }, { label: "Duplicate to Draft", onClick: () => setComposing(true) }],
              })}>
                <td className="font-mono text-xs">{i.id}</td>
                <td className="font-medium">{i.subject}</td>
                <td className="font-mono text-xs">{i.from}</td>
                <td className="font-mono text-xs">{i.date}</td>
                <td className="font-mono">{i.sent.toLocaleString()}</td>
                <td className="font-mono">{i.opened.toLocaleString()}</td>
                <td className="font-mono">{i.clicked.toLocaleString()}</td>
                <td><Pill tone={i.status==="Sent"?"success":i.status==="Scheduled"?"info":"warning"}>{i.status}</Pill></td>
                <td><Send className="h-3.5 w-3.5 text-muted-foreground"/></td>
              </tr>
            ))}</tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {ISSUES.length} of {ISSUES.length} results</span>
            <div className="flex items-center gap-2">
              <span>Per page</span>
              <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">{[10,25,50].map(n=><option key={n}>{n}</option>)}</select>
              <Pagination total={ISSUES.length} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
