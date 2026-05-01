// Reusable comprehensive form schemas for "New X" buttons across the platform.
import type { FormField } from "@/components/shared/FormDialog";
import { BRANCHES } from "./nav";

export const DEPARTMENTS = [
  "Data Capturer", "Driver", "Driver Supervisor", "Phlebotomist",
  "Quality Assurance", "Sales Person", "Sales Manager",
  "Lab Technician", "Pre-Lab", "Lab Manager",
  "Financial Manager", "HR Manager", "Accountant", "Inventory Manager",
  "Fin Claim Officer", "Pathologist", "Administrator", "Developer",
];

export const ACCESS_LEVELS = ["L1 — Operational", "L2 — Lab Floor", "L3 — Senior", "L4 — Manager", "L5 — Super Admin"];

export const NEW_USER_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", required: true, group: "Personal" },
  { name: "lastName",  label: "Last Name",  required: true, group: "Personal" },
  { name: "idNumber",  label: "ID / Passport #", required: true, group: "Personal" },
  { name: "dob",       label: "Date of Birth", type: "date", group: "Personal" },
  { name: "gender",    label: "Gender", type: "select", options: ["Male","Female","Other"], group: "Personal" },
  { name: "address",   label: "Residential Address", type: "textarea", span: 2, group: "Personal" },

  { name: "email",     label: "Work Email", type: "email", required: true, group: "Account" },
  { name: "phone",     label: "Mobile Phone", type: "tel", required: true, group: "Account" },
  { name: "username",  label: "Username", required: true, group: "Account" },
  { name: "tempPassword", label: "Temporary Password", type: "password", required: true, hint: "Forced reset on first login", group: "Account" },

  { name: "department", label: "Department", type: "select", options: DEPARTMENTS, required: true, group: "Role & Access" },
  { name: "roles",      label: "Roles", type: "multiselect", options: DEPARTMENTS, group: "Role & Access", span: 2, hint: "Multi-role allowed (e.g. Manager + Data Capturer)" },
  { name: "level",      label: "Access Level", type: "select", options: ACCESS_LEVELS, required: true, group: "Role & Access" },
  { name: "branch",     label: "Primary Branch", type: "select", options: BRANCHES, required: true, group: "Role & Access" },
  { name: "verified",   label: "Email Verified", type: "checkbox", placeholder: "Mark as already verified", group: "Role & Access" },

  { name: "startDate",  label: "Start Date", type: "date", required: true, group: "Employment" },
  { name: "salary",     label: "Monthly Salary", type: "number", prefix: "R", group: "Employment" },
  { name: "contract",   label: "Contract Type", type: "select", options: ["Permanent","Fixed-Term","Locum","Intern"], group: "Employment" },
  { name: "manager",    label: "Reports To", group: "Employment" },
];

export const NEW_LEAVE_FIELDS: FormField[] = [
  { name: "staff", label: "Staff Member", required: true, group: "Request" },
  { name: "type",  label: "Leave Type",   type: "select", required: true, options: ["Annual","Sick","Family Responsibility","Maternity","Paternity","Study","Unpaid"], group: "Request" },
  { name: "from",  label: "From", type: "date", required: true, group: "Request" },
  { name: "to",    label: "To",   type: "date", required: true, group: "Request" },
  { name: "days",  label: "Total Days", type: "number", required: true, group: "Request" },
  { name: "halfDay", label: "Half Day", type: "checkbox", placeholder: "First/last day is half", group: "Request" },
  { name: "reason", label: "Reason", type: "textarea", required: true, span: 2, group: "Request" },
  { name: "certificate", label: "Medical / Supporting Document", type: "file", span: 2, hint: "PDF/JPG, max 5MB. Required for sick leave > 2 days.", group: "Documents" },
  { name: "cover",  label: "Coverage / Stand-In", group: "Coverage", span: 2, hint: "Who will cover the role during absence?" },
  { name: "lineManager", label: "Notify Line Manager", type: "checkbox", defaultValue: true, group: "Coverage" },
  { name: "hr", label: "Notify HR", type: "checkbox", defaultValue: true, group: "Coverage" },
];

export const NEW_VEHICLE_FIELDS: FormField[] = [
  { name: "rego",   label: "Registration #", required: true, group: "Vehicle" },
  { name: "make",   label: "Make", required: true, group: "Vehicle" },
  { name: "model",  label: "Model", required: true, group: "Vehicle" },
  { name: "year",   label: "Year", type: "number", group: "Vehicle" },
  { name: "vin",    label: "VIN", group: "Vehicle" },
  { name: "engine", label: "Engine #", group: "Vehicle" },
  { name: "color",  label: "Colour", group: "Vehicle" },
  { name: "fuel",   label: "Fuel Type", type: "select", options: ["Petrol","Diesel","Hybrid","Electric"], group: "Vehicle" },
  { name: "branch", label: "Assigned Branch", type: "select", options: BRANCHES, required: true, group: "Assignment" },
  { name: "driver", label: "Primary Driver", group: "Assignment" },
  { name: "license",label: "License Disk Expiry", type: "date", group: "Compliance" },
  { name: "insurance", label: "Insurance Provider", group: "Compliance" },
  { name: "policy", label: "Policy #", group: "Compliance" },
  { name: "service", label: "Next Service Date", type: "date", group: "Compliance" },
  { name: "tracker", label: "Tracker Installed", type: "checkbox", group: "Compliance" },
  { name: "notes",  label: "Notes", type: "textarea", span: 2 },
];

