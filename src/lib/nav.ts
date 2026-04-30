import {
  LayoutDashboard, CheckSquare, FlaskConical, DollarSign, Settings2,
  TrendingUp, Users, Package, Activity, ShieldCheck, Lock, Plug,
  BarChart3, FileText, Wrench, Ticket, SlidersHorizontal,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  to: string;
  icon: any;
  subItems?: { label: string; to: string }[];
};

export const NAV: NavItem[] = [
  { id: "command",     label: "Command Centre",  to: "/", icon: LayoutDashboard },
  { id: "approvals",   label: "Approvals Hub",   to: "/approvals", icon: CheckSquare,
    subItems: [
      { label: "Financial",  to: "/approvals?tab=financial" },
      { label: "Clinical",   to: "/approvals?tab=clinical" },
      { label: "Inventory",  to: "/approvals?tab=inventory" },
      { label: "Access",     to: "/approvals?tab=access" },
      { label: "External",   to: "/approvals?tab=external" },
    ] },
  { id: "lims",        label: "Laboratory (LIMS)", to: "/lims", icon: FlaskConical,
    subItems: [
      { label: "Requisitions",      to: "/lims/requisitions" },
      { label: "Orders",            to: "/lims/orders" },
      { label: "Release Orders",    to: "/lims/release" },
      { label: "Worksheets",        to: "/lims/worksheets" },
      { label: "Critical Results",  to: "/lims/critical" },
    ] },
  { id: "accounting",  label: "Accounting", to: "/accounting", icon: DollarSign,
    subItems: [
      { label: "Invoices",          to: "/accounting/invoices" },
      { label: "Debtors",           to: "/accounting/debtors" },
      { label: "Creditors",         to: "/accounting/creditors" },
      { label: "Financial Reports", to: "/accounting/reports" },
      { label: "Assets",            to: "/accounting/assets" },
    ] },
  { id: "admin",       label: "Administration", to: "/admin", icon: Settings2,
    subItems: [
      { label: "Companies",          to: "/admin/companies" },
      { label: "Laboratories",       to: "/admin/laboratories" },
      { label: "Medical Aid Admins", to: "/admin/medical-aid-admins" },
      { label: "Medical Aids",       to: "/admin/medical-aids" },
      { label: "Departments",        to: "/admin/departments" },
      { label: "Patients",           to: "/admin/patients" },
      { label: "Doctors",            to: "/admin/doctors" },
      { label: "Tests",              to: "/admin/tests" },
      { label: "Ranges",             to: "/admin/ranges" },
      { label: "Notifiable Diseases", to: "/admin/notifiable" },
      { label: "MOA Agreements",      to: "/admin/moa" },
    ] },
  { id: "sales",       label: "Sales & Marketing", to: "/sales", icon: TrendingUp,
    subItems: [
      { label: "Dashboard",  to: "/sales" },
      { label: "MAO Sheet",  to: "/sales/mao" },
      { label: "Leads",      to: "/sales/leads" },
      { label: "Pipeline",   to: "/sales/pipeline" },
      { label: "Commission", to: "/sales/commission" },
      { label: "Newsletter", to: "/sales/newsletter" },
    ] },
  { id: "hr",          label: "HR & Staff", to: "/hr", icon: Users,
    subItems: [
      { label: "Staff List",    to: "/hr/staff" },
      { label: "Clock-In Map",  to: "/hr/clock-in" },
      { label: "Leave",         to: "/hr/leave" },
      { label: "Payroll",       to: "/hr/payroll" },
      { label: "Expense Claims", to: "/hr/expenses" },
    ] },
  { id: "inventory",   label: "Inventory & Kits", to: "/inventory", icon: Package,
    subItems: [
      { label: "Kits",          to: "/inventory/kits" },
      { label: "Reagents",      to: "/inventory/reagents" },
      { label: "Stock Levels",  to: "/inventory/stock" },
      { label: "Store Requests", to: "/inventory/requests" },
      { label: "Wastage",       to: "/inventory/wastage" },
      { label: "Supply Risk",   to: "/inventory/risk" },
    ] },
  { id: "analyzers",   label: "Analyzers & LIS", to: "/analyzers", icon: Activity,
    subItems: [
      { label: "Analyzer Registry", to: "/analyzers/registry" },
      { label: "Trust Scores",      to: "/analyzers/trust" },
      { label: "Maintenance",       to: "/analyzers/maintenance" },
      { label: "LIS Connections",   to: "/analyzers/lis" },
    ] },
  { id: "qa",          label: "Quality Assurance", to: "/qa", icon: ShieldCheck,
    subItems: [
      { label: "QA Dashboard", to: "/qa" },
      { label: "Heatmaps",     to: "/qa/heatmaps" },
      { label: "ISO Vault",    to: "/qa/iso" },
      { label: "VAR Replay",   to: "/qa/replay" },
      { label: "Incidents",    to: "/qa/incidents" },
    ] },
  { id: "auth",        label: "Authentication", to: "/auth", icon: Lock,
    subItems: [
      { label: "Users",         to: "/auth/users" },
      { label: "Roles",         to: "/auth/roles" },
      { label: "Permissions",   to: "/auth/permissions" },
      { label: "Access Levels", to: "/auth/levels" },
    ] },
  { id: "integrations",label: "Integrations", to: "/integrations", icon: Plug,
    subItems: [
      { label: "MedPrax",       to: "/integrations/medprax" },
      { label: "Elixir",        to: "/integrations/elixir" },
      { label: "External APIs", to: "/integrations/apis" },
      { label: "Result Feeds",  to: "/integrations/feeds" },
      { label: "NDIC",          to: "/integrations/ndic" },
    ] },
  { id: "analytics",   label: "Analytics & Reports", to: "/analytics", icon: BarChart3,
    subItems: [
      { label: "All Reports",            to: "/analytics" },
      { label: "Comparative Analytics",  to: "/analytics/compare" },
      { label: "AI Analysis",            to: "/analytics/ai" },
      { label: "Custom Reports",         to: "/analytics/custom" },
    ] },
  { id: "tariffs",     label: "Tariff Schedules", to: "/tariffs", icon: FileText,
    subItems: [
      { label: "Cash Prices", to: "/tariffs?s=cash" },
      { label: "Schedule A",  to: "/tariffs?s=a" },
      { label: "Schedule B",  to: "/tariffs?s=b" },
      { label: "Schedule C",  to: "/tariffs?s=c" },
    ] },
  { id: "utilities",   label: "Utilities", to: "/utilities", icon: Wrench,
    subItems: [
      { label: "Audit Actions",    to: "/utilities/audit" },
      { label: "Newsletters",      to: "/utilities/newsletters" },
      { label: "Result Feed Logs", to: "/utilities/feed-logs" },
      { label: "Log Viewer",       to: "/utilities/logs" },
      { label: "Documentation",    to: "/utilities/docs" },
    ] },
  { id: "support",     label: "Support Tickets", to: "/support", icon: Ticket,
    subItems: [
      { label: "All Tickets",       to: "/support" },
      { label: "Submit Ticket",     to: "/support/new" },
      { label: "IT Response Queue", to: "/support/queue" },
    ] },
  { id: "settings",    label: "Settings", to: "/settings", icon: SlidersHorizontal,
    subItems: [
      { label: "System Config",  to: "/settings" },
      { label: "Mail Server",    to: "/settings/mail" },
      { label: "Notifications",  to: "/settings/notifications" },
      { label: "Backup",         to: "/settings/backup" },
    ] },
];

export const BRANCHES = [
  "Johannesburg HQ","Booysens","Pretoria","Witbank","Rustenburg","Trauma","Port Elizabeth",
  "Kuruman","Durban","George","Secunda","Polokwane","Kimberly","Cape Town","Harare",
  "Vryburg","Ladysmith","Mafikeng","Elim","Lagos","Lesotho","Healthlink","Parys","Carlton",
  "Welkom","Bloemfontein","Nelspruit","Bethal","East London",
];

export const fmtZAR = (n: number) =>
  "R " + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
