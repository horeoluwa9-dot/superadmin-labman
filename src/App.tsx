import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Shell } from "@/components/shell/Shell";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

import Approvals from "./pages/Approvals";
import Requisitions from "./pages/lims/Requisitions";
import Worksheets from "./pages/lims/Worksheets";
import CriticalResults from "./pages/lims/CriticalResults";
import Timeline from "./pages/lims/Timeline";

import Invoices from "./pages/accounting/Invoices";
import Debtors from "./pages/accounting/Debtors";
import Creditors from "./pages/accounting/Creditors";
import FinancialReports from "./pages/accounting/FinancialReports";
import Assets from "./pages/accounting/Assets";

import Laboratories from "./pages/admin/Laboratories";
import Departments from "./pages/admin/Departments";
import Tests from "./pages/admin/Tests";
import Companies from "./pages/admin/Companies";
import Patients from "./pages/admin/Patients";
import Doctors from "./pages/admin/Doctors";
import MedicalAids from "./pages/admin/MedicalAids";
import MedicalAidAdmins from "./pages/admin/MedicalAidAdmins";
import Notifiable from "./pages/admin/Notifiable";
import Guarantors from "./pages/admin/Guarantors";
import MOA from "./pages/admin/MOA";
import Ranges from "./pages/admin/Ranges";
import CannedComments from "./pages/admin/CannedComments";
import AuditActions from "./pages/utilities/AuditActions";
import FeedLogs from "./pages/utilities/FeedLogs";
import Newsletters from "./pages/utilities/Newsletters";

import SalesDashboard from "./pages/sales/Dashboard";
import MaoSheet from "./pages/sales/MaoSheet";
import Pipeline from "./pages/sales/Pipeline";
import Leads from "./pages/sales/Leads";
import Commission from "./pages/sales/Commission";
import Newsletter from "./pages/sales/Newsletter";

import StaffList from "./pages/hr/StaffList";
import ClockInMap from "./pages/hr/ClockInMap";
import Leave from "./pages/hr/Leave";
import Payroll from "./pages/hr/Payroll";
import Expenses from "./pages/hr/Expenses";
import StaffOverview from "./pages/staff/Overview";
import Drivers from "./pages/staff/Drivers";
import SalesTeam from "./pages/staff/SalesTeam";
import Orders from "./pages/lims/Orders";
import ReleaseOrders from "./pages/lims/ReleaseOrders";

import Inventory from "./pages/Inventory";
import Kits from "./pages/inventory/Kits";
import StoreRequests from "./pages/inventory/StoreRequests";
import Wastage from "./pages/inventory/Wastage";
import SupplyRisk from "./pages/inventory/SupplyRisk";

import Analyzers from "./pages/Analyzers";
import QA from "./pages/QA";
import Users from "./pages/auth/Users";
import Roles from "./pages/auth/Roles";
import PermissionsPage from "./pages/auth/Permissions";
import AccessLevels from "./pages/auth/AccessLevels";
import Integrations from "./pages/Integrations";
import Analytics from "./pages/Analytics";
import AI from "./pages/AI";
import Tariffs from "./pages/Tariffs";
import Utilities from "./pages/Utilities";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Stub from "./pages/Stub";

const queryClient = new QueryClient();
const W = (el: JSX.Element) => <Shell>{el}</Shell>;