export const NEW_DRIVER_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", required: true, group: "Personal" },
  { name: "lastName",  label: "Last Name",  required: true, group: "Personal" },
  { name: "idNumber",  label: "ID #", required: true, group: "Personal" },
  { name: "phone",     label: "Mobile", type: "tel", required: true, group: "Personal" },
  { name: "email",     label: "Email",  type: "email", group: "Personal" },
  { name: "branch",    label: "Branch", type: "select", options: BRANCHES, required: true, group: "Assignment" },
  { name: "supervisor",label: "Driver Supervisor", group: "Assignment" },
  { name: "vehicle",   label: "Default Vehicle", group: "Assignment" },
  { name: "licenseNo", label: "Driver's Licence #", required: true, group: "Licence" },
  { name: "licenseCode", label: "Licence Code", type: "select", options: ["B","C1","EC1","EC"], group: "Licence" },
  { name: "pdp",       label: "PrDP Status", type: "select", options: ["Valid","Expired","Pending"], group: "Licence" },
  { name: "pdpExpiry", label: "PrDP Expiry", type: "date", group: "Licence" },
  { name: "specimenCert", label: "Specimen Handling Cert.", type: "checkbox", placeholder: "Completed mandatory training", group: "Compliance" },
  { name: "tempPassword", label: "Temporary Password", type: "password", required: true, group: "Account" },
];

export const NEW_SALES_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", required: true, group: "Personal" },
  { name: "lastName",  label: "Last Name",  required: true, group: "Personal" },
  { name: "email",     label: "Email", type: "email", required: true, group: "Personal" },
  { name: "phone",     label: "Mobile", type: "tel", required: true, group: "Personal" },
  { name: "role",      label: "Role", type: "select", options: ["Sales Person","Sales Manager","Sales Lead","Marketing"], required: true, group: "Role" },
  { name: "manager",   label: "Sales Manager", group: "Role" },
  { name: "territory", label: "Territory / Region", required: true, group: "Territory", hint: "e.g. Gauteng-South, KZN-North" },
  { name: "branches",  label: "Assigned Branches", type: "multiselect", options: BRANCHES, span: 2, group: "Territory" },
  { name: "doctors",   label: "Assigned Doctors (count)", type: "number", group: "Territory" },
  { name: "target",    label: "Monthly Target", type: "number", prefix: "R", required: true, group: "Targets" },
  { name: "commission",label: "Commission %", type: "number", group: "Targets" },
  { name: "carAllowance", label: "Car Allowance", type: "number", prefix: "R", group: "Targets" },
  { name: "tempPassword", label: "Temp Password", type: "password", required: true, group: "Account" },
];

export const NEW_DOCTOR_FIELDS: FormField[] = [
  { name: "title",     label: "Title", type: "select", options: ["Dr.","Prof.","Mr.","Mrs.","Ms."], required: true, group: "Identity" },
  { name: "firstName", label: "First Name", required: true, group: "Identity" },
  { name: "lastName",  label: "Surname", required: true, group: "Identity" },
  { name: "hpcsa",     label: "HPCSA / MDCN Reg #", required: true, group: "Identity" },
  { name: "speciality",label: "Speciality", type: "select", required: true, options: ["GP","OB-GYN","Paediatrics","Endocrinology","Internal Medicine","Cardiology","Oncology","Dermatology","Psychiatry","Surgery","Other"], group: "Identity" },
  { name: "practice",  label: "Practice / Hospital Name", required: true, group: "Practice" },
  { name: "practiceNo",label: "Practice #", group: "Practice" },
  { name: "email",     label: "Email", type: "email", required: true, group: "Practice" },
  { name: "phone",     label: "Phone", type: "tel", required: true, group: "Practice" },
  { name: "address",   label: "Practice Address", type: "textarea", span: 2, group: "Practice" },
  { name: "area",      label: "Area / Suburb", required: true, group: "Practice" },
  { name: "city",      label: "City", required: true, group: "Practice" },
  { name: "rep",       label: "Assigned Sales Rep", required: true, group: "CRM" },
  { name: "expectedAdrc", label: "Expected ADRC/day", type: "number", group: "CRM" },
  { name: "deliveryRoute",label: "Delivery Route", group: "CRM" },
  { name: "preferredChannel", label: "Result Delivery", type: "select", options: ["Doctor Portal","Email PDF","WhatsApp","Print + Courier"], group: "CRM" },
  { name: "notes",     label: "CRM Notes", type: "textarea", span: 2, group: "CRM" },
];

