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
import FinancialReports from "./pages/accounting/FinancialReports";
import Assets from "./pages/accounting/Assets";

import Laboratories from "./pages/admin/Laboratories";
import Departments from "./pages/admin/Departments";
import Tests from "./pages/admin/Tests";

import SalesDashboard from "./pages/sales/Dashboard";
import MaoSheet from "./pages/sales/MaoSheet";
import Pipeline from "./pages/sales/Pipeline";

import StaffList from "./pages/hr/StaffList";
import ClockInMap from "./pages/hr/ClockInMap";

import Inventory from "./pages/Inventory";
import Analyzers from "./pages/Analyzers";
import QA from "./pages/QA";
import Users from "./pages/auth/Users";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/approvals" element={W(<Approvals />)} />

          <Route path="/lims" element={W(<Requisitions />)} />
          <Route path="/lims/requisitions" element={W(<Requisitions />)} />
          <Route path="/lims/orders" element={W(<Stub kicker="Section 3B" title="Orders" breadcrumb={["Laboratory","Orders"]} />)} />
          <Route path="/lims/release" element={W(<Stub kicker="Section 3D" title="Release Orders" breadcrumb={["Laboratory","Release"]} />)} />
          <Route path="/lims/worksheets" element={W(<Worksheets />)} />
          <Route path="/lims/critical" element={W(<CriticalResults />)} />
          <Route path="/lims/timeline" element={W(<Timeline />)} />

          <Route path="/accounting" element={W(<Invoices />)} />
          <Route path="/accounting/invoices" element={W(<Invoices />)} />
          <Route path="/accounting/debtors" element={W(<Debtors />)} />
          <Route path="/accounting/creditors" element={W(<Stub kicker="Section 4C" title="Creditors" breadcrumb={["Accounting","Creditors"]} />)} />
          <Route path="/accounting/reports" element={W(<FinancialReports />)} />
          <Route path="/accounting/assets" element={W(<Assets />)} />

          <Route path="/admin" element={W(<Laboratories />)} />
          <Route path="/admin/laboratories" element={W(<Laboratories />)} />
          <Route path="/admin/departments" element={W(<Departments />)} />
          <Route path="/admin/tests" element={W(<Tests />)} />
          <Route path="/admin/companies" element={W(<Stub kicker="Section 5A" title="Companies" breadcrumb={["Admin","Companies"]} />)} />
          <Route path="/admin/medical-aid-admins" element={W(<Stub kicker="Section 5D" title="Medical Aid Administrators" breadcrumb={["Admin","Medical Aid Admins"]} />)} />
          <Route path="/admin/medical-aids" element={W(<Stub kicker="Section 5D" title="Medical Aids" breadcrumb={["Admin","Medical Aids"]} />)} />
          <Route path="/admin/patients" element={W(<Stub kicker="Section 5E" title="Patients" breadcrumb={["Admin","Patients"]} />)} />
          <Route path="/admin/doctors" element={W(<Stub kicker="Section 5F" title="Doctors" breadcrumb={["Admin","Doctors"]} />)} />
          <Route path="/admin/notifiable" element={W(<Stub kicker="Section 5" title="Notifiable Diseases" breadcrumb={["Admin","Notifiable"]} />)} />

          <Route path="/sales" element={W(<SalesDashboard />)} />
          <Route path="/sales/mao" element={W(<MaoSheet />)} />
          <Route path="/sales/leads" element={W(<Pipeline />)} />
          <Route path="/sales/pipeline" element={W(<Pipeline />)} />
          <Route path="/sales/commission" element={W(<Stub kicker="Section 6D" title="Commission Management" breadcrumb={["Sales","Commission"]} />)} />
          <Route path="/sales/newsletter" element={W(<Stub kicker="Section 6E" title="Newsletter (Marketing to Doctors)" breadcrumb={["Sales","Newsletter"]} />)} />

          <Route path="/hr" element={W(<StaffList />)} />
          <Route path="/hr/staff" element={W(<StaffList />)} />
          <Route path="/hr/clock-in" element={W(<ClockInMap />)} />
          <Route path="/hr/leave" element={W(<Stub kicker="Section 7C" title="Leave Management" breadcrumb={["HR","Leave"]} />)} />
          <Route path="/hr/payroll" element={W(<Stub kicker="Section 7D" title="Payroll" breadcrumb={["HR","Payroll"]} />)} />
          <Route path="/hr/expenses" element={W(<Stub kicker="Section 7E" title="Expense Claims" breadcrumb={["HR","Expenses"]} />)} />

          <Route path="/inventory" element={W(<Inventory />)} />
          <Route path="/inventory/kits" element={W(<Inventory />)} />
          <Route path="/inventory/reagents" element={W(<Inventory />)} />
          <Route path="/inventory/stock" element={W(<Inventory />)} />
          <Route path="/inventory/requests" element={W(<Stub kicker="Section 13B" title="Store Requests" breadcrumb={["Inventory","Requests"]} />)} />
          <Route path="/inventory/wastage" element={W(<Stub kicker="Section 13C" title="Wastage Log" breadcrumb={["Inventory","Wastage"]} />)} />
          <Route path="/inventory/risk" element={W(<Stub kicker="Section 13D" title="Supply Risk Dashboard" breadcrumb={["Inventory","Supply Risk"]} />)} />

          <Route path="/analyzers" element={W(<Analyzers />)} />
          <Route path="/analyzers/registry" element={W(<Analyzers />)} />
          <Route path="/analyzers/trust" element={W(<Analyzers />)} />
          <Route path="/analyzers/maintenance" element={W(<Stub kicker="Section 14" title="Maintenance Schedule" breadcrumb={["Analyzers","Maintenance"]} />)} />
          <Route path="/analyzers/lis" element={W(<Stub kicker="Section 14B" title="LIS Connectivity" breadcrumb={["Analyzers","LIS"]} />)} />

          <Route path="/qa" element={W(<QA />)} />
          <Route path="/qa/heatmaps" element={W(<QA />)} />
          <Route path="/qa/iso" element={W(<Stub kicker="Section 12B" title="ISO Evidence Vault" breadcrumb={["QA","ISO Vault"]} />)} />
          <Route path="/qa/replay" element={W(<Timeline />)} />
          <Route path="/qa/incidents" element={W(<Stub kicker="Section 12D" title="Incident Management" breadcrumb={["QA","Incidents"]} />)} />

          <Route path="/auth" element={W(<Users />)} />
          <Route path="/auth/users" element={W(<Users />)} />
          <Route path="/auth/roles" element={W(<Stub kicker="Section 8B" title="Roles" breadcrumb={["Authentication","Roles"]} />)} />
          <Route path="/auth/permissions" element={W(<Stub kicker="Section 8C" title="Permissions" breadcrumb={["Authentication","Permissions"]} />)} />
          <Route path="/auth/levels" element={W(<AccessLevels />)} />

          <Route path="/integrations" element={W(<Integrations />)} />
          <Route path="/integrations/medprax" element={W(<Integrations />)} />
          <Route path="/integrations/elixir" element={W(<Integrations />)} />
          <Route path="/integrations/apis" element={W(<Integrations />)} />
          <Route path="/integrations/feeds" element={W(<Integrations />)} />
          <Route path="/integrations/ndic" element={W(<Integrations />)} />

          <Route path="/analytics" element={W(<Analytics />)} />
          <Route path="/analytics/compare" element={W(<Stub kicker="Section 9B · Level 5" title="Comparative Analytics" breadcrumb={["Analytics","Compare"]} />)} />
          <Route path="/analytics/ai" element={W(<AI />)} />
          <Route path="/analytics/custom" element={W(<Stub kicker="Section 9" title="Custom Reports" breadcrumb={["Analytics","Custom"]} />)} />

          <Route path="/tariffs" element={W(<Tariffs />)} />

          <Route path="/utilities" element={W(<Utilities />)} />
          <Route path="/utilities/audit" element={W(<Utilities />)} />
          <Route path="/utilities/newsletters" element={W(<Stub kicker="Section 15" title="Newsletters" breadcrumb={["Utilities","Newsletters"]} />)} />
          <Route path="/utilities/feed-logs" element={W(<Stub kicker="Section 15" title="Result Feed Logs" breadcrumb={["Utilities","Feed Logs"]} />)} />
          <Route path="/utilities/logs" element={W(<Stub kicker="Section 15" title="Log Viewer" breadcrumb={["Utilities","Logs"]} />)} />
          <Route path="/utilities/docs" element={W(<Stub kicker="Section 16B" title="Documentation" breadcrumb={["Utilities","Docs"]} />)} />

          <Route path="/support" element={W(<Support />)} />
          <Route path="/support/new" element={W(<Support />)} />
          <Route path="/support/queue" element={W(<Support />)} />

          <Route path="/settings" element={W(<Settings />)} />
          <Route path="/settings/mail" element={W(<Settings />)} />
          <Route path="/settings/notifications" element={W(<Settings />)} />
          <Route path="/settings/backup" element={W(<Settings />)} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
