// Full 35-user staff directory based on Labman 3 spec (Section 7.1)
export type Staff = {
  name: string; email: string; branch: string; verified: boolean;
  roles: string[]; level: 1 | 2 | 3 | 4 | 5;
  status: "Active" | "Suspended" | "Terminated";
  lastLogin: string; clockedIn: boolean;
};

export const STAFF: Staff[] = [
  { name: "William Nettmann",     email: "william@targetlab.co.za",  branch: "Booysens",    verified: true,  roles: ["Developer"],                                level: 5, status: "Active", lastLogin: "Today 06:42",  clockedIn: true },
  { name: "Yanick Kambembo",      email: "yanick@targetlab.co.za",   branch: "Head Office", verified: true,  roles: ["Administrator"],                            level: 4, status: "Active", lastLogin: "Today 07:10",  clockedIn: true },
  { name: "mr francis ike",       email: "francis@targetlab.co.za",  branch: "Lagos",       verified: true,  roles: ["Administrator","Manager","Pathologist"],   level: 5, status: "Active", lastLogin: "Today 06:55",  clockedIn: true },
  { name: "richard yemmy",        email: "richard@targetlab.co.za",  branch: "JHB HQ",      verified: true,  roles: ["Manager"],                                  level: 4, status: "Active", lastLogin: "Today 06:30",  clockedIn: true },
  { name: "mrs ida thakam",       email: "ida@targetlab.co.za",      branch: "Head Office", verified: true,  roles: ["Manager","Pathologist","Lab Tech"],         level: 4, status: "Active", lastLogin: "Today 07:20",  clockedIn: true },
  { name: "ms ntswaki maleke",    email: "ntswaki@targetlab.co.za",  branch: "Booysens",    verified: true,  roles: ["Manager","Data Capturer"],                  level: 3, status: "Active", lastLogin: "Today 07:00",  clockedIn: true },
  { name: "mr Patrick Magupya",   email: "patrick@targetlab.co.za",  branch: "Head Office", verified: true,  roles: ["Manager","Data Capturer","Representative"], level: 3, status: "Active", lastLogin: "Today 06:45",  clockedIn: true },
  { name: "CARMEN ANGELICA",      email: "carmen@targetlab.co.za",   branch: "Cape Town",   verified: true,  roles: ["Representative"],                           level: 2, status: "Active", lastLogin: "Today 08:15",  clockedIn: true },
  { name: "Ike Igbo MBA",         email: "ike@targetlab.co.za",      branch: "Durban",      verified: false, roles: ["Representative"],                           level: 2, status: "Active", lastLogin: "Yesterday",     clockedIn: false },
  { name: "Makoane Ngoasheng",    email: "makoane@targetlab.co.za",  branch: "KwaMhlanga",  verified: true,  roles: ["Representative"],                           level: 2, status: "Active", lastLogin: "Today 08:30",  clockedIn: true },
  { name: "Sister A. Naidoo",     email: "naidoo@targetlab.co.za",   branch: "Booysens",    verified: true,  roles: ["Phlebotomist"],                             level: 1, status: "Active", lastLogin: "Today 06:00",  clockedIn: true },
  { name: "J. Pieters",           email: "pieters@targetlab.co.za",  branch: "Booysens",    verified: true,  roles: ["Driver"],                                   level: 1, status: "Active", lastLogin: "Today 05:45",  clockedIn: true },
  { name: "Faith Olaniyi",        email: "faith@targetlab.co.za",    branch: "Head Office", verified: true,  roles: ["Developer","Lead"],                         level: 5, status: "Active", lastLogin: "Today 09:00",  clockedIn: true },
  { name: "Abiodun Adeyemi",      email: "abiodun@targetlab.co.za",  branch: "Head Office", verified: true,  roles: ["Developer"],                                level: 5, status: "Active", lastLogin: "Today 09:10",  clockedIn: true },
  { name: "Moses Banda",          email: "moses@targetlab.co.za",    branch: "Head Office", verified: true,  roles: ["Developer"],                                level: 4, status: "Active", lastLogin: "Today 09:05",  clockedIn: true },
  { name: "Precious Mokoena",     email: "precious@targetlab.co.za", branch: "Head Office", verified: true,  roles: ["Administrator","Project"],                  level: 4, status: "Active", lastLogin: "Today 08:00",  clockedIn: true },
  { name: "Dr. Themba Sithole",   email: "themba@targetlab.co.za",   branch: "Pretoria",    verified: true,  roles: ["Pathologist"],                              level: 4, status: "Active", lastLogin: "Today 07:35",  clockedIn: true },
  { name: "Dr. Lerato Khumalo",   email: "lerato@targetlab.co.za",   branch: "JHB HQ",      verified: true,  roles: ["Pathologist"],                              level: 4, status: "Active", lastLogin: "Today 07:40",  clockedIn: true },
  { name: "T. Mokoena",           email: "tm@targetlab.co.za",       branch: "Witbank",     verified: true,  roles: ["Lab Manager"],                              level: 4, status: "Active", lastLogin: "Today 07:15",  clockedIn: true },
  { name: "S. Govender",          email: "sg@targetlab.co.za",       branch: "Durban",      verified: true,  roles: ["Lab Manager"],                              level: 4, status: "Active", lastLogin: "Today 07:25",  clockedIn: true },
  { name: "L. van der Merwe",     email: "lvdm@targetlab.co.za",     branch: "Cape Town",   verified: true,  roles: ["Sales Manager"],                            level: 4, status: "Active", lastLogin: "Today 08:05",  clockedIn: true },
  { name: "B. Nkosi",             email: "bnkosi@targetlab.co.za",   branch: "Polokwane",   verified: true,  roles: ["Lab Tech"],                                 level: 2, status: "Active", lastLogin: "Today 06:50",  clockedIn: true },
  { name: "K. Maboe",             email: "kmaboe@targetlab.co.za",   branch: "Rustenburg",  verified: true,  roles: ["Lab Tech","Pre-Lab"],                       level: 2, status: "Active", lastLogin: "Today 07:00",  clockedIn: true },
  { name: "T. Dlamini",           email: "tdlamini@targetlab.co.za", branch: "Bloemfontein",verified: true,  roles: ["Data Capturer"],                            level: 1, status: "Active", lastLogin: "Today 07:30",  clockedIn: true },
  { name: "M. Pillay",            email: "mpillay@targetlab.co.za",  branch: "Port Elizabeth",verified: true, roles: ["Data Capturer"],                          level: 2, status: "Active", lastLogin: "Today 07:20",  clockedIn: true },
  { name: "N. Modise",            email: "nmodise@targetlab.co.za",  branch: "Mafikeng",    verified: true,  roles: ["Phlebotomist","Pre-Lab"],                   level: 1, status: "Active", lastLogin: "Today 06:15",  clockedIn: true },
  { name: "R. Mensah",            email: "rmensah@targetlab.co.za",  branch: "Lagos",       verified: true,  roles: ["Lab Tech"],                                 level: 2, status: "Active", lastLogin: "Today 07:45",  clockedIn: true },
  { name: "P. Moyo",              email: "pmoyo@targetlab.co.za",    branch: "Harare",      verified: true,  roles: ["Lab Manager"],                              level: 4, status: "Active", lastLogin: "Today 07:10",  clockedIn: true },
  { name: "M. Letsie",            email: "mletsie@targetlab.co.za",  branch: "Lesotho",     verified: true,  roles: ["Phlebotomist"],                             level: 1, status: "Active", lastLogin: "Today 06:55",  clockedIn: true },
  { name: "Dr. A. Patel",         email: "apatel@targetlab.co.za",   branch: "Head Office", verified: true,  roles: ["Pathologist","Director"],                   level: 5, status: "Active", lastLogin: "Today 08:50",  clockedIn: true },
  { name: "Z. Kunene",            email: "zkunene@targetlab.co.za",  branch: "Ladysmith",   verified: true,  roles: ["Driver"],                                   level: 1, status: "Active", lastLogin: "Today 05:30",  clockedIn: true },
  { name: "F. Marobela",          email: "fmarobela@targetlab.co.za",branch: "Vryburg",     verified: true,  roles: ["Driver","Pre-Lab"],                         level: 1, status: "Active", lastLogin: "Today 05:20",  clockedIn: true },
  { name: "G. Rampa",             email: "grampa@targetlab.co.za",   branch: "Kuruman",     verified: false, roles: ["Data Capturer"],                            level: 1, status: "Suspended", lastLogin: "12/04/2026", clockedIn: false },
  { name: "H. Erasmus",           email: "herasmus@targetlab.co.za", branch: "George",      verified: true,  roles: ["Inventory Manager"],                        level: 3, status: "Active", lastLogin: "Today 07:45",  clockedIn: true },
  { name: "Dr. K. Mbeki",         email: "kmbeki@targetlab.co.za",   branch: "Welkom",      verified: true,  roles: ["Pathologist","HOD-Histology"],              level: 4, status: "Active", lastLogin: "Today 07:55",  clockedIn: true },
];