export const NEW_REQUISITION_FIELDS: FormField[] = [
  { name: "labNumber", label: "Lab Number", required: true, group: "Header", hint: "Auto-generated; can be overridden" },
  { name: "laboratory",label: "Laboratory", type: "select", required: true, options: BRANCHES, defaultValue: "Booysens", group: "Header" },
  { name: "doctorCode",label: "Doctor Code", required: true, group: "Header" },
  { name: "collectedAt",label: "Collected at", type: "date", required: true, group: "Header" },

  { name: "patientLab",label: "Patient Lab #", group: "Patient Details", hint: "Existing patient or scan barcode" },
  { name: "title",     label: "Title", type: "select", options: ["Mr.","Mrs.","Ms.","Dr.","Master","Miss"], required: true, group: "Patient Details" },
  { name: "initials",  label: "Initials", group: "Patient Details" },
  { name: "patientName", label: "Name", required: true, group: "Patient Details" },
  { name: "surname",   label: "Surname", required: true, group: "Patient Details" },
  { name: "idNumber",  label: "ID Number", required: true, group: "Patient Details" },
  { name: "dob",       label: "Date of Birth", type: "date", group: "Patient Details" },
  { name: "email",     label: "Email", type: "email", group: "Patient Details" },
  { name: "cell",      label: "Cell number", type: "tel", group: "Patient Details" },
  { name: "address",   label: "Address", type: "textarea", required: true, span: 2, group: "Patient Details" },
  { name: "city",      label: "City", required: true, group: "Patient Details" },
  { name: "province",  label: "Province", required: true, group: "Patient Details" },
  { name: "postal",    label: "Postal code", required: true, group: "Patient Details" },
  { name: "country",   label: "Country", type: "select", required: true, defaultValue: "South Africa", options: ["South Africa","Nigeria","Zimbabwe","Lesotho","Botswana"], group: "Patient Details" },
  { name: "patientNumber", label: "Patient Number", required: true, group: "Patient Details" },
  { name: "sex",       label: "Sex", type: "select", options: ["Male","Female","Other"], group: "Patient Details" },

  { name: "guarantorName", label: "Guarantor Name", group: "Guarantor Details" },
  { name: "guarantorRel",  label: "Relationship", type: "select", options: ["Self","Spouse","Parent","Child","Employer","Other"], group: "Guarantor Details" },
  { name: "guarantorId",   label: "Guarantor ID", group: "Guarantor Details" },
  { name: "guarantorPhone",label: "Guarantor Phone", type: "tel", group: "Guarantor Details" },

  { name: "doctor",    label: "Referring Doctor", required: true, group: "Requisition Details" },
  { name: "department",label: "Lab Department", type: "select", options: ["HIV","Chemistry","Haematology","Microbiology","Histology","Virology"], group: "Requisition Details" },
  { name: "priority",  label: "Priority", type: "select", options: ["Routine","Urgent","STAT"], required: true, group: "Requisition Details" },
  { name: "billTo",    label: "Bill To", type: "select", options: ["Cash","Medical Aid","Corporate","Doctor Account"], required: true, group: "Requisition Details" },
  { name: "aid",       label: "Medical Aid", type: "select", options: ["Discovery","Bonitas","GEMS","Polmed","Fedhealth","Momentum","PSMAS","AXA Mansard","Cash"], group: "Requisition Details" },
  { name: "aidNo",     label: "Member #", group: "Requisition Details" },
  { name: "auth",      label: "Pre-Auth #", group: "Requisition Details" },

  { name: "specimen",  label: "Specimen Type", type: "select", options: ["Blood (EDTA)","Blood (Serum)","Blood (Plasma)","Urine","Sputum","Swab","Tissue","CSF"], required: true, group: "Containers" },
  { name: "container", label: "Container", group: "Containers" },
  { name: "containerCount", label: "# Containers", type: "number", defaultValue: "1", group: "Containers" },
  { name: "phlebotomist", label: "Phlebotomist", group: "Containers" },

  { name: "tests",     label: "Tests Ordered", type: "multiselect", options: ["FBC","U&E","HBA1C","TSH","Free T4","HIV PCR","PSA","Lipogram","hCG","Liver Function","CRP","ESR","INR"], span: 2, required: true, group: "Requests" },
  { name: "clinical",  label: "Clinical Notes / ICD-10", type: "textarea", span: 2, group: "Requests" },
];

export const NEW_INVOICE_FIELDS: FormField[] = [
  { name: "type",     label: "Invoice Type", type: "select", options: ["Cash","Medical Aid","Corporate","Pro Forma","Credit Note"], required: true, group: "Invoice" },
  { name: "patient",  label: "Patient / Account", required: true, group: "Invoice" },
  { name: "labNo",    label: "Lab #", group: "Invoice" },
  { name: "doctor",   label: "Referring Doctor", group: "Invoice" },
  { name: "issueDate",label: "Issue Date", type: "date", required: true, defaultValue: new Date().toISOString().slice(0,10), group: "Invoice" },
  { name: "dueDate",  label: "Due Date", type: "date", group: "Invoice" },
  { name: "branch",   label: "Branch", type: "select", options: BRANCHES, required: true, group: "Invoice" },
  { name: "tests",    label: "Tests", type: "multiselect", options: ["FBC","U&E","HBA1C","TSH","HIV PCR","PSA","Lipogram"], span: 2, group: "Line Items" },
  { name: "amount",   label: "Sub-total (Excl VAT)", type: "number", prefix: "R", required: true, group: "Line Items" },
  { name: "vat",      label: "VAT %", type: "number", defaultValue: "15", group: "Line Items" },
  { name: "discount", label: "Discount %", type: "number", defaultValue: "0", group: "Line Items" },
  { name: "sendTo",   label: "Send To (Sales / Manager)", type: "select", required: true, options: ["L. van der Merwe (Sales Mgr · Cape Town)","Patrick Magupya (Sales · Head Office)","Carmen Angelica (Rep · Cape Town)","Ike Igbo (Rep · Durban)","Makoane Ngoasheng (Rep · KwaMhlanga)","All Sales Team"], group: "Distribution" },
  { name: "channel",  label: "Delivery Channel", type: "select", options: ["Email","WhatsApp","SMS","In-app","Print"], required: true, defaultValue: "Email", group: "Distribution" },
  { name: "ccEmails", label: "CC Emails", group: "Distribution", span: 2, hint: "Comma-separated" },
  { name: "notes",    label: "Internal Notes", type: "textarea", span: 2 },
];

