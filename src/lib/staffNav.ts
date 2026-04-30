import {
  LayoutDashboard, Users, MapPin, CalendarCheck, Banknote, Receipt,
  Target, Award, BookOpen, ShieldCheck, Clock, Stethoscope, Truck,
} from "lucide-react";
import type { NavItem } from "./nav";

export const STAFF_NAV: NavItem[] = [
  { id: "staff-home", label: "Staff Command",  to: "/staff", icon: LayoutDashboard },
  { id: "staff-list", label: "All Staff (35)", to: "/staff/directory", icon: Users },
  { id: "clock",      label: "Clock-In Map",   to: "/staff/clock", icon: MapPin },
  { id: "leave",      label: "Leave Mgmt",     to: "/staff/leave", icon: CalendarCheck },
  { id: "payroll",    label: "Payroll",        to: "/staff/payroll", icon: Banknote },
  { id: "expenses",   label: "Expense Claims", to: "/staff/expenses", icon: Receipt },
  { id: "targets",    label: "Targets & KPIs", to: "/staff/targets", icon: Target },
  { id: "commission", label: "Commission",     to: "/staff/commission", icon: Award },
  { id: "schedule",   label: "Schedules / Roster", to: "/staff/schedule", icon: Clock },
  { id: "drivers",    label: "Drivers & Trips",   to: "/staff/drivers", icon: Truck },
  { id: "doctors",    label: "Doctors & Reps",    to: "/staff/doctors", icon: Stethoscope },
  { id: "training",   label: "Training & SOPs",   to: "/staff/training", icon: BookOpen },
  { id: "discipline", label: "Disciplinary",      to: "/staff/discipline", icon: ShieldCheck },
];