export const ROLES = [
  { name: "Administrator",        level: "4–5", perms: 40, color: "bg-red-100 text-red-800" },
  { name: "Manager",              level: "4",   perms: 20, color: "bg-amber-100 text-amber-800" },
  { name: "Developer",            level: "5",   perms: 0,  color: "bg-purple-100 text-purple-800" },
  { name: "Pathologist",          level: "3–4", perms: 18, color: "bg-blue-100 text-blue-800" },
  { name: "Lab Manager",          level: "4",   perms: 22, color: "bg-amber-100 text-amber-800" },
  { name: "Laboratory Technician",level: "2–3", perms: 12, color: "bg-teal-100 text-teal-800" },
  { name: "Pre-Lab Staff",        level: "2",   perms: 9,  color: "bg-cyan-100 text-cyan-800" },
  { name: "Phlebotomist",         level: "1–2", perms: 8,  color: "bg-sky-100 text-sky-800" },
  { name: "Data Capturer",        level: "1–2", perms: 7,  color: "bg-slate-100 text-slate-700" },
  { name: "Driver",               level: "1",   perms: 5,  color: "bg-slate-100 text-slate-700" },
  { name: "Driver Supervisor",    level: "3",   perms: 11, color: "bg-teal-100 text-teal-800" },
  { name: "Sales Person (Rep)",   level: "2–3", perms: 14, color: "bg-emerald-100 text-emerald-800" },
  { name: "Sales Manager",        level: "4",   perms: 19, color: "bg-amber-100 text-amber-800" },
  { name: "Financial Manager",    level: "4–5", perms: 26, color: "bg-red-100 text-red-800" },
  { name: "Accountant",           level: "3–4", perms: 17, color: "bg-blue-100 text-blue-800" },
  { name: "HR Officer",           level: "3–4", perms: 13, color: "bg-blue-100 text-blue-800" },
  { name: "Inventory Manager",    level: "3–4", perms: 16, color: "bg-blue-100 text-blue-800" },
  { name: "QA Officer",           level: "3",   perms: 14, color: "bg-teal-100 text-teal-800" },
  { name: "Head Office",          level: "3–4", perms: 2,  color: "bg-blue-100 text-blue-800" },
  { name: "Doctor (External)",    level: "Ext", perms: 0,  color: "bg-slate-100 text-slate-700" },
];