export const NEW_CREDITOR_FIELDS: FormField[] = [
  { name: "name",     label: "Creditor Name", required: true, group: "Supplier" },
  { name: "category", label: "Category", type: "select", options: ["Reagents","Kits","Analyzers","Consumables","Utilities","Telecom","Facilities","Logistics","Professional Services"], required: true, group: "Supplier" },
  { name: "contact",  label: "Contact Person", group: "Supplier" },
  { name: "email",    label: "Email", type: "email", required: true, group: "Supplier" },
  { name: "phone",    label: "Phone", type: "tel", group: "Supplier" },
  { name: "address",  label: "Physical Address", type: "textarea", span: 2, group: "Supplier" },
  { name: "vat",      label: "VAT #", group: "Compliance" },
  { name: "regNo",    label: "Company Reg #", group: "Compliance" },
  { name: "beeLevel", label: "B-BBEE Level", type: "select", options: ["1","2","3","4","5","6","7","Non-compliant","N/A"], group: "Compliance" },
  { name: "bank",     label: "Bank", required: true, group: "Banking" },
  { name: "accNo",    label: "Account #", required: true, group: "Banking" },
  { name: "branchCode", label: "Branch Code", group: "Banking" },
  { name: "swift",    label: "SWIFT (intl.)", group: "Banking" },
  { name: "terms",    label: "Payment Terms", type: "select", options: ["COD","Net 7","Net 14","Net 30","Net 60","Net 90"], required: true, group: "Terms" },
  { name: "currency", label: "Currency", type: "select", options: ["ZAR","USD","EUR","GBP","NGN"], defaultValue: "ZAR", group: "Terms" },
  { name: "creditLimit", label: "Credit Limit", type: "number", prefix: "R", group: "Terms" },
];

export const NEW_ASSET_FIELDS: FormField[] = [
  { name: "category", label: "Category", type: "select", required: true, options: ["Lab Equipment","Computer & IT","Office Assets","Vehicles","Medical Devices","Furniture"], group: "Asset" },
  { name: "name",     label: "Asset Name", required: true, group: "Asset" },
  { name: "serial",   label: "Serial / Reg #", required: true, group: "Asset" },
  { name: "model",    label: "Model #", group: "Asset" },
  { name: "manufacturer", label: "Manufacturer", group: "Asset" },
  { name: "branch",   label: "Branch / Location", type: "select", options: BRANCHES, required: true, group: "Assignment" },
  { name: "assigned", label: "Assigned To (User/Dept)", group: "Assignment" },
  { name: "purchase", label: "Purchase Date", type: "date", required: true, group: "Financial" },
  { name: "supplier", label: "Supplier", group: "Financial" },
  { name: "cost",     label: "Purchase Cost", type: "number", prefix: "R", required: true, group: "Financial" },
  { name: "depreciation", label: "Depreciation Method", type: "select", options: ["Straight-Line","Reducing Balance","None"], group: "Financial" },
  { name: "lifeYears",label: "Useful Life (yrs)", type: "number", group: "Financial" },
  { name: "warrantyExp", label: "Warranty Expiry", type: "date", group: "Compliance" },
  { name: "insurance",label: "Insured", type: "checkbox", group: "Compliance" },
  { name: "nextMaint",label: "Next Maintenance Due", type: "date", group: "Compliance" },
  { name: "notes",    label: "Notes", type: "textarea", span: 2 },
];

export const NEW_LAB_FIELDS: FormField[] = [
  { name: "name",     label: "Lab Name", required: true, group: "Identity" },
  { name: "code",     label: "Lab Code", required: true, group: "Identity", hint: "e.g. TPL-BSN" },
  { name: "country",  label: "Country", type: "select", required: true, options: ["South Africa","Nigeria","Zimbabwe","Lesotho","Botswana"], group: "Identity" },
  { name: "type",     label: "Branch Type", type: "select", required: true, options: ["Headquarters","Hub Lab","Branch Lab","Drawing Station","Mobile Unit"], group: "Identity" },
  { name: "manager",  label: "Lab Manager", required: true, group: "Operations" },
  { name: "depts",    label: "Active Departments", type: "multiselect", options: ["HIV","Chemistry","Haematology","Microbiology","Histology","Virology","Cytology"], span: 2, group: "Operations" },
  { name: "address",  label: "Physical Address", type: "textarea", span: 2, group: "Location" },
  { name: "lat",      label: "Latitude", group: "Location" },
  { name: "lng",      label: "Longitude", group: "Location" },
  { name: "phone",    label: "Phone", type: "tel", group: "Location" },
  { name: "email",    label: "Email", type: "email", group: "Location" },
  { name: "openHours",label: "Operating Hours", group: "Operations" },
  { name: "isoCert",  label: "ISO 15189 Certified", type: "checkbox", group: "Compliance" },
  { name: "saIso",    label: "SANAS Accreditation #", group: "Compliance" },
];

export const NEW_COMPANY_FIELDS: FormField[] = [
  { name: "name",     label: "Company Name", required: true, group: "Identity" },
  { name: "type",     label: "Company Type", type: "select", required: true, options: ["Holding","Subsidiary","International","Joint Venture"], group: "Identity" },
  { name: "regNo",    label: "Registration #", required: true, group: "Identity" },
  { name: "vatNo",    label: "VAT #", group: "Identity" },
  { name: "country",  label: "Country", type: "select", options: ["South Africa","Nigeria","Zimbabwe","Lesotho"], required: true, group: "Identity" },
  { name: "incDate",  label: "Incorporation Date", type: "date", group: "Identity" },
  { name: "ceo",      label: "CEO / MD", group: "Leadership" },
  { name: "cfo",      label: "CFO", group: "Leadership" },
  { name: "headOffice", label: "Head Office Address", type: "textarea", span: 2, group: "Address" },
  { name: "logo",     label: "Logo Upload", type: "file", span: 2, group: "Branding" },
  { name: "branding", label: "Branding Colour (hex)", group: "Branding" },
  { name: "active",   label: "Active", type: "checkbox", defaultValue: true, group: "Status" },
];