// Helper for richer stubs
const S = (kicker: string, title: string, breadcrumb: string[], sections?: any[], intro?: string) =>
  W(<Stub kicker={kicker} title={title} breadcrumb={breadcrumb} sections={sections} intro={intro} />);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/approvals" element={W(<Approvals />)} />

          {/* LIMS */}
          <Route path="/lims" element={W(<Requisitions />)} />
          <Route path="/lims/requisitions" element={W(<Requisitions />)} />
          <Route path="/lims/orders" element={W(<Orders />)} />
          <Route path="/lims/release" element={W(<ReleaseOrders />)} />
          <Route path="/lims/worksheets" element={W(<Worksheets />)} />
          <Route path="/lims/critical" element={W(<CriticalResults />)} />
          <Route path="/lims/timeline" element={W(<Timeline />)} />

          {/* Accounting */}
          <Route path="/accounting" element={W(<Invoices />)} />
          <Route path="/accounting/invoices" element={W(<Invoices />)} />
          <Route path="/accounting/debtors" element={W(<Debtors />)} />
          <Route path="/accounting/creditors" element={W(<Creditors />)} />
          <Route path="/accounting/reports" element={W(<FinancialReports />)} />
          <Route path="/accounting/assets" element={W(<Assets />)} />

          {/* Admin */}
          <Route path="/admin" element={W(<Companies />)} />
          <Route path="/admin/companies" element={W(<Companies />)} />
          <Route path="/admin/laboratories" element={W(<Laboratories />)} />
          <Route path="/admin/medical-aid-admins" element={W(<MedicalAidAdmins />)} />
          <Route path="/admin/medical-aids" element={W(<MedicalAids />)} />
          <Route path="/admin/departments" element={W(<Departments />)} />
          <Route path="/admin/patients" element={W(<Patients />)} />
          <Route path="/admin/doctors" element={W(<Doctors />)} />
          <Route path="/admin/tests" element={W(<Tests />)} />
          <Route path="/admin/notifiable" element={W(<Notifiable />)} />
          <Route path="/admin/guarantors" element={W(<Guarantors />)} />
          <Route path="/admin/moa" element={W(<MOA />)} />
          <Route path="/admin/ranges" element={W(<Ranges />)} />
          <Route path="/admin/canned-comments" element={W(<CannedComments />)} />

          {/* Sales */}
          <Route path="/sales" element={W(<SalesDashboard />)} />
          <Route path="/sales/mao" element={W(<MaoSheet />)} />
          <Route path="/sales/leads" element={W(<Leads />)} />
          <Route path="/sales/pipeline" element={W(<Pipeline />)} />
          <Route path="/sales/commission" element={W(<Commission />)} />
          <Route path="/sales/newsletter" element={W(<Newsletter />)} />

          {/* HR (LIMS Mode) */}
          <Route path="/hr" element={W(<StaffList />)} />
          <Route path="/hr/staff" element={W(<StaffList />)} />
          <Route path="/hr/clock-in" element={W(<ClockInMap />)} />
          <Route path="/hr/leave" element={W(<Leave />)} />
          <Route path="/hr/payroll" element={W(<Payroll />)} />
          <Route path="/hr/expenses" element={W(<Expenses />)} />

          {/* Staff Mode */}
          <Route path="/staff" element={W(<StaffOverview />)} />
          <Route path="/staff/directory" element={W(<StaffList />)} />
          <Route path="/staff/clock" element={W(<ClockInMap />)} />
          <Route path="/staff/leave" element={W(<Leave />)} />
          <Route path="/staff/payroll" element={W(<Payroll />)} />
          <Route path="/staff/expenses" element={W(<Expenses />)} />
          <Route path="/staff/commission" element={W(<Commission />)} />
          <Route path="/staff/sales" element={W(<SalesTeam />)} />
          <Route path="/staff/drivers" element={W(<Drivers />)} />
          <Route path="/staff/doctors" element={W(<Doctors />)} />
          <Route path="/staff/targets" element={S("Section 7 · Staff", "Targets & KPIs", ["Staff","Targets"],
            [{ title: "Per-Role Targets", items: [
              { label: "Sales Rep · Monthly Turnover", value: "R 150,000", tone: "info" },
              { label: "Lab Tech · Tests/Day", value: "120", tone: "info" },
              { label: "Driver · On-time Pickups", value: "98%", tone: "success" },
              { label: "Phlebotomist · Specimens/shift", value: "45", tone: "info" },
              { label: "Pathologist · TAT (hrs)", value: "< 6 hrs", tone: "success" },
            ]},
            { title: "Branch Targets (April)", items: [
              { label: "Booysens", value: "112%", tone: "success" },
              { label: "JHB HQ",    value: "98%",  tone: "warning" },
              { label: "Cape Town", value: "104%", tone: "success" },
              { label: "Durban",    value: "82%",  tone: "danger" },
              { label: "Lagos",     value: "121%", tone: "success" },
            ]}]
          )} />
          <Route path="/staff/schedule" element={S("Section 7 · Staff", "Schedules & Roster", ["Staff","Schedule"],
            [{ title: "Today's Roster", items: [
              { label: "Booysens — Day Shift",    value: "8 staff", tone: "success" },
              { label: "Booysens — Night Shift",  value: "3 staff", tone: "info" },
              { label: "JHB HQ — Day Shift",      value: "12 staff", tone: "success" },
              { label: "Durban — Day Shift",      value: "6 staff (1 short)", tone: "warning" },
              { label: "Lagos — Day Shift",       value: "9 staff", tone: "success" },
            ]},
            { title: "Coverage Risks", items: [
              { label: "Polokwane — No Pathologist tomorrow", value: "Critical", tone: "danger" },
              { label: "Welkom — Driver leave overlap",       value: "Warning",  tone: "warning" },
            ]}]
          )} />
          <Route path="/staff/drivers" element={S("Section 7 · Staff", "Drivers & Trips", ["Staff","Drivers"],
            [{ title: "Active Trips", items: [
              { label: "GP-DRV-01 (J. Pieters)",  value: "Booysens → JHB HQ · 7 specimens", tone: "info" },
              { label: "GP-DRV-04 (Z. Kunene)",   value: "Ladysmith → Durban · 12 specimens", tone: "info" },
              { label: "NW-DRV-02 (F. Marobela)", value: "Vryburg → Mafikeng · 4 specimens", tone: "info" },
            ]},
            { title: "Vehicle Register", items: [
              { label: "GP 8841 LM · Toyota Corolla",  value: "Service due 15/05", tone: "warning" },
              { label: "KZN 1102 NM · VW Polo",         value: "OK", tone: "success" },
              { label: "NW 9921 BB · Hyundai i20",     value: "OK", tone: "success" },
            ]}]
          )} />
          <Route path="/staff/doctors" element={W(<Doctors />)} />
          <Route path="/staff/training" element={S("Section 13B · Resources", "Training & SOPs", ["Staff","Training"],
            [{ title: "Knowledge Base · Videos", items: [
              { label: "Driver Specimen Handling (12:40)", value: "Required", tone: "danger" },
              { label: "Pre-Lab Procedure Training (24:10)", value: "Required", tone: "danger" },
              { label: "MedPrax Tariff Workflow (8:30)", value: "New", tone: "info" },
              { label: "Critical Result Escalation (15:50)", value: "Required", tone: "danger" },
              { label: "ISO 15189 Refresher (32:00)", value: "Annual", tone: "warning" },
            ]},
            { title: "Completion Stats", items: [
              { label: "Booysens",    value: "92%", tone: "success" },
              { label: "Durban",      value: "78%", tone: "warning" },
              { label: "Lagos",       value: "84%", tone: "success" },
              { label: "Harare",      value: "61%", tone: "danger" },
            ]}]
          )} />
          <Route path="/staff/discipline" element={S("Section 7 · Staff", "Disciplinary Records", ["Staff","Disciplinary"],
            [{ title: "Open Cases", items: [
              { label: "G. Rampa — Suspended (Audit anomaly)", value: "Investigation", tone: "danger" },
            ]},
            { title: "Closed (LTM)", items: [
              { label: "Verbal Warnings", value: "4", tone: "muted" },
              { label: "Written Warnings", value: "1", tone: "warning" },
              { label: "Terminations", value: "0", tone: "success" },
            ]}]
          )} />

          {/* Inventory */}
          <Route path="/inventory" element={W(<Kits />)} />
          <Route path="/inventory/kits" element={W(<Kits />)} />
          <Route path="/inventory/reagents" element={W(<Kits />)} />
          <Route path="/inventory/stock" element={W(<Inventory />)} />
          <Route path="/inventory/requests" element={W(<StoreRequests />)} />
          <Route path="/inventory/wastage" element={W(<Wastage />)} />
          <Route path="/inventory/risk" element={W(<SupplyRisk />)} />

          {/* Analyzers */}
          <Route path="/analyzers" element={W(<Analyzers />)} />
          <Route path="/analyzers/registry" element={W(<Analyzers />)} />
          <Route path="/analyzers/trust" element={W(<Analyzers />)} />
          <Route path="/analyzers/maintenance" element={S("Section 9 · Analyzers", "Maintenance Schedule", ["Analyzers","Maintenance"],
            [{ title: "Upcoming (next 30d)", items: [
              { label: "Sysmex XN-1000 · JHB HQ", value: "Service 05/05", tone: "warning" },
              { label: "Roche Cobas c702 · Cape Town", value: "Calibration 12/05", tone: "info" },
              { label: "Abbott Architect · Durban", value: "PM 18/05", tone: "info" },
              { label: "Cepheid GeneXpert · Lagos", value: "Service 22/05", tone: "info" },
            ]},
            { title: "Overdue", items: [
              { label: "Sysmex XN-330 · Polokwane", value: "Overdue 12d", tone: "danger" },
              { label: "Roche c111 · Harare", value: "Overdue 4d", tone: "warning" },
            ]}]
          )} />
          <Route path="/analyzers/lis" element={S("Section 9 · LIS", "LIS Connectivity", ["Analyzers","LIS"],
            [{ title: "Active Connections", items: [
              { label: "Sysmex XN · ASTM-1394",  value: "Live",     tone: "success" },
              { label: "Roche cobas · HL7v2",    value: "Live",     tone: "success" },
              { label: "Abbott Architect · POCT1A", value: "Degraded", tone: "warning" },
              { label: "Cepheid · LIS2-A2",      value: "Live",     tone: "success" },
            ]},
            { title: "Result Feed Stats (24h)", items: [
              { label: "Total Results", value: "8,412", tone: "info" },
              { label: "Manual Entries", value: "142 (1.7%)", tone: "warning" },
              { label: "Failed Transfers", value: "3", tone: "danger" },
              { label: "Re-runs", value: "94", tone: "warning" },
            ]}]
          )} />

          {/* QA */}
          <Route path="/qa" element={W(<QA />)} />
          <Route path="/qa/heatmaps" element={W(<QA />)} />
          <Route path="/qa/iso" element={S("Section 11 · QA", "ISO Evidence Vault", ["QA","ISO Vault"],
            [{ title: "Vault Contents", items: [
              { label: "Audit Trail Entries (LTM)", value: "1,842,310", tone: "info" },
              { label: "SOP Adherence Logs",        value: "94,210",    tone: "info" },
              { label: "Approval Histories",        value: "12,481",    tone: "info" },
              { label: "Access Log Entries",        value: "8,492,100", tone: "info" },
              { label: "Watermarked Exports (LTM)", value: "47",        tone: "muted" },
            ]},
            { title: "Export Formats", items: [
              { label: "ISO 15189 Audit Pack",   value: "Ready", tone: "success" },
              { label: "Legal Case Bundle",      value: "Ready", tone: "success" },
              { label: "Regulatory Submission",  value: "Ready", tone: "success" },
              { label: "NDIC Notifiable Pack",   value: "Ready", tone: "success" },
            ]}]
          )} />
          <Route path="/qa/replay" element={W(<Timeline />)} />
          <Route path="/qa/incidents" element={S("Section 11 · QA", "Incident Management", ["QA","Incidents"],
            [{ title: "Open Incidents", items: [
              { label: "INC-7741 · Mislabelled Specimen", value: "Investigation", tone: "danger" },
              { label: "INC-7740 · Critical TAT Breach",  value: "CAPA Drafting", tone: "warning" },
              { label: "INC-7738 · Analyzer Drift > 2σ",  value: "CAPA Approved", tone: "warning" },
            ]},
            { title: "Closed (MTD)", items: [
              { label: "Resolved with CAPA", value: "8", tone: "success" },
              { label: "Resolved · No Action", value: "3", tone: "muted" },
              { label: "Avg Time to Resolve", value: "4.2 days", tone: "info" },
            ]}]
          )} />

          {/* Auth */}
          <Route path="/auth" element={W(<Users />)} />
          <Route path="/auth/users" element={W(<Users />)} />
          <Route path="/auth/roles" element={W(<Roles />)} />
          <Route path="/auth/permissions" element={W(<PermissionsPage />)} />
          <Route path="/auth/levels" element={W(<AccessLevels />)} />

          {/* Integrations */}
          <Route path="/integrations" element={W(<Integrations />)} />
          <Route path="/integrations/medprax" element={W(<Integrations />)} />
          <Route path="/integrations/elixir" element={W(<Integrations />)} />
          <Route path="/integrations/apis" element={S("Section 10 · Integrations", "External APIs", ["Integrations","APIs"],
            [{ title: "Active APIs", items: [
              { label: "MedPrax Tariff API",   value: "Live · 99.97%", tone: "success" },
              { label: "Elixir Claims API",    value: "Live · 99.41%", tone: "success" },
              { label: "Discovery Smart API",  value: "Live · 99.88%", tone: "success" },
              { label: "GEMS Claims API",      value: "Degraded",      tone: "warning" },
              { label: "NDIC Submission",      value: "Live",           tone: "success" },
            ]},
            { title: "API Keys (Vault)", items: [
              { label: "Stored Secrets", value: "12", tone: "info" },
              { label: "Rotated < 90 days", value: "10/12", tone: "success" },
              { label: "Expiring Soon", value: "1", tone: "warning" },
            ]}]
          )} />
          <Route path="/integrations/feeds" element={S("Section 10 · Integrations", "Result Feeds", ["Integrations","Feeds"],
            [{ title: "Outbound Feeds", items: [
              { label: "Doctor Portal (HL7v2)",    value: "Live", tone: "success" },
              { label: "Patient SMS Gateway",       value: "Live", tone: "success" },
              { label: "Doctor WhatsApp Pipeline", value: "Pilot", tone: "warning" },
              { label: "Email PDF Delivery",        value: "Live", tone: "success" },
            ]}]
          )} />
          <Route path="/integrations/ndic" element={S("Section 10 · Integrations", "NDIC Notifiable Disease Center", ["Integrations","NDIC"],
            [{ title: "Submissions (MTD)", items: [
              { label: "Total Submissions", value: "47", tone: "info" },
              { label: "Acknowledged", value: "42", tone: "success" },
              { label: "Pending", value: "3", tone: "warning" },
              { label: "Failed", value: "2", tone: "danger" },
            ]}]
          )} />

          {/* Analytics */}
          <Route path="/analytics" element={W(<Analytics />)} />
          <Route path="/analytics/compare" element={S("Section 9B · Level 5", "Comparative Analytics", ["Analytics","Compare"],
            [{ title: "Multi-Month Comparisons", items: [
              { label: "Doctor vs Doctor (Top 50)",   value: "Available", tone: "success" },
              { label: "Lab vs Lab (29 branches)",     value: "Available", tone: "success" },
              { label: "Rep vs Rep (14 reps)",         value: "Available", tone: "success" },
              { label: "Test Volume Heatmaps",         value: "Available", tone: "success" },
            ]},
            { title: "Time Granularity", items: [
              { label: "Daily / Weekly / Monthly", value: "All", tone: "info" },
              { label: "Custom Date Range",        value: "Yes", tone: "info" },
              { label: "YoY Comparison",           value: "Yes", tone: "info" },
            ]}]
          )} />
          <Route path="/analytics/ai" element={W(<AI />)} />
          <Route path="/analytics/custom" element={S("Section 9 · Analytics", "Custom Reports Builder", ["Analytics","Custom"],
            [{ title: "Saved Reports", items: [
              { label: "Daily Cash Intake by Branch", value: "Owner: Mr. Richard", tone: "info" },
              { label: "Pathologist TAT Performance",  value: "Owner: Prof", tone: "info" },
              { label: "Rep Commission Reconciliation", value: "Owner: Sales Mgr", tone: "info" },
              { label: "Wastage Variance per Lab",     value: "Owner: Inv. Mgr", tone: "info" },
            ]}]
          )} />

          {/* Tariffs */}
          <Route path="/tariffs" element={W(<Tariffs />)} />

          {/* Utilities */}
          <Route path="/utilities" element={W(<AuditActions />)} />
          <Route path="/utilities/audit" element={W(<AuditActions />)} />
          <Route path="/utilities/newsletters" element={W(<Newsletters />)} />
          <Route path="/utilities/feed-logs" element={W(<FeedLogs />)} />
          <Route path="/utilities/logs" element={S("Section 15 · Utilities", "Log Viewer", ["Utilities","Logs"],
            [{ title: "Log Streams", items: [
              { label: "API Gateway",    value: "12,481 lines/hr", tone: "info" },
              { label: "Auth Service",   value: "841 lines/hr",     tone: "info" },
              { label: "LIS Bridge",     value: "2,210 lines/hr",   tone: "info" },
              { label: "Background Jobs",value: "440 lines/hr",     tone: "info" },
              { label: "Error Rate (24h)", value: "0.04%",          tone: "success" },
            ]}]
          )} />
          <Route path="/utilities/docs" element={S("Section 16B · Utilities", "Documentation & Knowledge Base", ["Utilities","Docs"],
            [{ title: "Documentation", items: [
              { label: "Super Admin Wireframe Guide v1.0",  value: "Apr 2026", tone: "info" },
              { label: "ISO 15189 SOP Library",              value: "127 docs", tone: "info" },
              { label: "API Integration Guide (MedPrax)",   value: "v2.1",     tone: "info" },
              { label: "Elixir Claims Workflow",             value: "v1.4",     tone: "info" },
              { label: "First-Login Onboarding Script",     value: "Required", tone: "warning" },
            ]}]
          )} />

          {/* Support */}
          <Route path="/support" element={W(<Support />)} />
          <Route path="/support/new" element={S("Section 13A · Support", "Submit Ticket", ["Support","New Ticket"],
            [{ title: "New IT Support Ticket", items: [
              { label: "Categories", value: "Login · Printing · LIS · Hardware · Other", tone: "info" },
              { label: "Priority Levels", value: "Low · Normal · Urgent · Critical", tone: "info" },
              { label: "SLA (Critical)", value: "< 30 min response", tone: "danger" },
              { label: "SLA (Normal)",   value: "< 4 hours",         tone: "warning" },
            ]}]
          )} />
          <Route path="/support/queue" element={S("Section 13A · Support", "IT Response Queue", ["Support","Queue"],
            [{ title: "Active Tickets", items: [
              { label: "Critical · Awaiting", value: "2", tone: "danger" },
              { label: "Urgent · In Progress", value: "8", tone: "warning" },
              { label: "Normal · Open",        value: "21", tone: "info" },
              { label: "Resolved Today",       value: "14", tone: "success" },
            ]},
            { title: "On-Call", items: [
              { label: "Primary", value: "Abiodun (Dev)", tone: "info" },
              { label: "Secondary", value: "Moses (Backend)", tone: "info" },
            ]}]
          )} />

          {/* Settings */}
          <Route path="/settings" element={W(<Settings />)} />
          <Route path="/settings/mail" element={S("Section 17B · Settings", "Mail Server Configuration", ["Settings","Mail Server"],
            [{ title: "SMTP", items: [
              { label: "Provider",     value: "Labman Mail (Yannick)", tone: "info" },
              { label: "SMTP Host",    value: "mail.targetlab.co.za", tone: "info" },
              { label: "Port / TLS",   value: "587 / STARTTLS", tone: "info" },
              { label: "Status",       value: "Connected", tone: "success" },
              { label: "Daily Quota",  value: "10,000 / day", tone: "info" },
              { label: "Sent (24h)",   value: "2,841", tone: "info" },
            ]},
            { title: "Templates", items: [
              { label: "Result Release",         value: "Active", tone: "success" },
              { label: "Critical Result Alert",  value: "Active", tone: "success" },
              { label: "Newsletter Template",    value: "Active", tone: "success" },
              { label: "First-Login Welcome",    value: "Active", tone: "success" },
              { label: "Password Reset",         value: "Active", tone: "success" },
            ]}]
          )} />
          <Route path="/settings/notifications" element={S("Section 17C · Settings", "Notification Channels", ["Settings","Notifications"],
            [{ title: "Channels", items: [
              { label: "Email (SMTP)",    value: "Active", tone: "success" },
              { label: "SMS Gateway",     value: "Active", tone: "success" },
              { label: "WhatsApp Business", value: "Pilot", tone: "warning" },
              { label: "In-App Bell",     value: "Active", tone: "success" },
              { label: "Push (Mobile)",   value: "Phase 2", tone: "muted" },
            ]},
            { title: "Routing Rules", items: [
              { label: "Critical Result → Doctor + SMS + Call", value: "Enforced", tone: "danger" },
              { label: "Approval SLA Breach → Super Admin",      value: "Enforced", tone: "danger" },
              { label: "Inventory < threshold → Inv. Mgr",       value: "Enforced", tone: "warning" },
              { label: "Newsletter Bounces → Marketing",         value: "Enforced", tone: "info" },
            ]}]
          )} />
          <Route path="/settings/backup" element={W(<Settings />)} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