export const PERMISSIONS = [
  "audited-actions-view-any","canned-comments-view-any","canned-comments-create","companies-view-any","companies-create","companies-edit",
  "departments-view-any","departments-create","doctors-view-any","doctors-create","doctors-edit","guarantors-view-any","guarantors-create",
  "invoices-view-any","invoices-create","invoices-void","debtors-view-any","debtors-collect","creditors-view-any","creditors-pay",
  "patients-view-any","patients-create","patients-edit","patients-merge","results-view-any","results-release","results-override",
  "results-rerun","worksheets-view-any","worksheets-create","worksheets-print","barcodes-print","specimens-receive","specimens-track",
  "tariffs-view","tariffs-edit","medical-aids-view","medical-aids-edit","kits-view","kits-create","kits-consume","reagents-view",
  "reagents-edit","wastage-log","store-requests-create","store-requests-approve","analyzers-view","analyzers-configure","analyzers-maintenance",
  "lis-feeds-view","lis-feeds-configure","users-view-any","users-create","users-suspend","users-terminate","roles-view","roles-edit",
  "permissions-edit","access-levels-edit","leave-approve","payroll-process","expenses-approve","commissions-view","commissions-edit",
  "mao-sheet-view","mao-sheet-edit","newsletter-send","support-tickets-resolve","integrations-configure","backup-trigger","emergency-mode",
  "vault-export","critical-results-acknowledge","notifiable-diseases-submit","ai-queries-run","reports-view-all","reports-export",
];