// Matches Target Pathology "Create / Edit Medical Aid Administrator" form
export const NEW_MA_ADMIN_FIELDS: FormField[] = [
  { name: "name",        label: "Name", required: true, span: 2 },
  { name: "webAddress",  label: "Web address" },
  { name: "webUsername", label: "Web user name", defaultValue: "William@ne" },
  { name: "webPassword", label: "Web password", type: "password", defaultValue: "password" },
  { name: "address",     label: "Address", type: "textarea" },
  { name: "postal",      label: "Postal address", type: "textarea" },
  { name: "telephone",   label: "Telephone", type: "tel" },
  { name: "fax",         label: "Fax number" },
  { name: "email",       label: "Email", type: "email" },
  { name: "comment",     label: "Comment", type: "textarea", span: 2 },
];

export const NEW_MA_FIELDS: FormField[] = [
  { name: "name",     label: "Medical Aid Name", required: true, group: "Identity" },
  { name: "code",     label: "Code", required: true, group: "Identity" },
  { name: "admin",    label: "Administrator", required: true, group: "Identity" },
  { name: "country",  label: "Country", type: "select", options: ["South Africa","Nigeria","Zimbabwe","Lesotho"], group: "Identity" },
  { name: "tariff",   label: "Tariff Schedule", type: "select", options: ["MedPrax 2026","GEMS A","Polmed Std","Zim PSMAS","NG-Std","Custom"], required: true, group: "Tariff" },
  { name: "lives",    label: "Lives Covered", type: "number", group: "Coverage" },
  { name: "claimsEmail", label: "Claims Email", type: "email", group: "Claims" },
  { name: "claimsPhone", label: "Claims Phone", type: "tel", group: "Claims" },
  { name: "preauth",  label: "Pre-Auth Required", type: "checkbox", group: "Claims" },
  { name: "ediCode",  label: "EDI Practice Code", group: "EDI" },
  { name: "active",   label: "Active", type: "checkbox", defaultValue: true, group: "Status" },
];

export const NEW_DEPT_FIELDS: FormField[] = [
  { name: "name",  label: "Department", required: true, hint: "e.g. HAEM, CHEM, SERO" },
  { name: "code",  label: "Department code", required: true, hint: "Single letter, e.g. H, C, S" },
  { name: "order", label: "Department order", type: "number", required: true, hint: "Display sort order" },
  { name: "pk",    label: "Pk", type: "number", required: true, hint: "Primary key (legacy LIS)" },
  { name: "head",  label: "Head of Department" },
  { name: "branches", label: "Active in Branches", type: "multiselect", options: BRANCHES, span: 2 },
  { name: "tat",   label: "TAT SLA (e.g. 4h, 24h)" },
  { name: "isoRef", label: "ISO 15189 Section", defaultValue: "ISO 15189 §5.5" },
  { name: "description", label: "Description", type: "textarea", span: 2 },
];

export const NEW_NOTIFIABLE_SIMPLE_FIELDS: FormField[] = [
  { name: "icd10", label: "Diagnosis code", required: true, hint: "ICD-10 / disease classification code (e.g. B24, E10.1)", span: 2 },
  { name: "email", label: "Email address", type: "email", required: true, hint: "Notifiable disease registry / partner inbox", span: 2 },
];

export const NEW_RANGE_FIELDS: FormField[] = [
  { name: "code",    label: "Range code", required: true, group: "Identity" },
  { name: "species", label: "Species", type: "select", required: true, defaultValue: "HUMAN", options: ["HUMAN","ANIMAL"], group: "Identity" },
  { name: "sex",     label: "Sex", type: "select", required: true, options: ["M","F","B"], group: "Identity", hint: "B = Both" },
  { name: "age",     label: "Age (years, decimal)", required: true, group: "Identity", hint: "e.g. 0.003 = days, 0.5 = 6 months" },
  { name: "hi",      label: "Hi (Normal high)",   type: "number", required: true, group: "Reference" },
  { name: "lo",      label: "Lo (Normal low)",    type: "number", required: true, group: "Reference" },
  { name: "panHi",   label: "Pan hi (Panic high)", type: "number", required: true, group: "Panic" },
  { name: "panLo",   label: "Pan lo (Panic low)",  type: "number", required: true, group: "Panic" },
  { name: "rejectHi",label: "Reject hi", type: "number", required: true, group: "Reject" },
  { name: "rejectLo",label: "Reject lo", type: "number", required: true, group: "Reject" },
  { name: "canNorm", label: "Can norm",  type: "number", required: true, group: "Cancer" },
  { name: "canHi",   label: "Can hi",    type: "number", required: true, group: "Cancer" },
  { name: "canLo",   label: "Can lo",    type: "number", required: true, group: "Cancer" },
  { name: "flagComm",label: "Flag comm", type: "checkbox", group: "Flags", placeholder: "Append result comment when out of range" },
];

