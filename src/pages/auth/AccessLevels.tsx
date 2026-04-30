import { PageHeader, Panel } from "@/components/shared/Toolbar";
import { Crown, Shield, ShieldCheck, ShieldHalf, ShieldQuestion } from "lucide-react";

const levels = [
  { l: 1, color: "from-slate-200 to-slate-300 text-slate-800",  who: "Driver, Junior Pre-Lab, Phlebotomist", perms: "Clock in/out · data capture · own results", icon: ShieldQuestion },
  { l: 2, color: "from-blue-200 to-blue-300 text-blue-900",     who: "Data Capturer, Lab Technician",        perms: "L1 + daily reports · test codes · basic analytics", icon: ShieldHalf },
  { l: 3, color: "from-teal-200 to-teal-300 text-teal-900",     who: "Senior Lab Tech, QA Officer, Post-Lab Sup.", perms: "L2 + elevated lab functions · dept reports · re-run approval", icon: Shield },
  { l: 4, color: "from-amber-200 to-amber-300 text-amber-900",  who: "Lab/Sales/HR/Financial Manager",       perms: "Full dept access · team management · dept analytics · commission view", icon: ShieldCheck },
  { l: 5, color: "from-yellow-300 to-amber-400 text-yellow-900", who: "Director, CEO, Mr. Richard, Prof, Super Admin", perms: "Full system · ALL data · AI features · Show Patience for One Day", icon: Crown },
];

export default function AccessLevels() {
  return (
    <>
      <PageHeader kicker="Section 8D · Authentication · Super Admin Only" title="Access Levels" breadcrumb={["Authentication", "Access Levels"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {levels.map((lv) => {
          const Icon = lv.icon;
          return (
            <div key={lv.l} className={`rounded-xl bg-gradient-to-br ${lv.color} p-5 shadow-card`}>
              <div className="flex items-center justify-between">
                <Icon className="h-7 w-7" />
                <span className="font-bold text-3xl">L{lv.l}</span>
              </div>
              <h3 className="mt-3 font-bold text-lg">Level {lv.l}</h3>
              <p className="text-xs mt-1 opacity-90">{lv.who}</p>
              <p className="text-xs mt-3 opacity-80 leading-relaxed">{lv.perms}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