export const NEW_NEWSLETTER_FIELDS: FormField[] = [
  { name: "subject",   label: "Subject", required: true, span: 2 },
  { name: "fromEmail", label: "From email", type: "email", required: true, defaultValue: "newsletter@targetlabs.co.za" },
  { name: "fromName",  label: "From name", required: true, defaultValue: "Target Pathology Laboratory" },
  { name: "html",      label: "Html (Body)", type: "textarea", required: true, span: 2, hint: "Rich HTML supported. Tokens: {{doctor}}, {{first_name}}, {{practice}}" },
  { name: "audience",  label: "Audience", type: "multiselect", options: ["All Doctors","Discovery Network","GEMS Network","Top 50 Referrers","KZN Region","Gauteng Region","International"], span: 2 },
  { name: "schedule",  label: "Send", type: "select", options: ["Save Draft","Send Now","Schedule…"], defaultValue: "Save Draft" },
  { name: "scheduleAt", label: "Scheduled at", type: "date" },
];

export const NEW_PATIENT_FIELDS: FormField[] = [
  { name: "title", label: "Title", type: "select", options: ["Mr.","Mrs.","Ms.","Dr.","Master","Baby"], group: "Identity" },
  { name: "firstName", label: "First Name", required: true, group: "Identity" },
  { name: "lastName", label: "Surname", required: true, group: "Identity" },
  { name: "idType", label: "ID Type", type: "select", options: ["SA ID","Passport","Refugee ID","Birth Certificate"], required: true, group: "Identity" },
  { name: "idNumber", label: "ID #", required: true, group: "Identity" },
  { name: "dob", label: "Date of Birth", type: "date", required: true, group: "Identity" },
  { name: "sex", label: "Sex", type: "select", options: ["Male","Female","Other"], required: true, group: "Identity" },
  { name: "race", label: "Population Group", type: "select", options: ["African","Coloured","Indian/Asian","White","Other"], group: "Identity" },
  { name: "phone", label: "Mobile", type: "tel", required: true, group: "Contact" },
  { name: "email", label: "Email", type: "email", group: "Contact" },
  { name: "address", label: "Residential Address", type: "textarea", span: 2, group: "Contact" },
  { name: "branch", label: "Default Branch", type: "select", options: BRANCHES, required: true, group: "Care" },
  { name: "doctor", label: "Default Doctor", group: "Care" },
  { name: "billing", label: "Billing Type", type: "select", options: ["Cash","Medical Aid","Corporate"], required: true, group: "Billing" },
  { name: "aid", label: "Medical Aid", type: "select", options: ["Discovery","Bonitas","GEMS","Polmed","Fedhealth","Momentum","PSMAS","AXA Mansard","N/A"], group: "Billing" },
  { name: "aidNo", label: "Member #", group: "Billing" },
  { name: "principal", label: "Principal Member Name", group: "Billing" },
  { name: "depCode", label: "Dependant Code", group: "Billing" },
  { name: "kin", label: "Next of Kin", group: "Emergency" },
  { name: "kinPhone", label: "Next of Kin Phone", type: "tel", group: "Emergency" },
  { name: "consent", label: "POPIA Consent Captured", type: "checkbox", required: true, group: "Compliance" },
  { name: "allergies", label: "Known Allergies", type: "textarea", span: 2, group: "Clinical" },
];

export const NEW_TEST_FIELDS: FormField[] = [
  { name: "code", label: "Test Code", required: true, group: "Test" },
  { name: "name", label: "Test Name", required: true, group: "Test" },
  { name: "dept", label: "Department", type: "select", options: ["HIV","CHEM","HAEM","MICRO","HISTO","VIRO"], required: true, group: "Test" },
  { name: "specimen", label: "Specimen Type", type: "select", options: ["Blood (EDTA)","Blood (Serum)","Blood (Plasma)","Urine","Sputum","Swab","Tissue","CSF"], required: true, group: "Specimen" },
  { name: "container", label: "Container", required: true, group: "Specimen" },
  { name: "volumeMl", label: "Min Volume (mL)", type: "number", group: "Specimen" },
  { name: "tat", label: "TAT (hours)", type: "number", required: true, group: "Performance" },
  { name: "machine", label: "Default Analyzer", group: "Performance" },
  { name: "method", label: "Method", group: "Performance" },
  { name: "loinc", label: "LOINC Code", group: "Coding" },
  { name: "medprax", label: "MedPrax Code", group: "Coding" },
  { name: "icd10", label: "Default ICD-10", group: "Coding" },
  { name: "basePrice", label: "Cash Price", type: "number", prefix: "R", required: true, group: "Pricing" },
  { name: "aidPrice", label: "Medical Aid Price", type: "number", prefix: "R", group: "Pricing" },
  { name: "refRange", label: "Reference Range / Notes", type: "textarea", span: 2, group: "Clinical" },
  { name: "criticalLow", label: "Critical Low Value", group: "Clinical" },
  { name: "criticalHigh",label: "Critical High Value", group: "Clinical" },
  { name: "notifiable", label: "Notifiable Disease", type: "checkbox", group: "Flags" },
  { name: "highValue", label: "High-Value (Approval)", type: "checkbox", group: "Flags" },
];

export const NEW_NOTIFIABLE_FIELDS: FormField[] = [
  { name: "disease", label: "Disease", type: "select", required: true, options: ["Tuberculosis (Pulmonary)","TB (Extra-pulmonary)","Hepatitis A","Hepatitis B","Hepatitis C","Measles","Mpox","Cholera","Typhoid","Listeriosis","Rubella","Mumps","Yellow Fever","Rabies","Anthrax","Other"], group: "Case" },
  { name: "icd10", label: "ICD-10 Code", required: true, group: "Case" },
  { name: "patient", label: "Patient #", required: true, group: "Patient" },
  { name: "patientName", label: "Patient Name", required: true, group: "Patient" },
  { name: "age", label: "Age", type: "number", group: "Patient" },
  { name: "sex", label: "Sex", type: "select", options: ["Male","Female"], group: "Patient" },
  { name: "lab", label: "Reporting Lab", type: "select", options: BRANCHES, required: true, group: "Reporting" },
  { name: "reportedAt", label: "Detection Date", type: "date", required: true, group: "Reporting" },
  { name: "doctor", label: "Attending Doctor", required: true, group: "Reporting" },
  { name: "severity", label: "Severity", type: "select", options: ["Low","Medium","High"], required: true, group: "Reporting" },
  { name: "specimen", label: "Specimen Type", group: "Lab" },
  { name: "result", label: "Lab Result Summary", type: "textarea", span: 2, group: "Lab" },
  { name: "submitNDIC", label: "Submit to NDIC immediately", type: "checkbox", defaultValue: true, group: "Submission" },
];

export const BLACKLIST_FIELDS: FormField[] = [
  { name: "patient", label: "Patient", required: true },
  { name: "labNo",   label: "Lab #", required: true },
  { name: "category",label: "Category", type: "select", required: true, options: ["NSF Cheques","Repeated Non-Payment","Fraud (suspected)","Fraud (confirmed)","Identity Mismatch","Abusive Behaviour"] },
  { name: "amountOwed", label: "Outstanding Amount", type: "number", prefix: "R" },
  { name: "incidents", label: "# of Incidents", type: "number" },
  { name: "evidence", label: "Evidence Summary", type: "textarea", span: 2, required: true },
  { name: "reviewIn", label: "Review After (months)", type: "number", defaultValue: "12" },
  { name: "approver", label: "Super Admin Approver", required: true },
];

export const RECORD_RECEIPT_FIELDS: FormField[] = [
  { name: "amount",  label: "Amount Received", type: "number", prefix: "R", required: true },
  { name: "method",  label: "Payment Method", type: "select", options: ["Cash","EFT","Card","Snapscan","Zapper","Cheque"], required: true },
  { name: "ref",     label: "Reference / Transaction #", required: true },
  { name: "invoice", label: "Allocate to Invoice #", required: true },
  { name: "date",    label: "Date Received", type: "date", required: true, defaultValue: new Date().toISOString().slice(0,10) },
  { name: "receivedBy", label: "Received By", required: true },
  { name: "notes",   label: "Notes", type: "textarea", span: 2 },
];

/* =================================================================
   Additional comprehensive form schemas (Round 4)
   ================================================================= */

// Canned Comment (per screenshot)
export const NEW_CANNED_COMMENT_FIELDS: FormField[] = [
  { name: "code", label: "Code", required: true, group: "Identity" },
  { name: "abbreviation", label: "Abbreviation", required: true, group: "Identity" },
  { name: "department", label: "Department", type: "select", required: true,
    options: ["HAEM","CHEM","SERO","ISOT","HISTO","MICRO","HIV","DIABE","VIRO"], group: "Identity" },
  { name: "comment", label: "Comment (Rich text)", type: "textarea", required: true, span: 2,
    hint: "Tokens supported: {{patient}}, {{result}}, {{ref_range}}, {{doctor}}" },
];

// Generate invoices by date range (Cash / Medical Aid / etc.)
export const GENERATE_INVOICES_FIELDS: FormField[] = [
  { name: "type", label: "Invoice type", type: "select", required: true,
    options: ["Cash","Medical Aid","Corporate","Doctor Account","All"], defaultValue: "Cash", group: "Scope" },
  { name: "from", label: "From date", type: "date", required: true, group: "Date Range" },
  { name: "to",   label: "To date",   type: "date", required: true, group: "Date Range" },
  { name: "branch", label: "Branch", type: "select", options: ["All", ...BRANCHES], defaultValue: "All", group: "Filters" },
  { name: "medicalAid", label: "Medical Aid (if MA invoices)", type: "select",
    options: ["All","Discovery","Bonitas","GEMS","Polmed","Fedhealth","Momentum","PSMAS","Cash"], defaultValue: "All", group: "Filters" },
  { name: "format", label: "Output format", type: "select", options: ["PDF (one per invoice)","CSV summary","ZIP bundle"], defaultValue: "ZIP bundle", group: "Output" },
  { name: "send", label: "Email after generation", type: "checkbox", defaultValue: true, group: "Output" },
];

// Financial report filter
export const FIN_REPORT_FILTER_FIELDS: FormField[] = [
  { name: "report", label: "Report type", type: "select", required: true,
    options: ["P&L (Profit & Loss)","Balance Sheet","Cash Flow","Asset Register","Daily Cash Intake","Bank Deposits","Debt Recovery","Petty Cash","Cost Reconciliation","Leakage & Fraud Flags"],
    group: "Report" },
  { name: "from",   label: "From date", type: "date", required: true, group: "Period" },
  { name: "to",     label: "To date",   type: "date", required: true, group: "Period" },
  { name: "company",label: "Company", type: "select", options: ["All","Target Pathology Holdings","TPL Operations","TPL Lagos","TPL Harare"], defaultValue: "All", group: "Scope" },
  { name: "branch", label: "Branch",  type: "select", options: ["All", ...BRANCHES], defaultValue: "All", group: "Scope" },
  { name: "currency", label: "Currency", type: "select", options: ["ZAR","USD","NGN","ZWL"], defaultValue: "ZAR", group: "Scope" },
  { name: "comparison", label: "Compare to", type: "select", options: ["None","Previous Period","Same Period Last Year","Budget"], defaultValue: "Previous Period", group: "Scope" },
];

// Schedule Payment (creditors)
export const SCHEDULE_PAYMENT_FIELDS: FormField[] = [
  { name: "amount",  label: "Amount", type: "number", prefix: "R", required: true, group: "Payment" },
  { name: "payDate", label: "Payment date", type: "date", required: true, group: "Payment" },
  { name: "method",  label: "Method", type: "select", options: ["EFT","ACH","Cheque","Card","Cash"], required: true, defaultValue: "EFT", group: "Payment" },
  { name: "reference", label: "Reference / PO #", required: true, group: "Payment" },
  { name: "bank",    label: "Pay from bank", type: "select", options: ["FNB Operating","Standard Bank Main","ABSA Reserve"], required: true, group: "Banking" },
  { name: "approver", label: "Approver", type: "select", options: ["Auto-route to L4","Mr Patrick Magupya (CFO)","Yanick K. (Acct.)"], group: "Approvals" },
  { name: "notes",   label: "Notes", type: "textarea", span: 2 },
];

// New Lead (sales pipeline / leads)
export const NEW_LEAD_FIELDS: FormField[] = [
  { name: "name",    label: "Lead Name / Practice", required: true, group: "Lead" },
  { name: "contact", label: "Primary Contact", required: true, group: "Lead" },
  { name: "email",   label: "Email", type: "email", required: true, group: "Lead" },
  { name: "phone",   label: "Phone", type: "tel", required: true, group: "Lead" },
  { name: "source",  label: "Source", type: "select", required: true,
    options: ["Referral","Campaign","Manual","Disease Catchment","Import","Web Enquiry","Cold Call"], group: "Lead" },
  { name: "rep",     label: "Assigned Rep", type: "select", required: true,
    options: ["Carmen Angelica","Ike Igbo MBA","Patrick Magupya","Makoane Ngoasheng","mr francis ike","P. Moyo"], group: "Assignment" },
  { name: "branch",  label: "Region / Branch", type: "select", options: BRANCHES, required: true, group: "Assignment" },
  { name: "value",   label: "Est. Monthly Value", type: "number", prefix: "R", required: true, group: "Value" },
  { name: "stage",   label: "Initial Stage", type: "select",
    options: ["New","Contacted","Meeting","Negotiation"], defaultValue: "New", group: "Pipeline" },
  { name: "nextAction", label: "Next Action", group: "Pipeline" },
  { name: "nextDate",   label: "Next Action Date", type: "date", group: "Pipeline" },
  { name: "notes",   label: "Notes", type: "textarea", span: 2 },
];

// New Wastage event
export const NEW_WASTAGE_FIELDS: FormField[] = [
  { name: "item",   label: "Item / Kit / Reagent", required: true, group: "Item" },
  { name: "lot",    label: "Lot #", group: "Item" },
  { name: "qty",    label: "Quantity", type: "number", required: true, group: "Item" },
  { name: "reason", label: "Reason", type: "select", required: true,
    options: ["Expired","Spilled","Contaminated","Damaged","Equipment failure","Power loss","Other"], group: "Reason" },
  { name: "branch", label: "Branch", type: "select", options: BRANCHES, required: true, group: "Location" },
  { name: "staff",  label: "Reported By", required: true, group: "Location" },
  { name: "cost",   label: "Estimated Cost", type: "number", prefix: "R", required: true, group: "Cost" },
  { name: "evidence", label: "Photo / Evidence", type: "file", span: 2, group: "Evidence" },
  { name: "rootCause", label: "Root Cause Analysis", type: "textarea", span: 2 },
];

// New Store Request
export const NEW_STORE_REQUEST_FIELDS: FormField[] = [
  { name: "item",   label: "Item / Kit", required: true, group: "Request" },
  { name: "qty",    label: "Quantity",   type: "number", required: true, group: "Request" },
  { name: "urgency",label: "Urgency",    type: "select", required: true,
    options: ["Routine","Urgent","Critical"], defaultValue: "Routine", group: "Request" },
  { name: "branch", label: "Destination Branch", type: "select", options: BRANCHES, required: true, group: "Request" },
  { name: "neededBy", label: "Needed By", type: "date", required: true, group: "Request" },
  { name: "supplier", label: "Preferred Supplier", group: "Sourcing" },
  { name: "estCost",  label: "Est. Cost", type: "number", prefix: "R", group: "Sourcing" },
  { name: "justification", label: "Justification", type: "textarea", span: 2, required: true },
];

// Mitigation plan (supply risk)
export const MITIGATION_PLAN_FIELDS: FormField[] = [
  { name: "item",   label: "Item at risk", required: true, group: "Risk" },
  { name: "branch", label: "Branch", type: "select", options: BRANCHES, required: true, group: "Risk" },
  { name: "action", label: "Mitigation action", type: "select", required: true,
    options: ["Emergency reorder","Inter-branch transfer","Substitute kit","Reduce test menu","Defer non-urgent"], group: "Plan" },
  { name: "owner",  label: "Owner", required: true, group: "Plan" },
  { name: "deadline", label: "Deadline", type: "date", required: true, group: "Plan" },
  { name: "approvers", label: "Approvers", type: "multiselect",
    options: ["Inventory Manager","Lab Manager","Branch Manager","CFO","Super Admin"], span: 2, group: "Plan" },
  { name: "notes",  label: "Notes", type: "textarea", span: 2 },
];

// Newsletter "New Issue" wizard (uses NEW_NEWSLETTER_FIELDS already)
